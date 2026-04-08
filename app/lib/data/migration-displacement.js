// Source endpoint config: update these URLs/layer IDs here if IOM or UNHCR revises service paths.
const IOM_DTM_FEATURESERVER = "https://services5.arcgis.com/QYf5PkPqzJKVzrmF/ArcGIS/rest/services/Global_DTM_Data_Admin2/FeatureServer";
const IOM_DTM_IDP_LAYER = 0;
const IOM_DTM_RETURNEE_LAYER = 1;
const UNHCR_POPULATION_API = "https://api.unhcr.org/population/v1/population/";

const CACHE_TTL_MS = 1000 * 60 * 60 * 6;
let serviceCache = {
  key: "",
  fetchedAt: 0,
  payload: null
};

const COUNTRY_ALIASES = {
  "DEM REP OF THE CONGO": "DEMOCRATIC REPUBLIC OF THE CONGO",
  "DEM REP OF CONGO": "DEMOCRATIC REPUBLIC OF THE CONGO",
  DRCONGO: "DEMOCRATIC REPUBLIC OF THE CONGO",
  CONGODRC: "DEMOCRATIC REPUBLIC OF THE CONGO",
  "DEMOCRATIC REPUBLIC OF THE CONGO": "DEMOCRATIC REPUBLIC OF THE CONGO"
};

const ADMIN_ALIASES = {
  "SOM|BANADIR": "BENADIR",
  "SOM|BENADIR": "BENADIR",
  "DJI|DJIBOUTI": "DJIBOUTI",
  "COD|KINSHASA CITY": "KINSHASA"
};

function normalizeName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function parseNumber(value) {
  if (value === null || value === undefined || value === "" || value === "-") return 0;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseSnapshotDate(value) {
  const parsed = parseNumber(value);
  if (!parsed) return "";
  try {
    return new Date(parsed).toISOString();
  } catch (error) {
    return "";
  }
}

function formatCacheKey(countryRows = []) {
  return countryRows
    .map((row) => String(row.id || "").trim().toUpperCase())
    .filter(Boolean)
    .sort()
    .join(",");
}

function buildIsoWhere(countryCodes = []) {
  const joined = countryCodes.map((code) => `'${code}'`).join(",");
  return `ISO3 IN (${joined})`;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`);
  }
  return response.json();
}

async function queryArcGisLayer(layerId, countryCodes = [], options = {}) {
  const where = buildIsoWhere(countryCodes);
  const outFields = options.outFields || "ISO3,Admin_0,Admin_1,Admin_2,tot_idps,Snapshot_Date";
  const includeGeometry = options.includeGeometry !== false;
  const pageSize = 2000;
  let offset = 0;
  let guard = 0;
  const rows = [];

  while (guard < 20) {
    guard += 1;
    const params = new URLSearchParams({
      where,
      outFields,
      returnGeometry: includeGeometry ? "true" : "false",
      outSR: "4326",
      resultOffset: String(offset),
      resultRecordCount: String(pageSize),
      orderByFields: "OBJECTID",
      f: "json"
    });
    const url = `${IOM_DTM_FEATURESERVER}/${layerId}/query?${params.toString()}`;
    const payload = await fetchJson(url);
    const features = Array.isArray(payload?.features) ? payload.features : [];
    rows.push(...features);

    if (!features.length) break;
    if (!payload.exceededTransferLimit && features.length < pageSize) break;
    offset += pageSize;
  }

  return rows;
}

function buildCountryLookup(countryRows = []) {
  const byIso = new Map();
  const byName = new Map();

  countryRows.forEach((row) => {
    const iso = String(row.id || "").trim().toUpperCase();
    if (!iso) return;
    byIso.set(iso, row);
    const normalizedName = normalizeName(row.name);
    byName.set(normalizedName, row);
    if (COUNTRY_ALIASES[normalizedName]) {
      byName.set(COUNTRY_ALIASES[normalizedName], row);
    }
  });

  return { byIso, byName };
}

function buildSubnationalLookup(subnationalRows = []) {
  const byKey = new Map();
  subnationalRows.forEach((row) => {
    const country = String(row.countryId || "").trim().toUpperCase();
    const admin = normalizeName(row.name);
    if (!country || !admin) return;
    byKey.set(`${country}|${admin}`, row);
  });
  return byKey;
}

function normalizeAdmin(countryIso, adminName) {
  const normalized = normalizeName(adminName);
  if (!normalized) return "";
  const alias = ADMIN_ALIASES[`${countryIso}|${normalized}`];
  return alias || normalized;
}

function combineIomRecords(idpFeatures, returneeFeatures, countryLookup, subnationalLookup) {
  const byKey = new Map();

  const ensureRow = (countryIso, admin1, admin2) => {
    const rowKey = `${countryIso}|${normalizeName(admin1)}|${normalizeName(admin2)}`;
    if (!byKey.has(rowKey)) {
      const countryRow = countryLookup.byIso.get(countryIso);
      const countryName = countryRow?.name || countryLookup.byName.get(COUNTRY_ALIASES[normalizeName(admin1)] || "")?.name || "";
      const admin1Normalized = normalizeAdmin(countryIso, admin1);
      const subnationalMatch = subnationalLookup.get(`${countryIso}|${admin1Normalized}`) || null;
      byKey.set(rowKey, {
        rowKey,
        countryId: countryIso,
        countryName: countryName || String(countryIso || ""),
        regionName: countryRow?.region || "Unassigned",
        admin1Name: String(admin1 || ""),
        admin2Name: String(admin2 || ""),
        admin1Normalized,
        matchedAdminId: subnationalMatch?.id || "",
        matchedAdminName: subnationalMatch?.name || "",
        latitude: null,
        longitude: null,
        idps: 0,
        returnees: 0,
        idpSnapshotDate: "",
        returneeSnapshotDate: ""
      });
    }
    return byKey.get(rowKey);
  };

  idpFeatures.forEach((feature) => {
    const attrs = feature?.attributes || {};
    const iso = String(attrs.ISO3 || "").trim().toUpperCase();
    if (!iso) return;
    const row = ensureRow(iso, attrs.Admin_1, attrs.Admin_2);
    row.idps += parseNumber(attrs.tot_idps);
    row.idpSnapshotDate = parseSnapshotDate(attrs.Snapshot_Date) || row.idpSnapshotDate;
    if (feature?.geometry && typeof feature.geometry.x === "number" && typeof feature.geometry.y === "number") {
      row.longitude = feature.geometry.x;
      row.latitude = feature.geometry.y;
    }
  });

  returneeFeatures.forEach((feature) => {
    const attrs = feature?.attributes || {};
    const iso = String(attrs.ISO3 || "").trim().toUpperCase();
    if (!iso) return;
    const row = ensureRow(iso, attrs.Admin_1, attrs.Admin_2);
    row.returnees += parseNumber(attrs.tot_ret);
    row.returneeSnapshotDate = parseSnapshotDate(attrs.Snapshot_Date) || row.returneeSnapshotDate;
  });

  return [...byKey.values()].map((row) => {
    const snapshotCandidates = [row.idpSnapshotDate, row.returneeSnapshotDate].filter(Boolean);
    const latestSnapshot = snapshotCandidates.sort().slice(-1)[0] || "";
    return {
      ...row,
      totalDisplaced: row.idps + row.returnees,
      latestSnapshotDate: latestSnapshot
    };
  });
}

function summarizeByCountry(iomRows, unhcrLatestByCountry) {
  const byCountry = new Map();
  iomRows.forEach((row) => {
    if (!byCountry.has(row.countryId)) {
      byCountry.set(row.countryId, {
        countryId: row.countryId,
        countryName: row.countryName,
        regionName: row.regionName,
        iomIdps: 0,
        iomReturnees: 0,
        iomSnapshotDate: ""
      });
    }
    const current = byCountry.get(row.countryId);
    current.iomIdps += row.idps;
    current.iomReturnees += row.returnees;
    const date = row.latestSnapshotDate || "";
    if (date && (!current.iomSnapshotDate || date > current.iomSnapshotDate)) {
      current.iomSnapshotDate = date;
    }
  });

  return [...byCountry.values()]
    .map((row) => {
      const unhcr = unhcrLatestByCountry.get(row.countryId) || {};
      return {
        ...row,
        refugees: parseNumber(unhcr.refugees),
        asylumSeekers: parseNumber(unhcr.asylum_seekers),
        unhcrIdps: parseNumber(unhcr.idps),
        unhcrReturnedIdps: parseNumber(unhcr.returned_idps),
        unhcrYear: parseNumber(unhcr.year) || 0
      };
    })
    .sort((a, b) => b.iomIdps - a.iomIdps);
}

function summarizeByRegion(countrySummaries) {
  const byRegion = new Map();
  countrySummaries.forEach((row) => {
    const region = row.regionName || "Unassigned";
    if (!byRegion.has(region)) {
      byRegion.set(region, {
        regionName: region,
        iomIdps: 0,
        iomReturnees: 0,
        refugees: 0,
        asylumSeekers: 0
      });
    }
    const current = byRegion.get(region);
    current.iomIdps += row.iomIdps;
    current.iomReturnees += row.iomReturnees;
    current.refugees += row.refugees;
    current.asylumSeekers += row.asylumSeekers;
  });
  return [...byRegion.values()].sort((a, b) => b.iomIdps - a.iomIdps);
}

function buildOverlayPoints(iomRows, unhcrLatestByCountry) {
  return iomRows
    .filter((row) => Number.isFinite(row.latitude) && Number.isFinite(row.longitude))
    .map((row) => {
      const unhcr = unhcrLatestByCountry.get(row.countryId) || {};
      return {
        id: `IOM-${row.rowKey}`,
        countryId: row.countryId,
        countryName: row.countryName,
        regionName: row.regionName,
        admin1Name: row.admin1Name,
        admin2Name: row.admin2Name,
        latitude: row.latitude,
        longitude: row.longitude,
        idps: row.idps,
        returnees: row.returnees,
        totalDisplaced: row.totalDisplaced,
        snapshotDate: row.latestSnapshotDate || "",
        refugees: parseNumber(unhcr.refugees),
        asylumSeekers: parseNumber(unhcr.asylum_seekers),
        unhcrYear: parseNumber(unhcr.year) || 0
      };
    })
    .sort((a, b) => b.totalDisplaced - a.totalDisplaced);
}

function aggregateUnhcrByYear(items = []) {
  const byYear = new Map();
  items.forEach((row) => {
    const year = parseNumber(row.year);
    if (!year) return;
    if (!byYear.has(year)) {
      byYear.set(year, {
        year,
        refugees: 0,
        asylumSeekers: 0,
        idps: 0,
        returnedIdps: 0
      });
    }
    const current = byYear.get(year);
    current.refugees += parseNumber(row.refugees);
    current.asylumSeekers += parseNumber(row.asylum_seekers);
    current.idps += parseNumber(row.idps);
    current.returnedIdps += parseNumber(row.returned_idps);
  });
  return [...byYear.values()].sort((a, b) => a.year - b.year);
}

async function fetchUnhcrData(countryCodes = []) {
  const currentYear = new Date().getUTCFullYear();
  const yearTo = Math.max(2000, currentYear - 1);
  const yearFrom = yearTo - 1;
  const params = new URLSearchParams({
    limit: "400",
    page: "1",
    yearFrom: String(yearFrom),
    yearTo: String(yearTo),
    coa: countryCodes.join(","),
    cf_type: "ISO"
  });
  const payload = await fetchJson(`${UNHCR_POPULATION_API}?${params.toString()}`);
  const items = Array.isArray(payload?.items) ? payload.items : [];
  const latestByCountry = new Map();
  items.forEach((item) => {
    const countryId = String(item?.coa_iso || "").trim().toUpperCase();
    if (!countryId) return;
    const previous = latestByCountry.get(countryId);
    if (!previous || parseNumber(item.year) > parseNumber(previous.year)) {
      latestByCountry.set(countryId, item);
    }
  });
  return {
    sourceUrl: `${UNHCR_POPULATION_API}?${params.toString()}`,
    yearFrom,
    yearTo,
    items,
    byYear: aggregateUnhcrByYear(items),
    latestByCountry
  };
}

function buildTrendByCountry(unhcrItems = []) {
  const byCountry = new Map();
  unhcrItems.forEach((row) => {
    const countryId = String(row.coa_iso || "").trim().toUpperCase();
    const year = parseNumber(row.year);
    if (!countryId || !year) return;
    if (!byCountry.has(countryId)) byCountry.set(countryId, new Map());
    byCountry.get(countryId).set(year, row);
  });

  const trends = new Map();
  byCountry.forEach((yearMap, countryId) => {
    const years = [...yearMap.keys()].sort((a, b) => a - b);
    if (years.length < 2) return;
    const previousYear = years[years.length - 2];
    const latestYear = years[years.length - 1];
    const previous = yearMap.get(previousYear) || {};
    const latest = yearMap.get(latestYear) || {};
    trends.set(countryId, {
      countryId,
      previousYear,
      latestYear,
      refugeesDelta: parseNumber(latest.refugees) - parseNumber(previous.refugees),
      asylumSeekersDelta: parseNumber(latest.asylum_seekers) - parseNumber(previous.asylum_seekers),
      idpsDelta: parseNumber(latest.idps) - parseNumber(previous.idps)
    });
  });
  return trends;
}

export async function loadMigrationDisplacementData(options = {}) {
  const countryRows = Array.isArray(options.countryRows) ? options.countryRows : [];
  const subnationalRows = Array.isArray(options.subnationalRows) ? options.subnationalRows : [];
  const countryCodes = countryRows.map((row) => String(row.id || "").trim().toUpperCase()).filter((code) => code.length === 3);
  const cacheKey = formatCacheKey(countryRows);
  const now = Date.now();
  const allowCache = options.force !== true;

  if (allowCache && serviceCache.payload && serviceCache.key === cacheKey && now - serviceCache.fetchedAt < CACHE_TTL_MS) {
    return serviceCache.payload;
  }

  if (!countryCodes.length) {
    return {
      status: "error",
      fetchedAtUtc: new Date().toISOString(),
      message: "No country codes were available for migration/displacement queries."
    };
  }

  const countryLookup = buildCountryLookup(countryRows);
  const subnationalLookup = buildSubnationalLookup(subnationalRows);

  try {
    const [idpRows, returneeRows, unhcr] = await Promise.all([
      queryArcGisLayer(IOM_DTM_IDP_LAYER, countryCodes, {
        outFields: "ISO3,Admin_0,Admin_1,Admin_2,tot_idps,Snapshot_Date",
        includeGeometry: true
      }),
      queryArcGisLayer(IOM_DTM_RETURNEE_LAYER, countryCodes, {
        outFields: "ISO3,Admin_0,Admin_1,Admin_2,tot_ret,Snapshot_Date",
        includeGeometry: false
      }),
      fetchUnhcrData(countryCodes)
    ]);

    const iomRows = combineIomRecords(idpRows, returneeRows, countryLookup, subnationalLookup);
    const unhcrTrendByCountry = buildTrendByCountry(unhcr.items);
    const countrySummaries = summarizeByCountry(iomRows, unhcr.latestByCountry).map((row) => ({
      ...row,
      trend: unhcrTrendByCountry.get(row.countryId) || null
    }));
    const regionSummaries = summarizeByRegion(countrySummaries);
    const overlayPoints = buildOverlayPoints(iomRows, unhcr.latestByCountry);

    const latestIomSnapshot = iomRows
      .map((row) => row.latestSnapshotDate)
      .filter(Boolean)
      .sort()
      .slice(-1)[0] || "";

    const payload = {
      status: "ready",
      fetchedAtUtc: new Date().toISOString(),
      iom: {
        sourceLabel: "IOM DTM Global DTM Data Admin2 (IDPs + Returnees)",
        sourceUrl: `${IOM_DTM_FEATURESERVER}?f=pjson`,
        methodologyUrl: "https://dtm.iom.int/about/methodological-framework",
        idpLayerUrl: `${IOM_DTM_FEATURESERVER}/${IOM_DTM_IDP_LAYER}`,
        returneeLayerUrl: `${IOM_DTM_FEATURESERVER}/${IOM_DTM_RETURNEE_LAYER}`,
        latestSnapshotUtc: latestIomSnapshot,
        refreshNote: "Snapshot dates vary by country/admin area; this is not a real-time feed.",
        caveat:
          "Figures are DTM operational snapshots where DTM is active. Coverage and recency differ across geographies and administrative levels."
      },
      unhcr: {
        sourceLabel: "UNHCR Refugee Statistics API",
        sourceUrl: "https://api.unhcr.org/docs/refugee-statistics.html",
        queryUrl: unhcr.sourceUrl,
        latestYear: unhcr.byYear.slice(-1)[0]?.year || 0,
        refreshNote: "Population figures are published by reporting year (annual updates), not real-time.",
        caveat:
          "Asylum/refugee and displacement context are national-level indicators in this view; they are shown alongside subnational IOM overlays for context."
      },
      overlays: overlayPoints,
      countrySummaries,
      regionSummaries,
      unhcrByYear: unhcr.byYear
    };

    serviceCache = {
      key: cacheKey,
      fetchedAt: now,
      payload
    };
    return payload;
  } catch (error) {
    return {
      status: "error",
      fetchedAtUtc: new Date().toISOString(),
      message: String(error?.message || error || "Failed to load migration/displacement sources."),
      iom: {
        sourceLabel: "IOM DTM Global DTM Data Admin2 (IDPs + Returnees)",
        sourceUrl: `${IOM_DTM_FEATURESERVER}?f=pjson`,
        methodologyUrl: "https://dtm.iom.int/about/methodological-framework",
        refreshNote: "Data could not be loaded in this session.",
        caveat: "Check network access and source availability."
      },
      unhcr: {
        sourceLabel: "UNHCR Refugee Statistics API",
        sourceUrl: "https://api.unhcr.org/docs/refugee-statistics.html",
        refreshNote: "Data could not be loaded in this session.",
        caveat: "Check network access and source availability."
      },
      overlays: [],
      countrySummaries: [],
      regionSummaries: [],
      unhcrByYear: []
    };
  }
}
