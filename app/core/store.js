const STORAGE_KEY = "ssw_ops_platform_state_v1";
const SETTINGS_STORAGE_KEY = "ssw_ops_platform_settings_v1";
const APP_CONFIG_STORAGE_KEY = "ssw_ops_platform_app_config_v1";

const DEFAULT_SETTINGS = Object.freeze({
  appTitle: "Strategic Solutions Workstream",
  accentColor: "#E82535",
  backgroundColor: "#F1F3F5",
  universalStyle: "candyLake",
  colorPalette: "candyLake",
  fontFamily: "montserratBaskerville",
  theme: "light",
  cardStyle: "outlined",
  buttonStyle: "square",
  density: "comfortable",
  sidebarStyle: "minimal",
  tableStyle: "clean",
  borderRadius: "medium"
});

const DEFAULT_APP_CONFIG = Object.freeze({
  branding: {
    eyebrow: "CDC PEB / GID",
    logoPath: "./public/brand/ssw-logo.svg",
    tagline: "Country-by-Country Review: Systems-level Operational Intelligence for Polio Response."
  },
  navigationLabels: {
    overview: "Main Dashboard",
    countryReview: "Country Diagnostics",
    regional: "Regional Annex",
    ta: "TA Packages",
    implementationMe: "Implementation and M&E",
    humanitarianIntel: "Humanitarian Intelligence",
    framework: "Workstream Framework",
    summary: "Summary",
    solutions: "Solutions Inventory",
    settings: "Settings"
  },
  sectionLabels: {
    overview: {
      regionalMapsTitle: "Regional Priority Maps",
      regionalMapsSubtitle: "Horn of Africa, Lake Chad Basin, and DRC",
      pipelineTitle: "Country Phase Pipeline",
      challengeTitle: "Challenge Category Distribution"
    },
    countryReview: {
      pageTitlePrefix: "Country Diagnostics",
      capacityPerformanceTitle: "Capacity Performance (Supporting View)",
      completionTitle: "Section Completion Tracker",
      topGapsTitle: "Top 5 Operational Gaps and Recommended Actions",
      stakeholderTitle: "Stakeholder Support Needed",
      dataMissingTitle: "Data Missing and External Risk Mitigation",
      mapTitle: "Country Geospatial Risk View"
    },
    regional: {
      pageTitle: "Regional Annex",
      snapshotTitle: "Epidemiological Snapshot",
      crossGapsTitle: "Cross-country Operational Gaps",
      swotTitle: "SWOT",
      recommendationsTitle: "Recommended Strategic Solutions by Province",
      referencesTitle: "Annex B References",
      matrixTitle: "Province-Level Priority Matrix",
      mapTitle: "Regional Geospatial Comparison"
    },
    ta: {
      pageTitle: "TA Packages: Country Technical Assistance Packet",
      selectedSolutionsTitle: "Selected Solutions",
      planTitle: "30-Day Implementation Plan",
      readinessTitle: "Readiness Score",
      riskTitle: "Implementation Risk Score",
      approvalsTitle: "Approval Steps",
      mapTitle: "TA Implementation Geography"
    },
    implementationMe: {
      pageTitle: "Implementation and M&E",
      cyclesTitle: "Intervention Cycles",
      blockersTitle: "Issue / Blocker Log",
      completionTitle: "Completion Status by Category",
      outcomesTitle: "Outcome Improvement Since Intervention",
      lessonsTitle: "Lessons Learned",
      mapTitle: "Implementation and M&E Overlay"
    },
    humanitarianIntel: {
      pageTitle: "Humanitarian Intelligence",
      subtitle: "WWW (Where-Who-What) province-level humanitarian actor footprint, as of 2026",
      mapTitle: "WWW Province Map"
    },
    framework: {
      pageTitle: "Workstream Framework",
      objectiveTitle: "Workstream Objective",
      sopTitle: "SOP (Country-by-Country Review)",
      deliverablesTitle: "Core Deliverables",
      criteriaTitle: "Strategic Solution Selection Criteria",
      challengeTitle: "Priority Operational Challenge Categories",
      phaseTitle: "Phased Introduction Focus"
    },
    summary: {
      pageTitle: "Summary",
      metricsTitle: "Selected Solutions Snapshot",
      criteriaTitle: "Selection Criteria"
    },
    solutions: {
      pageTitle: "Solutions Inventory"
    },
    tools: {
      pageTitle: "Tools",
      workflowTitle: "Form Completion & Workflow Tracker",
      referencesTitle: "Reference Utilities",
      editsTitle: "Recent Edits"
    },
    settings: {
      pageTitle: "Settings",
      builderTitle: "App Builder"
    }
  },
  visibility: {
    overview: {
      kpis: true,
      regionalMaps: true,
      pipeline: true,
      challengeDistribution: true,
      insights: true,
      migrationTracker: true
    },
    overviewKpis: {
      priorityCountries: true,
      currentCountryInView: true,
      highRiskProvinces: true,
      diagnosticPhaseCountries: true,
      approvedTaPackages: true,
      activeImplementation: true,
      averageCycleDays: true,
      solutionsInventory: true,
      highRiskClusters: true
    },
    countryReview: {
      meta: true,
      reviewDates: true,
      formSections: true,
      capacityPerformance: true,
      completionTracker: true,
      topGaps: true,
      stakeholders: true,
      dataMissing: true,
      map: true
    },
    regional: {
      meta: true,
      snapshot: true,
      crossGaps: true,
      swot: true,
      recommendations: true,
      references: true,
      matrix: true,
      map: true
    },
    ta: {
      selectedSolutions: true,
      plan: true,
      scores: true,
      map: true
    },
    implementationMe: {
      cycles: true,
      blockers: true,
      indicators: true,
      completion: true,
      outcomes: true,
      lessons: true,
      map: true
    },
    humanitarianIntel: {
      maps: true,
      matrix: true
    },
    framework: {
      hero: true,
      objective: true,
      sop: true,
      deliverables: true,
      criteria: true,
      challenge: true,
      phase: true
    },
    solutions: {
      gallery: true,
      evidence: true
    }
  },
  layout: {
    overviewKpiOrder: [
      "priorityCountries",
      "currentCountryInView",
      "highRiskProvinces",
      "diagnosticPhaseCountries",
      "approvedTaPackages",
      "activeImplementation",
      "averageCycleDays",
      "solutionsInventory",
      "highRiskClusters"
    ]
  },
  fieldVisibility: {
    countryDiagnosticsSections: {}
  },
  tableColumns: {
    regionalPriority: {
      country: true,
      province: true,
      type: true,
      risk: true,
      readiness: true,
      flags: true
    }
  },
  snapshots: []
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function deepMerge(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? clone(override) : clone(base);
  }

  if (isPlainObject(base)) {
    const out = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(isPlainObject(override) ? override : {})]);
    keys.forEach((key) => {
      const baseValue = base[key];
      const overrideValue = isPlainObject(override) ? override[key] : undefined;
      if (overrideValue === undefined) {
        out[key] = clone(baseValue);
      } else if (isPlainObject(baseValue) || Array.isArray(baseValue)) {
        out[key] = deepMerge(baseValue, overrideValue);
      } else {
        out[key] = clone(overrideValue);
      }
    });
    return out;
  }

  return override === undefined ? clone(base) : clone(override);
}

function isHexColor(value) {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

function isOneOf(value, allowed) {
  return allowed.includes(value);
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

function mergeSavedWithFallback(savedList, fallbackList, keySelector) {
  const safeSaved = Array.isArray(savedList) ? savedList : [];
  const safeFallback = Array.isArray(fallbackList) ? fallbackList : [];

  const merged = [...safeSaved];
  const savedKeys = new Set(safeSaved.map((item) => keySelector(item)).filter(Boolean));

  safeFallback.forEach((item) => {
    const key = keySelector(item);
    if (!key || savedKeys.has(key)) return;
    merged.push(clone(item));
  });

  return merged;
}

function mergeRowsWithFallbackFields(savedList, fallbackList, keySelector) {
  const safeSaved = Array.isArray(savedList) ? savedList : [];
  const safeFallback = Array.isArray(fallbackList) ? fallbackList : [];
  const savedByKey = new Map(safeSaved.map((item) => [keySelector(item), item]));
  const consumed = new Set();

  const merged = safeFallback.map((fallbackRow) => {
    const key = keySelector(fallbackRow);
    const savedRow = savedByKey.get(key);
    if (!savedRow) return clone(fallbackRow);
    consumed.add(key);
    // Preserve user edits while backfilling any newly introduced schema fields.
    return { ...clone(fallbackRow), ...savedRow };
  });

  safeSaved.forEach((savedRow) => {
    const key = keySelector(savedRow);
    if (!key || consumed.has(key)) return;
    merged.push(clone(savedRow));
  });

  return merged;
}

function mergeRowsStrictWithFallbackFields(savedList, fallbackList, keySelector) {
  const safeSaved = Array.isArray(savedList) ? savedList : [];
  const safeFallback = Array.isArray(fallbackList) ? fallbackList : [];
  const savedByKey = new Map(safeSaved.map((item) => [keySelector(item), item]));

  return safeFallback.map((fallbackRow) => {
    const key = keySelector(fallbackRow);
    const savedRow = savedByKey.get(key);
    if (!savedRow) return clone(fallbackRow);
    return { ...clone(fallbackRow), ...savedRow };
  });
}

function pruneRemovedCountries(data, removedCountryIds = []) {
  const removed = new Set((removedCountryIds || []).map((id) => String(id || "").toUpperCase()).filter(Boolean));
  if (!removed.size || !data || typeof data !== "object") return data;

  Object.keys(data).forEach((collectionName) => {
    const collection = data[collectionName];
    if (!Array.isArray(collection)) return;
    data[collectionName] = collection
      .map((row) => {
        if (!row || typeof row !== "object") return row;
        if (Array.isArray(row.countries)) {
          return { ...row, countries: row.countries.filter((countryId) => !removed.has(String(countryId || "").toUpperCase())) };
        }
        return row;
      })
      .filter((row) => {
        if (!row || typeof row !== "object") return true;
        if ("countryId" in row) {
          return !removed.has(String(row.countryId || "").toUpperCase());
        }
        return true;
      });
  });

  return data;
}

function reconcileCoreData(savedData, fallbackData) {
  const merged = clone(savedData);
  const fallback = fallbackData || {};

  merged.countries = mergeRowsStrictWithFallbackFields(merged.countries, fallback.countries, (item) => item?.id || "");
  merged.subnational = mergeRowsStrictWithFallbackFields(
    merged.subnational,
    fallback.subnational,
    (item) => `${item?.countryId || ""}|${normalizeName(item?.name)}`
  );
  merged.diagnostics = mergeRowsWithFallbackFields(merged.diagnostics, fallback.diagnostics, (item) => item?.id || "");

  // Keep Regional Annex content aligned to latest Annex B-backed seed data.
  if (Array.isArray(fallback.regionalAnnexes)) {
    merged.regionalAnnexes = clone(fallback.regionalAnnexes);
  }
  if (Array.isArray(fallback.regionalCrossCountryGaps)) {
    merged.regionalCrossCountryGaps = clone(fallback.regionalCrossCountryGaps);
  }
  if (Array.isArray(fallback.regionalSwot)) {
    merged.regionalSwot = clone(fallback.regionalSwot);
  }
  if (Array.isArray(fallback.regionalRecommendedSolutions)) {
    merged.regionalRecommendedSolutions = clone(fallback.regionalRecommendedSolutions);
  }
  if (Array.isArray(fallback.solutions)) {
    merged.solutions = clone(fallback.solutions);
  }
  if (Array.isArray(fallback.selectedSolutionsCatalog)) {
    merged.selectedSolutionsCatalog = clone(fallback.selectedSolutionsCatalog);
  }
  if (fallback.solutionSummary && typeof fallback.solutionSummary === "object") {
    merged.solutionSummary = clone(fallback.solutionSummary);
  }
  if (fallback.dimensions?.diagnosticFormTemplate) {
    merged.dimensions = merged.dimensions || {};
    merged.dimensions.diagnosticFormTemplate = clone(fallback.dimensions.diagnosticFormTemplate);
  }
  if (Array.isArray(fallback.dimensions?.challengeCategories)) {
    merged.dimensions = merged.dimensions || {};
    merged.dimensions.challengeCategories = clone(fallback.dimensions.challengeCategories);
  }

  pruneRemovedCountries(merged, ["AFG"]);

  return merged;
}

function loadSavedData(fallbackData) {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return clone(fallbackData);
    }
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== "object" || !parsed.data) {
      return clone(fallbackData);
    }
    return reconcileCoreData(parsed.data, fallbackData);
  } catch (error) {
    return clone(fallbackData);
  }
}

function loadSavedStateSnapshot() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (parsed && typeof parsed === "object") {
      if (parsed.state && typeof parsed.state === "object") return parsed.state;
      // Backward compatibility for older shape that persisted only { data }.
      if (parsed.data && typeof parsed.data === "object") return { data: parsed.data };
    }
    return null;
  } catch (error) {
    return null;
  }
}

function normalizeAppConfig(savedConfig) {
  const merged = deepMerge(DEFAULT_APP_CONFIG, isPlainObject(savedConfig) ? savedConfig : {});
  // Migrate prior typo to the canonical section name.
  if (merged?.navigationLabels?.humanitarianIntel === "Humaniraian Intelligence") {
    merged.navigationLabels.humanitarianIntel = "Humanitarian Intelligence";
  }
  if (merged?.sectionLabels?.humanitarianIntel?.pageTitle === "Humaniraian Intelligence") {
    merged.sectionLabels.humanitarianIntel.pageTitle = "Humanitarian Intelligence";
  }
  if (!Array.isArray(merged.snapshots)) merged.snapshots = [];
  if (!Array.isArray(merged.layout?.overviewKpiOrder) || !merged.layout.overviewKpiOrder.length) {
    merged.layout.overviewKpiOrder = clone(DEFAULT_APP_CONFIG.layout.overviewKpiOrder);
  }
  return merged;
}

function stripSnapshots(config) {
  const clean = clone(config || {});
  clean.snapshots = [];
  return clean;
}

function loadSavedAppConfig(savedSnapshot) {
  try {
    const raw = localStorage.getItem(APP_CONFIG_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const fromState = savedSnapshot?.ui?.appConfig;
    const source = isPlainObject(parsed) ? parsed : fromState;
    return normalizeAppConfig(source);
  } catch (error) {
    return normalizeAppConfig(savedSnapshot?.ui?.appConfig);
  }
}

function mergeSettings(savedSettings) {
  const merged = clone(DEFAULT_SETTINGS);
  if (!savedSettings || typeof savedSettings !== "object") return merged;

  if (typeof savedSettings.appTitle === "string" && savedSettings.appTitle.trim()) {
    merged.appTitle = savedSettings.appTitle.trim();
  }

  if (isHexColor(savedSettings.accentColor)) {
    merged.accentColor = savedSettings.accentColor;
  } else if (isHexColor(savedSettings.primaryColor)) {
    // Backward compatibility with prior key.
    merged.accentColor = savedSettings.primaryColor;
  }
  if (isHexColor(savedSettings.backgroundColor)) {
    merged.backgroundColor = savedSettings.backgroundColor;
  }
  if (savedSettings.theme === "dark" || savedSettings.theme === "light") {
    merged.theme = savedSettings.theme;
  }
  if (isOneOf(savedSettings.universalStyle, ["candyLake", "opsDefault", "meadowGreen", "sageCoral", "civicTeal"])) {
    merged.universalStyle = savedSettings.universalStyle;
  }
  if (isOneOf(savedSettings.colorPalette, ["candyLake", "opsDefault", "meadowGreen", "sageCoral", "civicTeal", "custom"])) {
    merged.colorPalette = savedSettings.colorPalette;
  }
  if (isOneOf(savedSettings.fontFamily, ["montserratBaskerville", "modernSans", "abadi", "publicSerif", "humanist"])) {
    merged.fontFamily = savedSettings.fontFamily;
  }
  if (isOneOf(savedSettings.cardStyle, ["flat", "elevated", "outlined"])) {
    merged.cardStyle = savedSettings.cardStyle;
  }
  if (isOneOf(savedSettings.buttonStyle, ["square", "rounded", "pill"])) {
    merged.buttonStyle = savedSettings.buttonStyle;
  }
  if (isOneOf(savedSettings.density, ["compact", "comfortable", "spacious"])) {
    merged.density = savedSettings.density;
  }
  if (isOneOf(savedSettings.sidebarStyle, ["minimal", "filled", "boxed"])) {
    merged.sidebarStyle = savedSettings.sidebarStyle;
  }
  if (isOneOf(savedSettings.tableStyle, ["clean", "striped", "bordered"])) {
    merged.tableStyle = savedSettings.tableStyle;
  }
  if (isOneOf(savedSettings.borderRadius, ["small", "medium", "large"])) {
    merged.borderRadius = savedSettings.borderRadius;
  }

  return merged;
}

function loadSavedSettings() {
  try {
    const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!saved) return clone(DEFAULT_SETTINGS);
    const parsed = JSON.parse(saved);
    const merged = mergeSettings(parsed);
    if (!parsed?.universalStyle) {
      merged.universalStyle = DEFAULT_SETTINGS.universalStyle;
      merged.theme = DEFAULT_SETTINGS.theme;
      merged.colorPalette = DEFAULT_SETTINGS.colorPalette;
      merged.fontFamily = DEFAULT_SETTINGS.fontFamily;
      merged.cardStyle = DEFAULT_SETTINGS.cardStyle;
      merged.buttonStyle = DEFAULT_SETTINGS.buttonStyle;
      merged.sidebarStyle = DEFAULT_SETTINGS.sidebarStyle;
      merged.tableStyle = DEFAULT_SETTINGS.tableStyle;
      merged.accentColor = DEFAULT_SETTINGS.accentColor;
      merged.backgroundColor = DEFAULT_SETTINGS.backgroundColor;
    }
    if (parsed?.primaryColor === "#54b7ff") {
      merged.accentColor = DEFAULT_SETTINGS.accentColor;
    }
    if (parsed?.backgroundColor === "#06121d") {
      merged.backgroundColor = DEFAULT_SETTINGS.backgroundColor;
    }
    // Migrate earlier default palette values to the current palette baseline.
    if (parsed?.accentColor === "#2f6f4f" || parsed?.accentColor === "#D9ED92") {
      merged.accentColor = DEFAULT_SETTINGS.accentColor;
    }
    if (parsed?.backgroundColor === "#1f2d3a" || parsed?.backgroundColor === "#1F2A1A") {
      merged.backgroundColor = DEFAULT_SETTINGS.backgroundColor;
    }
    if (parsed?.accentColor === "#E84A5F" || parsed?.accentColor === "#FF847C") {
      merged.accentColor = DEFAULT_SETTINGS.accentColor;
    }
    if (parsed?.backgroundColor === "#2A363B") {
      merged.backgroundColor = DEFAULT_SETTINGS.backgroundColor;
    }
    return merged;
  } catch (error) {
    return clone(DEFAULT_SETTINGS);
  }
}

export function createStore(seedData) {
  const listeners = new Set();
  const savedSnapshot = loadSavedStateSnapshot();
  const initialAppConfig = loadSavedAppConfig(savedSnapshot);
  const initialSettings = mergeSettings({
    ...(savedSnapshot?.ui?.settings || {}),
    ...loadSavedSettings()
  });
  const initialFilters = {
    country: "all",
    region: "all",
    dateRange: "last6m",
    epidemiologicProfile: "all",
    populationType: "all",
    implementationPhase: "all",
    challengeCategory: "all",
    solutionCategory: "all",
    approvalStatus: "all",
    interventionCycle: "all",
    partner: "all"
  };

  const normalizedInitialRoute = (() => {
    const route = savedSnapshot?.route || "overview";
    if (route === "countries" || route === "diagnostics") return "countryReview";
    if (route === "implementation" || route === "me" || route === "tools") return "implementationMe";
    if (route === "summary") return "humanitarianIntel";
    return route;
  })();

  const state = {
    route: normalizedInitialRoute,
    sidebarHidden: Boolean(savedSnapshot?.sidebarHidden),
    alfieOpen: Boolean(savedSnapshot?.alfieOpen),
    alfieQuery: typeof savedSnapshot?.alfieQuery === "string" ? savedSnapshot.alfieQuery : "",
    selectedCountryId: savedSnapshot?.selectedCountryId || "all",
    selectedDiagnosticId: savedSnapshot?.selectedDiagnosticId ?? null,
    selectedAnnexId: savedSnapshot?.selectedAnnexId ?? null,
    selectedTaPackageId: savedSnapshot?.selectedTaPackageId ?? null,
    selectedSolutionId: savedSnapshot?.selectedSolutionId ?? null,
    selectedAdminUnitId: savedSnapshot?.selectedAdminUnitId || "all",
    reviewMode: Boolean(savedSnapshot?.reviewMode),
    filters: { ...initialFilters, ...(savedSnapshot?.filters || {}) },
    pendingFilters: { ...initialFilters, ...(savedSnapshot?.pendingFilters || savedSnapshot?.filters || {}) },
    data: reconcileCoreData(savedSnapshot?.data || loadSavedData(seedData), seedData),
    ui: {
      role: savedSnapshot?.ui?.role || "Workstream Lead",
      theme: initialSettings.theme,
      settings: initialSettings,
      appConfig: initialAppConfig
    }
  };

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: clone(state) }));
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state.ui.settings));
      localStorage.setItem(APP_CONFIG_STORAGE_KEY, JSON.stringify(state.ui.appConfig));
    } catch (error) {
      // ignore storage write issues in restricted environments
    }
  }

  function notify() {
    persist();
    listeners.forEach((listener) => listener(getState()));
  }

  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function setState(nextStateOrUpdater) {
    if (typeof nextStateOrUpdater === "function") {
      const maybePartial = nextStateOrUpdater(state);
      if (maybePartial && typeof maybePartial === "object") {
        Object.assign(state, maybePartial);
      }
    } else if (nextStateOrUpdater && typeof nextStateOrUpdater === "object") {
      Object.assign(state, nextStateOrUpdater);
    }

    if (state?.ui?.settings) {
      state.ui.settings = mergeSettings(state.ui.settings);
      state.ui.theme = state.ui.settings.theme;
    }
    if (state?.ui?.appConfig) {
      state.ui.appConfig = normalizeAppConfig(state.ui.appConfig);
    }
    if (!isPlainObject(state.pendingFilters)) {
      state.pendingFilters = { ...state.filters };
    }
    notify();
  }

  function update(mutator) {
    if (typeof mutator === "function") {
      mutator(state);
    }
    notify();
  }

  function setRoute(route) {
    if (route === "countries" || route === "diagnostics") {
      route = "countryReview";
    } else if (route === "implementation" || route === "me" || route === "tools") {
      route = "implementationMe";
    } else if (route === "summary") {
      route = "humanitarianIntel";
    }
    setState({ route });
  }

  function setFilter(filterKey, value) {
    update((draft) => {
      draft.filters[filterKey] = value;
    });
  }

  function setPendingFilter(filterKey, value) {
    update((draft) => {
      draft.pendingFilters[filterKey] = value;
    });
  }

  function applyFilters(filterKeys = []) {
    update((draft) => {
      const scopedKeys = Array.isArray(filterKeys) ? filterKeys.filter(Boolean) : [];
      if (!scopedKeys.length) {
        draft.filters = { ...initialFilters, ...(draft.pendingFilters || {}) };
        return;
      }
      scopedKeys.forEach((key) => {
        if (!(key in initialFilters)) return;
        draft.filters[key] = draft.pendingFilters?.[key] ?? initialFilters[key];
      });
    });
  }

  function resetPendingFilters(filterKeys = []) {
    update((draft) => {
      const scopedKeys = Array.isArray(filterKeys) ? filterKeys.filter(Boolean) : [];
      if (!scopedKeys.length) {
        draft.pendingFilters = { ...(draft.filters || initialFilters) };
        return;
      }
      scopedKeys.forEach((key) => {
        if (!(key in initialFilters)) return;
        draft.pendingFilters[key] = draft.filters?.[key] ?? initialFilters[key];
      });
    });
  }

  function resetFilters() {
    setState({ filters: { ...initialFilters }, pendingFilters: { ...initialFilters } });
  }

  function setSelection(key, value) {
    setState({ [key]: value });
  }

  function updateData(mutator) {
    update((draft) => {
      mutator(draft.data, draft);
    });
  }

  function updateSettings(mutator) {
    update((draft) => {
      if (typeof mutator === "function") {
        mutator(draft.ui.settings);
      } else if (mutator && typeof mutator === "object") {
        Object.assign(draft.ui.settings, mutator);
      }
      draft.ui.settings = mergeSettings(draft.ui.settings);
      draft.ui.theme = draft.ui.settings.theme;
    });
  }

  function updateAppConfig(mutator) {
    update((draft) => {
      const next = clone(draft.ui.appConfig);
      if (typeof mutator === "function") {
        mutator(next);
      } else if (isPlainObject(mutator)) {
        Object.assign(next, mutator);
      }
      draft.ui.appConfig = normalizeAppConfig(next);
    });
  }

  function resetAppConfig() {
    update((draft) => {
      draft.ui.appConfig = normalizeAppConfig(DEFAULT_APP_CONFIG);
    });
  }

  function saveAppConfigSnapshot(label = "") {
    update((draft) => {
      const snapshotName = (typeof label === "string" && label.trim()) || `Snapshot ${new Date().toLocaleString()}`;
      const snapshot = {
        id: `cfg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: snapshotName,
        savedAt: new Date().toISOString(),
        config: stripSnapshots(draft.ui.appConfig)
      };
      draft.ui.appConfig.snapshots = [snapshot, ...(draft.ui.appConfig.snapshots || [])].slice(0, 12);
    });
  }

  function applyAppConfigSnapshot(snapshotId) {
    if (!snapshotId) return;
    update((draft) => {
      const snapshots = draft.ui.appConfig.snapshots || [];
      const match = snapshots.find((item) => item.id === snapshotId);
      if (!match?.config) return;
      const merged = normalizeAppConfig(match.config);
      merged.snapshots = snapshots;
      draft.ui.appConfig = merged;
    });
  }

  return {
    getState,
    setState,
    update,
    subscribe,
    setRoute,
    setFilter,
    setPendingFilter,
    applyFilters,
    resetPendingFilters,
    resetFilters,
    setSelection,
    updateData,
    updateSettings,
    updateAppConfig,
    resetAppConfig,
    saveAppConfigSnapshot,
    applyAppConfigSnapshot
  };
}
