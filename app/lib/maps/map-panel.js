import { joinBoundariesWithAdmins } from "./geo-join.js";
import { getPolioBoundaryGeoJson } from "./polio-boundaries.js";

const mapRegistry = new Map();
const mapRequestTokens = new Map();

function getLeaflet() {
  return typeof window !== "undefined" ? window.L : null;
}

function setStatus(mapId, message = "", isError = false) {
  const statusNode = document.querySelector(`[data-map-status="${mapId}"]`);
  if (!statusNode) return;
  statusNode.textContent = message;
  statusNode.classList.toggle("error", Boolean(isError));
  statusNode.classList.toggle("hidden", !message);
}

function riskToColor(riskScore) {
  if (typeof riskScore !== "number") return "rgba(50, 93, 121, 0.38)";
  if (riskScore >= 85) return "#F26627";
  if (riskScore >= 75) return "#F9A26C";
  if (riskScore >= 65) return "#9BD7D1";
  return "#325D79";
}

function formatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "0";
  return numeric.toLocaleString("en-US");
}

function normalizeName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function isPriorityFeature(feature, priorityAdminSet) {
  if (!priorityAdminSet || !priorityAdminSet.size) return false;
  const properties = feature.properties || {};
  const names = [properties.__matchedName, properties.__displayName];
  return names.some((name) => priorityAdminSet.has(normalizeName(name)));
}

function baseFeatureStyle(feature, selectedAdminUnitId, priorityAdminSet) {
  const properties = feature.properties || {};
  const risk = properties.__matchedRiskScore;
  const isSelected = selectedAdminUnitId && properties.__matchedAdminId && properties.__matchedAdminId === selectedAdminUnitId;
  const isPriority = isPriorityFeature(feature, priorityAdminSet);
  const hasPriorityFocus = Boolean(priorityAdminSet && priorityAdminSet.size);
  return {
    color: isSelected ? "#EFEEEE" : isPriority ? "#F9A26C" : "#325D79",
    weight: isSelected ? 2.4 : isPriority ? 1.9 : 1.1,
    fillColor: riskToColor(risk),
    fillOpacity: isSelected ? 0.78 : isPriority ? 0.75 : hasPriorityFocus ? 0.4 : 0.62
  };
}

function buildTooltip(feature, priorityAdminSet) {
  const props = feature.properties || {};
  const display = props.__matchedName || props.__displayName || "Unknown geography";
  const level = props.__adminLevelLabel || "Admin";
  const country = props.__matchedCountryId || props.__countryCode || "N/A";
  const risk = typeof props.__matchedRiskScore === "number" ? props.__matchedRiskScore : "N/A";
  const coverage = typeof props.__matchedCoverage === "number" ? `${Math.round(props.__matchedCoverage * 100)}%` : "N/A";
  const actorCount = typeof props.__matchedActorCount === "number" ? props.__matchedActorCount : null;
  const who = props.__matchedWho || "";
  const what = props.__matchedWhat || "";
  const flags = Array.isArray(props.__matchedFlags) && props.__matchedFlags.length ? props.__matchedFlags.join(", ") : "None";
  const isPriority = isPriorityFeature(feature, priorityAdminSet);

  const rows = [
    `<div class="map-tooltip-title">${display}</div>`,
    `<div class="map-tooltip-row"><span class="map-tooltip-key">Where</span><span class="map-tooltip-value">${level} | ${country}</span></div>`,
    `<div class="map-tooltip-row"><span class="map-tooltip-key">Risk Signal</span><span class="map-tooltip-value">${risk}</span></div>`,
    `<div class="map-tooltip-row"><span class="map-tooltip-key">Coverage</span><span class="map-tooltip-value">${coverage}</span></div>`,
    actorCount !== null ? `<div class="map-tooltip-row"><span class="map-tooltip-key">Who Count</span><span class="map-tooltip-value">${actorCount}</span></div>` : "",
    who ? `<div class="map-tooltip-row"><span class="map-tooltip-key">Who</span><span class="map-tooltip-value">${who}</span></div>` : "",
    what ? `<div class="map-tooltip-row"><span class="map-tooltip-key">What</span><span class="map-tooltip-value">${what}</span></div>` : "",
    `<div class="map-tooltip-row"><span class="map-tooltip-key">Flags</span><span class="map-tooltip-value">${flags}</span></div>`,
    `<div class="map-tooltip-row"><span class="map-tooltip-key">Priority</span><span class="map-tooltip-value">${isPriority ? "Yes" : "No"}</span></div>`
  ].filter(Boolean);

  return rows.join("");
}

function overlayRadius(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return 3;
  if (numeric >= 500000) return 12;
  if (numeric >= 250000) return 10;
  if (numeric >= 100000) return 8;
  if (numeric >= 50000) return 6.5;
  return 5;
}

function buildOverlayTooltip(row) {
  const location = [row.admin2Name, row.admin1Name, row.countryName || row.countryId].filter(Boolean).join(", ");
  return `
    <div class="map-tooltip-title">${location || "Displacement point"}</div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">IDPs</span><span class="map-tooltip-value">${formatNumber(row.idps)}</span></div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">Returnees</span><span class="map-tooltip-value">${formatNumber(row.returnees)}</span></div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">Refugees</span><span class="map-tooltip-value">${formatNumber(row.refugees)}</span></div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">Asylum</span><span class="map-tooltip-value">${formatNumber(row.asylumSeekers)}</span></div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">Snapshot</span><span class="map-tooltip-value">${row.snapshotDate ? String(row.snapshotDate).slice(0, 10) : "N/A"}</span></div>
    <div class="map-tooltip-row"><span class="map-tooltip-key">UNHCR year</span><span class="map-tooltip-value">${row.unhcrYear || "N/A"}</span></div>
  `;
}

function addDisplacementOverlays(L, map, pointOverlays = [], onFeatureSelect) {
  const rows = Array.isArray(pointOverlays) ? pointOverlays : [];
  if (!rows.length) return null;

  const overlays = L.layerGroup();
  rows.forEach((row) => {
    const lat = Number(row.latitude);
    const lon = Number(row.longitude);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;

    const idpValue = Number(row.idps || 0);
    const returneeValue = Number(row.returnees || 0);
    const totalValue = Number(row.totalDisplaced || idpValue + returneeValue);

    if (idpValue > 0) {
      const idpMarker = L.circleMarker([lat, lon], {
        radius: overlayRadius(idpValue),
        color: "#F26627",
        weight: 1.4,
        fillColor: "#F26627",
        fillOpacity: 0.28
      });
      idpMarker.bindTooltip(buildOverlayTooltip(row), {
        sticky: true,
        className: "polio-map-tooltip"
      });
      idpMarker.on("click", () => {
        if (typeof onFeatureSelect === "function") {
          onFeatureSelect({
            adminId: "",
            countryId: row.countryId || "",
            feature: null
          });
        }
      });
      overlays.addLayer(idpMarker);
    }

    if (returneeValue > 0) {
      const returneeMarker = L.circleMarker([lat, lon], {
        radius: Math.max(3, overlayRadius(returneeValue) - 1.5),
        color: "#9BD7D1",
        weight: 1.5,
        fillColor: "#9BD7D1",
        fillOpacity: 0.22
      });
      returneeMarker.bindTooltip(buildOverlayTooltip(row), {
        sticky: true,
        className: "polio-map-tooltip"
      });
      returneeMarker.on("click", () => {
        if (typeof onFeatureSelect === "function") {
          onFeatureSelect({
            adminId: "",
            countryId: row.countryId || "",
            feature: null
          });
        }
      });
      overlays.addLayer(returneeMarker);
    }

    if (idpValue <= 0 && returneeValue <= 0 && totalValue > 0) {
      const fallbackMarker = L.circleMarker([lat, lon], {
        radius: overlayRadius(totalValue),
        color: "#F9A26C",
        weight: 1.2,
        fillColor: "#F9A26C",
        fillOpacity: 0.2
      });
      fallbackMarker.bindTooltip(buildOverlayTooltip(row), {
        sticky: true,
        className: "polio-map-tooltip"
      });
      overlays.addLayer(fallbackMarker);
    }
  });

  overlays.addTo(map);
  return overlays;
}

function createLegendControl(L, hasDisplacementOverlay = false) {
  const control = L.control({ position: "bottomright" });
  control.onAdd = function onAdd() {
    const div = L.DomUtil.create("div", "map-legend-control");
    div.innerHTML = `
      <div class="map-legend-title">Annex B Risk Signal</div>
      <div><span style="background:#F26627"></span>85+</div>
      <div><span style="background:#F9A26C"></span>75-84</div>
      <div><span style="background:#9BD7D1"></span>65-74</div>
      <div><span style="background:#325D79"></span><65</div>
      ${
        hasDisplacementOverlay
          ? `<div class="map-legend-title" style="margin-top:6px;">Displacement</div>
      <div><span style="background:#F26627"></span>IOM IDP points</div>
      <div><span style="background:#9BD7D1"></span>IOM Returnee points</div>`
          : ""
      }
    `;
    return div;
  };
  return control;
}

function cleanupMapRecord(record) {
  if (!record) return;
  try {
    record.map.remove();
  } catch (error) {
    // no-op cleanup
  }
}

export function resetPolioMaps() {
  for (const record of mapRegistry.values()) {
    cleanupMapRecord(record);
  }
  mapRegistry.clear();
}

export function resizePolioMap(mapId) {
  const record = mapRegistry.get(mapId);
  if (!record?.map) return;
  try {
    record.map.invalidateSize(true);
  } catch (error) {
    // no-op
  }
}

export async function renderPolioBoundaryMap(options = {}) {
  const {
    mapId,
    level = "admin1",
    countryCodes = [],
    appAdmins = [],
    pointOverlays = [],
    extraAttribution = "",
    priorityAdminNames = [],
    interactive = true,
    selectedAdminUnitId = "",
    onFeatureSelect
  } = options;

  if (!mapId) return;
  const container = document.getElementById(mapId);
  if (!container) return;

  const L = getLeaflet();
  if (!L) {
    setStatus(mapId, "Map library unavailable. Refresh and try again.", true);
    return;
  }

  setStatus(mapId, "Loading boundary layer...");

  const requestToken = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  mapRequestTokens.set(mapId, requestToken);

  try {
    const rawGeoJson = await getPolioBoundaryGeoJson(level, countryCodes);
    if (mapRequestTokens.get(mapId) !== requestToken) {
      return;
    }

    const joinedGeoJson = joinBoundariesWithAdmins(rawGeoJson, {
      level,
      appAdmins
    });
    const priorityAdminSet = new Set(priorityAdminNames.map((name) => normalizeName(name)).filter(Boolean));

    const map = L.map(container, {
      zoomControl: interactive,
      attributionControl: true,
      dragging: interactive,
      touchZoom: interactive,
      scrollWheelZoom: interactive,
      doubleClickZoom: interactive,
      boxZoom: interactive,
      keyboard: interactive
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    map.attributionControl.addAttribution("Boundary source: WHO/GPEI Polio Boundaries ArcGIS Hub");
    if (extraAttribution) {
      map.attributionControl.addAttribution(String(extraAttribution));
    }

    const layer = L.geoJSON(joinedGeoJson, {
      style: (feature) => baseFeatureStyle(feature, selectedAdminUnitId, priorityAdminSet),
      onEachFeature: (feature, featureLayer) => {
        featureLayer.bindTooltip(buildTooltip(feature, priorityAdminSet), {
          sticky: true,
          className: "polio-map-tooltip"
        });

        featureLayer.on("mouseover", () => {
          if (!interactive) return;
          featureLayer.setStyle({
            weight: 2.2,
            fillOpacity: 0.8
          });
        });

        featureLayer.on("mouseout", () => {
          if (!interactive) return;
          layer.resetStyle(featureLayer);
        });

        featureLayer.on("click", () => {
          if (!interactive) return;
          const props = feature.properties || {};
          const matchedAdminId = props.__matchedAdminId || "";
          featureLayer.setStyle({
            color: "#EFEEEE",
            weight: 2.6,
            fillOpacity: 0.82
          });

          const bounds = featureLayer.getBounds();
          if (bounds && bounds.isValid()) {
            map.fitBounds(bounds, { padding: [18, 18], maxZoom: 7 });
          }

          if (typeof onFeatureSelect === "function") {
            onFeatureSelect({
              adminId: matchedAdminId,
              countryId: props.__matchedCountryId || props.__countryCode || "",
              feature
            });
          }
        });
      }
    }).addTo(map);

    let targetBounds = layer.getBounds();
    if (priorityAdminSet.size) {
      const priorityLayers = [];
      layer.eachLayer((featureLayer) => {
        if (isPriorityFeature(featureLayer.feature, priorityAdminSet)) {
          priorityLayers.push(featureLayer);
        }
      });
      if (priorityLayers.length) {
        const priorityGroup = L.featureGroup(priorityLayers);
        const priorityBounds = priorityGroup.getBounds();
        if (priorityBounds && priorityBounds.isValid()) {
          targetBounds = priorityBounds;
        }
      }
    }

    if (targetBounds && targetBounds.isValid()) {
      map.fitBounds(targetBounds, { padding: [14, 14], maxZoom: 6 });
    }

    const displacementLayer = addDisplacementOverlays(L, map, pointOverlays, onFeatureSelect);

    const legend = createLegendControl(L, Boolean(displacementLayer));
    legend.addTo(map);

    mapRegistry.set(mapId, { map, layer, displacementLayer, legend });
    setStatus(mapId, "");
  } catch (error) {
    setStatus(mapId, "Boundary layer failed to load.", true);
  }
}
