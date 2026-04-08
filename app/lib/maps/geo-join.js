const BOUNDARY_TO_APP_ALIASES = {
  "TCD|VILLE DE NDJAMENA": "NDJAMENA",
  "TCD|N DJAMENA": "NDJAMENA",
  "COD|KINSHASA CITY": "KINSHASA",
  "ETH|ADDIS ABABA CITY ADMINISTRATION": "ADDIS ABABA",
  "SOM|BANADIR": "BENADIR",
  "YEM|AL HUDAIDAH": "AL HUDAYDAH"
};

const COUNTRY_NAME_TO_ISO3 = {
  "DEMOCRATIC REPUBLIC OF THE CONGO": "COD"
};

export function normalizeName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’`´]/g, "")
    .replace(/&/g, " AND ")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function normalizeWithAlias(countryCode, value) {
  const normalized = normalizeName(value);
  if (!normalized) return normalized;
  const aliasKey = `${countryCode}|${normalized}`;
  return BOUNDARY_TO_APP_ALIASES[aliasKey] || normalized;
}

function resolveCountryCode(properties = {}) {
  const direct = normalizeName(properties.ISO_3_CODE || properties.ISO3 || properties.COUNTRY_ISO3 || "");
  if (direct.length === 3) return direct;

  const countryName = normalizeName(properties.ADM0_NAME || properties.COUNTRY || properties.COUNTRY_NAME || "");
  if (COUNTRY_NAME_TO_ISO3[countryName]) {
    return COUNTRY_NAME_TO_ISO3[countryName];
  }

  const codeFromAdm = String(properties.ADM0_CODE || "").slice(0, 2).toUpperCase();
  if (codeFromAdm.length === 2) {
    return normalizeName(properties.ISO_3_CODE || "");
  }

  return "";
}

function featureNameCandidates(properties = {}, level = "admin1") {
  if (level === "admin0") {
    return [properties.ADM0_NAME, properties.ADM0_VIZ_NAME, properties.COUNTRY_NAME];
  }
  if (level === "admin2") {
    return [properties.ADM2_NAME, properties.ADM2_VIZ_NAME, properties.ADM2_ALTNAME, properties.ADM1_NAME];
  }
  return [properties.ADM1_NAME, properties.ADM1_VIZ_NAME, properties.ADM1_ALTNAME];
}

function buildAdminIndex(appAdmins = []) {
  const index = new Map();
  for (const admin of appAdmins) {
    const countryCode = normalizeName(admin.countryId);
    const keys = [normalizeName(admin.name), normalizeName(admin.boundaryKey), normalizeName(admin.name).replace(/\bSTATE\b|\bREGION\b|\bPROVINCE\b|\bGOVERNORATE\b/g, "").trim()];
    for (const key of keys) {
      if (!key) continue;
      index.set(`${countryCode}|${key}`, admin);
    }
  }
  return index;
}

export function joinBoundariesWithAdmins(featureCollection, options = {}) {
  const level = options.level || "admin1";
  const appAdmins = options.appAdmins || [];
  const adminIndex = buildAdminIndex(appAdmins);

  const features = (featureCollection?.features || []).map((feature) => {
    const properties = feature.properties || {};
    const countryCode = resolveCountryCode(properties);
    const candidates = featureNameCandidates(properties, level)
      .map((value) => normalizeWithAlias(countryCode, value))
      .filter(Boolean);

    let matchedAdmin = null;
    for (const candidate of candidates) {
      matchedAdmin = adminIndex.get(`${countryCode}|${candidate}`);
      if (matchedAdmin) break;
    }

    const displayName = candidates[0] || normalizeName(properties.ADM0_NAME || "Unknown geography");
    const adminLevelLabel = level === "admin2" ? "Admin Level 2" : level === "admin0" ? "Admin Level 0" : "Admin Level 1";
    const defaultFlags = [
      matchedAdmin?.silentDistrict ? "Silent district" : "",
      matchedAdmin?.mobilityCorridor ? "Mobility corridor" : "",
      matchedAdmin?.idpRoute ? "IDP route" : "",
      matchedAdmin?.crossBorderZone ? "Cross-border zone" : ""
    ].filter(Boolean);
    const humanitarianFlags = Array.isArray(matchedAdmin?.humanitarianFlags) ? matchedAdmin.humanitarianFlags.filter(Boolean) : [];

    return {
      ...feature,
      properties: {
        ...properties,
        __countryCode: countryCode,
        __displayName: displayName,
        __adminLevelLabel: adminLevelLabel,
        __matchedAdminId: matchedAdmin?.id || "",
        __matchedCountryId: matchedAdmin?.countryId || countryCode || "",
        __matchedRiskScore: matchedAdmin?.riskScore ?? null,
        __matchedCoverage: matchedAdmin?.coverage ?? null,
        __matchedFlags: humanitarianFlags.length ? humanitarianFlags : defaultFlags,
        __matchedActorCount: matchedAdmin?.humanitarianActorCount ?? null,
        __matchedWho: matchedAdmin?.humanitarianWho || "",
        __matchedWhat: matchedAdmin?.humanitarianWhat || "",
        __matchedName: matchedAdmin?.name || "",
        __matchedAdminType: matchedAdmin?.adminType || ""
      }
    };
  });

  return {
    type: "FeatureCollection",
    features
  };
}
