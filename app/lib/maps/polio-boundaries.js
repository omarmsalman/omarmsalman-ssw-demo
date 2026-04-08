const ARCGIS_BASE = "https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services";

// If WHO/GPEI updates layer names or service hosts, update the URLs in this object only.
export const POLIO_BOUNDARY_SOURCES = {
  admin0: {
    key: "admin0",
    adminLevel: 0,
    layerName: "GLOBAL_POLIO_ADM0",
    countryField: "ISO_3_CODE",
    displayField: "ADM0_NAME",
    endpoint: `${ARCGIS_BASE}/GLOBAL_POLIO_ADM0/FeatureServer/0`
  },
  admin1: {
    key: "admin1",
    adminLevel: 1,
    layerName: "GLOBAL_POLIO_ADM1",
    countryField: "ISO_3_CODE",
    displayField: "ADM1_NAME",
    endpoint: `${ARCGIS_BASE}/GLOBAL_POLIO_ADM1/FeatureServer/0`
  },
  admin2: {
    key: "admin2",
    adminLevel: 2,
    layerName: "GLOBAL_POLIO_ADM2",
    countryField: "ISO_3_CODE",
    displayField: "ADM2_NAME",
    endpoint: `${ARCGIS_BASE}/GLOBAL_POLIO_ADM2/FeatureServer/0`
  }
};

const boundaryCache = new Map();

function sanitizeCountryCodes(countryCodes = []) {
  return [...new Set(countryCodes.map((code) => String(code || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, "")).filter((code) => code.length === 3))];
}

function buildCountryWhereClause(countryField, countryCodes = []) {
  const codes = sanitizeCountryCodes(countryCodes);
  if (!codes.length) {
    return "1=1";
  }
  const quoted = codes.map((code) => `'${code}'`).join(",");
  return `${countryField} IN (${quoted})`;
}

function buildQueryUrl(source, whereClause, offset = 0, pageSize = 1000) {
  const params = new URLSearchParams({
    where: whereClause,
    outFields: "*",
    returnGeometry: "true",
    resultRecordCount: String(pageSize),
    resultOffset: String(offset),
    orderByFields: "OBJECTID",
    f: "geojson"
  });
  return `${source.endpoint}/query?${params.toString()}`;
}

async function fetchGeoJsonPage(source, whereClause, offset, pageSize) {
  const url = buildQueryUrl(source, whereClause, offset, pageSize);
  const response = await fetch(url, {
    headers: {
      Accept: "application/geo+json, application/json"
    }
  });
  if (!response.ok) {
    throw new Error(`Boundary request failed (${response.status}) for ${source.layerName}`);
  }
  const payload = await response.json();
  if (!payload || payload.type !== "FeatureCollection") {
    throw new Error(`Unexpected boundary payload for ${source.layerName}`);
  }
  return payload;
}

async function fetchArcGisGeoJson(source, countryCodes = []) {
  const whereClause = buildCountryWhereClause(source.countryField, countryCodes);
  const pageSize = 1000;
  const features = [];
  let offset = 0;
  let safetyCounter = 0;

  while (safetyCounter < 25) {
    safetyCounter += 1;
    const page = await fetchGeoJsonPage(source, whereClause, offset, pageSize);
    const pageFeatures = Array.isArray(page.features) ? page.features : [];
    features.push(...pageFeatures);

    const exceedsLimit = Boolean(page.exceededTransferLimit);
    if (!exceedsLimit && pageFeatures.length < pageSize) {
      break;
    }
    if (!pageFeatures.length) {
      break;
    }
    offset += pageSize;
  }

  return {
    type: "FeatureCollection",
    features
  };
}

export function getBoundarySource(level = "admin1") {
  const source = POLIO_BOUNDARY_SOURCES[level];
  if (!source) {
    throw new Error(`Unsupported boundary level: ${level}`);
  }
  return source;
}

export async function getPolioBoundaryGeoJson(level = "admin1", countryCodes = []) {
  const source = getBoundarySource(level);
  const codes = sanitizeCountryCodes(countryCodes);
  const cacheKey = `${level}|${codes.join(",") || "ALL"}`;

  if (!boundaryCache.has(cacheKey)) {
    const pending = fetchArcGisGeoJson(source, codes).catch((error) => {
      boundaryCache.delete(cacheKey);
      throw error;
    });
    boundaryCache.set(cacheKey, pending);
  }

  return boundaryCache.get(cacheKey);
}

