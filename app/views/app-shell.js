import { renderPolioBoundaryMap, resetPolioMaps, resizePolioMap } from "../lib/maps/map-panel.js";
import { loadMigrationDisplacementData } from "../lib/data/migration-displacement.js";

const navItems = [
  { key: "overview", defaultLabel: "Main Dashboard" },
  { key: "countryReview", defaultLabel: "Country Diagnostics" },
  { key: "regional", defaultLabel: "Regional Annex" },
  { key: "ta", defaultLabel: "TA Packages" },
  { key: "implementationMe", defaultLabel: "Implementation and M&E" },
  { key: "humanitarianIntel", defaultLabel: "Humanitarian Intelligence" },
  { key: "framework", defaultLabel: "Workstream Framework" },
  { key: "solutions", defaultLabel: "Solutions Inventory" },
  { key: "settings", defaultLabel: "Settings" }
];

const sidebarGroups = [
  { subtitle: "", keys: ["overview"] },
  { subtitle: "Country-by-country Review", keys: ["countryReview", "regional", "ta"] },
  { subtitle: "Internal Tracker", keys: ["implementationMe"] },
  { subtitle: "Strategic Resources", keys: ["humanitarianIntel", "framework", "solutions"] }
];

const phaseLabels = {
  1: "Phase 1 (Month 1-3)",
  2: "Phase 2 (Month 4-6)",
  3: "Phase 3 (Month 7-9)"
};

const routeFilterKeys = {
  countryReview: ["country", "region", "dateRange", "epidemiologicProfile", "populationType", "challengeCategory"],
  regional: ["region", "country", "challengeCategory", "implementationPhase", "dateRange"],
  ta: ["country", "region", "approvalStatus", "interventionCycle", "partner", "implementationPhase"],
  implementationMe: ["country", "region", "implementationPhase", "partner", "dateRange"],
  humanitarianIntel: ["region", "country", "partner", "dateRange"],
  solutions: ["challengeCategory", "solutionCategory"]
};

const statusClasses = {
  high: "status-critical",
  critical: "status-critical",
  medium: "status-warning",
  pending: "status-warning",
  active: "status-good",
  approved: "status-good",
  open: "status-neutral",
  draft: "status-neutral",
  default: "status-neutral"
};

const uiPalettePresets = {
  candyLake: {
    accent: "#E82535",
    accent2: "#C92830",
    customBg: "#F1F3F5",
    bgPageEnd: "#E6EAEE",
    bgSidebar: "#DEE4E9",
    bgMain: "#F5F7F9",
    bgPanel: "#FFFFFF",
    bgSoft: "#EEF2F5",
    headingCountry: "#074767",
    headingRegional: "#143548",
    headingTa: "#565656",
    headingHumanitarian: "#C92830"
  },
  opsDefault: {
    accent: "#F26627",
    accent2: "#F9A26C",
    customBg: "#325D79",
    bgPageEnd: "#28485F",
    bgSidebar: "#294F68",
    bgMain: "#376886",
    bgPanel: "#3F7394",
    bgSoft: "#497B9C",
    headingCountry: "#9BD7D1",
    headingRegional: "#F9A26C",
    headingTa: "#EFEEEE",
    headingHumanitarian: "#F26627"
  },
  meadowGreen: {
    accent: "#D9ED92",
    accent2: "#B5D671",
    customBg: "#1F2A1A",
    bgPageEnd: "#172013",
    bgSidebar: "#23311D",
    bgMain: "#2A3B23",
    bgPanel: "#30472A",
    bgSoft: "#3B5533",
    headingCountry: "#D9ED92",
    headingRegional: "#9BD7D1",
    headingTa: "#FEFCE8",
    headingHumanitarian: "#F9A26C"
  },
  sageCoral: {
    accent: "#E84A5F",
    accent2: "#FF847C",
    customBg: "#2A363B",
    bgPageEnd: "#202A2F",
    bgSidebar: "#2F3D43",
    bgMain: "#35464D",
    bgPanel: "#3E535B",
    bgSoft: "#496169",
    headingCountry: "#99B898",
    headingRegional: "#FECEA8",
    headingTa: "#EFEEEE",
    headingHumanitarian: "#FF847C"
  },
  civicTeal: {
    accent: "#2D8C87",
    accent2: "#68B6B1",
    customBg: "#2C3E50",
    bgPageEnd: "#243543",
    bgSidebar: "#30475A",
    bgMain: "#38546A",
    bgPanel: "#41627B",
    bgSoft: "#4A718D",
    headingCountry: "#9BD7D1",
    headingRegional: "#F9A26C",
    headingTa: "#EFEEEE",
    headingHumanitarian: "#68B6B1"
  }
};

const uiFontPresets = {
  montserratBaskerville: {
    sans: '"Libre Baskerville", "Georgia", "Times New Roman", serif',
    display: '"Montserrat", "Aptos", "Segoe UI", "Helvetica Neue", Arial, sans-serif'
  },
  modernSans: {
    sans: '"Manrope", "Aptos", "Segoe UI Variable", "Segoe UI", "Helvetica Neue", Arial, sans-serif',
    display: '"Sora", "Manrope", "Aptos", "Segoe UI Variable", "Segoe UI", sans-serif'
  },
  abadi: {
    sans: '"Abadi MT Condensed", "Abadi", "Aptos", "Segoe UI", Arial, sans-serif',
    display: '"Abadi MT Condensed", "Abadi", "Aptos", "Segoe UI", Arial, sans-serif'
  },
  publicSerif: {
    sans: '"Source Serif 4", "Georgia", "Times New Roman", serif',
    display: '"Source Serif 4", "Georgia", "Times New Roman", serif'
  },
  humanist: {
    sans: '"Trebuchet MS", "Gill Sans", "Segoe UI", Arial, sans-serif',
    display: '"Trebuchet MS", "Gill Sans", "Segoe UI", Arial, sans-serif'
  }
};

const universalStylePresets = {
  candyLake: {
    label: "Candy Lake (Preset)",
    theme: "light",
    colorPalette: "candyLake",
    fontFamily: "montserratBaskerville",
    cardStyle: "outlined",
    buttonStyle: "square",
    density: "comfortable",
    sidebarStyle: "minimal",
    tableStyle: "clean",
    borderRadius: "medium"
  },
  opsDefault: {
    label: "Ops Default (Preset)",
    theme: "dark",
    colorPalette: "opsDefault",
    fontFamily: "modernSans",
    cardStyle: "elevated",
    buttonStyle: "rounded",
    density: "comfortable",
    sidebarStyle: "filled",
    tableStyle: "bordered",
    borderRadius: "medium"
  },
  meadowGreen: {
    label: "Meadow Green (Preset)",
    theme: "dark",
    colorPalette: "meadowGreen",
    fontFamily: "humanist",
    cardStyle: "elevated",
    buttonStyle: "rounded",
    density: "comfortable",
    sidebarStyle: "filled",
    tableStyle: "clean",
    borderRadius: "medium"
  },
  sageCoral: {
    label: "Sage Coral (Preset)",
    theme: "dark",
    colorPalette: "sageCoral",
    fontFamily: "abadi",
    cardStyle: "elevated",
    buttonStyle: "rounded",
    density: "comfortable",
    sidebarStyle: "filled",
    tableStyle: "clean",
    borderRadius: "medium"
  },
  civicTeal: {
    label: "Civic Teal (Preset)",
    theme: "dark",
    colorPalette: "civicTeal",
    fontFamily: "modernSans",
    cardStyle: "elevated",
    buttonStyle: "rounded",
    density: "comfortable",
    sidebarStyle: "filled",
    tableStyle: "clean",
    borderRadius: "medium"
  }
};

const overviewRegionDefinitions = [
  {
    regionName: "Horn of Africa",
    mapId: "map-overview-horn",
    subtitle: "GPEI Annex-style operational geography view"
  },
  {
    regionName: "Lake Chad Basin",
    mapId: "map-overview-lake-chad",
    subtitle: "GPEI Annex-style operational geography view"
  },
  {
    regionName: "DRC",
    mapId: "map-overview-drc",
    subtitle: "Annex B focus: Haut-Katanga, Haut-Lomami, Tanganyika, Tshopo, Kinshasa",
    priorityAdminNames: ["Haut-Katanga", "Haut-Lomami", "Tanganyika", "Tshopo", "Kinshasa"]
  }
];

const overviewRegionCountryFallbacks = {
  "Horn of Africa": ["ETH", "SOM", "DJI", "SDN", "YEM"],
  "Lake Chad Basin": ["NGA", "TCD", "NER"],
  DRC: ["COD"]
};

const humanitarianRegionDefinitions = [
  { regionName: "Horn of Africa", displayName: "Horn of Africa", mapId: "map-humanitarian-horn" },
  { regionName: "Lake Chad Basin", displayName: "Lake Chad Basin", mapId: "map-humanitarian-lake-chad" },
  { regionName: "DRC", displayName: "Congo (DRC)", mapId: "map-humanitarian-drc" }
];

const overviewKpiDefinitions = [
  { key: "priorityCountries", label: "Priority Countries", format: (value) => value },
  { key: "currentCountryInView", label: "Country in Current View", format: (value) => value || "-" },
  { key: "highRiskProvinces", label: "High-Risk Provinces", format: (value) => value },
  { key: "diagnosticPhaseCountries", label: "Countries in Phase 1", format: (value) => value },
  { key: "approvedTaPackages", label: "Approved TA Packages", format: (value) => value },
  { key: "activeImplementation", label: "Active Implementation", format: (value) => value },
  { key: "averageCycleDays", label: "Avg TA Cycle (days)", format: (value) => value },
  { key: "solutionsInventory", label: "Solutions Inventory", format: (value) => value },
  { key: "highRiskClusters", label: "High-Risk Clusters", format: (value) => value }
];

const headerIconSvgs = {
  dashboard:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="2.5" width="4.5" height="4.5"></rect><rect x="9" y="2.5" width="4.5" height="3"></rect><rect x="2.5" y="9" width="4.5" height="4.5"></rect><rect x="9" y="7.5" width="4.5" height="6"></rect></svg>',
  country:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14s4-3.6 4-7a4 4 0 1 0-8 0c0 3.4 4 7 4 7z"></path><circle cx="8" cy="7" r="1.5"></circle></svg>',
  regional:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="6"></circle><path d="M2.8 6.2h10.4M2.8 9.8h10.4M8 2v12M5.4 2.8c1.2 1.3 2 3.1 2 5.2s-.8 3.9-2 5.2M10.6 2.8c-1.2 1.3-2 3.1-2 5.2s.8 3.9 2 5.2"></path></svg>',
  ta: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="2.5" width="10" height="11"></rect><path d="M6 2.5h4M5.4 7.9l1.4 1.4 3.1-3.1M6.4 11h3.2"></path></svg>',
  implementation:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.7 4.2h6M6.7 8h6M6.7 11.8h6"></path><circle cx="4.2" cy="4.2" r="1"></circle><circle cx="4.2" cy="8" r="1"></circle><circle cx="4.2" cy="11.8" r="1"></circle></svg>',
  humanitarian:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="5.2" r="2"></circle><circle cx="10.5" cy="5.8" r="1.6"></circle><path d="M2.5 12.5c0-2.1 1.8-3.8 4-3.8s4 1.7 4 3.8M8.4 12.5c.2-1.4 1.4-2.4 2.8-2.4 1.3 0 2.3.8 2.5 2"></path></svg>',
  framework:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2l5.2 2.7L8 7.4 2.8 4.7 8 2zM2.8 7.6L8 10.4l5.2-2.8M2.8 10.3L8 13l5.2-2.7"></path></svg>',
  solutions:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.6a3.9 3.9 0 0 0-2.6 6.8c.6.5 1 1.2 1 2h3.2c0-.8.4-1.5 1-2A3.9 3.9 0 0 0 8 2.6zM6.6 13h2.8M6.9 14.5h2.2"></path></svg>',
  settings:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="2.2"></circle><path d="M8 2.2v1.5M8 12.3v1.5M2.2 8h1.5M12.3 8h1.5M3.9 3.9l1.1 1.1M11 11l1.1 1.1M12.1 3.9L11 5M5 11l-1.1 1.1"></path></svg>',
  updates:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="8" cy="3.4" rx="4.8" ry="1.9"></ellipse><path d="M3.2 3.4v6.2c0 1 2.2 1.9 4.8 1.9s4.8-.9 4.8-1.9V3.4M3.2 6.5c0 1 2.2 1.9 4.8 1.9s4.8-.9 4.8-1.9"></path></svg>',
  tracker:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8h2.6l1.3-2.3 2.1 4.5 1.4-2.2h3.6"></path><path d="M2.5 13.2h11"></path></svg>',
  resources:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="3" width="11" height="9.5" rx="1.5"></rect><path d="M6.2 6.2h3.6M6.2 8.5h3.6M6.2 10.8h2.3"></path></svg>',
  default:
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="5"></circle></svg>'
};

const iso3ToIso2Flags = {
  ETH: "ET",
  SOM: "SO",
  DJI: "DJ",
  SDN: "SD",
  YEM: "YE",
  NGA: "NG",
  TCD: "TD",
  NER: "NE",
  COD: "CD",
  CMR: "CM",
  CAF: "CF",
  AFG: "AF"
};

function safe(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function countryFlagEmoji(countryId) {
  const iso3 = String(countryId || "")
    .trim()
    .toUpperCase();
  const iso2 = iso3ToIso2Flags[iso3];
  if (!iso2 || iso2.length !== 2) return "🌐";
  return iso2
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function countryIso2(countryId) {
  const iso3 = String(countryId || "")
    .trim()
    .toUpperCase();
  return iso3ToIso2Flags[iso3] || "";
}

function renderCountryFlagVisual(countryId, countryMap = {}, options = {}) {
  const iso2 = countryIso2(countryId);
  const iso3 = String(countryId || "")
    .trim()
    .toUpperCase();
  const name = countryMap[countryId]?.name || iso3 || "Country";
  const shortCode = iso2 || iso3 || "--";
  const emoji = countryFlagEmoji(countryId);
  const size = options.size || "small";
  const iconHtml = iso2
    ? `<span class="flag-icon ${size}" role="img" aria-label="${safe(name)} flag"><img src="https://flagcdn.com/24x18/${safe(iso2.toLowerCase())}.png" alt="${safe(name)} flag" loading="lazy" decoding="async"></span>`
    : `<span class="flag-fallback ${size}" aria-hidden="true">${safe(emoji)}</span>`;
  return `<span class="country-flag-chip" title="${safe(name)}">${iconHtml}<span class="country-flag-text">${safe(name)}</span><small class="country-flag-code">${safe(shortCode)}</small></span>`;
}

function renderCountryFlagList(countryIds = [], countryMap = {}) {
  const uniqueIds = [...new Set((countryIds || []).filter(Boolean))];
  if (!uniqueIds.length) return "<span class=\"empty-state\">No countries in selected bloc.</span>";
  return `<div class="country-flag-list">${uniqueIds.map((countryId) => renderCountryFlagVisual(countryId, countryMap)).join("")}</div>`;
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getByPath(source, path) {
  if (!source || typeof path !== "string" || !path.trim()) return undefined;
  return path.split(".").reduce((value, segment) => (value == null ? undefined : value[segment]), source);
}

function setByPath(target, path, value) {
  if (!isPlainObject(target) || typeof path !== "string" || !path.trim()) return;
  const segments = path.split(".").filter(Boolean);
  if (!segments.length) return;
  let cursor = target;
  for (let i = 0; i < segments.length - 1; i += 1) {
    const segment = segments[i];
    if (!isPlainObject(cursor[segment])) cursor[segment] = {};
    cursor = cursor[segment];
  }
  cursor[segments[segments.length - 1]] = value;
}

function getAppConfig(state) {
  return state?.ui?.appConfig || {};
}

function getConfigLabel(state, path, fallback) {
  const value = getByPath(getAppConfig(state), path);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getConfigBoolean(state, path, fallback = true) {
  const value = getByPath(getAppConfig(state), path);
  return typeof value === "boolean" ? value : fallback;
}

function getNavLabel(state, item) {
  return getConfigLabel(state, `navigationLabels.${item.key}`, item.defaultLabel);
}

function formatConfigPathLabel(path) {
  return String(path || "")
    .split(".")
    .slice(-1)[0]
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/^\w/, (match) => match.toUpperCase());
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function avg(values) {
  if (!values.length) return 0;
  return sum(values) / values.length;
}

function formatNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "0";
  return numeric.toLocaleString("en-US");
}

function formatSigned(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "0";
  const sign = numeric > 0 ? "+" : "";
  return `${sign}${numeric.toLocaleString("en-US")}`;
}

function normalizeDateValue(value) {
  if (!value) return null;
  if (value instanceof Date && Number.isFinite(value.getTime())) return value;
  const raw = String(value).trim();
  if (!raw) return null;
  const parsed = new Date(raw);
  if (!Number.isFinite(parsed.getTime())) return null;
  return parsed;
}

function maxDateValue(values = []) {
  let maxDate = null;
  values.forEach((value) => {
    const parsed = normalizeDateValue(value);
    if (!parsed) return;
    if (!maxDate || parsed.getTime() > maxDate.getTime()) {
      maxDate = parsed;
    }
  });
  return maxDate;
}

function formatSourceUpdated(value) {
  if (!value) return "N/A";
  const parsed = normalizeDateValue(value);
  if (!parsed) return String(value);
  return `${parsed.toISOString().slice(0, 19).replace("T", " ")} UTC`;
}

function getRouteSourceRows(state, vm) {
  const route = normalizeFilterRoute(state.route);
  const coreRefresh = state?.data?.metadata?.lastRefreshUtc || null;
  const tracker = getMigrationTrackerState(state);
  const overviewRows = [
    { name: "Core app data model (mock + persisted edits)", updated: coreRefresh },
    { name: "WHO/GPEI Polio Boundaries ArcGIS layers", updated: coreRefresh, note: "Boundary service update timestamps are not exposed in-app." },
    { name: "Migration/Displacement tracker cache", updated: tracker?.fetchedAtUtc || coreRefresh }
  ];

  if (route === "overview") return overviewRows;

  if (route === "countryReview") {
    return [
      { name: "Country Diagnostic form record", updated: vm?.selectedDiagnostic?.lastUpdatedUtc || coreRefresh },
      { name: "Subnational boundary overlays (WHO/GPEI)", updated: coreRefresh },
      { name: "Reference workflow dataset", updated: coreRefresh }
    ];
  }

  if (route === "regional") {
    return [
      { name: "Regional Annex record", updated: vm?.selectedAnnex?.lastUpdatedUtc || coreRefresh },
      { name: "Annex B reference package (GPEI)", updated: "2025-10-13" },
      { name: "Regional recommendation matrix", updated: vm?.selectedAnnex?.lastUpdatedUtc || coreRefresh }
    ];
  }

  if (route === "ta") {
    const ta = vm?.selectedTaPackage;
    const approvalUpdates = (state.data.approvals || []).filter((row) => row.taPackageId === ta?.id).map((row) => row.updatedUtc);
    const planUpdates = (state.data.taImplementationPlan || []).filter((row) => row.taPackageId === ta?.id).map((row) => row.lastUpdatedUtc);
    const taLastUpdated = maxDateValue([ta?.lastUpdatedUtc, ...approvalUpdates, ...planUpdates, coreRefresh]);
    return [
      { name: "TA Packet record", updated: taLastUpdated || coreRefresh },
      { name: "TA approval checklist statuses", updated: maxDateValue(approvalUpdates) || coreRefresh },
      { name: "TA implementation plan rows", updated: maxDateValue(planUpdates) || coreRefresh }
    ];
  }

  if (route === "implementationMe") {
    const auditLast = maxDateValue((state.data.auditEdits || []).map((item) => item.timestamp));
    const activityLast = maxDateValue((state.data.activityFeed || []).map((item) => item.date));
    return [
      { name: "Workflow tracker dataset", updated: coreRefresh },
      { name: "Audit trail records", updated: auditLast || coreRefresh },
      { name: "Activity feed records", updated: activityLast || coreRefresh }
    ];
  }

  if (route === "humanitarianIntel") {
    const humanitarianAsOf = maxDateValue((state.data.humanitarianPresence || []).map((row) => row.asOfDate));
    return [
      { name: "Humanitarian actor footprint matrix (WWW)", updated: humanitarianAsOf || coreRefresh },
      { name: "IOM DTM displacement overlays", updated: tracker?.fetchedAtUtc || coreRefresh },
      { name: "UNHCR displacement context", updated: tracker?.fetchedAtUtc || coreRefresh }
    ];
  }

  if (route === "solutions") {
    return [
      { name: "Selected Solutions workbook extract", updated: state.data.solutionSummary?.asOfDate || coreRefresh },
      { name: "Solutions inventory table", updated: state.data.solutionSummary?.asOfDate || coreRefresh }
    ];
  }

  if (route === "framework") {
    return [
      { name: "Strategic Innovations Workstream slide reference", updated: "2026-02-26" },
      { name: "Framework narrative block in app", updated: coreRefresh }
    ];
  }

  return [{ name: "Core app data model", updated: coreRefresh }];
}

function renderSourceUpdatesPanel(state, vm) {
  const rows = getRouteSourceRows(state, vm).filter((row) => row && row.name);
  if (!rows.length) return "";
  return `
    <section class="panel source-update-panel">
      <div class="panel-header">
        <h2>Data Source Updates</h2>
        <span class="panel-subtitle">Last updated dates for data sources in this view</span>
      </div>
      <div class="source-update-list">
        ${rows
          .map(
            (row) => `
          <article class="source-update-row">
            <div class="source-update-name">${safe(row.name)}</div>
            <div class="source-update-date">${safe(formatSourceUpdated(row.updated))}</div>
            ${row.note ? `<div class="source-update-note">${safe(row.note)}</div>` : ""}
          </article>
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function pickStatusClass(value) {
  const key = String(value || "").toLowerCase();
  return statusClasses[key] || statusClasses.default;
}

function isAnnexBHighRiskAdmin(admin) {
  if (!admin || typeof admin !== "object") return false;
  if (String(admin.riskTier || "").toLowerCase() === "high") return true;
  if (Number(admin.riskScore || 0) >= 80) return true;
  return Boolean(admin.silentDistrict || admin.mobilityCorridor || admin.crossBorderZone);
}

function getDiagnosticMapFocus(state) {
  return state?.diagnosticMapFocus === "highRisk" ? "highRisk" : "all";
}

function getDiagnosticMapAdmins(state, vm) {
  const admins = Array.isArray(vm?.currentCountryAdmins) ? vm.currentCountryAdmins : [];
  if (getDiagnosticMapFocus(state) !== "highRisk") return admins;
  const filtered = admins.filter(isAnnexBHighRiskAdmin);
  return filtered.length ? filtered : admins;
}

function sanitizeColor(value, fallback) {
  const normalized = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(normalized) ? normalized.toUpperCase() : fallback;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex) {
  const color = sanitizeColor(hex, "");
  if (!color) return null;
  return {
    r: Number.parseInt(color.slice(1, 3), 16),
    g: Number.parseInt(color.slice(3, 5), 16),
    b: Number.parseInt(color.slice(5, 7), 16)
  };
}

function rgbToHex(rgb) {
  if (!rgb) return "#000000";
  const toPart = (value) => clamp(Math.round(value), 0, 255).toString(16).padStart(2, "0");
  return `#${toPart(rgb.r)}${toPart(rgb.g)}${toPart(rgb.b)}`.toUpperCase();
}

function mixColors(baseHex, mixHex, weight = 0.5) {
  const base = hexToRgb(baseHex);
  const mix = hexToRgb(mixHex);
  if (!base && !mix) return "#000000";
  if (!base) return rgbToHex(mix);
  if (!mix) return rgbToHex(base);
  const t = clamp(Number(weight) || 0, 0, 1);
  return rgbToHex({
    r: base.r + (mix.r - base.r) * t,
    g: base.g + (mix.g - base.g) * t,
    b: base.b + (mix.b - base.b) * t
  });
}

function relativeLuminance(hexColor) {
  const rgb = hexToRgb(hexColor);
  if (!rgb) return 0;
  const toLinear = (channel) => {
    const value = channel / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  };
  const r = toLinear(rgb.r);
  const g = toLinear(rgb.g);
  const b = toLinear(rgb.b);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(foreground, background) {
  const fg = relativeLuminance(foreground);
  const bg = relativeLuminance(background);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function pickReadableText(background, options = {}) {
  const light = sanitizeColor(options.light || "#F7FAFD", "#F7FAFD");
  const dark = sanitizeColor(options.dark || "#132433", "#132433");
  const minContrast = Number(options.minContrast || 4.5);
  const lightContrast = contrastRatio(light, background);
  const darkContrast = contrastRatio(dark, background);
  if (lightContrast >= minContrast || darkContrast >= minContrast) {
    return lightContrast >= darkContrast ? light : dark;
  }
  return lightContrast >= darkContrast ? light : dark;
}

function ensureReadableColor(color, background, minimumContrast = 3.2, fallback = "#132433") {
  const safeColor = sanitizeColor(color, fallback);
  if (contrastRatio(safeColor, background) >= minimumContrast) return safeColor;
  const safeFallback = sanitizeColor(fallback, "#132433");
  if (contrastRatio(safeFallback, background) >= minimumContrast) return safeFallback;
  return pickReadableText(background, { dark: safeFallback, minContrast: minimumContrast });
}

function buildAdaptiveThemeTokens({ theme, paletteKey, palette, accent, accent2, customBackground }) {
  const isCustom = paletteKey === "custom";
  const fallbackPalette = uiPalettePresets.opsDefault;
  const sourcePalette = palette || fallbackPalette;
  const normalizedAccent = sanitizeColor(accent, fallbackPalette.accent);
  const normalizedAccent2 = sanitizeColor(accent2, fallbackPalette.accent2);

  let surfaces;
  if (isCustom) {
    const base = sanitizeColor(customBackground, theme === "light" ? "#F1F3F5" : "#2C3E50");
    const darkMode = theme === "dark";
    surfaces = darkMode
      ? {
          customBg: mixColors(base, "#0B141D", 0.12),
          bgPageEnd: mixColors(base, "#0B141D", 0.24),
          bgSidebar: mixColors(base, "#101A26", 0.12),
          bgMain: mixColors(base, "#FFFFFF", 0.06),
          bgPanel: mixColors(base, "#FFFFFF", 0.13),
          bgSoft: mixColors(base, "#FFFFFF", 0.2)
        }
      : {
          customBg: mixColors(base, "#FFFFFF", 0.08),
          bgPageEnd: mixColors(base, "#DCE5ED", 0.24),
          bgSidebar: mixColors(base, "#FFFFFF", 0.2),
          bgMain: mixColors(base, "#FFFFFF", 0.32),
          bgPanel: mixColors(base, "#FFFFFF", 0.9),
          bgSoft: mixColors(base, "#FFFFFF", 0.76)
        };
  } else {
    surfaces = {
      customBg: sanitizeColor(sourcePalette.customBg, fallbackPalette.customBg),
      bgPageEnd: sanitizeColor(sourcePalette.bgPageEnd, fallbackPalette.bgPageEnd),
      bgSidebar: sanitizeColor(sourcePalette.bgSidebar, fallbackPalette.bgSidebar),
      bgMain: sanitizeColor(sourcePalette.bgMain, fallbackPalette.bgMain),
      bgPanel: sanitizeColor(sourcePalette.bgPanel, fallbackPalette.bgPanel),
      bgSoft: sanitizeColor(sourcePalette.bgSoft, fallbackPalette.bgSoft)
    };
  }

  const panelBackground = surfaces.bgPanel;
  const mainBackground = surfaces.bgMain;
  const darkSurface = relativeLuminance(panelBackground) < 0.42;
  const text = pickReadableText(panelBackground, { minContrast: 5 });
  const muted = mixColors(text, panelBackground, darkSurface ? 0.34 : 0.5);
  const line = mixColors(text, panelBackground, darkSurface ? 0.68 : 0.8);
  const lineStrong = mixColors(text, panelBackground, darkSurface ? 0.52 : 0.64);
  const textOnAccent = pickReadableText(normalizedAccent, { dark: "#132433", light: "#FFFFFF", minContrast: 4.5 });
  const textError = ensureReadableColor("#B3261E", panelBackground, 4, text);

  const headingCountry = ensureReadableColor(sourcePalette.headingCountry || normalizedAccent, mainBackground, 3.3, text);
  const headingRegional = ensureReadableColor(sourcePalette.headingRegional || normalizedAccent2, mainBackground, 3.3, text);
  const headingTa = ensureReadableColor(sourcePalette.headingTa || text, mainBackground, 3.3, text);
  const headingHumanitarian = ensureReadableColor(sourcePalette.headingHumanitarian || normalizedAccent, mainBackground, 3.3, text);
  const notepadYellow = darkSurface ? "#F6E8A6" : "#FFF5B7";
  const editablePaper = mixColors(panelBackground, notepadYellow, darkSurface ? 0.28 : 0.74);
  const editableBorder = mixColors("#B89836", editablePaper, darkSurface ? 0.42 : 0.62);
  const editableRule = mixColors("#C9AE52", editablePaper, darkSurface ? 0.56 : 0.78);
  const editableMargin = mixColors("#E0BC47", editablePaper, darkSurface ? 0.34 : 0.52);
  const editableFocus = ensureReadableColor("#A06B00", editablePaper, 3.2, text);

  return {
    ...surfaces,
    text,
    muted,
    line,
    lineStrong,
    textOnAccent,
    textError,
    headingCountry,
    headingRegional,
    headingTa,
    headingHumanitarian,
    panelOuter: mixColors(normalizedAccent, panelBackground, darkSurface ? 0.84 : 0.92),
    panelInner: mixColors(normalizedAccent2, panelBackground, darkSurface ? 0.84 : 0.9),
    panelCard: mixColors(normalizedAccent, panelBackground, darkSurface ? 0.76 : 0.86),
    good: ensureReadableColor("#2D8C87", panelBackground, 3.2, text),
    warn: ensureReadableColor(normalizedAccent2, panelBackground, 3.2, text),
    critical: ensureReadableColor(normalizedAccent, panelBackground, 3.2, text),
    neutral: ensureReadableColor(mixColors(text, panelBackground, darkSurface ? 0.42 : 0.6), panelBackground, 3.2, text),
    shadow: darkSurface ? "0 12px 28px rgba(0, 0, 0, 0.4)" : "0 12px 28px rgba(20, 53, 72, 0.14)",
    tableStripeHead: mixColors(text, panelBackground, darkSurface ? 0.84 : 0.92),
    tableStripeBody: mixColors(text, panelBackground, darkSurface ? 0.9 : 0.96),
    editablePaper,
    editableBorder,
    editableRule,
    editableMargin,
    editableFocus
  };
}

function applyUiSettings(settings) {
  const root = document.documentElement;
  const appRoot = document.querySelector("#app");
  const body = document.body;
  const theme = settings?.theme === "light" ? "light" : "dark";
  const requestedPaletteKey = String(settings?.colorPalette || "opsDefault");
  const presetPaletteExists = Object.prototype.hasOwnProperty.call(uiPalettePresets, requestedPaletteKey);
  const selectedPaletteKey = requestedPaletteKey === "custom" ? "custom" : presetPaletteExists ? requestedPaletteKey : "opsDefault";
  const selectedFontKey = Object.prototype.hasOwnProperty.call(uiFontPresets, settings?.fontFamily) ? settings.fontFamily : "modernSans";
  const palette = selectedPaletteKey === "custom" ? uiPalettePresets.candyLake : uiPalettePresets[selectedPaletteKey] || uiPalettePresets.opsDefault;
  const fontPreset = uiFontPresets[selectedFontKey] || uiFontPresets.modernSans;
  const customAccent = sanitizeColor(settings?.accentColor || settings?.primaryColor, "#E82535");
  const customBackground = sanitizeColor(settings?.backgroundColor, "#F1F3F5");
  const accentColor = selectedPaletteKey === "custom" ? customAccent : palette.accent;
  const accentColor2 =
    selectedPaletteKey === "custom"
      ? relativeLuminance(customAccent) < 0.45
        ? mixColors(customAccent, "#FFFFFF", 0.22)
        : mixColors(customAccent, "#0F1E2A", 0.18)
      : palette.accent2;
  const themeTokens = buildAdaptiveThemeTokens({
    theme,
    paletteKey: selectedPaletteKey,
    palette,
    accent: accentColor,
    accent2: accentColor2,
    customBackground
  });

  root.setAttribute("data-theme", theme);
  root.style.setProperty("--font-sans", fontPreset.sans);
  root.style.setProperty("--font-display", fontPreset.display);
  root.style.setProperty("--accent", accentColor);
  root.style.setProperty("--accent-2", accentColor2);
  root.style.setProperty("--bg", themeTokens.customBg);
  root.style.setProperty("--custom-bg", themeTokens.customBg);
  root.style.setProperty("--bg-page-end", themeTokens.bgPageEnd);
  root.style.setProperty("--bg-sidebar", themeTokens.bgSidebar);
  root.style.setProperty("--bg-main", themeTokens.bgMain);
  root.style.setProperty("--bg-panel", themeTokens.bgPanel);
  root.style.setProperty("--bg-soft", themeTokens.bgSoft);
  root.style.setProperty("--text", themeTokens.text);
  root.style.setProperty("--muted", themeTokens.muted);
  root.style.setProperty("--line", themeTokens.line);
  root.style.setProperty("--line-strong", themeTokens.lineStrong);
  root.style.setProperty("--text-on-accent", themeTokens.textOnAccent);
  root.style.setProperty("--text-error", themeTokens.textError);
  root.style.setProperty("--heading-country", themeTokens.headingCountry);
  root.style.setProperty("--heading-regional", themeTokens.headingRegional);
  root.style.setProperty("--heading-ta", themeTokens.headingTa);
  root.style.setProperty("--heading-humanitarian", themeTokens.headingHumanitarian);
  root.style.setProperty("--panel-outer", themeTokens.panelOuter);
  root.style.setProperty("--panel-inner", themeTokens.panelInner);
  root.style.setProperty("--panel-card", themeTokens.panelCard);
  root.style.setProperty("--good", themeTokens.good);
  root.style.setProperty("--warn", themeTokens.warn);
  root.style.setProperty("--critical", themeTokens.critical);
  root.style.setProperty("--neutral", themeTokens.neutral);
  root.style.setProperty("--shadow", themeTokens.shadow);
  root.style.setProperty("--table-stripe-head", themeTokens.tableStripeHead);
  root.style.setProperty("--table-stripe-body", themeTokens.tableStripeBody);
  root.style.setProperty("--editable-paper", themeTokens.editablePaper);
  root.style.setProperty("--editable-border", themeTokens.editableBorder);
  root.style.setProperty("--editable-rule", themeTokens.editableRule);
  root.style.setProperty("--editable-margin", themeTokens.editableMargin);
  root.style.setProperty("--editable-focus", themeTokens.editableFocus);

  const uiAttributes = [
    ["data-card-style", settings?.cardStyle || "elevated"],
    ["data-button-style", settings?.buttonStyle || "rounded"],
    ["data-density", settings?.density || "comfortable"],
    ["data-sidebar-style", settings?.sidebarStyle || "filled"],
    ["data-table-style", settings?.tableStyle || "bordered"],
    ["data-border-radius", settings?.borderRadius || "medium"]
  ];

  [body, appRoot].forEach((node) => {
    if (!node) return;
    uiAttributes.forEach(([key, value]) => node.setAttribute(key, value));
  });
}

function lineSpark(values) {
  if (!values.length) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * 180;
      const y = 40 - ((value - min) / range) * 36;
      return `${x},${y}`;
    })
    .join(" ");

  return `
    <svg class="sparkline" viewBox="0 0 180 44" preserveAspectRatio="none" aria-hidden="true">
      <polyline points="${points}"></polyline>
    </svg>
  `;
}

function barSeries(items) {
  const max = Math.max(1, ...items.map((item) => item.value));
  return `
    <div class="bar-series">
      ${items
        .map(
          (item) => `
          <div class="bar-row">
            <div class="bar-label">${item.label}</div>
            <div class="bar-track"><div class="bar-fill" style="width:${Math.round((item.value / max) * 100)}%"></div></div>
            <div class="bar-value">${item.value}</div>
          </div>
        `
        )
        .join("")}
    </div>
  `;
}

function renderInsightStrip(title, items) {
  const safeItems = (items || []).filter((item) => item && item.label);
  if (!safeItems.length) return "";
  return `
    <div class="insight-strip-panel">
      <div class="insight-strip-head">${title}</div>
      <div class="insight-strip">
        ${safeItems
          .map(
            (item) => `
          <article class="insight-item ${item.tone ? `tone-${item.tone}` : ""}">
            <div class="insight-label">${item.label}</div>
            <div class="insight-value">${item.value ?? "-"}</div>
          </article>
        `
          )
          .join("")}
      </div>
    </div>
  `;
}

function incrementCounter(map, key, increment = 1) {
  if (!key) return;
  map.set(key, (map.get(key) || 0) + increment);
}

function sortCountEntries(counterMap) {
  return [...counterMap.entries()].sort((a, b) => b[1] - a[1]);
}

function buildCategoricalVisualData(state, vm) {
  const countryIds = new Set(vm.countries.map((country) => country.id));
  const gaps = state.data.diagnosticOperationalGaps.filter((row) => countryIds.has(row.countryId));
  const gapById = new Map(gaps.map((row) => [row.id, row]));
  const solutionsById = new Map(state.data.solutions.map((row) => [row.id, row]));
  const taById = new Map(state.data.taPackages.filter((row) => countryIds.has(row.countryId)).map((row) => [row.id, row]));

  const proposedByCountry = state.data.diagnosticProposedSolutions.filter((row) => countryIds.has(row.countryId));
  const taSelected = state.data.taSelectedSolutions.filter((row) => taById.has(row.taPackageId));
  const regionalById = new Map(state.data.regionalAnnexes.map((row) => [row.id, row]));
  const regionalRecs = state.data.regionalRecommendedSolutions.filter((row) => countryIds.has(row.countryId));

  const challengeCounts = new Map();
  const solutionTypeCounts = new Map();
  const statusCounts = new Map();
  const challengeToSolution = new Map();
  const solutionToStatus = new Map();

  gaps.forEach((gap) => incrementCounter(challengeCounts, gap.challengeCategory));

  proposedByCountry.forEach((row) => {
    const gap = gapById.get(row.gapId);
    const solution = solutionsById.get(row.solutionId);
    if (!gap || !solution) return;
    incrementCounter(solutionTypeCounts, solution.solutionType);
    incrementCounter(challengeToSolution, `${gap.challengeCategory}|||${solution.solutionType}`);
  });

  taSelected.forEach((row) => {
    const packet = taById.get(row.taPackageId);
    const solution = solutionsById.get(row.solutionId);
    if (!packet || !solution) return;
    incrementCounter(statusCounts, packet.approvalStatus);
    incrementCounter(solutionToStatus, `${solution.solutionType}|||${packet.approvalStatus}`);
  });

  const portfolioByChallenge = new Map();
  proposedByCountry.forEach((row) => {
    const solution = solutionsById.get(row.solutionId);
    if (!solution) return;
    incrementCounter(portfolioByChallenge, solution.challengeCategory);
  });
  taSelected.forEach((row) => {
    const solution = solutionsById.get(row.solutionId);
    if (!solution) return;
    incrementCounter(portfolioByChallenge, solution.challengeCategory);
  });

  const regionNames = [...new Set(state.data.regionalAnnexes.map((row) => row.regionName))];
  const categoryNames = [...new Set(regionalRecs.map((row) => row.challengeCategory))];
  const matrix = regionNames.map((regionName) => {
    const regionalIds = state.data.regionalAnnexes.filter((row) => row.regionName === regionName).map((row) => row.id);
    const recs = regionalRecs.filter((row) => regionalIds.includes(row.regionalAnnexId));
    const counts = {};
    categoryNames.forEach((category) => {
      counts[category] = recs.filter((row) => row.challengeCategory === category).length;
    });
    const total = recs.length;
    return { regionName, counts, total };
  });
  const matrixMax = Math.max(1, ...matrix.flatMap((row) => categoryNames.map((category) => row.counts[category] || 0)));

  return {
    challengeNodes: sortCountEntries(challengeCounts),
    solutionNodes: sortCountEntries(solutionTypeCounts),
    statusNodes: sortCountEntries(statusCounts),
    challengeToSolution: sortCountEntries(challengeToSolution),
    solutionToStatus: sortCountEntries(solutionToStatus),
    portfolioByChallenge: sortCountEntries(portfolioByChallenge),
    matrixCategories: categoryNames,
    regionMatrix: matrix,
    regionMatrixMax: matrixMax
  };
}

function renderSankeyStylePanel(flow) {
  const nodeColumn = (title, items, cssClass) => `
    <article class="flow-node-col">
      <h4>${title}</h4>
      <div class="flow-node-list">
        ${items
          .map(
            ([label, value]) => `
            <div class="flow-node ${cssClass}">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `
          )
          .join("") || `<div class="empty-state">No data for current filters.</div>`}
      </div>
    </article>
  `;

  const linkRows = (title, items) => `
    <article class="subpanel flow-link-panel">
      <h4>${title}</h4>
      <div class="flow-link-list">
        ${items
          .slice(0, 10)
          .map(([key, value]) => {
            const [left, right] = String(key).split("|||");
            return `<div class="flow-link-row"><span>${left}</span><span class="flow-arrow">-></span><span>${right}</span><strong>${value}</strong></div>`;
          })
          .join("") || `<div class="empty-state">No flow links available.</div>`}
      </div>
    </article>
  `;

  return `
    <section class="panel">
      <div class="panel-header"><h3>Challenge -> Solution -> TA Status Flow</h3><span class="panel-subtitle">Sankey-style categorical progression</span></div>
      <div class="flow-three-col">
        ${nodeColumn("Challenges", flow.challengeNodes, "node-challenge")}
        ${nodeColumn("Solution Types", flow.solutionNodes, "node-solution")}
        ${nodeColumn("TA Status", flow.statusNodes, "node-status")}
      </div>
      <div class="two-col">
        ${linkRows("Challenge to Solution Type", flow.challengeToSolution)}
        ${linkRows("Solution Type to TA Approval Status", flow.solutionToStatus)}
      </div>
    </section>
  `;
}

function renderSolutionTreemapPanel(flow) {
  const max = Math.max(1, ...flow.portfolioByChallenge.map(([, count]) => count));
  const tilePalette = ["tile-mint", "tile-cream", "tile-coral", "tile-rose", "tile-charcoal"];
  return `
    <section class="panel">
      <div class="panel-header"><h3>Solution Portfolio Treemap</h3><span class="panel-subtitle">Grouped by challenge category and usage volume</span></div>
      <div class="treemap-grid">
        ${
          flow.portfolioByChallenge
            .map(([category, count], index) => {
              const span = Math.max(2, Math.min(6, Math.round((count / max) * 6)));
              const tileClass = tilePalette[index % tilePalette.length];
              return `
                <article class="treemap-tile ${tileClass}" style="grid-column: span ${span}">
                  <div class="treemap-category">${category}</div>
                  <div class="treemap-value">${count}</div>
                  <small>linked records</small>
                </article>
              `;
            })
            .join("") || `<p class="empty-state">No solution portfolio data for current filters.</p>`
        }
      </div>
    </section>
  `;
}

function renderRegionalMatrixPanel(flow) {
  const categories = flow.matrixCategories;
  return `
    <section class="panel">
      <div class="panel-header"><h3>Regional Annex Matrix</h3><span class="panel-subtitle">Region x recommended challenge categories</span></div>
      <div class="matrix-wrap">
        <table class="matrix-table regional-matrix-table">
          <thead>
            <tr>
              <th>Region</th>
              ${categories.map((category) => `<th>${category}</th>`).join("")}
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${
              flow.regionMatrix
                .map((row) => {
                  return `
                    <tr>
                      <td><strong>${row.regionName}</strong></td>
                      ${categories
                        .map((category) => {
                          const value = row.counts[category] || 0;
                          const intensity = Math.max(0, Math.min(1, value / flow.regionMatrixMax));
                          const alpha = (0.12 + intensity * 0.5).toFixed(2);
                          return `<td class="matrix-heat-cell" style="background: rgba(232, 74, 95, ${alpha});">${value}</td>`;
                        })
                        .join("")}
                      <td><strong>${row.total}</strong></td>
                    </tr>
                  `;
                })
                .join("") || `<tr><td colspan="${categories.length + 2}">No regional recommendation data for current filters.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function phaseRibbon(currentPhaseId) {
  return `
    <div class="phase-ribbon">
      ${Object.keys(phaseLabels)
        .map((key) => Number(key))
        .map((phaseId) => `<span class="phase-pill ${phaseId === currentPhaseId ? "active" : phaseId < currentPhaseId ? "complete" : ""}">${phaseLabels[phaseId]}</span>`)
        .join("")}
    </div>
  `;
}

function countryLookup(data) {
  const out = {};
  data.countries.forEach((country) => {
    out[country.id] = country;
  });
  return out;
}

function filterCountries(state) {
  const { filters, data } = state;
  return data.countries.filter((country) => {
    if (filters.country !== "all" && country.id !== filters.country) return false;
    if (filters.region !== "all" && country.region !== filters.region) return false;
    if (filters.epidemiologicProfile !== "all" && country.epiProfile !== filters.epidemiologicProfile) return false;
    if (filters.populationType !== "all" && country.populationType !== filters.populationType) return false;
    if (filters.implementationPhase !== "all" && phaseLabels[country.currentPhaseId] !== filters.implementationPhase) return false;
    return true;
  });
}

function isWithinRange(dateString, range) {
  if (range === "all") return true;
  const date = new Date(dateString);
  const now = new Date("2026-04-01T00:00:00Z");
  const days = Math.round((now - date) / 86400000);
  if (range === "last3m") return days <= 92;
  if (range === "last12m") return days <= 366;
  return days <= 184;
}

function buildViewModel(state) {
  const countries = filterCountries(state);
  const countryIds = new Set(countries.map((country) => country.id));
  const cMap = countryLookup(state.data);

  const diagnostics = state.data.diagnostics.filter((item) => countryIds.has(item.countryId));
  const taPackages = state.data.taPackages.filter((item) => {
    if (!countryIds.has(item.countryId)) return false;
    if (state.filters.approvalStatus !== "all" && item.approvalStatus !== state.filters.approvalStatus) return false;
    if (state.filters.interventionCycle !== "all" && item.interventionCycle !== state.filters.interventionCycle) return false;
    if (state.filters.partner !== "all") {
      const packetRoles = state.data.taRoles.filter((role) => role.taPackageId === item.id);
      if (!packetRoles.some((role) => role.stakeholder === state.filters.partner)) return false;
    }
    return true;
  });
  const taPackageIds = new Set(taPackages.map((item) => item.id));
  const implementationCycles = state.data.implementationCycles.filter((item) => taPackageIds.has(item.taPackageId));
  const monitoringIndicators = state.data.monitoringIndicators.filter((item) => countryIds.has(item.countryId));
  const risks = state.data.riskRegister.filter((item) => countryIds.has(item.countryId));
  const epiSeries = state.data.epiTimeSeries.filter((item) => countryIds.has(item.countryId) && isWithinRange(item.date, state.filters.dateRange));
  const activityFeed = state.data.activityFeed.filter((item) => countryIds.has(item.countryId)).slice(0, 8);

  const selectedCountry = countries.find((country) => country.id === state.selectedCountryId) || countries[0] || state.data.countries[0];
  const selectedDiagnostic = diagnostics.find((item) => item.id === state.selectedDiagnosticId) || diagnostics.find((item) => item.countryId === selectedCountry.id) || state.data.diagnostics[0];
  const selectedTaPackage = taPackages.find((item) => item.id === state.selectedTaPackageId) || taPackages.find((item) => item.countryId === selectedCountry.id) || state.data.taPackages[0];
  const selectedAnnex = state.data.regionalAnnexes.find((item) => item.id === state.selectedAnnexId) || state.data.regionalAnnexes.find((item) => item.countries.includes(selectedCountry.id)) || state.data.regionalAnnexes[0];
  const selectedSolution = state.data.solutions.find((item) => item.id === state.selectedSolutionId) || state.data.solutions[0];
  const currentCountryAdmins = state.data.subnational.filter((item) => item.countryId === selectedCountry.id);
  const highRiskProvinces = state.data.subnational.filter(
    (admin) => countryIds.has(admin.countryId) && (admin.riskTier === "High" || Number(admin.riskScore) >= 80)
  );
  const priorityCountries = countries.filter((country) => ["High", "Critical"].includes(String(country.priorityStatus || "")));

  const kpis = {
    priorityCountries: priorityCountries.length,
    currentCountryInView: selectedCountry?.name || "-",
    highRiskProvinces: highRiskProvinces.length,
    diagnosticPhaseCountries: countries.filter((country) => country.currentPhaseId === 1).length,
    approvedTaPackages: taPackages.filter((item) => item.approvalStatus === "Approved").length,
    activeImplementation: implementationCycles.filter((item) => item.status === "Active").length,
    averageCycleDays: Math.round(avg(taPackages.map((item) => (new Date(item.endDate) - new Date(item.startDate)) / 86400000))),
    solutionsInventory: state.data.solutions.length,
    highRiskClusters: sum(countries.map((country) => country.missedClusters))
  };

  const casesTrend = epiSeries.reduce((acc, row) => {
    acc[row.date] = (acc[row.date] || 0) + row.cases;
    return acc;
  }, {});

  const coverageTrend = epiSeries.reduce((acc, row) => {
    acc[row.date] = (acc[row.date] || 0) + row.coverage;
    return acc;
  }, {});

  const pipeline = Object.entries(
    countries.reduce((acc, country) => {
      const key = phaseLabels[country.currentPhaseId];
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {})
  ).map(([label, value]) => ({ label, value }));

  const challengeDistribution = Object.entries(
    state.data.diagnosticOperationalGaps
      .filter((item) => countryIds.has(item.countryId))
      .reduce((acc, item) => {
        acc[item.challengeCategory] = (acc[item.challengeCategory] || 0) + 1;
        return acc;
      }, {})
  ).map(([label, value]) => ({ label, value }));

  return {
    countries,
    cMap,
    diagnostics,
    taPackages,
    implementationCycles,
    monitoringIndicators,
    risks,
    activityFeed,
    selectedCountry,
    selectedDiagnostic,
    selectedTaPackage,
    selectedAnnex,
    selectedSolution,
    currentCountryAdmins,
    kpis,
    casesTrend,
    coverageTrend,
    pipeline,
    challengeDistribution
  };
}

function renderKpis(state, kpis) {
  const appConfig = getAppConfig(state);
  const configuredOrder = Array.isArray(appConfig?.layout?.overviewKpiOrder) ? appConfig.layout.overviewKpiOrder : [];
  const fallbackOrder = overviewKpiDefinitions.map((row) => row.key);
  const orderedKeys = [...new Set([...configuredOrder, ...fallbackOrder])];
  const keyToDefinition = Object.fromEntries(overviewKpiDefinitions.map((row) => [row.key, row]));

  const rows = orderedKeys
    .map((key) => keyToDefinition[key])
    .filter(Boolean)
    .filter((definition) => getConfigBoolean(state, `visibility.overviewKpis.${definition.key}`, true))
    .map((definition) => [definition.label, definition.format(kpis[definition.key])]);

  return `
    <div class="kpi-grid">
      ${rows.map(([label, value]) => `<article class="kpi-card"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div></article>`).join("")}
    </div>
  `;
}

function renderGeoPanel(title, admins, options = {}) {
  const subtitle = options.subtitle || "GPEI ADM1 boundary placeholder";
  const layers = options.layers || [];
  const mapId = options.mapId || `map-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const mapCountryCodes = options.mapCountryCodes || [...new Set(admins.map((admin) => admin.countryId))];
  const allowFullscreen = options.allowFullscreen !== false;
  const staticView = options.staticView === true;
  const panelNote = options.note ? `<p class="chart-foot map-footnote">${safe(options.note)}</p>` : "";
  const mapShellId = `${mapId}-shell`;
  const panelActions = options.panelActions || "";
  const fullscreenButton = allowFullscreen
    ? `<button data-action="map-fullscreen" data-map-shell="${mapShellId}" data-map-id="${mapId}">${
        staticView ? "Full Screen Static Map" : "Full Screen Map"
      }</button>`
    : "";
  if (!mapCountryCodes.length) {
    return `
      <section class="panel">
        <div class="panel-header"><h3>${title}</h3><span class="panel-subtitle">${subtitle}</span></div>
        <p class="empty-state">No mapped geographies available for current filters.</p>
      </section>
    `;
  }
  return `
    <section class="panel">
      <div class="panel-header">
        <h3>${title}</h3>
        <div class="panel-actions">${panelActions}${fullscreenButton}</div>
      </div>
      <span class="panel-subtitle">${subtitle}</span>
      ${layers.length ? `<div class="geo-legend">${layers.map((layer) => `<span>${layer}</span>`).join("")}</div>` : ""}
      <div id="${mapShellId}" class="geo-map-shell ${staticView ? "is-static-map" : ""}" data-map-shell="${mapShellId}">
        <div id="${mapId}" class="geo-map-canvas"></div>
        <div class="geo-map-status hidden" data-map-status="${mapId}" aria-live="polite"></div>
      </div>
      ${panelNote}
    </section>
  `;
}

function getOverviewRegionCountryCodes(state, regionName) {
  const fromData = state.data.countries.filter((country) => country.region === regionName).map((country) => country.id);
  if (fromData.length) return [...new Set(fromData)];
  const fallback = overviewRegionCountryFallbacks[regionName] || [];
  return [...new Set(fallback)];
}

function buildHumanitarianSpecFromCountryCodes(state, countryCodes, mapId, displayName, regionName = "") {
  const scopedCountryCodes = [...new Set((countryCodes || []).map((code) => String(code || "").trim().toUpperCase()).filter(Boolean))];
  const regionalAdmins = state.data.subnational.filter((admin) => scopedCountryCodes.includes(admin.countryId));
  const presenceRows = (state.data.humanitarianPresence || []).filter(
    (row) => Number(row.year) === 2026 && scopedCountryCodes.includes(row.countryId)
  );

  const byAdmin = new Map();
  presenceRows.forEach((row) => {
    if (!byAdmin.has(row.adminUnitId)) {
      byAdmin.set(row.adminUnitId, {
        actors: new Set(),
        what: new Set(),
        rows: []
      });
    }
    const bucket = byAdmin.get(row.adminUnitId);
    bucket.actors.add(row.actorName);
    bucket.what.add(row.what);
    bucket.rows.push(row);
  });

  const appAdmins = regionalAdmins.map((admin) => {
    const bucket = byAdmin.get(admin.id);
    const actorList = bucket ? [...bucket.actors] : [];
    const whatList = bucket ? [...bucket.what] : [];
    const actorCount = actorList.length;
    const whatCount = whatList.length;
    return {
      ...admin,
      riskScore: Math.min(95, 35 + actorCount * 12 + whatCount * 6),
      coverage: Number(Math.min(0.99, 0.22 + actorCount * 0.11).toFixed(2)),
      humanitarianActorCount: actorCount,
      humanitarianWho: actorList.join(", "),
      humanitarianWhat: whatList.join(", "),
      humanitarianFlags: [
        actorCount ? `${actorCount} actors` : "No active actor data",
        whatCount ? `${whatCount} activity lines` : "No activity lines"
      ]
    };
  });

  const tableRows = appAdmins
    .map((admin) => ({
      countryId: admin.countryId,
      adminName: admin.name,
      whoCount: admin.humanitarianActorCount || 0,
      who: admin.humanitarianWho || "No active actors logged",
      what: admin.humanitarianWhat || "No activities logged"
    }))
    .sort((a, b) => b.whoCount - a.whoCount || a.adminName.localeCompare(b.adminName));

  return {
    regionName,
    displayName: displayName || regionName,
    mapId,
    countryCodes: scopedCountryCodes,
    appAdmins,
    tableRows
  };
}

function buildHumanitarianRegionSpec(state, regionName, mapId, displayName) {
  const countryCodes = getOverviewRegionCountryCodes(state, regionName);
  return buildHumanitarianSpecFromCountryCodes(state, countryCodes, mapId, displayName, regionName);
}

function buildHumanitarianCountrySpec(state, country, mapId) {
  if (!country) {
    return buildHumanitarianSpecFromCountryCodes(state, [], mapId, "Unknown Country", "");
  }
  return buildHumanitarianSpecFromCountryCodes(state, [country.id], mapId, country.name, country.region || "");
}

function getMigrationTrackerState(state) {
  const tracker = state?.data?.migrationDisplacement;
  if (tracker && typeof tracker === "object") return tracker;
  return {
    status: "idle",
    overlays: [],
    countrySummaries: [],
    regionSummaries: [],
    unhcrByYear: [],
    iom: {},
    unhcr: {}
  };
}

function renderMigrationTrackerPanel(state, countryCodes = [], options = {}) {
  const tracker = getMigrationTrackerState(state);
  const codeSet = new Set((countryCodes || []).map((code) => String(code || "").trim().toUpperCase()).filter(Boolean));
  const allCountriesSelected = !codeSet.size;
  const countryRows = (tracker.countrySummaries || []).filter((row) => allCountriesSelected || codeSet.has(row.countryId));
  const overlayRows = (tracker.overlays || []).filter((row) => allCountriesSelected || codeSet.has(row.countryId));
  const regionRows = (tracker.regionSummaries || []).filter((row) => {
    if (allCountriesSelected) return true;
    return countryRows.some((countryRow) => countryRow.regionName === row.regionName);
  });
  const yearlyRows = tracker.unhcrByYear || [];
  const latestYearRow = yearlyRows[yearlyRows.length - 1] || null;
  const previousYearRow = yearlyRows.length > 1 ? yearlyRows[yearlyRows.length - 2] : null;

  const totals = countryRows.reduce(
    (acc, row) => {
      acc.iomIdps += Number(row.iomIdps || 0);
      acc.iomReturnees += Number(row.iomReturnees || 0);
      acc.refugees += Number(row.refugees || 0);
      acc.asylumSeekers += Number(row.asylumSeekers || 0);
      return acc;
    },
    { iomIdps: 0, iomReturnees: 0, refugees: 0, asylumSeekers: 0 }
  );

  const topProvinceRows = [...overlayRows]
    .sort((a, b) => Number(b.totalDisplaced || 0) - Number(a.totalDisplaced || 0))
    .slice(0, 10);

  const trendRows = countryRows
    .filter((row) => row.trend)
    .map((row) => ({
      countryName: row.countryName,
      refugeesDelta: Number(row.trend.refugeesDelta || 0),
      asylumSeekersDelta: Number(row.trend.asylumSeekersDelta || 0)
    }))
    .sort((a, b) => Math.abs(b.refugeesDelta) - Math.abs(a.refugeesDelta))
    .slice(0, 8);

  const contextTitle = options.title || "Migration and Displacement Tracker";
  const contextSubtitle =
    options.subtitle || "Official-source displacement context for selected geographies (IOM DTM + UNHCR).";

  if (tracker.status === "loading") {
    return `
      <section class="panel">
        <div class="panel-header"><h3>${contextTitle}</h3><span class="panel-subtitle">${contextSubtitle}</span></div>
        <p class="empty-state">Loading official-source migration and displacement data...</p>
      </section>
    `;
  }

  if (tracker.status === "error") {
    return `
      <section class="panel">
        <div class="panel-header"><h3>${contextTitle}</h3><span class="panel-subtitle">${contextSubtitle}</span></div>
        <p class="empty-state">Source load issue: ${safe(tracker.message || "Unable to load migration/displacement data in this session.")}</p>
        <div class="panel-actions"><button data-action="refresh-migration-tracker">Retry Source Refresh</button></div>
      </section>
    `;
  }

  const trendLabel =
    latestYearRow && previousYearRow
      ? `${previousYearRow.year} to ${latestYearRow.year}`
      : latestYearRow
        ? `Latest reporting year ${latestYearRow.year}`
        : "Annual trend unavailable";

  return `
    <section class="panel">
      <div class="panel-header">
        <h3>${contextTitle}</h3>
        <div class="panel-actions"><button data-action="refresh-migration-tracker">Refresh Sources</button></div>
      </div>
      <span class="panel-subtitle">${contextSubtitle}</span>
      <div class="kpi-grid">
        <article class="kpi-card"><div class="kpi-label">IOM DTM IDPs</div><div class="kpi-value">${formatNumber(totals.iomIdps)}</div></article>
        <article class="kpi-card"><div class="kpi-label">IOM DTM Returnees</div><div class="kpi-value">${formatNumber(totals.iomReturnees)}</div></article>
        <article class="kpi-card"><div class="kpi-label">UNHCR Refugees</div><div class="kpi-value">${formatNumber(totals.refugees)}</div></article>
        <article class="kpi-card"><div class="kpi-label">UNHCR Asylum-Seekers</div><div class="kpi-value">${formatNumber(totals.asylumSeekers)}</div></article>
      </div>
      <div class="two-col">
        <article class="subpanel">
          <h3>Country Context</h3>
          <table class="matrix-table">
            <thead>
              <tr><th>Country</th><th>IDPs</th><th>Returnees</th><th>Refugees</th><th>Asylum</th></tr>
            </thead>
            <tbody>
              ${
                countryRows
                  .map(
                    (row) =>
                      `<tr><td>${safe(row.countryName)}</td><td>${formatNumber(row.iomIdps)}</td><td>${formatNumber(row.iomReturnees)}</td><td>${formatNumber(row.refugees)}</td><td>${formatNumber(row.asylumSeekers)}</td></tr>`
                  )
                  .join("") || "<tr><td colspan='5'>No country displacement rows in current scope.</td></tr>"
              }
            </tbody>
          </table>
        </article>
        <article class="subpanel">
          <h3>Trend Summary (${trendLabel})</h3>
          ${
            trendRows.length
              ? barSeries(trendRows.map((row) => ({ label: row.countryName, value: Math.abs(row.refugeesDelta) + Math.abs(row.asylumSeekersDelta) })))
              : "<p class='empty-state'>Trend deltas are not available for this scope yet.</p>"
          }
          ${
            trendRows.length
              ? `<ul class="compact-list">${trendRows
                  .map(
                    (row) =>
                      `<li>${safe(row.countryName)} | Refugees: ${formatSigned(row.refugeesDelta)} | Asylum: ${formatSigned(row.asylumSeekersDelta)}</li>`
                  )
                  .join("")}</ul>`
              : ""
          }
        </article>
      </div>
      <div class="two-col">
        <article class="subpanel">
          <h3>Top Subnational Displacement Hotspots</h3>
          <table class="matrix-table">
            <thead>
              <tr><th>Where</th><th>IDPs</th><th>Returnees</th><th>Snapshot</th></tr>
            </thead>
            <tbody>
              ${
                topProvinceRows
                  .map(
                    (row) =>
                      `<tr><td>${safe(row.admin2Name)}, ${safe(row.admin1Name)} (${safe(row.countryId)})</td><td>${formatNumber(row.idps)}</td><td>${formatNumber(row.returnees)}</td><td>${safe(row.snapshotDate ? row.snapshotDate.slice(0, 10) : "-")}</td></tr>`
                  )
                  .join("") || "<tr><td colspan='4'>No overlay records available for current scope.</td></tr>"
              }
            </tbody>
          </table>
        </article>
        <article class="subpanel">
          <h3>Source Notes and Caveats</h3>
          <ul class="compact-list">
            <li><strong>IOM DTM last snapshot in scope:</strong> ${safe(tracker.iom?.latestSnapshotUtc ? tracker.iom.latestSnapshotUtc.slice(0, 10) : "N/A")}</li>
            <li><strong>IOM refresh note:</strong> ${safe(tracker.iom?.refreshNote || "N/A")}</li>
            <li><strong>UNHCR latest reporting year:</strong> ${safe(String(tracker.unhcr?.latestYear || latestYearRow?.year || "N/A"))}</li>
            <li><strong>UNHCR refresh note:</strong> ${safe(tracker.unhcr?.refreshNote || "N/A")}</li>
            <li><strong>Method caveat:</strong> ${safe(tracker.iom?.caveat || "N/A")}</li>
            <li><strong>Method caveat:</strong> ${safe(tracker.unhcr?.caveat || "N/A")}</li>
            <li><strong>Map overlay:</strong> IDP/Returnee point overlays are active on map panels in this view.</li>
            <li><strong>Data freshness:</strong> This panel is source-refreshed on demand and should not be interpreted as real-time.</li>
          </ul>
          <ul class="compact-list source-link-list">
            <li><a href="${safe(tracker.iom?.sourceUrl || "#")}" target="_blank" rel="noopener noreferrer">IOM DTM ArcGIS service</a></li>
            <li><a href="${safe(tracker.iom?.methodologyUrl || "#")}" target="_blank" rel="noopener noreferrer">IOM DTM methodology</a></li>
            <li><a href="${safe(tracker.unhcr?.sourceUrl || "#")}" target="_blank" rel="noopener noreferrer">UNHCR API documentation</a></li>
          </ul>
        </article>
      </div>
      ${
        regionRows.length
          ? `<article class="subpanel">
          <h3>Regional Summary</h3>
          ${barSeries(regionRows.map((row) => ({ label: row.regionName, value: Number(row.iomIdps || 0) + Number(row.iomReturnees || 0) })))}
        </article>`
          : ""
      }
      <p class="chart-foot">Last tracker refresh: ${safe(tracker.fetchedAtUtc ? tracker.fetchedAtUtc.slice(0, 19).replace("T", " ") : "N/A")} UTC</p>
    </section>
  `;
}

function renderOverview(state, vm) {
  const categoricalVisuals = buildCategoricalVisualData(state, vm);
  const scopeCountryCodes = vm.countries.map((country) => country.id);
  const migrationTracker = getMigrationTrackerState(state);
  const labels = {
    regionalMapsTitle: getConfigLabel(state, "sectionLabels.overview.regionalMapsTitle", "Regional Priority Maps"),
    regionalMapsSubtitle: getConfigLabel(state, "sectionLabels.overview.regionalMapsSubtitle", "Horn of Africa, Lake Chad Basin, and DRC"),
    pipelineTitle: getConfigLabel(state, "sectionLabels.overview.pipelineTitle", "Country Phase Pipeline"),
    challengeTitle: getConfigLabel(state, "sectionLabels.overview.challengeTitle", "Challenge Category Distribution")
  };

  const show = {
    kpis: getConfigBoolean(state, "visibility.overview.kpis", true),
    regionalMaps: getConfigBoolean(state, "visibility.overview.regionalMaps", true),
    pipeline: getConfigBoolean(state, "visibility.overview.pipeline", true),
    challengeDistribution: getConfigBoolean(state, "visibility.overview.challengeDistribution", true),
    insights: getConfigBoolean(state, "visibility.overview.insights", true),
    migrationTracker: getConfigBoolean(state, "visibility.overview.migrationTracker", true)
  };

  const regionMaps = overviewRegionDefinitions
    .map(({ regionName, mapId, subtitle, priorityAdminNames }) => {
      const regionCountryIds = getOverviewRegionCountryCodes(state, regionName);
      const regionAdmins = state.data.subnational.filter((admin) => regionCountryIds.includes(admin.countryId));
      const hasPriorityFocus = Array.isArray(priorityAdminNames) && priorityAdminNames.length > 0;
      return `
        <article class="map-region-card">
          ${renderGeoPanel(`${regionName} Priority Provinces`, regionAdmins, {
            subtitle: subtitle || "GPEI Annex-style operational geography view",
            layers: hasPriorityFocus
              ? ["Annex B priority provinces", "High-risk districts", "Silent districts", "Mobility corridors", "Cross-border zones"]
              : ["High-risk districts", "Silent districts", "Mobility corridors", "Cross-border zones"],
            mapId,
            mapCountryCodes: regionCountryIds
          })}
        </article>
      `;
    })
    .join("");
  const allOverviewRegionCountryIds = [...new Set(overviewRegionDefinitions.flatMap((region) => getOverviewRegionCountryCodes(state, region.regionName)))];
  const allOverviewRegionAdmins = state.data.subnational.filter((admin) => allOverviewRegionCountryIds.includes(admin.countryId));
  const annexPriorityAdminCount = allOverviewRegionAdmins.filter((admin) => isAnnexBHighRiskAdmin(admin)).length;
  const activePhaseCount = (vm.pipeline || []).filter((item) => Number(item.value || 0) > 0).length;
  const topPhase = [...(vm.pipeline || [])].sort((a, b) => Number(b.value || 0) - Number(a.value || 0))[0];
  const topChallenge = [...(vm.challengeDistribution || [])].sort((a, b) => Number(b.value || 0) - Number(a.value || 0))[0];
  const topSolutionType = categoricalVisuals.solutionNodes[0];
  const topStatus = categoricalVisuals.statusNodes[0];
  const migrationCountryRows = (migrationTracker.countrySummaries || []).filter((row) => scopeCountryCodes.includes(row.countryId));
  const migrationTotals = {
    idps: sum(migrationCountryRows.map((row) => Number(row.iomIdps || 0))),
    returnees: sum(migrationCountryRows.map((row) => Number(row.iomReturnees || 0))),
    refugees: sum(migrationCountryRows.map((row) => Number(row.unhcrRefugees || 0)))
  };

  const migrationInsights = renderInsightStrip("Displacement Snapshot", [
    { label: "IDPs in Scope", value: migrationTotals.idps.toLocaleString(), tone: "alert" },
    { label: "Returnees in Scope", value: migrationTotals.returnees.toLocaleString(), tone: "focus" },
    { label: "Refugees in Scope", value: migrationTotals.refugees.toLocaleString(), tone: "calm" },
    { label: "Tracker Last Updated", value: migrationTracker.fetchedAtUtc ? migrationTracker.fetchedAtUtc.slice(0, 10) : "N/A", tone: "neutral" }
  ]);
  const regionalMapInsights = renderInsightStrip("Regional Map Highlights", [
    { label: "Priority Regions", value: overviewRegionDefinitions.length, tone: "neutral" },
    { label: "Mapped Provinces", value: allOverviewRegionAdmins.length, tone: "focus" },
    { label: "Annex B Priority Provinces", value: annexPriorityAdminCount, tone: "alert" },
    { label: "Countries with Maps", value: allOverviewRegionCountryIds.length, tone: "calm" }
  ]);
  const phaseChallengeInsights = renderInsightStrip("Phase and Challenge Highlights", [
    { label: "Active Phases", value: activePhaseCount, tone: "focus" },
    { label: "Top Phase", value: topPhase ? `${topPhase.label} (${topPhase.value})` : "-", tone: "calm" },
    { label: "Top Challenge", value: topChallenge ? `${topChallenge.label} (${topChallenge.value})` : "-", tone: "alert" },
    { label: "Challenge Categories", value: (vm.challengeDistribution || []).length, tone: "neutral" }
  ]);
  const portfolioInsights = renderInsightStrip("Solution Portfolio Highlights", [
    { label: "Top Solution Type", value: topSolutionType ? `${topSolutionType[0]} (${topSolutionType[1]})` : "-", tone: "focus" },
    { label: "Top TA Status", value: topStatus ? `${topStatus[0]} (${topStatus[1]})` : "-", tone: "calm" },
    { label: "Challenge->Solution Links", value: categoricalVisuals.challengeToSolution.length, tone: "neutral" },
    { label: "Solution->Status Links", value: categoricalVisuals.solutionToStatus.length, tone: "neutral" }
  ]);

  const pipelinePanel = show.pipeline
    ? `<section class="panel"><div class="panel-header"><h3>${labels.pipelineTitle}</h3></div>${barSeries(vm.pipeline)}</section>`
    : "";
  const challengePanel = show.challengeDistribution
    ? `<section class="panel"><div class="panel-header"><h3>${labels.challengeTitle}</h3></div>${barSeries(vm.challengeDistribution)}</section>`
    : "";
  const overviewInsights = renderInsightStrip("At-a-Glance", [
    { label: "Countries in Current View", value: vm.countries.length, tone: "calm" },
    { label: "Country in Focus", value: vm.kpis.currentCountryInView, tone: "neutral" },
    { label: "High-Risk Clusters", value: vm.kpis.highRiskClusters, tone: "alert" },
    { label: "Active TA Cycles", value: vm.kpis.activeImplementation, tone: "focus" }
  ]);
  const migrationPanel = renderMigrationTrackerPanel(state, scopeCountryCodes, {
    title: "Migration and Displacement Tracker",
    subtitle: "Selected geographies: Horn of Africa, Lake Chad Basin, and DRC (official IOM DTM + UNHCR context)."
  });

  return `
    ${show.kpis ? renderKpis(state, vm.kpis) : ""}
    ${show.insights ? overviewInsights : ""}
    ${show.migrationTracker ? `${migrationInsights}${migrationPanel}` : ""}
    ${
      show.regionalMaps
        ? `${regionalMapInsights}<section class="panel">
      <div class="panel-header"><h3>${labels.regionalMapsTitle}</h3><span class="panel-subtitle">${labels.regionalMapsSubtitle}</span></div>
      <div class="three-map-grid">${regionMaps}</div>
    </section>`
        : ""
    }
    ${(pipelinePanel || challengePanel) ? `${phaseChallengeInsights}<div class="two-col">${pipelinePanel}${challengePanel}</div>` : ""}
    ${portfolioInsights}
    <div class="two-col">
      ${renderSankeyStylePanel(categoricalVisuals)}
      ${renderSolutionTreemapPanel(categoricalVisuals)}
    </div>
  `;
}

function renderDiagnosticInput(fieldDef, diagnostic, country) {
  const sourceValue = fieldDef.source === "countryName" ? country.name : diagnostic[fieldDef.field];
  const value = safe(sourceValue);

  if (fieldDef.source === "countryName") {
    return `<label>${fieldDef.label}<input value="${value}" disabled></label>`;
  }

  if (fieldDef.multiline) {
    return `<label>${fieldDef.label}<textarea rows="3" data-edit-collection="diagnostics" data-id="${diagnostic.id}" data-field="${fieldDef.field}">${value}</textarea></label>`;
  }

  return `<label>${fieldDef.label}<input data-edit-collection="diagnostics" data-id="${diagnostic.id}" data-field="${fieldDef.field}" value="${value}"></label>`;
}

function renderDiagnosticFormSections(state, diagnostic, country) {
  const sections = state.data.dimensions?.diagnosticFormTemplate || [];
  return sections
    .map(
      (section) => `
      <details class="subpanel diagnostic-form-section" open>
        <summary>
          <span>${section.title}</span>
          <small>${section.fields.length} fields</small>
        </summary>
        <div class="form-grid diagnostic-form-grid">
          ${section.fields.map((fieldDef) => renderDiagnosticInput(fieldDef, diagnostic, country)).join("")}
        </div>
      </details>
    `
    )
    .join("");
}

function renderCountryDiagnosticsWorkspace(state, vm) {
  const country = vm.selectedCountry;
  const d = vm.selectedDiagnostic;
  const labels = {
    pageTitlePrefix: getConfigLabel(state, "sectionLabels.countryReview.pageTitlePrefix", "Country Diagnostics"),
    capacityPerformanceTitle: getConfigLabel(state, "sectionLabels.countryReview.capacityPerformanceTitle", "Capacity Performance (Supporting View)"),
    completionTitle: getConfigLabel(state, "sectionLabels.countryReview.completionTitle", "Section Completion Tracker"),
    topGapsTitle: getConfigLabel(state, "sectionLabels.countryReview.topGapsTitle", "Top 5 Operational Gaps and Recommended Actions"),
    stakeholderTitle: getConfigLabel(state, "sectionLabels.countryReview.stakeholderTitle", "Stakeholder Support Needed"),
    dataMissingTitle: getConfigLabel(state, "sectionLabels.countryReview.dataMissingTitle", "Data Missing and External Risk Mitigation"),
    mapTitle: getConfigLabel(state, "sectionLabels.countryReview.mapTitle", "Country Geospatial Risk View")
  };
  const show = {
    meta: getConfigBoolean(state, "visibility.countryReview.meta", true),
    reviewDates: getConfigBoolean(state, "visibility.countryReview.reviewDates", true),
    formSections: getConfigBoolean(state, "visibility.countryReview.formSections", true),
    capacityPerformance: getConfigBoolean(state, "visibility.countryReview.capacityPerformance", true),
    completionTracker: getConfigBoolean(state, "visibility.countryReview.completionTracker", true),
    topGaps: getConfigBoolean(state, "visibility.countryReview.topGaps", true),
    stakeholders: getConfigBoolean(state, "visibility.countryReview.stakeholders", true),
    dataMissing: getConfigBoolean(state, "visibility.countryReview.dataMissing", true),
    map: getConfigBoolean(state, "visibility.countryReview.map", true)
  };
  const workflow = state.data.workflowStatus.find((item) => item.countryId === country.id);
  const sections = state.data.diagnosticSections.filter((item) => item.diagnosticId === d.id);
  const capacities = state.data.diagnosticCapacities.filter((item) => item.diagnosticId === d.id);
  const gaps = state.data.diagnosticOperationalGaps.filter((item) => item.countryId === country.id);
  const proposed = state.data.diagnosticProposedSolutions.filter((item) => item.countryId === country.id);
  const stakeholders = state.data.diagnosticStakeholderSupport.filter((item) => item.diagnosticId === d.id);
  const missing = state.data.diagnosticMissingData.filter((item) => item.diagnosticId === d.id);
  const topGaps = gaps
    .slice(0, 5)
    .map((gap) => gap.gapSummary)
    .join("; ");
  const mapFocus = getDiagnosticMapFocus(state);
  const diagnosticMapAdmins = getDiagnosticMapAdmins(state, vm);
  const annexBHighRiskProvinces = vm.currentCountryAdmins.filter(isAnnexBHighRiskAdmin);
  const countryInsights = renderInsightStrip("Country Snapshot", [
    { label: "Country", value: country.name, tone: "neutral" },
    { label: "Record Status", value: d.recordStatus, tone: d.recordStatus === "Complete" ? "calm" : "focus" },
    { label: "Review Status", value: d.reviewStatus, tone: "neutral" },
    { label: "Workflow Completion", value: `${workflow?.completionPct ?? 0}%`, tone: "focus" }
  ]);
  const countryFlagStrip = renderCountryFlagList([country.id], vm.cMap);
  return `
    <div class="diagnostic-layout">
      <section class="panel">
        <div class="panel-header"><h2>${countryFlagEmoji(country.id)} ${labels.pageTitlePrefix}: ${country.name}</h2><div class="panel-actions"><button data-action="toggle-review-mode">${state.reviewMode ? "Exit Review Mode" : "One-Country Review Mode"}</button><button data-action="add-gap" data-id="${d.id}">Add Gap</button><button data-action="mark-diagnostic-complete" data-id="${d.id}">Mark Complete</button></div></div>
        ${countryInsights}
        <article class="subpanel"><h3>Country Flag</h3>${countryFlagStrip}</article>
        ${
          show.meta
            ? `<div class="meta-grid">
        <div><strong>Epi profile:</strong> ${country.epiProfile}</div>
        <div><strong>Population type:</strong> ${country.populationType}</div>
        <div><strong>Priority:</strong> ${country.priorityStatus}</div>
        <div><strong>Review status:</strong> ${d.reviewStatus}</div>
        <div><strong>Record status:</strong> ${d.recordStatus}</div>
        <div><strong>Owner:</strong> ${workflow?.owner || "Unassigned"}</div>
        <div><strong>Due date:</strong> ${workflow?.dueDate || "TBD"}</div>
        <div><strong>Next milestone:</strong> ${workflow?.nextMilestone || "TBD"}</div>
      </div>`
          : ""
        }
        ${
          show.reviewDates
            ? `<div class="form-grid diagnostic-review-dates">
        <label>Review Start Date<input data-edit-collection="diagnostics" data-id="${d.id}" data-field="reviewStartDate" value="${safe(d.reviewStartDate)}"></label>
        <label>Review End Date<input data-edit-collection="diagnostics" data-id="${d.id}" data-field="reviewEndDate" value="${safe(d.reviewEndDate)}"></label>
      </div>`
            : ""
        }
        ${show.formSections ? renderDiagnosticFormSections(state, d, country) : ""}
        ${
          show.capacityPerformance || show.completionTracker
            ? `<div class="two-col">
        ${
          show.capacityPerformance
            ? `<article class="subpanel">
          <h3>${labels.capacityPerformanceTitle}</h3>
          ${barSeries(capacities.map((item) => ({ label: item.capacityLabel.split(" ").slice(0, 2).join(" "), value: item.metricValue })))}
        </article>`
            : ""
        }
        ${
          show.completionTracker
            ? `<article class="subpanel">
          <h3>${labels.completionTitle}</h3>
          ${sections.map((section) => `<div class="progress-row"><span>${section.label}</span><div class="progress-track"><span style="width:${section.completionPct}%"></span></div><strong>${section.completionPct}%</strong></div>`).join("")}
        </article>`
            : ""
        }
      </div>`
            : ""
        }
        <div class="three-col">
        ${
          show.topGaps
            ? `<article class="subpanel">
          <h3>${labels.topGapsTitle}</h3>
          <label>Top 5 Operational Gaps (Workstream Assessment)<textarea rows="4" data-edit-collection="diagnostics" data-id="${d.id}" data-field="top5OperationalGaps">${safe(d.top5OperationalGaps || topGaps)}</textarea></label>
          <ul class="compact-list">${gaps.slice(0, 5).map((gap) => `<li><span class="status-chip ${pickStatusClass(gap.severity)}">${gap.severity}</span>${gap.gapSummary}</li>`).join("")}</ul>
          <div class="repeatable-editor">
            ${gaps.slice(0, 6).map((gap) => `
              <div class="repeatable-row">
                <select data-edit-collection="diagnosticOperationalGaps" data-id="${gap.id}" data-field="severity">
                  <option value="High" ${gap.severity === "High" ? "selected" : ""}>High</option>
                  <option value="Medium" ${gap.severity === "Medium" ? "selected" : ""}>Medium</option>
                  <option value="Low" ${gap.severity === "Low" ? "selected" : ""}>Low</option>
                </select>
                <input data-edit-collection="diagnosticOperationalGaps" data-id="${gap.id}" data-field="gapSummary" value="${safe(gap.gapSummary)}">
                <button data-action="delete-gap" data-id="${gap.id}" title="Delete gap">Delete</button>
              </div>
            `).join("")}
          </div>
          <ul class="compact-list">${proposed.slice(0, 5).map((row) => `<li>${state.data.solutions.find((solution) => solution.id === row.solutionId)?.name || row.solutionId}</li>`).join("")}</ul>
        </article>`
            : ""
        }
        ${
          show.stakeholders
            ? `<article class="subpanel">
          <h3>${labels.stakeholderTitle}</h3>
          <ul class="compact-list">${stakeholders.map((row) => `<li>${row.stakeholder}: ${row.supportType}</li>`).join("")}</ul>
          <label>Required Decision<textarea rows="3" data-edit-collection="diagnostics" data-id="${d.id}" data-field="requiredDecision">${safe(d.requiredDecision)}</textarea></label>
        </article>`
            : ""
        }
        ${
          show.dataMissing
            ? `<article class="subpanel">
          <h3>${labels.dataMissingTitle}</h3>
          <ul class="compact-list">${missing.map((row) => `<li>${row.dataElement}</li>`).join("")}</ul>
          <label>Most Likely Derailers<textarea rows="3" data-edit-collection="diagnostics" data-id="${d.id}" data-field="likelyDerailers">${safe(d.likelyDerailers)}</textarea></label>
          <label>Opportunities for Programmatic Synergies<textarea rows="3" data-edit-collection="diagnostics" data-id="${d.id}" data-field="opportunitiesForProgrammaticSynergies">${safe(d.opportunitiesForProgrammaticSynergies)}</textarea></label>
        </article>`
            : ""
        }
        </div>
      </section>
      ${
        show.map
          ? `<aside class="diagnostic-map-rail">
        ${renderGeoPanel(labels.mapTitle, diagnosticMapAdmins, {
          subtitle: "Integrated country + diagnostic map (province/state level)",
          layers: [
            "Silent districts",
            "ES performance",
            "High-risk districts",
            "Mobility corridors",
            "Cross-border zones"
          ],
          mapId: "map-diagnostic-country",
          mapCountryCodes: [country.id],
          panelActions: `<label class="map-filter-control">Province filter<select data-map-focus="diagnostic"><option value="all" ${
            mapFocus === "all" ? "selected" : ""
          }>All provinces</option><option value="highRisk" ${
            mapFocus === "highRisk" ? "selected" : ""
          }>High-risk provinces (Annex B-aligned)</option></select></label>`,
          note: "Risk Signal is Annex B-aligned and used as a high-risk province proxy from readiness, silent-district, mobility, and cross-border indicators."
        })}
        ${renderGeoPanel("Static Provincial Map (Annex B-aligned)", diagnosticMapAdmins, {
          subtitle: "Static province-level diagnostic map for export and presentation",
          layers: ["Province boundaries", "Annex B risk signal"],
          mapId: "map-diagnostic-country-static",
          mapCountryCodes: [country.id],
          staticView: true,
          note: "Static map mode disables pan/zoom interactions while preserving province-level risk context."
        })}
        <article class="subpanel">
          <h3>Annex B High-Risk Provinces</h3>
          <table class="matrix-table">
            <thead><tr><th>Province</th><th>Risk Signal</th><th>Flags</th></tr></thead>
            <tbody>
              ${
                annexBHighRiskProvinces
                  .slice(0, 16)
                  .map(
                    (admin) =>
                      `<tr><td>${safe(admin.name)}</td><td>${safe(admin.riskScore)}</td><td>${
                        admin.silentDistrict ? "Silent " : ""
                      }${admin.mobilityCorridor ? "Mobility " : ""}${admin.crossBorderZone ? "Cross-border" : ""}</td></tr>`
                  )
                  .join("") || "<tr><td colspan='3'>No high-risk provinces are currently flagged for this country.</td></tr>"
              }
            </tbody>
          </table>
        </article>
      </aside>`
          : ""
      }
    </div>
  `;
}

function renderCountries(state, vm) {
  return renderCountryDiagnosticsWorkspace(state, vm);
}

function renderDiagnostics(state, vm) {
  return renderCountryDiagnosticsWorkspace(state, vm);
}

function renderSummarySnapshot(state, options = {}) {
  const labels = {
    metricsTitle: getConfigLabel(state, "sectionLabels.summary.metricsTitle", "Selected Solutions Snapshot"),
    criteriaTitle: getConfigLabel(state, "sectionLabels.summary.criteriaTitle", "Selection Criteria")
  };
  const summary = state.data.solutionSummary || {};
  const metrics = Array.isArray(summary.metrics) ? summary.metrics : [];
  const criteria = Array.isArray(summary.selectionCriteria) ? summary.selectionCriteria : [];
  const subtitle = options.subtitle || "Source: Strategic.Innovations.Worksheet_2.25.2026.xlsx";
  const title = options.title || getConfigLabel(state, "sectionLabels.summary.pageTitle", "Summary");

  return `
    <section class="panel">
      <div class="panel-header"><h2>${title}</h2><span class="panel-subtitle">${safe(subtitle)}</span></div>
      <div class="meta-grid">
        <div><strong>Workbook tab:</strong> Selected Solutions (n=19)</div>
        <div><strong>Summary as-of date:</strong> ${safe(summary.asOfDate || "2026-03-30")}</div>
        <div><strong>Total selected solutions:</strong> ${safe(summary.solutionCount ?? 19)}</div>
        <div><strong>Solutions feasible remotely:</strong> ${safe(summary.remoteCapableCount ?? 10)}</div>
      </div>
      <div class="two-col">
        <article class="subpanel">
          <h3>${labels.metricsTitle}</h3>
          <table class="matrix-table">
            <thead><tr><th>Component</th><th>Value</th></tr></thead>
            <tbody>
              ${metrics.map((row) => `<tr><td>${safe(row.component)}</td><td>${safe(row.value)}</td></tr>`).join("")}
            </tbody>
          </table>
        </article>
        <article class="subpanel">
          <h3>${labels.criteriaTitle}</h3>
          <ul class="compact-list">${criteria.map((item) => `<li>${safe(item)}</li>`).join("")}</ul>
        </article>
      </div>
    </section>
  `;
}

function renderSummary(state) {
  return renderSummarySnapshot(state);
}

function deriveSolutionImplementationPlan(solution, selectedSource) {
  const challenge = String(solution?.challengeCategory || "").toLowerCase();
  const target = String(solution?.targetPopulation || "").toLowerCase();
  const isDigital = String(solution?.solutionType || "").toLowerCase() !== "non-digital";
  const setting = String(selectedSource?.countrySetting || solution?.recommendedContexts || "priority provinces");

  const step1 =
    challenge.includes("mobility") || challenge.includes("migration")
      ? "Map mobility corridors and displaced settlements"
      : challenge.includes("campaign")
        ? "Baseline campaign process and data bottlenecks"
        : challenge.includes("population enumeration")
          ? "Assemble denominator and settlement baseline"
          : challenge.includes("cross-border")
            ? "Map formal and informal border points"
            : challenge.includes("afp") || challenge.includes("surveillance")
              ? "Document surveillance pathway and alert gaps"
              : "Define operational gap baseline";

  const step2 = isDigital ? "Configure tool and train focal users" : "Define SOP and assign field focal teams";

  const step3 =
    target.includes("nomadic") || target.includes("mobile")
      ? "Deploy in high-mobility districts and transit sites"
      : target.includes("urban")
        ? "Deploy in high-density urban clusters"
        : target.includes("cross-border")
          ? "Deploy across synchronized border districts"
          : "Deploy in highest-risk priority provinces";

  const step4 = "Track outputs weekly and adjust implementation";

  return {
    context: setting,
    steps: [step1, step2, step3, step4]
  };
}

function renderSolutionImplementationInfographic(solution, selectedSource, options = {}) {
  const compact = Boolean(options.compact);
  const plan = deriveSolutionImplementationPlan(solution, selectedSource);
  if (compact) {
    return `
      <div class="solution-infographic compact">
        ${plan.steps
          .map((step, index) => `<div class="solution-step-mini"><span>${index + 1}</span><small>${safe(step.split(" ").slice(0, 2).join(" "))}</small></div>`)
          .join("")}
      </div>
    `;
  }

  return `
    <section class="solution-infographic full">
      <div class="solution-infographic-head">
        <strong>Implementation Infographic</strong>
        <span>Context: ${safe(plan.context || "Priority provinces")}</span>
      </div>
      <div class="solution-flow">
        ${plan.steps
          .map(
            (step, index) => `
          <div class="solution-step">
            <div class="solution-step-index">Step ${index + 1}</div>
            <div class="solution-step-text">${safe(step)}</div>
          </div>
          ${index < plan.steps.length - 1 ? `<div class="solution-flow-arrow">-></div>` : ""}
        `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderSolutions(state, vm) {
  const sourceRows = Array.isArray(state.data.selectedSolutionsCatalog) ? state.data.selectedSolutionsCatalog : [];
  const filtered = state.data.solutions.filter((solution) => {
    if (state.filters.challengeCategory !== "all" && solution.challengeCategory !== state.filters.challengeCategory) return false;
    if (state.filters.solutionCategory !== "all" && solution.solutionType !== state.filters.solutionCategory) return false;
    return true;
  });
  const selected = vm.selectedSolution || filtered[0] || state.data.solutions[0];
  const selectedSource = sourceRows.find((item) => item.solutionId === selected?.id);
  const show = {
    gallery: getConfigBoolean(state, "visibility.solutions.gallery", true),
    evidence: getConfigBoolean(state, "visibility.solutions.evidence", true)
  };
  return `
    <section class="panel">
      <div class="panel-header"><h2>${getConfigLabel(state, "sectionLabels.solutions.pageTitle", "Solutions Inventory")}</h2><span class="panel-subtitle">Source tab: Selected Solutions (n=19)</span></div>
      ${
        show.gallery
          ? `<div class="solution-gallery">
        ${filtered
          .map((solution) => {
            const sourceRow = sourceRows.find((item) => item.solutionId === solution.id);
            return `
          <button class="solution-card ${selected?.id === solution.id ? "selected" : ""}" data-action="select-solution" data-id="${solution.id}">
            <h4>${solution.name}</h4>
            <div class="solution-meta">${solution.challengeCategory} | ${solution.solutionType}</div>
            <div class="solution-tags"><span>Impact ${solution.impactPotential}</span><span>Speed ${solution.implementationSpeed}</span><span>Feasibility ${solution.feasibility}</span></div>
            ${renderSolutionImplementationInfographic(solution, sourceRow, { compact: true })}
          </button>
        `;
          })
          .join("")}
      </div>`
          : ""
      }
      ${
        show.evidence
          ? `<article class="subpanel">
        <h3>Solution Evidence Summary</h3>
        <div class="meta-grid">
          <div><strong>Status:</strong> ${selected.status}</div>
          <div><strong>Evidence:</strong> ${selected.evidenceStrength}</div>
          <div><strong>Scalability:</strong> ${selected.scalability}</div>
          <div><strong>Cost:</strong> ${selected.costEffectiveness}</div>
          <div><strong>Resource Intensity:</strong> ${selected.resourceIntensity}</div>
          <div><strong>Target Population:</strong> ${selected.targetPopulation}</div>
        </div>
        <p>${selected.effectivenessSummary}</p>
        ${renderSolutionImplementationInfographic(selected, selectedSource)}
        ${
          selectedSource
            ? `<div class="meta-grid">
          <div><strong>Workbook Index:</strong> ${safe(selectedSource.index)}</div>
          <div><strong>Country Setting:</strong> ${safe(selectedSource.countrySetting || "N/A")}</div>
          <div><strong>Source Link:</strong> ${safe(selectedSource.source || "N/A")}</div>
        </div>
        <p><strong>Potential Applicability:</strong> ${safe(selectedSource.potentialApplicability || "N/A")}</p>`
            : ""
        }
      </article>`
          : ""
      }
    </section>
  `;
}

function renderTa(state, vm) {
  const ta = vm.selectedTaPackage;
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.ta.pageTitle", "TA Packages: Country Technical Assistance Packet"),
    selectedSolutionsTitle: getConfigLabel(state, "sectionLabels.ta.selectedSolutionsTitle", "Selected Solutions"),
    planTitle: getConfigLabel(state, "sectionLabels.ta.planTitle", "30-Day Implementation Plan"),
    readinessTitle: getConfigLabel(state, "sectionLabels.ta.readinessTitle", "Readiness Score"),
    riskTitle: getConfigLabel(state, "sectionLabels.ta.riskTitle", "Implementation Risk Score"),
    approvalsTitle: getConfigLabel(state, "sectionLabels.ta.approvalsTitle", "Approval Steps"),
    mapTitle: getConfigLabel(state, "sectionLabels.ta.mapTitle", "TA Implementation Geography")
  };
  const show = {
    selectedSolutions: getConfigBoolean(state, "visibility.ta.selectedSolutions", true),
    plan: getConfigBoolean(state, "visibility.ta.plan", true),
    scores: getConfigBoolean(state, "visibility.ta.scores", true),
    map: getConfigBoolean(state, "visibility.ta.map", true)
  };
  const selectedSolutions = state.data.taSelectedSolutions.filter((item) => item.taPackageId === ta.id);
  const plan = state.data.taImplementationPlan.filter((item) => item.taPackageId === ta.id);
  const approvals = state.data.approvals.filter((item) => item.taPackageId === ta.id);
  const completedApprovals = approvals.filter((item) => String(item.status || "").toLowerCase() === "approved").length;
  const taInsights = renderInsightStrip("TA Snapshot", [
    { label: "Target Country", value: vm.cMap[ta.countryId]?.name || ta.countryId, tone: "neutral" },
    { label: "TA Type", value: ta.taType, tone: "focus" },
    { label: "Readiness Score", value: ta.readinessScore, tone: "calm" },
    { label: "Implementation Risk", value: ta.riskScore, tone: "alert" }
  ]);
  return `
    <section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2><div class="panel-actions"><button data-action="add-ta-plan" data-id="${ta.id}">Add Plan Row</button></div></div>
      ${phaseRibbon(ta.currentPhaseId)}
      ${taInsights}
      <div class="form-grid">
        <label>Target Country<input value="${vm.cMap[ta.countryId].name}" disabled></label>
        <label>Operational Gap Addressed<input data-edit-collection="taPackages" data-id="${ta.id}" data-field="operationalGapAddressed" value="${safe(ta.operationalGapAddressed)}"></label>
        <label>Geographic Scope<input data-edit-collection="taPackages" data-id="${ta.id}" data-field="geographicScope" value="${safe(ta.geographicScope)}"></label>
        <label>TA Type<input data-edit-collection="taPackages" data-id="${ta.id}" data-field="taType" value="${safe(ta.taType)}"></label>
        <label>Start Date<input data-edit-collection="taPackages" data-id="${ta.id}" data-field="startDate" value="${safe(ta.startDate)}"></label>
        <label>End Date<input data-edit-collection="taPackages" data-id="${ta.id}" data-field="endDate" value="${safe(ta.endDate)}"></label>
      </div>
      <div class="two-col">
        ${
          show.selectedSolutions
            ? `<article class="subpanel"><h3>${labels.selectedSolutionsTitle}</h3><ul class="compact-list">${selectedSolutions.map((row) => `<li>${state.data.solutions.find((item) => item.id === row.solutionId)?.name || row.solutionId}</li>`).join("")}</ul></article>`
            : ""
        }
        ${
          show.plan
            ? `<article class="subpanel">
          <h3>${labels.planTitle}</h3>
          ${plan.map((row) => `
            <div class="timeline-item">
              <div class="timeline-week">
                <input data-edit-collection="taImplementationPlan" data-id="${row.id}" data-field="weekWindow" value="${safe(row.weekWindow)}">
              </div>
              <div class="timeline-body">
                <input data-edit-collection="taImplementationPlan" data-id="${row.id}" data-field="objective" value="${safe(row.objective)}">
                <textarea rows="2" data-edit-collection="taImplementationPlan" data-id="${row.id}" data-field="tasks">${safe(row.tasks)}</textarea>
                <textarea rows="2" data-edit-collection="taImplementationPlan" data-id="${row.id}" data-field="outputs">${safe(row.outputs)}</textarea>
              </div>
              <button data-action="delete-ta-plan" data-id="${row.id}" title="Delete plan row">Delete</button>
            </div>
          `).join("")}
        </article>`
            : ""
        }
      </div>
      ${
        show.scores
          ? `<div class="three-col">
        <article class="subpanel"><h3>${labels.readinessTitle}</h3><div class="score">${ta.readinessScore}</div></article>
        <article class="subpanel"><h3>${labels.riskTitle}</h3><div class="score">${ta.riskScore}</div></article>
        <article class="subpanel">
          <h3>${labels.approvalsTitle}</h3>
          <div class="approval-checklist-meta">${completedApprovals} of ${approvals.length} steps completed</div>
          <ul class="approval-checklist">
            ${approvals
              .map((item) => {
                const isComplete = String(item.status || "").toLowerCase() === "approved";
                return `
                  <li class="approval-checklist-item ${isComplete ? "is-complete" : ""}">
                    <label class="approval-checklist-label">
                      <input type="checkbox" data-approval-checklist-id="${item.id}" ${isComplete ? "checked" : ""}>
                      <span class="approval-checklist-step">${safe(item.step)}</span>
                    </label>
                    <div class="approval-checklist-detail">
                      <span>${safe(item.reviewer || "Reviewer TBD")}</span>
                      <span>Due ${safe(item.dueDate || "-")}</span>
                      <span class="status-chip ${pickStatusClass(item.status)}">${safe(item.status || "Not Started")}</span>
                    </div>
                  </li>
                `;
              })
              .join("")}
          </ul>
        </article>
      </div>`
          : ""
      }
    </section>
    ${
      show.map
        ? renderGeoPanel(labels.mapTitle, vm.currentCountryAdmins, {
            subtitle: "TA packet implementation geographies (province/state/gov)",
            layers: ["Implementation sites", "Border points", "Operational corridors", "Readiness risk"],
            mapId: "map-ta-country",
            mapCountryCodes: [ta.countryId]
          })
        : ""
    }
  `;
}

function renderImplementationMe(state, vm) {
  const countryId = vm.selectedCountry.id;
  const asOfDate = new Date("2026-04-01T00:00:00Z");
  const isCompleteStatus = (value) => {
    const normalized = String(value || "").toLowerCase();
    return ["completed", "complete", "approved", "submitted", "closed"].some((token) => normalized.includes(token));
  };
  const ratioPct = (value, total) => (total ? Math.round((value / total) * 100) : 0);
  const renderFormProgressCard = (title, started, completed, total, note) => `
    <article class="kpi-card progress-kpi-card">
      <div class="kpi-label">${title}</div>
      <div class="kpi-value">${completed} / ${total}</div>
      <div class="kpi-meta">${note}</div>
      <div class="mini-progress-stack">
        <div class="mini-progress-line">
          <span class="mini-progress-label">Started</span>
          <div class="progress-track"><span style="width:${ratioPct(started, total)}%"></span></div>
          <strong>${started}/${total}</strong>
        </div>
        <div class="mini-progress-line">
          <span class="mini-progress-label">Completed</span>
          <div class="progress-track"><span style="width:${ratioPct(completed, total)}%"></span></div>
          <strong>${completed}/${total}</strong>
        </div>
      </div>
    </article>
  `;
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.implementationMe.pageTitle", "Implementation and M&E"),
    formsProgressTitle: getConfigLabel(state, "sectionLabels.implementationMe.formsProgressTitle", "Forms Started and Completed"),
    taApprovalTitle: getConfigLabel(state, "sectionLabels.implementationMe.taApprovalTitle", "TA Packages Approved"),
    taStatusTitle: getConfigLabel(state, "sectionLabels.implementationMe.taStatusTitle", "TA Package Status by Unique Number"),
    cyclesTitle: getConfigLabel(state, "sectionLabels.implementationMe.cyclesTitle", "Intervention Cycles"),
    blockersTitle: getConfigLabel(state, "sectionLabels.implementationMe.blockersTitle", "Issue / Blocker Log"),
    completionTitle: getConfigLabel(state, "sectionLabels.implementationMe.completionTitle", "Completion Status by Category"),
    outcomesTitle: getConfigLabel(state, "sectionLabels.implementationMe.outcomesTitle", "Outcome Improvement Since Intervention"),
    lessonsTitle: getConfigLabel(state, "sectionLabels.implementationMe.lessonsTitle", "Lessons Learned"),
    mapTitle: getConfigLabel(state, "sectionLabels.implementationMe.mapTitle", "Implementation and M&E Overlay"),
    workflowTitle: getConfigLabel(state, "sectionLabels.tools.workflowTitle", "Form Completion & Workflow Tracker"),
    referencesTitle: getConfigLabel(state, "sectionLabels.tools.referencesTitle", "Reference Utilities"),
    editsTitle: getConfigLabel(state, "sectionLabels.tools.editsTitle", "Recent Edits")
  };
  const show = {
    cycles: getConfigBoolean(state, "visibility.implementationMe.cycles", true),
    blockers: getConfigBoolean(state, "visibility.implementationMe.blockers", true),
    completion: getConfigBoolean(state, "visibility.implementationMe.completion", true),
    outcomes: getConfigBoolean(state, "visibility.implementationMe.outcomes", true),
    lessons: getConfigBoolean(state, "visibility.implementationMe.lessons", true),
    map: getConfigBoolean(state, "visibility.implementationMe.map", true)
  };
  const viewCountryIds = new Set(vm.countries.map((country) => country.id));
  const viewRegions = new Set(vm.countries.map((country) => country.region));
  const diagnosticsInScope = state.data.diagnostics.filter((item) => viewCountryIds.has(item.countryId));
  const annexesInScope = state.data.regionalAnnexes.filter((item) => item.countries.some((id) => viewCountryIds.has(id)));
  const taPackagesInScope = state.data.taPackages.filter((item) => viewCountryIds.has(item.countryId));
  const cycles = state.data.implementationCycles.filter((item) => item.countryId === countryId);
  const activities = state.data.implementationActivities.filter((item) => item.countryId === countryId);
  const indicators = state.data.monitoringIndicators.filter((item) => item.countryId === countryId && item.indicator !== "Surveillance Timeliness");
  const lessons = state.data.lessonsLearned.filter((item) => item.countryId === countryId);
  const workflow = state.data.workflowStatus.filter((item) => vm.countries.some((country) => country.id === item.countryId));

  const expectedDiagnostics = vm.countries.length;
  const startedDiagnostics = new Set(diagnosticsInScope.map((item) => item.countryId)).size;
  const completedDiagnostics = new Set(diagnosticsInScope.filter((item) => isCompleteStatus(item.recordStatus)).map((item) => item.countryId)).size;

  const expectedAnnexes = viewRegions.size;
  const startedAnnexes = new Set(annexesInScope.map((item) => item.regionName)).size;
  const completedAnnexes = new Set(annexesInScope.filter((item) => isCompleteStatus(item.status)).map((item) => item.regionName)).size;

  const expectedTaCoverage = vm.countries.length;
  const startedTaCoverage = new Set(taPackagesInScope.map((item) => item.countryId)).size;
  const completedTaCoverage = new Set(
    taPackagesInScope
      .filter((item) => isCompleteStatus(item.status) || (item.endDate && new Date(item.endDate) < asOfDate))
      .map((item) => item.countryId)
  ).size;
  const approvedTaCount = taPackagesInScope.filter((item) => String(item.approvalStatus || "").toLowerCase() === "approved").length;
  const completedTaCount = taPackagesInScope.filter((item) => isCompleteStatus(item.status) || (item.endDate && new Date(item.endDate) < asOfDate)).length;
  const inProgressTaCount = Math.max(0, taPackagesInScope.length - completedTaCount);
  const taStatusRows = taPackagesInScope
    .map((item) => {
      const completed = isCompleteStatus(item.status) || (item.endDate && new Date(item.endDate) < asOfDate);
      return {
        id: item.id,
        countryName: vm.cMap[item.countryId]?.name || item.countryId,
        status: completed ? "Completed" : "In Progress"
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
  const blockerCount = activities.filter((item) => item.blocker).length;
  const implementationInsights = renderInsightStrip("Implementation Snapshot", [
    { label: "Country", value: vm.selectedCountry.name, tone: "neutral" },
    { label: "Forms Completed", value: `${completedDiagnostics + completedAnnexes + completedTaCoverage}`, tone: "focus" },
    { label: "TA Approved", value: approvedTaCount, tone: "focus" },
    { label: "Active Blockers", value: blockerCount, tone: blockerCount ? "alert" : "calm" },
    { label: "TA In Progress", value: inProgressTaCount, tone: "neutral" }
  ]);
  return `
    <section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2></div>
      ${phaseRibbon(vm.selectedCountry.currentPhaseId)}
      ${implementationInsights}
      <article class="subpanel">
        <h3>${labels.formsProgressTitle}</h3>
        <div class="kpi-grid">
          ${renderFormProgressCard("Country Diagnostics", startedDiagnostics, completedDiagnostics, expectedDiagnostics, "x out of y countries")}
          ${renderFormProgressCard("Regional Annex", startedAnnexes, completedAnnexes, expectedAnnexes, "x out of y regions")}
          ${renderFormProgressCard("TA Packages", startedTaCoverage, completedTaCoverage, expectedTaCoverage, "x out of y countries")}
          <article class="kpi-card progress-kpi-card">
            <div class="kpi-label">${labels.taApprovalTitle}</div>
            <div class="kpi-value">${approvedTaCount}</div>
            <div class="kpi-meta">Approved out of ${taPackagesInScope.length} in current view</div>
            <div class="mini-progress-stack">
              <div class="mini-progress-line">
                <span class="mini-progress-label">Approved</span>
                <div class="progress-track"><span style="width:${ratioPct(approvedTaCount, taPackagesInScope.length)}%"></span></div>
                <strong>${approvedTaCount}/${taPackagesInScope.length}</strong>
              </div>
              <div class="mini-progress-line">
                <span class="mini-progress-label">In Progress</span>
                <div class="progress-track"><span style="width:${ratioPct(inProgressTaCount, taPackagesInScope.length)}%"></span></div>
                <strong>${inProgressTaCount}/${taPackagesInScope.length}</strong>
              </div>
            </div>
          </article>
        </div>
      </article>
      <div class="two-col">
        <article class="subpanel">
          <h3>${labels.taStatusTitle}</h3>
          ${
            taStatusRows.length
              ? barSeries([
                  { label: "In Progress", value: inProgressTaCount },
                  { label: "Completed", value: completedTaCount }
                ])
              : "<p class=\"empty-state\">No TA packages in the current filter scope.</p>"
          }
        </article>
        <article class="subpanel">
          <h3>Status List (Unique Number)</h3>
          ${
            taStatusRows.length
              ? `<ul class="status-id-list">${taStatusRows
                  .map((row) => `<li><span>${row.id}</span><span>${row.countryName}</span><span class="status-chip ${pickStatusClass(row.status)}">${row.status}</span></li>`)
                  .join("")}</ul>`
              : "<p class=\"empty-state\">No TA package IDs available in this view.</p>"
          }
        </article>
      </div>
      <div class="two-col">
        ${
          show.cycles
            ? `<article class="subpanel"><h3>${labels.cyclesTitle}</h3>${cycles.map((cycle) => `<div class="progress-row"><span>${cycle.id}</span><div class="progress-track"><span style="width:${cycle.progressPct}%"></span></div><strong>${cycle.progressPct}%</strong></div>`).join("")}</article>`
            : ""
        }
        ${
          show.blockers
            ? `<article class="subpanel"><h3>${labels.blockersTitle}</h3><ul class="compact-list">${activities.filter((item) => item.blocker).map((item) => `<li>${item.blocker}</li>`).join("") || "<li>No active blockers logged.</li>"}</ul></article>`
            : ""
        }
      </div>
      <div class="two-col">
        ${
          show.completion
            ? `<article class="subpanel">
          <h3>${labels.completionTitle}</h3>
          ${barSeries(
            Object.entries(
              activities.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1;
                return acc;
              }, {})
            ).map(([label, value]) => ({ label, value }))
          )}
        </article>`
            : ""
        }
        ${
          show.outcomes
            ? `<article class="subpanel"><h3>${labels.outcomesTitle}</h3>${barSeries(indicators.map((item) => ({ label: item.indicator, value: Math.max(0, item.current - item.baseline) })))}</article>`
            : ""
        }
        ${
          show.lessons
            ? `<article class="subpanel"><h3>${labels.lessonsTitle}</h3><ul class="compact-list">${lessons.map((lesson) => `<li>${lesson.lesson}<br><small>${lesson.bestPractice}</small></li>`).join("") || "<li>No lessons logged yet.</li>"}</ul></article>`
            : ""
        }
      </div>
      <div class="two-col">
        <article class="subpanel">
          <h3>${labels.workflowTitle}</h3>
          ${workflow.map((item) => `<div class="progress-row"><span>${vm.cMap[item.countryId].name}</span><div class="progress-track"><span style="width:${item.completionPct}%"></span></div><strong>${item.completionPct}%</strong></div>`).join("")}
        </article>
        <article class="subpanel"><h3>${labels.referencesTitle}</h3><ul class="compact-list"><li>Country Diagnostic Template</li><li>Regional Annex Schema</li><li>TA Packet Checklist</li><li>Challenge Taxonomy</li><li>Indicator Definitions</li><li>Data Dictionary + Upload Placeholders</li></ul></article>
      </div>
      <article class="subpanel"><h3>${labels.editsTitle}</h3><ul class="feed-list">${state.data.auditEdits.slice(0, 10).map((item) => `<li><strong>${item.entityType}</strong> - ${item.summary}<br><span>${item.timestamp} | ${item.user}</span></li>`).join("")}</ul></article>
    </section>
    ${
      show.map
        ? renderGeoPanel(labels.mapTitle, vm.currentCountryAdmins, {
            subtitle: "Province-level implementation, monitoring, and risk context",
            layers: ["Progress status", "Issue hotspots", "Partner engagement", "Surveillance quality"],
            mapId: "map-implementation-country",
            mapCountryCodes: [countryId]
          })
        : ""
    }
  `;
}

function renderRegional(state, vm) {
  const annex = vm.selectedAnnex;
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.regional.pageTitle", "Regional Annex"),
    snapshotTitle: getConfigLabel(state, "sectionLabels.regional.snapshotTitle", "Epidemiological Snapshot"),
    crossGapsTitle: getConfigLabel(state, "sectionLabels.regional.crossGapsTitle", "Cross-country Operational Gaps"),
    swotTitle: getConfigLabel(state, "sectionLabels.regional.swotTitle", "SWOT"),
    recommendationsTitle: getConfigLabel(state, "sectionLabels.regional.recommendationsTitle", "Recommended Strategic Solutions by Province"),
    referencesTitle: getConfigLabel(state, "sectionLabels.regional.referencesTitle", "Annex B References"),
    matrixTitle: getConfigLabel(state, "sectionLabels.regional.matrixTitle", "Province-Level Priority Matrix"),
    mapTitle: getConfigLabel(state, "sectionLabels.regional.mapTitle", "Regional Geospatial Comparison")
  };
  const show = {
    meta: getConfigBoolean(state, "visibility.regional.meta", true),
    snapshot: getConfigBoolean(state, "visibility.regional.snapshot", true),
    crossGaps: getConfigBoolean(state, "visibility.regional.crossGaps", true),
    swot: getConfigBoolean(state, "visibility.regional.swot", true),
    recommendations: getConfigBoolean(state, "visibility.regional.recommendations", true),
    references: getConfigBoolean(state, "visibility.regional.references", true),
    matrix: getConfigBoolean(state, "visibility.regional.matrix", true),
    map: getConfigBoolean(state, "visibility.regional.map", true)
  };
  const columnVisibility = {
    country: getConfigBoolean(state, "tableColumns.regionalPriority.country", true),
    province: getConfigBoolean(state, "tableColumns.regionalPriority.province", true),
    type: getConfigBoolean(state, "tableColumns.regionalPriority.type", true),
    risk: getConfigBoolean(state, "tableColumns.regionalPriority.risk", true),
    readiness: getConfigBoolean(state, "tableColumns.regionalPriority.readiness", true),
    flags: getConfigBoolean(state, "tableColumns.regionalPriority.flags", true)
  };
  const gaps = state.data.regionalCrossCountryGaps.filter((item) => item.regionalAnnexId === annex.id);
  const swot = state.data.regionalSwot.filter((item) => item.regionalAnnexId === annex.id);
  const recommendations = state.data.regionalRecommendedSolutions.filter((item) => item.regionalAnnexId === annex.id);
  const admins = state.data.subnational
    .filter((item) => annex.countries.includes(item.countryId))
    .sort((a, b) => b.riskScore - a.riskScore);
  const selectedAdmin = admins.find((item) => item.id === state.selectedAdminUnitId);
  const scopedRecommendations = selectedAdmin ? recommendations.filter((item) => item.adminUnitId === selectedAdmin.id) : recommendations;
  const annexFlagSummary = (annex.countries || []).map((id) => countryFlagEmoji(id)).join(" ");
  const regionalInsights = renderInsightStrip("Regional Snapshot", [
    { label: "Region", value: annex.regionName, tone: "neutral" },
    { label: "Countries", value: `${annex.countries.length} ${annexFlagSummary}`.trim(), tone: "focus" },
    { label: "Priority Provinces", value: admins.length, tone: "focus" },
    { label: "Recommended Actions", value: recommendations.length, tone: "calm" }
  ]);
  return `
    <section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2><div class="panel-actions"><button data-action="add-regional-recommendation" data-id="${annex.id}">Add Recommendation</button></div></div>
      ${regionalInsights}
      ${
        show.meta
          ? `<div class="meta-grid">
        <div><strong>Region:</strong> ${annex.regionName}</div>
        <div><strong>Countries:</strong> ${annex.countries.map((id) => vm.cMap[id].name).join(", ")}</div>
        <div><strong>Epi Bloc Flags:</strong> ${renderCountryFlagList(annex.countries, vm.cMap)}</div>
        <div><strong>Total under-5:</strong> ${annex.totalUnder5.toLocaleString()}</div>
        <div><strong>Virus Groups:</strong> ${annex.virusEmergenceGroups}</div>
        <div><strong>Map Level:</strong> ADM1 province/state/gov layer</div>
        <div><strong>Map Selection:</strong> ${selectedAdmin ? `${selectedAdmin.name} (${vm.cMap[selectedAdmin.countryId].name})` : "All mapped provinces"}</div>
      </div>`
          : ""
      }
      <div class="two-col">
        ${
          show.snapshot
            ? `<article class="subpanel">
          <h3>${labels.snapshotTitle}</h3>
          <label>Epidemiological Snapshot<textarea rows="4" data-edit-collection="regionalAnnexes" data-id="${annex.id}" data-field="epiSnapshot">${safe(annex.epiSnapshot)}</textarea></label>
          <label>Identified Challenges<textarea rows="4" data-edit-collection="regionalAnnexes" data-id="${annex.id}" data-field="identifiedChallenges">${safe(annex.identifiedChallenges)}</textarea></label>
          ${
            (annex.quantitativeHighlights || []).length
              ? `<h4>Quantitative Highlights</h4><ul class="compact-list">${annex.quantitativeHighlights.map((item) => `<li>${item}</li>`).join("")}</ul>`
              : ""
          }
          ${
            (annex.qualitativeFindings || []).length
              ? `<h4>Qualitative Findings</h4><ul class="compact-list">${annex.qualitativeFindings.map((item) => `<li>${item}</li>`).join("")}</ul>`
              : ""
          }
        </article>`
            : ""
        }
        ${
          show.crossGaps
            ? `<article class="subpanel">
          <h3>${labels.crossGapsTitle}</h3>
          <ul class="compact-list">${gaps.map((gap) => `<li>${vm.cMap[gap.countryId].name}: ${gap.gapSummary}</li>`).join("")}</ul>
          <div class="repeatable-editor">
            ${gaps.map((gap) => `
              <div class="repeatable-row">
                <select data-edit-collection="regionalCrossCountryGaps" data-id="${gap.id}" data-field="severity">
                  <option value="High" ${gap.severity === "High" ? "selected" : ""}>High</option>
                  <option value="Medium" ${gap.severity === "Medium" ? "selected" : ""}>Medium</option>
                  <option value="Low" ${gap.severity === "Low" ? "selected" : ""}>Low</option>
                </select>
                <input data-edit-collection="regionalCrossCountryGaps" data-id="${gap.id}" data-field="gapSummary" value="${safe(gap.gapSummary)}">
                <span></span>
              </div>
            `).join("")}
          </div>
        </article>`
            : ""
        }
      </div>
      <div class="two-col">
        ${
          show.swot ? `<article class="subpanel"><h3>${labels.swotTitle}</h3><ul class="compact-list">${swot.map((row) => `<li><strong>${row.type}:</strong> ${row.text}</li>`).join("")}</ul></article>` : ""
        }
        ${
          show.recommendations
            ? `<article class="subpanel"><h3>${labels.recommendationsTitle}</h3><ul class="compact-list">${
          scopedRecommendations
            .map((row) => {
              const solutionName = state.data.solutions.find((item) => item.id === row.solutionId)?.name || row.solutionId;
              const recommendationLabel = row.recommendation || solutionName;
              const sourceLabel = row.sourceReference ? `<br><small>${row.sourceReference}</small>` : "";
              return `<li>${vm.cMap[row.countryId].name} | ${row.adminUnitName || row.adminUnitId} (${row.adminType || "ADM1"}): ${recommendationLabel}${sourceLabel}</li>`;
            })
            .join("") || "<li>No recommendations for current map selection.</li>"
        }</ul>
        <div class="repeatable-editor">
          ${scopedRecommendations.map((row) => `
            <div class="repeatable-row">
              <input data-edit-collection="regionalRecommendedSolutions" data-id="${row.id}" data-field="timeframe" value="${safe(row.timeframe)}">
              <textarea rows="2" data-edit-collection="regionalRecommendedSolutions" data-id="${row.id}" data-field="recommendation">${safe(row.recommendation || "")}</textarea>
              <button data-action="delete-regional-recommendation" data-id="${row.id}" title="Delete recommendation">Delete</button>
            </div>
          `).join("")}
        </div>
        </article>`
            : ""
        }
      </div>
      ${
        show.references && (annex.sourceReferences || []).length
          ? `<article class="subpanel"><h3>${labels.referencesTitle}</h3><ul class="compact-list">${annex.sourceReferences.map((item) => `<li>${item}</li>`).join("")}</ul></article>`
          : ""
      }
      ${
        show.matrix
          ? `<article class="subpanel">
        <h3>${labels.matrixTitle}</h3>
        <table class="matrix-table">
          <thead>
            <tr>
              ${columnVisibility.country ? "<th>Country</th>" : ""}
              ${columnVisibility.province ? "<th>Province/State</th>" : ""}
              ${columnVisibility.type ? "<th>Type</th>" : ""}
              ${columnVisibility.risk ? "<th>Risk</th>" : ""}
              ${columnVisibility.readiness ? "<th>Readiness</th>" : ""}
              ${columnVisibility.flags ? "<th>Flags</th>" : ""}
            </tr>
          </thead>
          <tbody>
            ${admins
              .map(
                (admin) => `
              <tr class="${state.selectedAdminUnitId === admin.id ? "selected" : ""}">
                ${columnVisibility.country ? `<td>${vm.cMap[admin.countryId].name}</td>` : ""}
                ${columnVisibility.province ? `<td>${admin.name}</td>` : ""}
                ${columnVisibility.type ? `<td>${admin.adminType || "ADM1"}</td>` : ""}
                ${columnVisibility.risk ? `<td>${admin.riskScore}</td>` : ""}
                ${columnVisibility.readiness ? `<td>${admin.readiness}</td>` : ""}
                ${columnVisibility.flags ? `<td>${admin.silentDistrict ? "Silent " : ""}${admin.mobilityCorridor ? "Mobility " : ""}${admin.crossBorderZone ? "Cross-border" : ""}</td>` : ""}
              </tr>
            `
              )
              .join("")}
            </tbody>
        </table>
      </article>`
          : ""
      }
    </section>
    ${
      show.map
        ? renderGeoPanel(labels.mapTitle, admins, {
            subtitle: `${annex.regionName}: province-level geographies aligned to Annex B priorities`,
            layers: ["Silent districts", "ES site performance", "High-risk districts", "Mobile corridors", "IDP routes", "Cross-border zones"],
            mapId: "map-regional-annex",
            mapCountryCodes: annex.countries
          })
        : ""
    }
  `;
}

function renderTools(state, vm) {
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.tools.pageTitle", "Tools"),
    workflowTitle: getConfigLabel(state, "sectionLabels.tools.workflowTitle", "Form Completion & Workflow Tracker"),
    referencesTitle: getConfigLabel(state, "sectionLabels.tools.referencesTitle", "Reference Utilities"),
    editsTitle: getConfigLabel(state, "sectionLabels.tools.editsTitle", "Recent Edits")
  };
  const workflow = state.data.workflowStatus.filter((item) => vm.countries.some((country) => country.id === item.countryId));
  return `
    <section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2></div>
      <div class="two-col">
        <article class="subpanel"><h3>${labels.workflowTitle}</h3>${workflow.map((item) => `<div class="progress-row"><span>${vm.cMap[item.countryId].name}</span><div class="progress-track"><span style="width:${item.completionPct}%"></span></div><strong>${item.completionPct}%</strong></div>`).join("")}</article>
        <article class="subpanel"><h3>${labels.referencesTitle}</h3><ul class="compact-list"><li>Country Diagnostic Template</li><li>Regional Annex Schema</li><li>TA Packet Checklist</li><li>Challenge Taxonomy</li><li>Indicator Definitions</li><li>Data Dictionary + Upload Placeholders</li></ul></article>
      </div>
      <article class="subpanel"><h3>${labels.editsTitle}</h3><ul class="feed-list">${state.data.auditEdits.slice(0, 10).map((item) => `<li><strong>${item.entityType}</strong> - ${item.summary}<br><span>${item.timestamp} | ${item.user}</span></li>`).join("")}</ul></article>
    </section>
  `;
}

function renderHumanitarianIntel(state, vm) {
  const migrationTracker = getMigrationTrackerState(state);
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.humanitarianIntel.pageTitle", "Humanitarian Intelligence"),
    subtitle: getConfigLabel(
      state,
      "sectionLabels.humanitarianIntel.subtitle",
      "WWW (Where-Who-What) province-level humanitarian actor footprint, as of 2026"
    ),
    mapTitle: getConfigLabel(state, "sectionLabels.humanitarianIntel.mapTitle", "WWW Province Map")
  };
  const showMaps = getConfigBoolean(state, "visibility.humanitarianIntel.maps", true);
  const showMatrix = getConfigBoolean(state, "visibility.humanitarianIntel.matrix", true);
  const filteredCountries = vm.countries || [];
  const countrySpecs = filteredCountries.map((country) =>
    buildHumanitarianCountrySpec(state, country, `map-humanitarian-country-${String(country.id || "").toLowerCase()}`)
  );
  const scopeCountryCodes = filteredCountries.map((country) => country.id);
  const scopeCountrySet = new Set(scopeCountryCodes);
  const actorRecords2026 = (state.data.humanitarianPresence || []).filter(
    (row) => Number(row.year) === 2026 && (!scopeCountrySet.size || scopeCountrySet.has(row.countryId))
  ).length;
  const totalMappedProvinces = countrySpecs.reduce((total, spec) => total + spec.tableRows.length, 0);
  const coverageLabel = filteredCountries.length
    ? filteredCountries.map((country) => country.name).join(", ")
    : "No countries in current filter scope";
  const humanitarianInsights = renderInsightStrip("WWW Snapshot", [
    { label: "As of Date", value: "2026-03-31", tone: "neutral" },
    { label: "Countries in Filter", value: filteredCountries.length, tone: "focus" },
    { label: "Mapped Provinces", value: totalMappedProvinces, tone: "focus" },
    { label: "Actor Activity Records", value: actorRecords2026, tone: "calm" }
  ]);
  const borderCrossingSourcesPanel = `
    <section class="panel">
      <div class="panel-header">
        <h3>Border Crossing Sources</h3>
        <span class="panel-subtitle">Recommended source hierarchy for country border crossing context</span>
      </div>
      <div class="two-col">
        <article class="subpanel">
          <h3>Primary Source</h3>
          <ul class="compact-list">
            <li>National immigration or border police administrative systems (official country records).</li>
            <li>Most reliable for formal points of entry and official crossing counts.</li>
            <li>Use country-specific reporting cadence and metadata standards.</li>
          </ul>
        </article>
        <article class="subpanel">
          <h3>Public Cross-Country Source</h3>
          <ul class="compact-list">
            <li>IOM DTM Flow Monitoring for harmonized public movement context.</li>
            <li>Best for multi-country comparability when official country extracts are unavailable.</li>
            <li>Not real-time; coverage varies by location and operational activation.</li>
          </ul>
        </article>
      </div>
      <ul class="compact-list source-link-list">
        <li><a href="https://dtm.iom.int/flow-monitoring" target="_blank" rel="noopener noreferrer">IOM DTM Flow Monitoring Portal</a></li>
        <li><a href="${safe(migrationTracker.iom?.sourceUrl || "#")}" target="_blank" rel="noopener noreferrer">IOM DTM data service used in this app</a></li>
        <li><a href="${safe(migrationTracker.iom?.methodologyUrl || "https://dtm.iom.int/about/methodological-framework")}" target="_blank" rel="noopener noreferrer">IOM DTM methodological framework</a></li>
      </ul>
      <p class="chart-foot">Last source refresh in this app: ${safe(migrationTracker.fetchedAtUtc ? migrationTracker.fetchedAtUtc.slice(0, 19).replace("T", " ") : "N/A")} UTC. Border crossing context should be interpreted as periodic reporting, not real-time.</p>
    </section>
  `;

  return `
    ${renderSummarySnapshot(state, {
      title: "Strategic Resource Summary",
      subtitle: "Moved from Summary tab; source: Strategic.Innovations.Worksheet_2.25.2026.xlsx"
    })}
    ${renderMigrationTrackerPanel(state, scopeCountryCodes, {
      title: "Migration and Displacement Tracker",
      subtitle: "Province-linked displacement context for humanitarian planning (official public sources)."
    })}
    ${borderCrossingSourcesPanel}
    <section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2><span class="panel-subtitle">${labels.subtitle}</span></div>
      <div class="meta-grid">
        <div><strong>As of:</strong> 2026-03-31</div>
        <div><strong>Coverage:</strong> ${coverageLabel}</div>
        <div><strong>Level:</strong> Province/State/Governorate (ADM1)</div>
      </div>
      ${humanitarianInsights}
    </section>
    ${
      showMaps
        ? `<div class="humanitarian-grid">
      ${
        countrySpecs.length
          ? countrySpecs
        .map(
          (spec) => `
        <article class="map-region-card">
          ${renderGeoPanel(`${spec.displayName} ${labels.mapTitle}`, spec.appAdmins, {
            subtitle: "WWW map view: Where, Who, What by province (2026)",
            layers: ["Where: province footprint", "Who: active actor count", "What: activity lines", "Status: active operations"],
            mapId: spec.mapId,
            mapCountryCodes: spec.countryCodes
          })}
          ${
            showMatrix
              ? `<section class="subpanel">
              <h3>${spec.displayName} Where-Who-What Matrix</h3>
              <table class="matrix-table humanitarian-matrix-table">
                <thead>
                  <tr><th>Where (Province)</th><th>Who (Actors)</th><th>What (Activity Lines)</th></tr>
                </thead>
                <tbody>
                  ${
                    spec.tableRows
                      .map((row) => {
                        const countryName = vm.cMap[row.countryId]?.name || row.countryId;
                        return `<tr><td><strong>${row.adminName}</strong><br><small>${countryName}</small></td><td>${row.who}</td><td>${row.what}</td></tr>`;
                      })
                      .join("") || "<tr><td colspan='3'>No provincial actor records available for this country.</td></tr>"
                  }
                </tbody>
              </table>
            </section>`
              : ""
          }
        </article>
      `
        )
        .join("")
          : `<article class="subpanel"><h3>No Countries in Current Filter</h3><p class="empty-state">Adjust filters and click Apply to load country-level humanitarian maps.</p></article>`
      }
    </div>`
        : ""
    }
  `;
}

function renderWorkstreamFramework(state) {
  const labels = {
    pageTitle: getConfigLabel(state, "sectionLabels.framework.pageTitle", "Workstream Framework"),
    objectiveTitle: getConfigLabel(state, "sectionLabels.framework.objectiveTitle", "Workstream Objective"),
    sopTitle: getConfigLabel(state, "sectionLabels.framework.sopTitle", "SOP (Country-by-Country Review)"),
    deliverablesTitle: getConfigLabel(state, "sectionLabels.framework.deliverablesTitle", "Core Deliverables"),
    criteriaTitle: getConfigLabel(state, "sectionLabels.framework.criteriaTitle", "Strategic Solution Selection Criteria"),
    challengeTitle: getConfigLabel(state, "sectionLabels.framework.challengeTitle", "Priority Operational Challenge Categories"),
    phaseTitle: getConfigLabel(state, "sectionLabels.framework.phaseTitle", "Phased Introduction Focus")
  };
  const show = {
    hero: getConfigBoolean(state, "visibility.framework.hero", true),
    objective: getConfigBoolean(state, "visibility.framework.objective", true),
    sop: getConfigBoolean(state, "visibility.framework.sop", true),
    deliverables: getConfigBoolean(state, "visibility.framework.deliverables", true),
    criteria: getConfigBoolean(state, "visibility.framework.criteria", true),
    challenge: getConfigBoolean(state, "visibility.framework.challenge", true),
    phase: getConfigBoolean(state, "visibility.framework.phase", true)
  };
  const workflowGraphicPath = "./public/graphics/ssw-workstream-flow.svg";

  return `
    ${
      show.hero
        ? `<section class="panel framework-hero-panel">
      <div class="panel-header">
        <h2>Workflow Snapshot</h2>
        <span class="panel-subtitle">Strategic Solutions Workstream operating model</span>
      </div>
      <div class="framework-hero-media">
        <img class="framework-hero-image" src="${safe(workflowGraphicPath)}" alt="Strategic Solutions Workstream flow diagram">
      </div>
    </section>`
        : ""
    }
    ${
      show.objective
        ? `<section class="panel">
      <div class="panel-header"><h2>${labels.pageTitle}</h2><span class="panel-subtitle">Source-aligned summary from Strategic.Innovations.Workstream_2.25.2026.pptx (slides 12, 14, 15, 22, 24, 43)</span></div>
      <article class="subpanel">
        <h3>${labels.objectiveTitle}</h3>
        <p>
          Methodically assess unique and recurring operational challenges and introduce tailored solutions on a country-by-country basis
          to improve GPEI processes and outcomes.
        </p>
        <div class="meta-grid">
          <div><strong>Timeline:</strong> April-December 2026 (9 months)</div>
          <div><strong>Team Model:</strong> Field Epi, Informatics, M&E, GIS (multidisciplinary)</div>
          <div><strong>Operating Cadence:</strong> Multi-stage case review with time-limited TA packets</div>
        </div>
      </article>
    </section>`
        : ""
    }
    <section class="panel">
      <div class="two-col">
        ${
          show.sop
            ? `<article class="subpanel">
          <h3>${labels.sopTitle}</h3>
          <ol class="compact-list">
            <li>Operational research intake: structured country diagnostics and challenge documentation.</li>
            <li>Regional synthesis: annex-level cross-country gaps, SWOT, and geography-specific recommendations.</li>
            <li>Package design: map vetted strategic solutions to subnational operational gaps.</li>
            <li>Approval workflow: present TA packets to PEB leadership and country focal points for sign-off.</li>
            <li>Implementation and learning: coordinate TA delivery and monitor progress for planning cycles.</li>
          </ol>
        </article>`
            : ""
        }
        ${
          show.deliverables
            ? `<article class="subpanel">
          <h3>${labels.deliverablesTitle}</h3>
          <ul class="compact-list">
            <li>Completed country diagnostic sheet per reviewed country.</li>
            <li>Regional annex with cross-country operational analysis.</li>
            <li>Country technical assistance packet with mapped solutions and 60-day implementation focus.</li>
            <li>Approval-ready brief for PEB leadership and country focal points.</li>
            <li>Implementation coordination notes and monitoring feedback loop.</li>
          </ul>
        </article>`
            : ""
        }
      </div>
      <div class="two-col">
        ${
          show.criteria
            ? `<article class="subpanel">
          <h3>${labels.criteriaTitle}</h3>
          <ul class="compact-list">
            <li>Proven effectiveness in field settings.</li>
            <li>Can be designed and implemented with CDC capacity.</li>
            <li>Non-obstructive to existing GPEI processes.</li>
            <li>Cost-effective and scalable.</li>
            <li>Time-limited and aligned with existing policies and transition priorities.</li>
          </ul>
        </article>`
            : ""
        }
        ${
          show.challenge
            ? `<article class="subpanel">
          <h3>${labels.challengeTitle}</h3>
          <ul class="compact-list">
            <li>Mobility, migration, and missed populations.</li>
            <li>Campaign effectiveness constraints.</li>
            <li>Population enumeration gaps.</li>
            <li>Cross-border population and service continuity challenges.</li>
            <li>Delayed AFP reporting and surveillance automation gaps.</li>
          </ul>
        </article>`
            : ""
        }
      </div>
      ${
        show.phase
          ? `<article class="subpanel">
        <h3>${labels.phaseTitle}</h3>
        <ul class="compact-list">
          <li><strong>Phase 1:</strong> Migration data access and in-country referral; digitization of surveillance/campaign forms.</li>
          <li><strong>Phase 2:</strong> Comprehensive outreach with geolocation; cross-border point-of-entry surveillance and vaccination.</li>
          <li><strong>Phase 3:</strong> Surveillance automation for high-risk pathogens; defaulter tracing and RI integration.</li>
        </ul>
      </article>`
          : ""
      }
    </section>
  `;
}

function renderSettings(state) {
  const settings = state.ui.settings;
  const appConfig = getAppConfig(state);
  const navLabelRows = navItems
    .map((item) => {
      const configPath = `navigationLabels.${item.key}`;
      const labelValue = getByPath(appConfig, configPath) ?? item.defaultLabel;
      return `<label>${item.defaultLabel}<input data-config-path="${configPath}" value="${safe(labelValue)}"></label>`;
    })
    .join("");
  const pageCustomizationSections = [
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "overview") || { key: "overview", defaultLabel: "Main Dashboard" }),
      labelPaths: [
        "sectionLabels.overview.regionalMapsTitle",
        "sectionLabels.overview.regionalMapsSubtitle",
        "sectionLabels.overview.pipelineTitle",
        "sectionLabels.overview.challengeTitle"
      ],
      visibilityPaths: [
        "visibility.overview.kpis",
        "visibility.overview.insights",
        "visibility.overview.migrationTracker",
        "visibility.overview.regionalMaps",
        "visibility.overview.pipeline",
        "visibility.overview.challengeDistribution"
      ]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "countryReview") || { key: "countryReview", defaultLabel: "Country Diagnostics" }),
      labelPaths: [
        "sectionLabels.countryReview.pageTitlePrefix",
        "sectionLabels.countryReview.capacityPerformanceTitle",
        "sectionLabels.countryReview.completionTitle",
        "sectionLabels.countryReview.topGapsTitle",
        "sectionLabels.countryReview.stakeholderTitle",
        "sectionLabels.countryReview.dataMissingTitle",
        "sectionLabels.countryReview.mapTitle"
      ],
      visibilityPaths: [
        "visibility.countryReview.meta",
        "visibility.countryReview.reviewDates",
        "visibility.countryReview.formSections",
        "visibility.countryReview.capacityPerformance",
        "visibility.countryReview.completionTracker",
        "visibility.countryReview.topGaps",
        "visibility.countryReview.stakeholders",
        "visibility.countryReview.dataMissing",
        "visibility.countryReview.map"
      ]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "regional") || { key: "regional", defaultLabel: "Regional Annex" }),
      labelPaths: [
        "sectionLabels.regional.pageTitle",
        "sectionLabels.regional.snapshotTitle",
        "sectionLabels.regional.crossGapsTitle",
        "sectionLabels.regional.swotTitle",
        "sectionLabels.regional.recommendationsTitle",
        "sectionLabels.regional.referencesTitle",
        "sectionLabels.regional.matrixTitle",
        "sectionLabels.regional.mapTitle"
      ],
      visibilityPaths: [
        "visibility.regional.meta",
        "visibility.regional.snapshot",
        "visibility.regional.crossGaps",
        "visibility.regional.swot",
        "visibility.regional.recommendations",
        "visibility.regional.references",
        "visibility.regional.matrix",
        "visibility.regional.map"
      ]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "ta") || { key: "ta", defaultLabel: "TA Packages" }),
      labelPaths: [
        "sectionLabels.ta.pageTitle",
        "sectionLabels.ta.selectedSolutionsTitle",
        "sectionLabels.ta.planTitle",
        "sectionLabels.ta.readinessTitle",
        "sectionLabels.ta.riskTitle",
        "sectionLabels.ta.approvalsTitle",
        "sectionLabels.ta.mapTitle"
      ],
      visibilityPaths: [
        "visibility.ta.selectedSolutions",
        "visibility.ta.plan",
        "visibility.ta.scores",
        "visibility.ta.map"
      ]
    },
    {
      title: getNavLabel(
        state,
        navItems.find((item) => item.key === "implementationMe") || { key: "implementationMe", defaultLabel: "Implementation and M&E" }
      ),
      labelPaths: [
        "sectionLabels.implementationMe.pageTitle",
        "sectionLabels.implementationMe.formsProgressTitle",
        "sectionLabels.implementationMe.taApprovalTitle",
        "sectionLabels.implementationMe.taStatusTitle",
        "sectionLabels.implementationMe.cyclesTitle",
        "sectionLabels.implementationMe.blockersTitle",
        "sectionLabels.implementationMe.completionTitle",
        "sectionLabels.implementationMe.outcomesTitle",
        "sectionLabels.implementationMe.lessonsTitle",
        "sectionLabels.implementationMe.mapTitle"
      ],
      visibilityPaths: [
        "visibility.implementationMe.cycles",
        "visibility.implementationMe.blockers",
        "visibility.implementationMe.completion",
        "visibility.implementationMe.outcomes",
        "visibility.implementationMe.lessons",
        "visibility.implementationMe.map"
      ]
    },
    {
      title: getNavLabel(
        state,
        navItems.find((item) => item.key === "humanitarianIntel") || { key: "humanitarianIntel", defaultLabel: "Humanitarian Intelligence" }
      ),
      labelPaths: ["sectionLabels.humanitarianIntel.pageTitle", "sectionLabels.humanitarianIntel.subtitle", "sectionLabels.humanitarianIntel.mapTitle"],
      visibilityPaths: ["visibility.humanitarianIntel.maps", "visibility.humanitarianIntel.matrix"]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "framework") || { key: "framework", defaultLabel: "Workstream Framework" }),
      labelPaths: [
        "sectionLabels.framework.pageTitle",
        "sectionLabels.framework.objectiveTitle",
        "sectionLabels.framework.sopTitle",
        "sectionLabels.framework.deliverablesTitle",
        "sectionLabels.framework.criteriaTitle",
        "sectionLabels.framework.challengeTitle",
        "sectionLabels.framework.phaseTitle"
      ],
      visibilityPaths: [
        "visibility.framework.hero",
        "visibility.framework.objective",
        "visibility.framework.sop",
        "visibility.framework.deliverables",
        "visibility.framework.criteria",
        "visibility.framework.challenge",
        "visibility.framework.phase"
      ]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "solutions") || { key: "solutions", defaultLabel: "Solutions Inventory" }),
      labelPaths: ["sectionLabels.solutions.pageTitle"],
      visibilityPaths: ["visibility.solutions.gallery", "visibility.solutions.evidence"]
    },
    {
      title: getNavLabel(state, navItems.find((item) => item.key === "settings") || { key: "settings", defaultLabel: "Settings" }),
      labelPaths: ["sectionLabels.settings.pageTitle", "sectionLabels.settings.builderTitle"],
      visibilityPaths: []
    }
  ];
  const pageCustomizationHtml = pageCustomizationSections
    .map((section) => {
      const labelRows = (section.labelPaths || [])
        .map((path) => `<label>${formatConfigPathLabel(path)}<input data-config-path="${path}" value="${safe(getByPath(appConfig, path) || "")}"></label>`)
        .join("");
      const visibilityRows = (section.visibilityPaths || [])
        .map(
          (path) =>
            `<label class="toggle-line"><input type="checkbox" data-config-path="${path}" ${getConfigBoolean(state, path, true) ? "checked" : ""}>${formatConfigPathLabel(path)}</label>`
        )
        .join("");
      return `
        <article class="subpanel settings-page-customization">
          <h4>${safe(section.title)}</h4>
          ${labelRows ? `<h5>Section Headers</h5><div class="settings-grid">${labelRows}</div>` : ""}
          ${visibilityRows ? `<h5>Visible Components</h5><div class="settings-grid">${visibilityRows}</div>` : ""}
        </article>
      `;
    })
    .join("");
  const tableColumnPaths = [
    "tableColumns.regionalPriority.country",
    "tableColumns.regionalPriority.province",
    "tableColumns.regionalPriority.type",
    "tableColumns.regionalPriority.risk",
    "tableColumns.regionalPriority.readiness",
    "tableColumns.regionalPriority.flags"
  ];
  const tableColumnRows = tableColumnPaths
    .map(
      (path) =>
        `<label class="toggle-line"><input type="checkbox" data-config-path="${path}" ${getConfigBoolean(state, path, true) ? "checked" : ""}>${formatConfigPathLabel(path)}</label>`
    )
    .join("");
  const kpiOrder = Array.isArray(appConfig?.layout?.overviewKpiOrder) ? appConfig.layout.overviewKpiOrder : overviewKpiDefinitions.map((row) => row.key);
  const kpiRows = kpiOrder
    .map((key, index) => {
      const definition = overviewKpiDefinitions.find((row) => row.key === key);
      if (!definition) return "";
      const visibilityPath = `visibility.overviewKpis.${key}`;
      return `
        <div class="order-row">
          <label class="toggle-line">
            <input type="checkbox" data-config-path="${visibilityPath}" ${getConfigBoolean(state, visibilityPath, true) ? "checked" : ""}>
            <span>${definition.label}</span>
          </label>
          <div class="order-actions">
            <button data-action="config-kpi-move" data-kpi-key="${key}" data-direction="up" ${index === 0 ? "disabled" : ""}>Up</button>
            <button data-action="config-kpi-move" data-kpi-key="${key}" data-direction="down" ${index === kpiOrder.length - 1 ? "disabled" : ""}>Down</button>
          </div>
        </div>
      `;
    })
    .join("");
  const snapshots = Array.isArray(appConfig?.snapshots) ? appConfig.snapshots : [];
  const selectedSnapshotId = snapshots[0]?.id || "";

  return `
    <section class="panel">
      <div class="panel-header"><h2>${getConfigLabel(state, "sectionLabels.settings.pageTitle", "Settings")}</h2></div>
      <div class="form-grid settings-top-grid">
        <label>App Title<input data-setting-field="appTitle" value="${safe(settings.appTitle)}"></label>
        <label>Universal Style
          <select data-setting-field="universalStyle">
            <option value="candyLake" ${settings.universalStyle === "candyLake" ? "selected" : ""}>Candy Lake</option>
            <option value="opsDefault" ${settings.universalStyle === "opsDefault" ? "selected" : ""}>Ops Default</option>
            <option value="meadowGreen" ${settings.universalStyle === "meadowGreen" ? "selected" : ""}>Meadow Green</option>
            <option value="sageCoral" ${settings.universalStyle === "sageCoral" ? "selected" : ""}>Sage Coral</option>
            <option value="civicTeal" ${settings.universalStyle === "civicTeal" ? "selected" : ""}>Civic Teal</option>
          </select>
        </label>
        <label>Theme
          <select data-setting-field="theme">
            <option value="dark" ${settings.theme === "dark" ? "selected" : ""}>Dark</option>
            <option value="light" ${settings.theme === "light" ? "selected" : ""}>Light</option>
          </select>
        </label>
        <label>Color Palette
          <select data-setting-field="colorPalette">
            <option value="candyLake" ${settings.colorPalette === "candyLake" ? "selected" : ""}>Candy Lake</option>
            <option value="opsDefault" ${settings.colorPalette === "opsDefault" ? "selected" : ""}>Ops Default</option>
            <option value="meadowGreen" ${settings.colorPalette === "meadowGreen" ? "selected" : ""}>Meadow Green</option>
            <option value="sageCoral" ${settings.colorPalette === "sageCoral" ? "selected" : ""}>Sage Coral</option>
            <option value="civicTeal" ${settings.colorPalette === "civicTeal" ? "selected" : ""}>Civic Teal</option>
            <option value="custom" ${settings.colorPalette === "custom" ? "selected" : ""}>Custom</option>
          </select>
        </label>
        <label>Font Family
          <select data-setting-field="fontFamily">
            <option value="montserratBaskerville" ${settings.fontFamily === "montserratBaskerville" ? "selected" : ""}>Montserrat + Baskerville</option>
            <option value="modernSans" ${settings.fontFamily === "modernSans" ? "selected" : ""}>Modern Sans</option>
            <option value="abadi" ${settings.fontFamily === "abadi" ? "selected" : ""}>Abadi</option>
            <option value="publicSerif" ${settings.fontFamily === "publicSerif" ? "selected" : ""}>Public Serif</option>
            <option value="humanist" ${settings.fontFamily === "humanist" ? "selected" : ""}>Humanist</option>
          </select>
        </label>
        <label>Accent Color<input type="color" data-setting-field="accentColor" value="${safe(settings.accentColor || "#E82535")}"></label>
        <label>Background Color<input type="color" data-setting-field="backgroundColor" value="${safe(settings.backgroundColor || "#F1F3F5")}"></label>
        <label>Card Style
          <select data-setting-field="cardStyle">
            <option value="flat" ${settings.cardStyle === "flat" ? "selected" : ""}>Flat</option>
            <option value="elevated" ${settings.cardStyle === "elevated" ? "selected" : ""}>Elevated</option>
            <option value="outlined" ${settings.cardStyle === "outlined" ? "selected" : ""}>Outlined</option>
          </select>
        </label>
        <label>Button Style
          <select data-setting-field="buttonStyle">
            <option value="square" ${settings.buttonStyle === "square" ? "selected" : ""}>Square</option>
            <option value="rounded" ${settings.buttonStyle === "rounded" ? "selected" : ""}>Rounded</option>
            <option value="pill" ${settings.buttonStyle === "pill" ? "selected" : ""}>Pill</option>
          </select>
        </label>
        <label>Density
          <select data-setting-field="density">
            <option value="compact" ${settings.density === "compact" ? "selected" : ""}>Compact</option>
            <option value="comfortable" ${settings.density === "comfortable" ? "selected" : ""}>Comfortable</option>
            <option value="spacious" ${settings.density === "spacious" ? "selected" : ""}>Spacious</option>
          </select>
        </label>
        <label>Sidebar Style
          <select data-setting-field="sidebarStyle">
            <option value="minimal" ${settings.sidebarStyle === "minimal" ? "selected" : ""}>Minimal</option>
            <option value="filled" ${settings.sidebarStyle === "filled" ? "selected" : ""}>Filled</option>
            <option value="boxed" ${settings.sidebarStyle === "boxed" ? "selected" : ""}>Boxed</option>
          </select>
        </label>
        <label>Table Style
          <select data-setting-field="tableStyle">
            <option value="clean" ${settings.tableStyle === "clean" ? "selected" : ""}>Clean</option>
            <option value="striped" ${settings.tableStyle === "striped" ? "selected" : ""}>Striped</option>
            <option value="bordered" ${settings.tableStyle === "bordered" ? "selected" : ""}>Bordered</option>
          </select>
        </label>
        <label>Border Radius
          <select data-setting-field="borderRadius">
            <option value="small" ${settings.borderRadius === "small" ? "selected" : ""}>Small</option>
            <option value="medium" ${settings.borderRadius === "medium" ? "selected" : ""}>Medium</option>
            <option value="large" ${settings.borderRadius === "large" ? "selected" : ""}>Large</option>
          </select>
        </label>
      </div>
      <article class="subpanel">
        <h3>How It Works</h3>
        <p>Changes save automatically to your browser local storage and apply immediately without reloading the page.</p>
      </article>
      <article class="subpanel">
        <h3>${getConfigLabel(state, "sectionLabels.settings.builderTitle", "App Builder")}</h3>
        <div class="settings-grid">
          <label>Brand Eyebrow<input data-config-path="branding.eyebrow" value="${safe(getByPath(appConfig, "branding.eyebrow") || "")}"></label>
          <label>Brand Tagline<input data-config-path="branding.tagline" value="${safe(getByPath(appConfig, "branding.tagline") || "")}"></label>
          <label>Logo Path<input data-config-path="branding.logoPath" value="${safe(getByPath(appConfig, "branding.logoPath") || "")}"></label>
        </div>
        <h4>Navigation Labels</h4>
        <div class="settings-grid">${navLabelRows}</div>
        <h4>Overview KPI Order</h4>
        <div class="order-list">${kpiRows}</div>
        <h4>Sidebar Page Sections (Labels + Visibility)</h4>
        ${pageCustomizationHtml}
        <h4>Regional Matrix Columns</h4>
        <div class="settings-grid">${tableColumnRows}</div>
        <h4>Config Snapshots</h4>
        <div class="settings-grid">
          <label>Snapshot Name<input data-config-snapshot-label value=""></label>
          <label>Saved Snapshots
            <select data-config-snapshot-select>
              ${snapshots.length ? snapshots.map((item) => `<option value="${item.id}" ${item.id === selectedSnapshotId ? "selected" : ""}>${item.name}</option>`).join("") : `<option value="">No snapshots yet</option>`}
            </select>
          </label>
        </div>
        <div class="panel-actions">
          <button data-action="save-config-snapshot">Save Snapshot</button>
          <button data-action="apply-config-snapshot" ${selectedSnapshotId ? "" : "disabled"}>Apply Snapshot</button>
          <button data-action="export-app-config">Export Config</button>
          <button data-action="reset-app-config">Reset App Builder</button>
          <label class="inline-file-input">Import Config JSON<input type="file" accept=".json,application/json" data-config-import></label>
        </div>
      </article>
    </section>
  `;
}

function renderPage(state, vm) {
  let content = "";
  if (state.route === "countryReview" || state.route === "countries" || state.route === "diagnostics") {
    content = renderCountryDiagnosticsWorkspace(state, vm);
  } else if (state.route === "summary") {
    content = renderHumanitarianIntel(state, vm);
  } else if (state.route === "framework") {
    content = renderWorkstreamFramework(state);
  } else if (state.route === "solutions") {
    content = renderSolutions(state, vm);
  } else if (state.route === "ta") {
    content = renderTa(state, vm);
  } else if (state.route === "implementationMe" || state.route === "implementation" || state.route === "me") {
    content = renderImplementationMe(state, vm);
  } else if (state.route === "regional") {
    content = renderRegional(state, vm);
  } else if (state.route === "humanitarianIntel") {
    content = renderHumanitarianIntel(state, vm);
  } else if (state.route === "tools") {
    content = renderImplementationMe(state, vm);
  } else if (state.route === "settings") {
    return renderSettings(state);
  } else {
    content = renderOverview(state, vm);
  }

  return `${content}${renderSourceUpdatesPanel(state, vm)}`;
}

function normalizeFilterRoute(route) {
  if (route === "countries" || route === "diagnostics") return "countryReview";
  if (route === "implementation" || route === "me") return "implementationMe";
  if (route === "summary") return "humanitarianIntel";
  if (route === "tools") return "implementationMe";
  return route;
}

function getFilterDefinitions(state) {
  return {
    country: {
      label: "Country",
      options: state.data.countries.map((country) => ({ value: country.id, label: country.name }))
    },
    region: {
      label: "Region",
      options: [...new Set(state.data.countries.map((country) => country.region))].map((value) => ({ value, label: value }))
    },
    dateRange: {
      label: "Date Range",
      options: [
        { value: "last3m", label: "Last 3 Months" },
        { value: "last6m", label: "Last 6 Months" },
        { value: "last12m", label: "Last 12 Months" }
      ]
    },
    epidemiologicProfile: {
      label: "Epi Profile",
      options: state.data.dimensions.epidemiologicProfiles.map((value) => ({ value, label: value }))
    },
    populationType: {
      label: "Population Type",
      options: state.data.dimensions.populationTypes.map((value) => ({ value, label: value }))
    },
    implementationPhase: {
      label: "Implementation Phase",
      options: Object.values(phaseLabels).map((value) => ({ value, label: value }))
    },
    challengeCategory: {
      label: "Challenge Category",
      options: state.data.dimensions.challengeCategories.map((value) => ({ value, label: value }))
    },
    solutionCategory: {
      label: "Solution Category",
      options: state.data.dimensions.solutionTypes.map((value) => ({ value, label: value }))
    },
    approvalStatus: {
      label: "Approval Status",
      options: state.data.dimensions.approvalStatuses.map((value) => ({ value, label: value }))
    },
    interventionCycle: {
      label: "Intervention Cycle",
      options: [...new Set(state.data.taPackages.map((item) => item.interventionCycle))].filter(Boolean).map((value) => ({ value, label: value }))
    },
    partner: {
      label: "Partner",
      options: [...new Set(state.data.taRoles.map((item) => item.stakeholder))].filter(Boolean).map((value) => ({ value, label: value }))
    }
  };
}

function renderFilterOptions(label, key, options, current, appliedCurrent) {
  const normalizedOptions = (options || [])
    .map((option) => (typeof option === "object" && option !== null ? option : { value: option, label: option }))
    .filter((option) => option.value !== undefined && option.value !== null);
  const uniqueOptions = [];
  const seen = new Set();
  normalizedOptions.forEach((option) => {
    const value = String(option.value);
    if (seen.has(value)) return;
    seen.add(value);
    uniqueOptions.push({ value, label: String(option.label ?? option.value) });
  });
  const isPending = String(current ?? "all") !== String(appliedCurrent ?? "all");
  return `
    <label class="${isPending ? "pending-change" : ""}">
      ${label}
      <select data-filter="${key}">
        <option value="all">All</option>
        ${uniqueOptions.map((option) => `<option value="${safe(option.value)}" ${String(current) === String(option.value) ? "selected" : ""}>${safe(option.label)}</option>`).join("")}
      </select>
    </label>
  `;
}

function getHeaderTitle(state, vm) {
  const route = state.route;
  if (route === "countryReview" || route === "countries" || route === "diagnostics") {
    return `${getConfigLabel(state, "navigationLabels.countryReview", "Country Diagnostics")} | ${countryFlagEmoji(vm.selectedCountry.id)} ${vm.selectedCountry.name}`;
  }
  if (route === "regional") {
    const flags = (vm.selectedAnnex?.countries || []).map((id) => countryFlagEmoji(id)).join(" ");
    return `${getConfigLabel(state, "navigationLabels.regional", "Regional Annex")} | ${vm.selectedAnnex.regionName}${flags ? ` | ${flags}` : ""}`;
  }
  if (route === "ta") {
    return `${getConfigLabel(state, "navigationLabels.ta", "TA Packages")} | ${vm.cMap[vm.selectedTaPackage.countryId]?.name || vm.selectedCountry.name}`;
  }
  if (route === "implementationMe" || route === "implementation" || route === "me") {
    return `${getConfigLabel(state, "navigationLabels.implementationMe", "Implementation and M&E")} | ${vm.selectedCountry.name}`;
  }
  if (route === "humanitarianIntel") return getConfigLabel(state, "navigationLabels.humanitarianIntel", "Humanitarian Intelligence");
  if (route === "summary") return getConfigLabel(state, "navigationLabels.humanitarianIntel", "Humanitarian Intelligence");
  if (route === "framework") return getConfigLabel(state, "navigationLabels.framework", "Workstream Framework");
  if (route === "solutions") return getConfigLabel(state, "navigationLabels.solutions", "Solutions Inventory");
  if (route === "tools") return getConfigLabel(state, "navigationLabels.implementationMe", "Implementation and M&E");
  if (route === "settings") return getConfigLabel(state, "navigationLabels.settings", "Settings");
  return getConfigLabel(state, "navigationLabels.overview", "Main Dashboard");
}

function shouldShowPhaseInHeader(route) {
  return route === "ta" || route === "implementationMe" || route === "implementation" || route === "me";
}

function getRouteHeadingClass(route) {
  if (route === "countryReview" || route === "countries" || route === "diagnostics") return "heading-country";
  if (route === "regional") return "heading-regional";
  if (route === "ta") return "heading-ta";
  if (route === "humanitarianIntel") return "heading-humanitarian";
  if (route === "framework") return "heading-humanitarian";
  return "";
}

function getRouteIconKey(route) {
  if (route === "overview") return "dashboard";
  if (route === "countryReview" || route === "countries" || route === "diagnostics") return "country";
  if (route === "regional") return "regional";
  if (route === "ta") return "ta";
  if (route === "implementationMe" || route === "implementation" || route === "me") return "implementation";
  if (route === "humanitarianIntel" || route === "summary") return "humanitarian";
  if (route === "framework") return "framework";
  if (route === "solutions") return "solutions";
  if (route === "settings") return "settings";
  return "default";
}

function getIconKeyFromTitle(title) {
  const normalized = String(title || "").trim().toLowerCase();
  if (!normalized) return "default";
  if (normalized.includes("main dashboard") || normalized.includes("overview")) return "dashboard";
  if (normalized.includes("country-by-country")) return "country";
  if (normalized.includes("country diagnostics") || normalized.includes("country diagnostic") || normalized.includes("country review")) return "country";
  if (normalized.includes("regional annex")) return "regional";
  if (normalized.includes("ta package") || normalized.includes("technical assistance")) return "ta";
  if (normalized.includes("implementation") || normalized.includes("workflow") || normalized.includes("monitoring")) return "implementation";
  if (normalized.includes("humanitarian")) return "humanitarian";
  if (normalized.includes("framework") || normalized.includes("sop")) return "framework";
  if (normalized.includes("solution")) return "solutions";
  if (normalized.includes("setting")) return "settings";
  if (normalized.includes("data source update")) return "updates";
  if (normalized.includes("internal tracker")) return "tracker";
  if (normalized.includes("strategic resources")) return "resources";
  return "default";
}

function setIconLabel(element, iconKey) {
  if (!element || element.dataset.iconDecorated === "true") return;
  const label = String(element.textContent || "").trim();
  if (!label) return;
  const svg = headerIconSvgs[iconKey] || headerIconSvgs.default;
  element.innerHTML = `
    <span class="ui-label-with-icon">
      <span class="ui-title-icon" aria-hidden="true">${svg}</span>
      <span class="ui-label-text">${safe(label)}</span>
    </span>
  `;
  element.dataset.iconDecorated = "true";
}

function decorateHeaderIcons(rootElement) {
  if (!rootElement) return;

  rootElement.querySelectorAll(".nav-link[data-route]").forEach((element) => {
    setIconLabel(element, getRouteIconKey(element.dataset.route));
  });

  const headingSelectors = [".ops-header .context h2", ".panel-header h2", ".panel-header h3"];
  rootElement.querySelectorAll(headingSelectors.join(",")).forEach((element) => {
    setIconLabel(element, getIconKeyFromTitle(element.textContent));
  });
}

function decorateEditableFields(rootElement) {
  if (!rootElement) return;

  const editableControlSelector = [
    "input[data-edit-collection]",
    "select[data-edit-collection]",
    "textarea[data-edit-collection]",
    "input[data-config-path]",
    "select[data-config-path]",
    "textarea[data-config-path]",
    "input[data-setting-field]",
    "select[data-setting-field]",
    "textarea[data-setting-field]",
    "input[data-approval-checklist-id]",
    "input[data-config-snapshot-label]",
    "select[data-config-snapshot-select]"
  ].join(",");

  rootElement.querySelectorAll(editableControlSelector).forEach((control) => {
    if (!(control instanceof Element)) return;
    if (control.hasAttribute("disabled")) return;
    if (control.tagName === "INPUT" && String(control.getAttribute("type") || "").toLowerCase() === "color") return;
    control.classList.add("editable-field");
  });

  const editableHostSelector = [
    "[data-edit-collection]",
    "[data-config-path]",
    "[data-setting-field]",
    "[data-approval-checklist-id]",
    "[data-config-snapshot-label]",
    "[data-config-snapshot-select]"
  ].join(",");

  rootElement.querySelectorAll(editableHostSelector).forEach((control) => {
    if (!(control instanceof Element)) return;
    if (control.hasAttribute("disabled")) return;
    const host = control.closest("label, .approval-checklist-item, td, .repeatable-row, .timeline-item");
    if (host) host.classList.add("editable-host");
  });
}

function getMigrationOverlayPoints(state, countryCodes = [], maxPoints = 220) {
  const tracker = getMigrationTrackerState(state);
  const codeSet = new Set((countryCodes || []).map((code) => String(code || "").trim().toUpperCase()).filter(Boolean));
  const filtered = (tracker.overlays || []).filter((row) => !codeSet.size || codeSet.has(String(row.countryId || "").toUpperCase()));
  return filtered
    .sort((a, b) => Number(b.totalDisplaced || 0) - Number(a.totalDisplaced || 0))
    .slice(0, maxPoints)
    .map((row) => ({
      id: row.id,
      latitude: row.latitude,
      longitude: row.longitude,
      countryId: row.countryId,
      countryName: row.countryName,
      admin1Name: row.admin1Name,
      admin2Name: row.admin2Name,
      idps: Number(row.idps || 0),
      returnees: Number(row.returnees || 0),
      refugees: Number(row.refugees || 0),
      asylumSeekers: Number(row.asylumSeekers || 0),
      totalDisplaced: Number(row.totalDisplaced || 0),
      snapshotDate: row.snapshotDate || "",
      unhcrYear: Number(row.unhcrYear || 0)
    }));
}

function buildMapSpecs(state, vm) {
  const route = state.route;

  if (route === "overview") {
    if (!getConfigBoolean(state, "visibility.overview.regionalMaps", true)) return [];
    return overviewRegionDefinitions.map(({ regionName, mapId, priorityAdminNames }) => {
      const countryCodes = getOverviewRegionCountryCodes(state, regionName);
      const appAdmins = state.data.subnational.filter((admin) => countryCodes.includes(admin.countryId));
      return {
        mapId,
        level: "admin1",
        countryCodes,
        appAdmins,
        pointOverlays: getMigrationOverlayPoints(state, countryCodes, 240),
        extraAttribution: "Displacement overlays: IOM DTM + UNHCR context",
        priorityAdminNames: Array.isArray(priorityAdminNames) ? priorityAdminNames : []
      };
    });
  }

  if (route === "countryReview" || route === "countries" || route === "diagnostics") {
    if (!getConfigBoolean(state, "visibility.countryReview.map", true)) return [];
    const diagnosticMapAdmins = getDiagnosticMapAdmins(state, vm);
    return [
      {
        mapId: "map-diagnostic-country",
        level: "admin1",
        countryCodes: [vm.selectedCountry.id],
        appAdmins: diagnosticMapAdmins
      },
      {
        mapId: "map-diagnostic-country-static",
        level: "admin1",
        countryCodes: [vm.selectedCountry.id],
        appAdmins: diagnosticMapAdmins,
        interactive: false
      }
    ];
  }

  if (route === "regional") {
    if (!getConfigBoolean(state, "visibility.regional.map", true)) return [];
    const countryCodes = vm.selectedAnnex?.countries || [];
    return [
      {
        mapId: "map-regional-annex",
        level: "admin1",
        countryCodes,
        appAdmins: state.data.subnational.filter((admin) => countryCodes.includes(admin.countryId))
      }
    ];
  }

  if (route === "ta") {
    if (!getConfigBoolean(state, "visibility.ta.map", true)) return [];
    const countryCodes = [vm.selectedTaPackage.countryId];
    return [
      {
        mapId: "map-ta-country",
        level: "admin1",
        countryCodes,
        appAdmins: state.data.subnational.filter((admin) => countryCodes.includes(admin.countryId))
      }
    ];
  }

  if (route === "implementationMe" || route === "implementation" || route === "me") {
    if (!getConfigBoolean(state, "visibility.implementationMe.map", true)) return [];
    return [
      {
        mapId: "map-implementation-country",
        level: "admin1",
        countryCodes: [vm.selectedCountry.id],
        appAdmins: vm.currentCountryAdmins
      }
    ];
  }

  if (route === "humanitarianIntel") {
    if (!getConfigBoolean(state, "visibility.humanitarianIntel.maps", true)) return [];
    return (vm.countries || []).map((country) => {
      const spec = buildHumanitarianCountrySpec(state, country, `map-humanitarian-country-${String(country.id || "").toLowerCase()}`);
      return {
        mapId: spec.mapId,
        level: "admin1",
        countryCodes: spec.countryCodes,
        appAdmins: spec.appAdmins,
        pointOverlays: getMigrationOverlayPoints(state, spec.countryCodes, 260),
        extraAttribution: "Displacement overlays: IOM DTM + UNHCR context"
      };
    });
  }

  return [];
}

function topChallengeLabel(vm) {
  if (!Array.isArray(vm.challengeDistribution) || !vm.challengeDistribution.length) return "No challenge data in current filter view.";
  const top = [...vm.challengeDistribution].sort((a, b) => b.value - a.value)[0];
  return `${top.label} (${top.value}) is currently the largest challenge signal.`;
}

function buildAlfieInsights(state, vm) {
  const route = state.route;
  const insights = [];

  if (route === "overview") {
    insights.push(`Current view includes ${vm.kpis.priorityCountries} priority countries and ${vm.kpis.highRiskProvinces} high-risk provinces.`);
    insights.push(topChallengeLabel(vm));
    insights.push(`${vm.kpis.activeImplementation} active TA implementation cycles are in progress.`);
    return insights;
  }

  if (route === "countryReview" || route === "countries" || route === "diagnostics") {
    const country = vm.selectedCountry;
    const diagnostic = vm.selectedDiagnostic;
    const countryGaps = state.data.diagnosticOperationalGaps.filter((item) => item.countryId === country.id);
    const topGap = countryGaps[0]?.gapSummary || "No operational gap recorded yet.";
    insights.push(`${country.name} diagnostic is ${diagnostic.recordStatus} (${diagnostic.reviewStatus}).`);
    insights.push(`Top immediate gap: ${topGap}`);
    insights.push(`${countryGaps.length} diagnostic gap records are currently tracked for this country.`);
    return insights;
  }

  if (route === "regional") {
    const annex = vm.selectedAnnex;
    const recs = state.data.regionalRecommendedSolutions.filter((item) => item.regionalAnnexId === annex.id);
    insights.push(`${annex.regionName} annex currently tracks ${recs.length} recommended actions.`);
    insights.push(`Region scope includes ${annex.countries.length} countries and ${annex.totalUnder5.toLocaleString()} under-5 population.`);
    insights.push("Use the map click-to-filter to focus recommendations on a single province.");
    return insights;
  }

  if (route === "ta") {
    const ta = vm.selectedTaPackage;
    const approvals = state.data.approvals.filter((item) => item.taPackageId === ta.id);
    const pending = approvals.filter((item) => item.status !== "Approved").length;
    insights.push(`TA package readiness score is ${ta.readinessScore} with risk score ${ta.riskScore}.`);
    insights.push(`${pending} approval checkpoint(s) remain for this package.`);
    insights.push(`Current package targets ${vm.cMap[ta.countryId]?.name || ta.countryId} (${ta.interventionCycle}).`);
    return insights;
  }

  if (route === "implementationMe" || route === "implementation" || route === "me" || route === "tools") {
    const countryId = vm.selectedCountry.id;
    const activities = state.data.implementationActivities.filter((item) => item.countryId === countryId);
    const blockers = activities.filter((item) => item.blocker).length;
    insights.push(`${vm.selectedCountry.name} has ${activities.length} implementation activity records in scope.`);
    insights.push(`${blockers} blocker(s) are currently active and need follow-up.`);
    insights.push("Prioritize provinces with low readiness and high silent-district flags for next check-in.");
    return insights;
  }

  if (route === "humanitarianIntel") {
    const rows = (state.data.humanitarianPresence || []).filter((row) => Number(row.year) === 2026);
    const actorCount = new Set(rows.map((row) => row.actorName)).size;
    insights.push(`Humanitarian Intelligence currently tracks ${rows.length} actor-activity records across 2026.`);
    insights.push(`${actorCount} unique humanitarian actors are mapped at province level.`);
    insights.push("Use the three WWW regional maps to compare where actor density is highest.");
    return insights;
  }

  if (route === "summary") {
    const summary = state.data.solutionSummary || {};
    insights.push(`Workbook summary reports ${summary.solutionCount || 19} selected solutions as of ${summary.asOfDate || "2026-03-30"}.`);
    insights.push(`${summary.remoteCapableCount || 10} solutions are marked as remotely feasible.`);
    insights.push("Selection criteria are aligned to CDC implementation feasibility and GPEI transition constraints.");
    return insights;
  }

  if (route === "solutions") {
    const selected = vm.selectedSolution;
    const remoteCount = state.data.solutions.filter((item) => String(item.remoteCapable || "").toLowerCase() === "yes").length;
    insights.push(`Selected solution: ${selected?.name || "None"} (${selected?.challengeCategory || "N/A"}).`);
    insights.push(`${state.data.solutions.length} total solutions are available in the current inventory.`);
    insights.push(`${remoteCount} solutions are currently flagged as fully remote-capable.`);
    return insights;
  }

  insights.push("Alfie is ready. Switch to a workflow tab to get contextual suggestions.");
  return insights;
}

function normalizeAlfieText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function tokenizeAlfieQuery(query) {
  return normalizeAlfieText(query)
    .split(/[^a-z0-9]+/g)
    .map((token) => token.trim())
    .filter((token) => token.length >= 2);
}

function buildAlfieSearchCorpus(state) {
  const data = state.data || {};
  const cMap = {};
  (data.countries || []).forEach((country) => {
    cMap[country.id] = country;
  });

  const items = [];
  const add = (item) => {
    if (!item || !item.title) return;
    const searchText = normalizeAlfieText([item.title, item.description, item.tags].filter(Boolean).join(" "));
    items.push({
      ...item,
      searchText
    });
  };

  (data.countries || []).forEach((country) => {
    add({
      type: "country",
      route: "countryReview",
      countryId: country.id,
      title: `Country: ${country.name}`,
      description: `Region ${country.region}; Epi ${country.epiProfile}; Priority ${country.priorityStatus}; Phase ${phaseLabels[country.currentPhaseId] || country.currentPhaseId}`,
      tags: "country diagnostics geography phase"
    });
  });

  (data.diagnostics || []).forEach((diag) => {
    const country = cMap[diag.countryId];
    add({
      type: "diagnostic",
      route: "countryReview",
      countryId: diag.countryId,
      diagnosticId: diag.id,
      title: `Diagnostic: ${country?.name || diag.countryId}`,
      description: `${diag.reviewStatus} | ${diag.recordStatus} | readiness ${diag.readinessLevel || "N/A"} | risk ${diag.immediateRiskLevel || "N/A"}`,
      tags: `${diag.top5OperationalGaps || ""} ${diag.requiredDecision || ""}`
    });
  });

  (data.regionalAnnexes || []).forEach((annex) => {
    add({
      type: "annex",
      route: "regional",
      annexId: annex.id,
      title: `Regional Annex: ${annex.regionName}`,
      description: `${annex.timeframe || ""} | countries ${(annex.countries || []).length} | under-5 ${annex.totalUnder5 || ""}`,
      tags: `${annex.identifiedChallenges || ""} ${annex.epiSnapshot || ""}`
    });
  });

  (data.taPackages || []).forEach((packet) => {
    const country = cMap[packet.countryId];
    add({
      type: "ta",
      route: "ta",
      taId: packet.id,
      countryId: packet.countryId,
      title: `TA Package: ${country?.name || packet.countryId}`,
      description: `${packet.taType || ""} | ${packet.approvalStatus || ""} | ${packet.interventionCycle || ""}`,
      tags: `${packet.operationalGapAddressed || ""} ${packet.geographicScope || ""}`
    });
  });

  (data.implementationActivities || []).forEach((activity) => {
    const country = cMap[activity.countryId];
    add({
      type: "implementation",
      route: "implementationMe",
      countryId: activity.countryId,
      title: `Implementation: ${country?.name || activity.countryId}`,
      description: `${activity.category || ""} | ${activity.status || ""} | blocker ${activity.blocker || "none"}`,
      tags: `${activity.activity || ""} ${activity.owner || ""}`
    });
  });

  (data.humanitarianPresence || []).forEach((row) => {
    add({
      type: "humanitarian",
      route: "humanitarianIntel",
      countryId: row.countryId,
      title: `Humanitarian: ${row.adminUnitName || row.adminUnitId}`,
      description: `${row.actorName || ""} | ${row.what || ""} | ${row.whereDetail || ""}`,
      tags: `${row.regionName || ""} ${row.programArea || ""} ${row.status || ""}`
    });
  });

  (data.solutions || []).forEach((solution) => {
    add({
      type: "solution",
      route: "solutions",
      solutionId: solution.id,
      title: `Solution: ${solution.name}`,
      description: `${solution.challengeCategory || ""} | ${solution.solutionType || ""} | evidence ${solution.evidenceStrength || ""}`,
      tags: `${solution.problemAddressed || ""} ${solution.targetPopulation || ""} ${solution.sourceReference || ""}`
    });
  });

  ((data.solutionSummary && data.solutionSummary.metrics) || []).forEach((metric) => {
    add({
      type: "summary",
      route: "summary",
      title: `Summary Metric: ${metric.component}`,
      description: `Value: ${metric.value}`,
      tags: "summary strategic resources selected solutions"
    });
  });

  return items;
}

function runAlfieSearch(state, query) {
  const cleaned = String(query || "").trim();
  if (!cleaned) return [];
  const normalizedQuery = normalizeAlfieText(cleaned);
  const tokens = tokenizeAlfieQuery(cleaned);
  const corpus = buildAlfieSearchCorpus(state);

  const scored = corpus
    .map((item) => {
      let score = 0;
      if (item.searchText.includes(normalizedQuery)) score += 10;
      tokens.forEach((token) => {
        if (item.searchText.includes(token)) score += 2;
        if (normalizeAlfieText(item.title).includes(token)) score += 2;
      });
      return { ...item, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, 10);

  return scored;
}

function renderAlfieAssistant(state, vm, logoPath) {
  const isOpen = Boolean(state.alfieOpen);
  const insights = buildAlfieInsights(state, vm);
  const query = String(state.alfieQuery || "");
  const results = runAlfieSearch(state, query);
  const quickPrompts = [
    "show DRC high-risk provinces",
    "find TA packages with pending approvals",
    "search mobility and migration solutions",
    "which countries are in phase 1"
  ];
  return `
    <div class="alfie-shell ${isOpen ? "open" : ""}">
      ${
        isOpen
          ? `<section class="alfie-panel" aria-live="polite">
          <div class="alfie-panel-head">
            <div class="alfie-title-wrap">
              <img src="${safe(logoPath)}" alt="Alfie logo" class="alfie-panel-logo">
              <div>
                <h3>Alfie</h3>
                <p>AI-generated insights for current view</p>
              </div>
            </div>
            <button data-action="close-alfie" class="alfie-close" aria-label="Close Alfie">Close</button>
          </div>
          <div class="alfie-search">
            <label for="alfie-query-input">Ask Alfie</label>
            <div class="alfie-search-row">
              <input id="alfie-query-input" data-alfie-query type="text" value="${safe(query)}" placeholder="Type request to search across the site...">
              <button data-action="alfie-search">Search</button>
            </div>
            <div class="alfie-quick-prompts">
              ${quickPrompts
                .map(
                  (prompt) =>
                    `<button data-action="alfie-search-suggest" data-query="${safe(prompt)}">${safe(prompt)}</button>`
                )
                .join("")}
            </div>
          </div>
          ${
            query.trim()
              ? `<div class="alfie-results-wrap">
              <div class="alfie-results-head">
                <strong>Results</strong>
                <span>${results.length} match(es) for "${safe(query)}"</span>
                <button data-action="alfie-clear-search" class="alfie-clear">Clear</button>
              </div>
              <ul class="alfie-results">
                ${
                  results.length
                    ? results
                        .map(
                          (item) => `
                    <li>
                      <div class="alfie-result-title">${safe(item.title)}</div>
                      <div class="alfie-result-desc">${safe(item.description || "")}</div>
                      <button
                        data-action="alfie-open-result"
                        data-route="${safe(item.route || "")}"
                        data-country-id="${safe(item.countryId || "")}"
                        data-diagnostic-id="${safe(item.diagnosticId || "")}"
                        data-annex-id="${safe(item.annexId || "")}"
                        data-ta-id="${safe(item.taId || "")}"
                        data-solution-id="${safe(item.solutionId || "")}"
                      >Open</button>
                    </li>
                  `
                        )
                        .join("")
                    : `<li class="alfie-no-results">No matches found. Try another keyword.</li>`
                }
              </ul>
            </div>`
              : ""
          }
          <ul class="alfie-insights">
            ${insights.map((item) => `<li>${safe(item)}</li>`).join("")}
          </ul>
        </section>`
          : ""
      }
      <button class="alfie-bubble" data-action="toggle-alfie" aria-label="Open Alfie assistant">
        <img src="${safe(logoPath)}" alt="Alfie logo">
        <span>Alfie</span>
      </button>
    </div>
  `;
}

function hydrateMaps(state, vm, store) {
  const specs = buildMapSpecs(state, vm);
  specs.forEach((spec) => {
    renderPolioBoundaryMap({
      ...spec,
      selectedAdminUnitId: state.selectedAdminUnitId,
      onFeatureSelect: ({ adminId, countryId }) => {
        const currentState = store.getState();
        if (countryId && currentState.selectedCountryId !== countryId) {
          store.setSelection("selectedCountryId", countryId);
        }
        if (adminId && currentState.selectedAdminUnitId !== adminId) {
          store.setSelection("selectedAdminUnitId", adminId);
        }
      }
    });
  });
}

export function createAppShell(rootElement, store) {
  if (!rootElement) throw new Error("Root application element was not found.");
  let migrationLoadPromise = null;
  const handleFullscreenResize = () => {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      const fullMapNode = fullscreenElement.querySelector?.(".geo-map-canvas[id]");
      if (fullMapNode?.id) {
        setTimeout(() => resizePolioMap(fullMapNode.id), 120);
      }
      return;
    }
    document.querySelectorAll(".geo-map-canvas[id]").forEach((node) => {
      if (node?.id) resizePolioMap(node.id);
    });
  };
  document.addEventListener("fullscreenchange", handleFullscreenResize);

  function refreshMigrationTracker(force = false) {
    if (migrationLoadPromise) return migrationLoadPromise;
    const currentState = store.getState();
    const currentTracker = getMigrationTrackerState(currentState);
    if (!force && currentTracker.status === "ready") return Promise.resolve(currentTracker);

    store.updateData((data) => {
      const previous = data.migrationDisplacement && typeof data.migrationDisplacement === "object" ? data.migrationDisplacement : {};
      data.migrationDisplacement = {
        ...previous,
        status: "loading",
        message: ""
      };
    });

    migrationLoadPromise = loadMigrationDisplacementData({
      countryRows: currentState.data.countries || [],
      subnationalRows: currentState.data.subnational || [],
      force
    })
      .then((payload) => {
        store.updateData((data) => {
          data.migrationDisplacement = payload;
        });
        return payload;
      })
      .catch((error) => {
        const message = String(error?.message || error || "Migration/displacement source refresh failed.");
        store.updateData((data) => {
          data.migrationDisplacement = {
            status: "error",
            fetchedAtUtc: new Date().toISOString(),
            message,
            overlays: [],
            countrySummaries: [],
            regionSummaries: [],
            unhcrByYear: [],
            iom: {},
            unhcr: {}
          };
        });
      })
      .finally(() => {
        migrationLoadPromise = null;
      });

    return migrationLoadPromise;
  }

  function render() {
    const state = store.getState();
    applyUiSettings(state.ui.settings);
    const vm = buildViewModel(state);
    const brandingEyebrow = getConfigLabel(state, "branding.eyebrow", "CDC PEB / GID");
    const brandingTagline = getConfigLabel(
      state,
      "branding.tagline",
      "Country-by-Country Review: Systems-level Operational Intelligence for Polio Response."
    );
    const logoPath = getConfigLabel(state, "branding.logoPath", "./public/brand/ssw-logo.svg");
    const filterRoute = normalizeFilterRoute(state.route);
    const filterDefinitions = getFilterDefinitions(state);
    const relevantFilterKeys = routeFilterKeys[filterRoute] || [];
    const hideGlobalFilters = state.route === "settings" || state.route === "overview" || !relevantFilterKeys.length;
    const pendingFilters = state.pendingFilters || state.filters || {};
    const appliedFilters = state.filters || {};
    const pendingFilterChanges = relevantFilterKeys.filter((key) => String(pendingFilters[key] ?? "all") !== String(appliedFilters[key] ?? "all")).length;
    const activeAppliedFilters = relevantFilterKeys.filter((key) => String(appliedFilters[key] ?? "all") !== "all").length;
    const filterRows = relevantFilterKeys
      .map((key) => {
        const definition = filterDefinitions[key];
        if (!definition) return "";
        return renderFilterOptions(definition.label, key, definition.options, pendingFilters[key] ?? "all", appliedFilters[key] ?? "all");
      })
      .join("");
    const showHeaderContext = state.route !== "overview";
    const sidebarHidden = Boolean(state.sidebarHidden);
    const headerTitle = getHeaderTitle(state, vm);
    const routeHeadingClass = getRouteHeadingClass(state.route);
    const showPhaseInHeader = shouldShowPhaseInHeader(state.route);
    const navLabelLookup = Object.fromEntries(navItems.map((item) => [item.key, getNavLabel(state, item)]));
    const groupedNavHtml = sidebarGroups
      .map((group) => {
        const buttons = group.keys
          .map((key) => {
            const label = navLabelLookup[key];
            if (!label) return "";
            return `<button class="nav-link ${state.route === key ? "active" : ""}" data-route="${key}">${safe(label)}</button>`;
          })
          .join("");
        if (!buttons) return "";
        return `
          <section class="nav-group">
            ${group.subtitle ? `<div class="nav-group-title">${safe(group.subtitle)}</div>` : ""}
            <div class="nav-group-links">${buttons}</div>
          </section>
        `;
      })
      .join("");
    const settingsLabel = navLabelLookup.settings || "Settings";
    resetPolioMaps();
    rootElement.innerHTML = `
      <div class="ops-layout ${sidebarHidden ? "is-sidebar-hidden" : ""}">
        <aside class="ops-sidebar">
          <div class="brand">
            <div class="brand-eyebrow">${safe(brandingEyebrow)}</div>
            <h1>${safe(state.ui.settings.appTitle)}</h1>
            <p class="brand-tagline">${safe(brandingTagline)}</p>
          </div>
          <nav class="sidebar-nav">${groupedNavHtml}</nav>
          <div class="assumption">${state.data.metadata.assumptions}</div>
          <div class="sidebar-settings">
            <button class="nav-link sidebar-toggle-btn" data-action="toggle-sidebar">Hide Sidebar</button>
            <button class="nav-link ${state.route === "settings" ? "active" : ""}" data-route="settings">${safe(settingsLabel)}</button>
          </div>
        </aside>
        <main class="ops-main">
          <header class="ops-header">
            ${
              showHeaderContext
                ? `<div class="context">
              <h2 class="${routeHeadingClass}">${headerTitle}${showPhaseInHeader ? ` | ${phaseLabels[vm.selectedCountry.currentPhaseId]}` : ""}</h2>
              <span class="status-chip ${pickStatusClass(vm.selectedCountry.priorityStatus)}">${vm.selectedCountry.priorityStatus}</span>
              <span class="status-chip">${state.ui.role}</span>
            </div>`
                : `<div></div>`
            }
            <div class="header-actions">
              ${sidebarHidden ? '<button data-action="toggle-sidebar">Show Sidebar</button>' : ""}
              ${hideGlobalFilters ? "" : `<button data-action="reset-filters">Reset Filters</button>`}
              <img class="ops-logo" src="${safe(logoPath)}" alt="Strategic Solutions Workstream logo">
            </div>
          </header>
          ${hideGlobalFilters ? "" : `<section class="global-filters">
            ${filterRows}
            <div class="filter-apply-section">
              <div class="filter-apply-status">${pendingFilterChanges ? `${pendingFilterChanges} pending change(s) ready to apply` : "No pending filter changes"}</div>
              <div class="filter-apply-meta">${activeAppliedFilters} applied filter(s) in this section</div>
              <div class="filter-apply-actions">
                <button data-action="apply-filters" data-filter-scope="${safe(relevantFilterKeys.join(","))}" ${pendingFilterChanges ? "" : "disabled"}>Apply Filters</button>
                <button data-action="discard-filter-changes" data-filter-scope="${safe(relevantFilterKeys.join(","))}" ${pendingFilterChanges ? "" : "disabled"}>Discard Changes</button>
              </div>
            </div>
          </section>`}
          <section class="ops-content">${renderPage(state, vm)}</section>
          ${renderAlfieAssistant(state, vm, logoPath)}
        </main>
      </div>
    `;
    decorateHeaderIcons(rootElement);
    decorateEditableFields(rootElement);
    hydrateMaps(state, vm, store);

    const tracker = getMigrationTrackerState(state);
    if ((!tracker.status || tracker.status === "idle") && !migrationLoadPromise) {
      refreshMigrationTracker(false);
    }
  }

  rootElement.addEventListener("click", (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null;
    if (!clickedElement) return;

    const routeTarget = clickedElement.closest("[data-route]");
    const route = routeTarget?.dataset?.route;
    if (route) return store.setRoute(route);

    const actionTarget = clickedElement.closest("[data-action]");
    const action = actionTarget?.dataset?.action;
    const scopedFilterKeys = String(actionTarget?.dataset?.filterScope || "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (action === "reset-filters") return store.resetFilters();
    if (action === "apply-filters") return store.applyFilters(scopedFilterKeys);
    if (action === "discard-filter-changes") return store.resetPendingFilters(scopedFilterKeys);
    if (action === "toggle-sidebar") return store.setSelection("sidebarHidden", !store.getState().sidebarHidden);
    if (action === "map-fullscreen") {
      const shellId = actionTarget?.dataset?.mapShell;
      const mapId = actionTarget?.dataset?.mapId;
      const shellElement = shellId ? document.getElementById(shellId) : null;
      if (!shellElement) return;
      const resize = () => {
        if (!mapId) return;
        setTimeout(() => resizePolioMap(mapId), 180);
      };
      if (document.fullscreenElement === shellElement) {
        const exitPromise = document.exitFullscreen?.();
        if (exitPromise && typeof exitPromise.then === "function") {
          exitPromise.then(resize).catch(() => {
            /* no-op */
          });
        } else {
          resize();
        }
        return;
      }
      const enterPromise = shellElement.requestFullscreen?.();
      if (enterPromise && typeof enterPromise.then === "function") {
        enterPromise.then(resize).catch(() => {
          /* no-op */
        });
      } else {
        resize();
      }
      return;
    }
    if (action === "refresh-migration-tracker") return refreshMigrationTracker(true);
    if (action === "toggle-alfie") return store.setSelection("alfieOpen", !store.getState().alfieOpen);
    if (action === "close-alfie") return store.setSelection("alfieOpen", false);
    if (action === "alfie-search") {
      const input = rootElement.querySelector("[data-alfie-query]");
      const query = String(input?.value || "").trim();
      return store.setState({ alfieOpen: true, alfieQuery: query });
    }
    if (action === "alfie-search-suggest") {
      const query = String(actionTarget?.dataset?.query || "").trim();
      return store.setState({ alfieOpen: true, alfieQuery: query });
    }
    if (action === "alfie-clear-search") {
      return store.setState({ alfieOpen: true, alfieQuery: "" });
    }
    if (action === "alfie-open-result") {
      const { route: targetRoute, countryId, diagnosticId, annexId, taId, solutionId } = actionTarget?.dataset || {};
      const next = { alfieOpen: true };
      if (countryId) next.selectedCountryId = countryId;
      if (diagnosticId) next.selectedDiagnosticId = diagnosticId;
      if (annexId) next.selectedAnnexId = annexId;
      if (taId) next.selectedTaPackageId = taId;
      if (solutionId) next.selectedSolutionId = solutionId;
      store.setState(next);
      if (targetRoute) store.setRoute(targetRoute);
      return;
    }
    if (action === "toggle-review-mode") return store.setSelection("reviewMode", !store.getState().reviewMode);
    if (action === "select-solution") return store.setSelection("selectedSolutionId", actionTarget?.dataset?.id);
    if (action === "select-admin") return store.setSelection("selectedAdminUnitId", actionTarget?.dataset?.id);
    if (action === "mark-diagnostic-complete") {
      const id = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        const row = data.diagnostics.find((item) => item.id === id);
        if (!row) return;
        row.recordStatus = "Complete";
        row.reviewStatus = "Ready for Review Panel";
        row.lastUpdatedUtc = new Date().toISOString();
      });
    }
    if (action === "add-gap") {
      const diagnosticId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        const diagnostic = data.diagnostics.find((item) => item.id === diagnosticId);
        if (!diagnostic) return;
        data.diagnosticOperationalGaps.unshift({
          id: `${diagnosticId}-GAP-${Date.now()}`,
          diagnosticId,
          countryId: diagnostic.countryId,
          capacityId: "C2",
          challengeCategory: "Campaign Effectiveness",
          gapSummary: "New gap item (edit this text).",
          severity: "Medium",
          owner: "M&E Specialist",
          dueDate: "2026-05-30",
          status: "Open"
        });
      });
    }
    if (action === "delete-gap") {
      const gapId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        data.diagnosticOperationalGaps = data.diagnosticOperationalGaps.filter((item) => item.id !== gapId);
        data.diagnosticProposedSolutions = data.diagnosticProposedSolutions.filter((item) => item.gapId !== gapId);
      });
    }
    if (action === "add-ta-plan") {
      const taPackageId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        data.taImplementationPlan.push({
          id: `${taPackageId}-PLAN-${Date.now()}`,
          taPackageId,
          weekWindow: "Week 5-6",
          objective: "New objective (edit).",
          tasks: "New tasks (edit).",
          outputs: "New expected output (edit).",
          owner: "Country Focal Point",
          status: "Planned",
          startDate: "2026-05-22",
          endDate: "2026-06-05",
          geographyId: data.subnational.find((item) => item.countryId === data.taPackages.find((packet) => packet.id === taPackageId)?.countryId)?.id || ""
        });
      });
    }
    if (action === "delete-ta-plan") {
      const rowId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        data.taImplementationPlan = data.taImplementationPlan.filter((item) => item.id !== rowId);
      });
    }
    if (action === "add-regional-recommendation") {
      const regionalAnnexId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        const annex = data.regionalAnnexes.find((item) => item.id === regionalAnnexId);
        if (!annex) return;
        const admin = data.subnational.find((item) => item.countryId === annex.countries[0]);
        data.regionalRecommendedSolutions.unshift({
          id: `${regionalAnnexId}-REC-${Date.now()}`,
          regionalAnnexId,
          countryId: annex.countries[0],
          adminUnitId: admin?.id || "",
          adminUnitName: admin?.name || "",
          adminType: admin?.adminType || "ADM1",
          solutionId: data.solutions[0].id,
          challengeCategory: "Mobility and Migration",
          timeframe: "60-day cycle",
          phase: "Phase 2-3",
          recommendation: "New recommendation (edit this text).",
          sourceReference: "Manual update"
        });
      });
    }
    if (action === "delete-regional-recommendation") {
      const rowId = actionTarget?.dataset?.id;
      return store.updateData((data) => {
        data.regionalRecommendedSolutions = data.regionalRecommendedSolutions.filter((item) => item.id !== rowId);
      });
    }
    if (action === "config-kpi-move") {
      const key = actionTarget?.dataset?.kpiKey;
      const direction = actionTarget?.dataset?.direction;
      if (!key || !direction) return;
      return store.updateAppConfig((config) => {
        const baseOrder = Array.isArray(config?.layout?.overviewKpiOrder) ? [...config.layout.overviewKpiOrder] : overviewKpiDefinitions.map((row) => row.key);
        const index = baseOrder.indexOf(key);
        if (index < 0) return;
        const swapIndex = direction === "up" ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= baseOrder.length) return;
        [baseOrder[index], baseOrder[swapIndex]] = [baseOrder[swapIndex], baseOrder[index]];
        if (!isPlainObject(config.layout)) config.layout = {};
        config.layout.overviewKpiOrder = baseOrder;
      });
    }
    if (action === "save-config-snapshot") {
      const labelInput = rootElement.querySelector("[data-config-snapshot-label]");
      const label = labelInput?.value || "";
      return store.saveAppConfigSnapshot(label);
    }
    if (action === "apply-config-snapshot") {
      const selector = rootElement.querySelector("[data-config-snapshot-select]");
      const snapshotId = selector?.value || "";
      if (!snapshotId) return;
      return store.applyAppConfigSnapshot(snapshotId);
    }
    if (action === "reset-app-config") {
      return store.resetAppConfig();
    }
    if (action === "export-app-config") {
      const appConfig = store.getState().ui.appConfig || {};
      const payload = JSON.stringify(appConfig, null, 2);
      const blob = new Blob([payload], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "ssw-app-config.json";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      return;
    }
  });

  rootElement.addEventListener("input", (event) => {
    const settingField = event.target.dataset.settingField;
    if (!settingField || event.target.type !== "color") return;
    store.updateSettings((settings) => {
      settings[settingField] = event.target.value;
      if (settingField === "accentColor" || settingField === "backgroundColor") {
        // Switching any color picker should immediately move to custom palette mode.
        settings.colorPalette = "custom";
      }
    });
  });

  rootElement.addEventListener("change", (event) => {
    const filterKey = event.target.dataset.filter;
    if (filterKey) return store.setPendingFilter(filterKey, event.target.value);
    const mapFocusKey = event.target.dataset.mapFocus;
    if (mapFocusKey === "diagnostic") {
      const value = event.target.value === "highRisk" ? "highRisk" : "all";
      return store.setSelection("diagnosticMapFocus", value);
    }
    const approvalChecklistId = event.target.dataset.approvalChecklistId;
    if (approvalChecklistId) {
      return store.updateData((data) => {
        const approval = data.approvals.find((item) => item.id === approvalChecklistId);
        if (!approval) return;
        approval.status = event.target.checked ? "Approved" : "Pending";
        approval.updatedUtc = new Date().toISOString();

        const packageApprovals = data.approvals.filter((item) => item.taPackageId === approval.taPackageId);
        const taPacket = data.taPackages.find((item) => item.id === approval.taPackageId);
        if (!taPacket || !packageApprovals.length) return;

        const approvedCount = packageApprovals.filter((item) => String(item.status || "").toLowerCase() === "approved").length;
        if (approvedCount === packageApprovals.length) {
          taPacket.approvalStatus = "Approved";
        } else if (approvedCount > 0) {
          taPacket.approvalStatus = "Under Review";
        } else {
          taPacket.approvalStatus = "Pending";
        }
      });
    }
    if (event.target.dataset.alfieQuery !== undefined) {
      return store.setSelection("alfieQuery", event.target.value);
    }
    const settingField = event.target.dataset.settingField;
    if (settingField) {
      return store.updateSettings((settings) => {
        const nextValue = event.target.value;

        if (settingField === "universalStyle" && universalStylePresets[nextValue]) {
          const preset = universalStylePresets[nextValue];
          settings.universalStyle = nextValue;
          settings.theme = preset.theme;
          settings.colorPalette = preset.colorPalette;
          settings.fontFamily = preset.fontFamily;
          settings.cardStyle = preset.cardStyle;
          settings.buttonStyle = preset.buttonStyle;
          settings.density = preset.density;
          settings.sidebarStyle = preset.sidebarStyle;
          settings.tableStyle = preset.tableStyle;
          settings.borderRadius = preset.borderRadius;
          settings.accentColor = uiPalettePresets[preset.colorPalette]?.accent || settings.accentColor;
          settings.backgroundColor = uiPalettePresets[preset.colorPalette]?.customBg || settings.backgroundColor;
          return;
        }

        settings[settingField] = nextValue;
        if (settingField === "colorPalette" && nextValue !== "custom" && uiPalettePresets[nextValue]) {
          // Keep color pickers aligned with selected preset so non-technical users
          // can see/edit the exact active colors without confusion.
          settings.accentColor = uiPalettePresets[nextValue].accent;
          settings.backgroundColor = uiPalettePresets[nextValue].customBg;
        }
      });
    }
    const configPath = event.target.dataset.configPath;
    if (configPath) {
      const nextValue = event.target.type === "checkbox" ? event.target.checked : event.target.value;
      return store.updateAppConfig((config) => {
        setByPath(config, configPath, nextValue);
      });
    }
    if (event.target.dataset.configImport !== undefined) {
      const [file] = event.target.files || [];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || "{}"));
          if (!isPlainObject(parsed)) return;
          store.updateAppConfig((config) => {
            Object.keys(config).forEach((key) => delete config[key]);
            Object.assign(config, parsed);
          });
        } catch (error) {
          // Ignore malformed imports to keep the app stable.
        }
      };
      reader.readAsText(file);
      return;
    }
    const collectionName = event.target.dataset.editCollection;
    const id = event.target.dataset.id;
    const field = event.target.dataset.field;
    if (!collectionName || !id || !field) return;
    store.updateData((data) => {
      const collection = data[collectionName];
      if (!Array.isArray(collection)) return;
      const row = collection.find((item) => item.id === id);
      if (!row) return;
      row[field] = event.target.value;
      row.lastUpdatedUtc = new Date().toISOString();
    });
  });

  rootElement.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    if (event.target.dataset.alfieQuery === undefined) return;
    event.preventDefault();
    const query = String(event.target.value || "").trim();
    store.setState({ alfieOpen: true, alfieQuery: query });
  });

  store.subscribe(render);
  render();
}
