const phaseCatalog = [
  { id: 1, code: "PH1", name: "Phase 1 (Month 1-3)" },
  { id: 2, code: "PH2", name: "Phase 2 (Month 4-6)" },
  { id: 3, code: "PH3", name: "Phase 3 (Month 7-9)" }
];

const challengeCategories = [
  "Mobility and Migration",
  "Campaign Effectiveness",
  "Population Enumeration",
  "Cross-Border Vaccination",
  "Community Engagement",
  "Missed AFP Reporting",
  "Cross-Border Populations",
  "Surveillance Gaps",
  "Health System Constraints"
];

const selectedSolutionsCatalogSeed = [
  {
    index: 1,
    challengeAddressed: "Mobility and Migration",
    solutionName:
      "Inter-agency Referral Network + migration data: Inter-agency health/protection referral pathways in humanitarian operations.",
    hardToReachTypology: "Migratory, conflict-affected, internally displaced populations",
    description:
      "Interagency referral system with in-country focal points mapped to humanitarian pathways and shared data for under-5 populations in hard-to-reach areas.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Humanitarian",
    countrySetting: "Syria, Yemen, Horn of Africa, South Sudan, DRC",
    potentialApplicability:
      "Supports denominator validity and microplanning by integrating humanitarian displacement and migration information into polio operations.",
    source: "Humanitarian Data Exchange: https://data.humdata.org/ | DTM: https://dtm.iom.int/",
    remoteCapable: "yes"
  },
  {
    index: 2,
    challengeAddressed: "Mobility and Migration",
    solutionName: "Ground truthing mobility patterns (rapid household travel/vaccination access survey)",
    hardToReachTypology: "All",
    description:
      "App-based rapid surveys with GPS/photo validation to measure household travel and vaccine access barriers over the prior nine months.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Afghanistan",
    potentialApplicability:
      "Improves visibility of mobile population movement and service access constraints to support targeted outreach design.",
    source: "https://premise.com/",
    remoteCapable: "yes"
  },
  {
    index: 3,
    challengeAddressed: "Mobility and Migration",
    solutionName: "Geospatial Tracking System: satellite imagery + vaccinator GPS tracking",
    hardToReachTypology: "Remote settlers, inaccessible settlements",
    description:
      "Triangulates imagery and outreach data to classify settlement status and overlays vaccinator GPS traces to quantify unreached children.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Borno, Nigeria",
    potentialApplicability:
      "Improves settlement-status visibility for campaign microplanning and outreach decisions in security-constrained settings.",
    source: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6524248/ ; CDC GRASP",
    remoteCapable: "yes"
  },
  {
    index: 4,
    challengeAddressed: "Campaign Effectiveness",
    solutionName: "Digital standardization of campaign forms (KoBoToolbox / KoBoCollect)",
    hardToReachTypology: "All",
    description: "Web/mobile forms for offline data collection with sync when connectivity is available.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Humanitarian, Polio",
    countrySetting: "Djibouti, Nigeria, Pakistan, Afghanistan, Ukraine, Egypt, Colombia, Kenya",
    potentialApplicability:
      "Standardized surveillance, vaccination coverage, and outbreak response forms with consistent campaign data structures.",
    source: "https://www.kobotoolbox.org/",
    remoteCapable: "yes"
  },
  {
    index: 5,
    challengeAddressed: "Campaign Effectiveness",
    solutionName: "Geospatial Tracking System: Vaccine Buddy",
    hardToReachTypology: "All",
    description: "Passive GPS device in vaccine carrier for independent verification of vaccinator movement.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "DRC pilot, Nigeria (Borno)",
    potentialApplicability:
      "Strengthens campaign accountability in insecure geographies and complements passive GPS and GTS workflows.",
    source: "CDC GRASP Team",
    remoteCapable: "yes"
  },
  {
    index: 6,
    challengeAddressed: "Population Enumeration",
    solutionName: "Mapping high-rise buildings",
    hardToReachTypology: "Urban, multi-floor households",
    description:
      "Identifies high-rise building clusters in repeatedly underperforming districts and supports vertical access team routing.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Somalia",
    potentialApplicability: "Reduces denominator errors and improves team-per-building allocation in dense urban areas.",
    source: "CDC GRASP Team",
    remoteCapable: "yes"
  },
  {
    index: 7,
    challengeAddressed: "Population Enumeration",
    solutionName: "Mobile vaccination project (GRID3)",
    hardToReachTypology: "Remote settlers, dispersed rural households",
    description:
      "Combines GPS-tagged enumeration, imagery, and team tracking to map settlements and children 0-23 months with vaccination status.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Democratic Republic of the Congo",
    potentialApplicability:
      "Improves baseline accounting of zero-dose and under-immunized children and strengthens microplanning precision.",
    source: "CDC GRASP Team",
    remoteCapable: "hybrid"
  },
  {
    index: 8,
    challengeAddressed: "Population Enumeration",
    solutionName: "GPS Sample",
    hardToReachTypology: "All",
    description:
      "Rapid cluster boundary drawing, random household selection, offline maps, and in-field navigation integrated with survey tools.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Nigeria",
    potentialApplicability:
      "Supports LQAS/serosurvey sampling quality and household-level navigation in low-connectivity field settings.",
    source: "https://www.gpssample.org/home",
    remoteCapable: "yes"
  },
  {
    index: 9,
    challengeAddressed: "Population Enumeration",
    solutionName: "Automatically generated settlements (GRID3)",
    hardToReachTypology: "Remote settlers, scattered rural communities",
    description:
      "Uses global building-footprint extraction and settlement delineation to identify previously unmapped populations.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "All",
    potentialApplicability:
      "Accelerates identification and prioritization of hard-to-map populations where census denominators are weak.",
    source: "CDC GRASP Team",
    remoteCapable: "yes"
  },
  {
    index: 10,
    challengeAddressed: "Population Enumeration",
    solutionName: "Satellite imagery analysis",
    hardToReachTypology: "Remote settlers, conflict-affected populations",
    description:
      "Manual or automated change detection from high-resolution imagery to assess settlement habitation and infrastructure status.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Sudan, Syria, Gaza, Ukraine, Nigeria, Pakistan",
    potentialApplicability:
      "Supports post-conflict infrastructure assessment and seasonal habitation monitoring for campaign design.",
    source: "https://grid3.org/",
    remoteCapable: "yes"
  },
  {
    index: 11,
    challengeAddressed: "Population Enumeration",
    solutionName: "Routine immunization among nomadic populations",
    hardToReachTypology: "Nomadic, pastoralist, highly mobile groups",
    description: "Geospatial analysis of nomadic travel routes for targeted mobile vaccination deployment.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio, RI",
    countrySetting: "Somalia",
    potentialApplicability:
      "Integrates nomadic movement corridors into microplans and supports seasonal placement of temporary vaccination posts.",
    source: "CDC GRASP Team",
    remoteCapable: "yes"
  },
  {
    index: 12,
    challengeAddressed: "Population Enumeration",
    solutionName:
      "GIS-based household serology survey to quantify serological protection against poliovirus types 1, 2, and 3",
    hardToReachTypology: "Remote settlers, peri-urban",
    description:
      "Random spatial household serology design to detect immunity gaps not visible through facility-based sampling.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Afghanistan",
    potentialApplicability:
      "Enables targeted SIA planning in high-risk reservoirs based on household-level immunity patterns.",
    source:
      "Mendes A et al., Geospatial Health 2022;17(2):10.4081/gh.2022.1107",
    remoteCapable: "hybrid"
  },
  {
    index: 13,
    challengeAddressed: "Cross-Border Vaccination",
    solutionName: "Participatory mapping with satellite imagery to identify border crossings",
    hardToReachTypology: "Migratory, border populations",
    description:
      "Field team participatory mapping plus imagery validation to identify formal and informal crossing points.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Malawi, Mozambique, Zambia, Tanzania",
    potentialApplicability: "Supports strategic border vaccination placement to reduce cross-border virus movement.",
    source: "MMWR 2022;71:776-777. DOI: 10.15585/mmwr.mm7123a3",
    remoteCapable: "hybrid"
  },
  {
    index: 14,
    challengeAddressed: "Cross-Border Vaccination",
    solutionName: "Geospatial visualization: cross-border nomadic movement",
    hardToReachTypology: "Nomadic",
    description: "Mapping high-traffic nomadic routes and destination hubs for deployment planning.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Somalia",
    potentialApplicability:
      "Improves cross-border planning by aligning team deployment with seasonal movement instead of fixed settlements.",
    source: "CDC GRASP Team",
    remoteCapable: "yes"
  },
  {
    index: 15,
    challengeAddressed: "Cross-Border Vaccination",
    solutionName: "Transit Point Vaccination (TPV) model",
    hardToReachTypology: "Migratory, conflict-affected, border populations",
    description:
      "Temporary or semi-permanent vaccination stations at informal crossings and natural transit nodes.",
    solutionType: "Non-Digital",
    fieldCurrentlyUsed: "Zero-dose, Humanitarian, Mobile Population Immunization",
    countrySetting: "Somalia, Kenya, Ethiopia",
    potentialApplicability:
      "Captures children missed by fixed services and is highly relevant for cross-border transmission corridors.",
    source: "https://zdlh.gavi.org/sites/default/files/2024-10/20240902_ZDLW_40_posters_final.pdf",
    remoteCapable: "no"
  },
  {
    index: 16,
    challengeAddressed: "Missed AFP Reporting",
    solutionName: "Automated AFP surveillance in tertiary care hospitals using ICD-10 coding",
    hardToReachTypology: "Populations seeking facility-based care (tertiary)",
    description:
      "Hospital information systems trigger automated AFP alerts when relevant ICD-10 syndromic codes are entered.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "RI",
    countrySetting: "USA",
    potentialApplicability:
      "Scalable to countries with ICD-10 aligned digital HMIS and neighboring or active poliovirus risk.",
    source: "https://www.cdc.gov/nssp/index.html",
    remoteCapable: "yes"
  },
  {
    index: 17,
    challengeAddressed: "Community Engagement",
    solutionName: "Social and community listening insights for vaccine hesitancy",
    hardToReachTypology: "Populations with varying level of trust in vaccines",
    description:
      "Rapid community surveys identify safety concerns, rumors, and trust dynamics ahead of campaigns.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Tanzania",
    potentialApplicability:
      "Supports preemptive risk communication and community engagement for campaign acceptance.",
    source: "https://premise.com/",
    remoteCapable: "yes"
  },
  {
    index: 18,
    challengeAddressed: "Community Engagement",
    solutionName: "CHW home-visit identification and mobilization system",
    hardToReachTypology: "Internally displaced families, mobile households, low RI contact",
    description:
      "CHWs identify zero-dose/under-immunized children through household visits and caregiver mobilization.",
    solutionType: "Non-Digital",
    fieldCurrentlyUsed: "Routine Immunization, Zero-dose",
    countrySetting: "Cameroon (Kumba North and Kumba South)",
    potentialApplicability: "CHW networks can trace children missed by RI and SIA delivery channels.",
    source: "https://zdlh.gavi.org/sites/default/files/2024-10/20240902_ZDLW_40_posters_final.pdf",
    remoteCapable: "no"
  },
  {
    index: 19,
    challengeAddressed: "Campaign Effectiveness",
    solutionName: "Vaccinator and supervisor security mapping",
    hardToReachTypology: "NA",
    description: "Accessibility map per administrative district to guide safe deployment.",
    solutionType: "Digital",
    fieldCurrentlyUsed: "Polio",
    countrySetting: "Regional",
    potentialApplicability: "Triangulates district-level accessibility constraints from AFRO surveillance resources.",
    source: "https://afro-rrt-who.hub.arcgis.com/maps/f38a9d0ac62348a0abfbe5aba2195a62/about",
    remoteCapable: "yes"
  }
];

const solutionSummary = {
  asOfDate: "2026-03-30",
  solutionCount: 19,
  remoteCapableCount: 10,
  metrics: [
    { component: "Date of last update", value: "2026-03-30" },
    { component: "Number of Solutions", value: 19 },
    { component: "Number of Solutions - can be done remotely", value: 10 },
    { component: "Mobility and Migration", value: 3 },
    { component: "Campaign Effectiveness", value: 2 },
    { component: "Population Enumeration", value: 7 },
    { component: "Cross-Border Vaccination", value: 3 },
    { component: "Missed AFP Reporting", value: 1 },
    { component: "Community Engagement", value: 2 }
  ],
  selectionCriteria: [
    "Proven effectiveness in field setting",
    "Can be designed and implemented by CDC",
    "Non-obstructive to existing GPEI processes",
    "Cost-effective",
    "Scalable",
    "Time-limited",
    "Aligns with existing policies: WHO withdrawal, GPEI transition plan, OneCDC approach, GID Priority Pillars, CDC GHSA and IHR"
  ]
};

const countries = [
  {
    id: "ETH",
    name: "Ethiopia",
    region: "Horn of Africa",
    gpeiRegion: "AFRO",
    epiProfile: "Mixed Risk",
    populationType: "Cross-border",
    priorityStatus: "High",
    currentPhaseId: 1,
    under5: 16600000,
    missedClusters: 22,
    surveillanceSensitivity: 0.71,
    coverage: 0.72,
    riskLevel: "High",
    focalPoints: ["Country Focal Point B", "GIS Specialist B"]
  },
  {
    id: "SOM",
    name: "Somalia",
    region: "Horn of Africa",
    gpeiRegion: "AFRO",
    epiProfile: "cVDPV",
    populationType: "Displaced",
    priorityStatus: "Critical",
    currentPhaseId: 2,
    under5: 2780000,
    missedClusters: 16,
    surveillanceSensitivity: 0.65,
    coverage: 0.61,
    riskLevel: "High",
    focalPoints: ["Country Focal Point C", "M&E Specialist C"]
  },
  {
    id: "DJI",
    name: "Djibouti",
    region: "Horn of Africa",
    gpeiRegion: "EMRO",
    epiProfile: "Surveillance Concern",
    populationType: "Cross-border",
    priorityStatus: "High",
    currentPhaseId: 1,
    under5: 310000,
    missedClusters: 6,
    surveillanceSensitivity: 0.78,
    coverage: 0.76,
    riskLevel: "Medium",
    focalPoints: ["Country Focal Point I", "GIS Specialist I"]
  },
  {
    id: "SDN",
    name: "Sudan",
    region: "Horn of Africa",
    gpeiRegion: "EMRO",
    epiProfile: "Mixed Risk",
    populationType: "Displaced",
    priorityStatus: "High",
    currentPhaseId: 1,
    under5: 11400000,
    missedClusters: 21,
    surveillanceSensitivity: 0.66,
    coverage: 0.6,
    riskLevel: "High",
    focalPoints: ["Country Focal Point J", "Field Epidemiologist J"]
  },
  {
    id: "YEM",
    name: "Yemen",
    region: "Horn of Africa",
    gpeiRegion: "EMRO",
    epiProfile: "Surveillance Concern",
    populationType: "Displaced",
    priorityStatus: "High",
    currentPhaseId: 2,
    under5: 5040000,
    missedClusters: 12,
    surveillanceSensitivity: 0.63,
    coverage: 0.57,
    riskLevel: "High",
    focalPoints: ["Country Focal Point H", "Technical Panel H"]
  },
  {
    id: "NGA",
    name: "Nigeria",
    region: "Lake Chad Basin",
    gpeiRegion: "AFRO",
    epiProfile: "cVDPV",
    populationType: "Zero-dose",
    priorityStatus: "Critical",
    currentPhaseId: 3,
    under5: 31100000,
    missedClusters: 31,
    surveillanceSensitivity: 0.81,
    coverage: 0.74,
    riskLevel: "High",
    focalPoints: ["Country Focal Point D", "Health Informatics SME D"]
  },
  {
    id: "TCD",
    name: "Chad",
    region: "Lake Chad Basin",
    gpeiRegion: "AFRO",
    epiProfile: "Surveillance Concern",
    populationType: "Mobile",
    priorityStatus: "High",
    currentPhaseId: 1,
    under5: 3260000,
    missedClusters: 13,
    surveillanceSensitivity: 0.62,
    coverage: 0.58,
    riskLevel: "High",
    focalPoints: ["Country Focal Point E", "Field Epidemiologist E"]
  },
  {
    id: "NER",
    name: "Niger",
    region: "Lake Chad Basin",
    gpeiRegion: "AFRO",
    epiProfile: "cVDPV",
    populationType: "Mobile",
    priorityStatus: "Critical",
    currentPhaseId: 1,
    under5: 5200000,
    missedClusters: 18,
    surveillanceSensitivity: 0.64,
    coverage: 0.59,
    riskLevel: "High",
    focalPoints: ["Country Focal Point K", "M&E Specialist K"]
  },
  {
    id: "COD",
    name: "Democratic Republic of the Congo",
    region: "DRC",
    gpeiRegion: "AFRO",
    epiProfile: "cVDPV",
    populationType: "Missed children",
    priorityStatus: "Critical",
    currentPhaseId: 3,
    under5: 18700000,
    missedClusters: 27,
    surveillanceSensitivity: 0.67,
    coverage: 0.64,
    riskLevel: "High",
    focalPoints: ["Country Focal Point G", "Workstream Lead G"]
  }
];

const subnational = [
  ["ETH", "Oromia", 76, "Region"],
  ["ETH", "Somali", 84, "Region"],
  ["ETH", "Addis Ababa", 58, "City Administration"],
  ["ETH", "Tigray", 71, "Region"],
  ["ETH", "Amhara", 69, "Region"],
  ["ETH", "Gambella", 74, "Region"],
  ["SOM", "Benadir", 83, "Region"],
  ["SOM", "Galmudug", 82, "State"],
  ["SOM", "Hirshabelle", 80, "State"],
  ["SOM", "Jubaland", 86, "State"],
  ["SOM", "Southwest", 79, "State"],
  ["SOM", "Puntland", 72, "State"],
  ["DJI", "Djibouti", 66, "Region"],
  ["DJI", "Arta", 61, "Region"],
  ["SDN", "Khartoum", 73, "State"],
  ["SDN", "North Darfur", 88, "State"],
  ["SDN", "South Kordofan", 84, "State"],
  ["SDN", "Gezira", 68, "State"],
  ["SDN", "West Darfur", 86, "State"],
  ["YEM", "Aden", 71, "Governorate"],
  ["YEM", "Al Hudaydah", 87, "Governorate"],
  ["YEM", "Saada", 84, "Governorate"],
  ["YEM", "Hajjah", 82, "Governorate"],
  ["YEM", "Hadramaut", 67, "Governorate"],
  ["NGA", "Sokoto", 86, "State"],
  ["NGA", "Kebbi", 82, "State"],
  ["NGA", "Katsina", 85, "State"],
  ["NGA", "Zamfara", 84, "State"],
  ["NGA", "Kano", 74, "State"],
  ["TCD", "N'Djamena", 72, "Province"],
  ["TCD", "Chari-Baguirmi", 80, "Province"],
  ["TCD", "Guera", 77, "Province"],
  ["TCD", "Logone Oriental", 74, "Province"],
  ["TCD", "Ouaddai", 83, "Province"],
  ["NER", "Diffa", 87, "Region"],
  ["NER", "Maradi", 81, "Region"],
  ["NER", "Niamey", 64, "Region"],
  ["NER", "Tahoua", 79, "Region"],
  ["NER", "Zinder", 85, "Region"],
  ["COD", "Haut-Katanga", 90, "Province"],
  ["COD", "Haut-Lomami", 89, "Province"],
  ["COD", "Tanganyika", 92, "Province"],
  ["COD", "Tshopo", 86, "Province"],
  ["COD", "Kinshasa", 78, "Province"]
].map((entry, index) => {
  const [countryId, name, riskScore, adminType] = entry;
  return {
    id: `ADM-${String(index + 1).padStart(3, "0")}`,
    countryId,
    name,
    adminLevel: 1,
    adminType,
    boundaryKey: `${countryId}-${name}`.toUpperCase().replace(/[^A-Z0-9]/g, "_"),
    riskScore,
    riskTier: riskScore >= 84 ? "High" : riskScore >= 72 ? "Medium" : "Watch",
    silentDistrict: riskScore > 80 ? 1 : 0,
    esPerformance: Math.max(32, 96 - riskScore),
    mobilityCorridor: riskScore > 75 ? 1 : 0,
    idpRoute: riskScore > 82 ? 1 : 0,
    informalSettlement: riskScore > 78 ? 1 : 0,
    crossBorderZone: riskScore > 70 ? 1 : 0,
    coverage: Number(((100 - riskScore) / 100).toFixed(2)),
    readiness: riskScore > 80 ? "Low" : riskScore > 68 ? "Medium" : "High"
  };
});

const diagnostics = countries
  .filter((country) => country.currentPhaseId >= 1)
  .map((country, index) => {
    const isHighRisk = country.riskLevel === "High";
    const countryAdmins = subnational
      .filter((admin) => admin.countryId === country.id)
      .sort((a, b) => b.riskScore - a.riskScore);
    const priorityProvinces = countryAdmins
      .slice(0, 3)
      .map((admin) => admin.name)
      .join(", ");
    const focalPoints = (country.focalPoints || []).join(", ");

    return {
      id: `DIA-${country.id}-${2026}`,
      countryId: country.id,
      reviewStartDate: `2026-0${(index % 3) + 1}-0${(index % 7) + 1}`,
      reviewEndDate: `2026-0${(index % 3) + 2}-1${(index % 7) + 1}`,
      currentPhaseId: country.currentPhaseId,
      virusType: country.epiProfile,
      emergenceGroups: country.epiProfile === "cVDPV" ? "EG-2, EG-4" : "EG-1",
      subRegion: country.region,
      mostRecentDetectionDate: `2026-0${(index % 3) + 1}-2${(index % 8) + 1}`,
      mostRecentDetectionType: index % 2 ? "ES" : "AFP",
      mostRecentDetectionProvinces: priorityProvinces,
      upcomingCampaignType: "SNID",
      upcomingCampaignAntigen: country.epiProfile === "cVDPV" ? "nOPV2" : "bOPV",
      upcomingTargetAgeGroup: "0-59 months",
      upcomingCampaignDates: `2026-05-${String((index + 3) * 2).padStart(2, "0")} to 2026-05-${String((index + 3) * 2 + 4).padStart(2, "0")}`,
      cdcFocalPoints: focalPoints,
      readinessLevel: index % 3 === 0 ? "Fragile" : index % 3 === 1 ? "Moderate" : "High",
      immediateRiskLevel: country.riskLevel,
      recordStatus: index % 2 ? "Submitted" : "Draft",
      reviewStatus: index % 2 ? "Awaiting Panel Review" : "In Expert Discussion",
      background: `${country.name} requires targeted operational support for hard-to-reach populations and surveillance reinforcement.`,
      workstreamAssessment: "High recurrence of missed settlements and campaign quality variation in mobile corridors.",

      // Capacity 1 - Surveillance System Performance
      totalPopulation: country.under5 * 5,
      nonCensusDisplacedPopulation: Math.round(country.under5 * 0.22),
      populationUnder5: country.under5,
      displacedUnder5: Math.round(country.under5 * 0.11),
      mobilePopulations: Math.round(country.under5 * 0.15),
      latestCensusYear: 2019 + (index % 5),
      nationalSchedule: "BCG, OPV0, OPV1-3, IPV, DTP-HepB-Hib, MR",
      geographicClustering: "High clustering in peri-urban and border-adjacent settlements.",
      surveillanceCrossBorderRisk: isHighRisk ? "High and persistent" : "Moderate with seasonal spikes",
      dtp3Coverage: Math.round(country.coverage * 100),
      dtp1Coverage: Math.min(100, Math.round(country.coverage * 100) + 8),
      measlesEliminationStatus: "Not on track in highest-risk districts",
      nonPolioAfpRate: (2.1 + (index % 3) * 0.3).toFixed(1),
      stoolAdequacy: 78 + (index % 5) * 3,
      silentDistrictShare60d: Math.max(4, Math.round(country.missedClusters / 2)),
      esDetection14d: 74 + (index % 5) * 4,
      caseInvestigation48h: 82 + (index % 4) * 3,
      weakestDistricts: priorityProvinces,
      surveillanceSystems:
        "Parallel paper and digital streams are both active; reconciliation delays are observed at subnational aggregation points.",
      rootCauseIssues:
        "Microplanning failure; supervision weakness; data not driving decisions; accountability breakdown; access/security barrier.",

      // Capacity 2 - Outbreak Response Performance
      daysCaseToResponseCampaign: 10 + (index % 8),
      highRiskDistrictCoverageRound1: 83 + (index % 6) * 2,
      lqasPassRate: 72 + (index % 7) * 3,
      missedChildrenPer10k: 36 + (index % 6) * 8,
      microplansUpdated30d: 62 + (index % 7) * 5,
      campaignExecutionGaps:
        "Independent monitoring reconciliation is delayed in selected districts; geo-coordinates are incomplete for supervisory teams.",
      microplanningQuality:
        "Settlement-level enumeration and transit-point inclusion are partially complete; informal settlement inclusion inconsistent.",
      mobilityAssessment:
        "IDP concentration and seasonal movement corridors overlap campaign micro-areas and require adaptive deployment schedules.",
      majorMobileCorridors: `Primary corridors include ${priorityProvinces}.`,
      idpRoutes: `Key IDP routes tracked around ${priorityProvinces}.`,
      seasonalMovements: "Seasonal labor and market migration peaks before campaign rounds.",
      informalSettlements: "Urban fringe informal settlements are incompletely represented in baseline microplans.",
      crossBorderVaccinationCapacity:
        "Border AFP alert sharing exists but timeliness and synchronized campaign planning remain inconsistent.",
      ancillarySupport:
        "Community health workers, outreach vaccination teams, and point-of-entry vaccination are active but unevenly resourced.",

      // Capacity 3 - Resource Mobilization
      currentHealthPriorities: "Polio outbreak response, RI recovery, and surveillance strengthening.",
      currentNonHealthPriorities: "Humanitarian access, food insecurity response, and displacement support.",
      govFinancingShareVaccination: `${18 + (index % 6) * 3}%`,
      doctorPatientRatio: `1:${3200 + index * 240}`,

      // Capacity 4 - Governance & Oversight Mechanisms
      stabilityAssessment: isHighRisk ? "Fragile in selected operational zones" : "Moderate with localized disruptions",
      upcomingElectionsTransitions: index % 2 ? "Subnational leadership turnover anticipated in next 6 months." : "No major transition expected in next 6 months.",
      subnationalGovernanceVariability: "Significant implementation performance variance across provinces/districts.",
      decentralizationEffects: "District authority is mixed; campaign escalation authority remains partly centralized.",
      accountabilityControls:
        "Independent monitoring, dashboard tracking, and escalation protocol exist; functionality varies by province.",
      governanceWeaknessType:
        "Fragmented command structure; partner misalignment; no performance enforcement in selected districts.",
      anticipatedDisruptiveEvents: "Flooding season, telecom outages, fuel shortages, and periodic border restrictions.",
      securityAccessConstraints: "Access constraints affect campaign supervision, monitoring, and corrective action cycles.",
      noGoDistricts: "See security annex; no-go pockets updated weekly through incident coordination channels.",
      conflictZones: `Conflict-affected areas include geographies around ${priorityProvinces}.`,
      nonStateControlAreas: "Limited service delivery windows in selected zones under non-state influence.",
      correctiveActionAfterLqasFail: "Immediate mop-up and focused supervisory surge within 7 days.",
      mohLeadAuthority: "Yes",
      monthlyCoordinationMeetings: "Yes",
      districtAccountabilityMeetings: "Partial",
      partnerRoleDuplicationObserved: "Yes",
      realTimePartnerDataSharing: "Partial",
      crossBorderJointMeetings: "Quarterly",
      crossBorderSharedMicroplans: "Partial",
      crossBorderVaccinationPostsStatus: "Available at major crossings only",

      // Capacity 5 - Analytics
      denominatorSources:
        "Administrative census, campaign register updates, settlement lists, and geospatial estimation layers are combined for denominators.",
      campaignMonitoringFormsFormat:
        "Tally sheets, supervisory checklists, LQAS forms, and end-process monitoring are used with mixed digital adoption.",
      vaccinationTeamSupervisionChecklist: "In use",
      vaccinationTeamPreparednessChecklist: "In use",
      supervisoryChecklistOnePage: "In use",
      tallySheetStatus: "In use",
      lqasFormsStatus: "In use",
      endProcessMonitoringStatus: "In use",
      preparednessAssessmentFormStatus: "In use",
      investigationFormsStatus: "Partially standardized",

      // Capacity 6 - Networks & Partner Functionality
      communityInfluenceNetworks:
        "Religious leaders, market associations, youth influencers, women groups, and CHWs engaged with varying consistency.",
      inCountryStakeholders:
        "MoH/EPI, WHO, UNICEF, NGOs, traditional leaders, private sector, border and education authorities.",
      usGovernmentAgencies: "CDC, USAID, and diplomatic health channels engaged for technical and coordination support.",
      requiredDecision:
        "Confirm province-level surge support package and assign cross-border accountability leads for next campaign cycle.",
      pocIdentified: "Yes",

      // Workstream assessment
      top5OperationalGaps:
        "Surveillance timeliness; denominator reconciliation; microplan completeness; supervision quality; cross-border continuity.",
      likelyDerailers: "Security deterioration, delayed funding release, logistics disruption, and governance misalignment.",
      opportunitiesForProgrammaticSynergies:
        "Align campaign microplanning with RI outreach and nutrition/WASH partner operations in hard-to-reach settlements.",

      lastUpdatedBy: "Workstream Secretariat",
      lastUpdatedUtc: "2026-03-31T18:00:00Z"
    };
  });

const diagnosticFormTemplate = [
  {
    key: "background",
    title: "Background",
    fields: [
      { label: "Country", field: "formCountry", source: "countryName" },
      { label: "Sub-Region", field: "subRegion" },
      { label: "Virus Type(s)", field: "virusType" },
      { label: "Emergence Groups", field: "emergenceGroups" },
      { label: "Most Recent Detection Type (AFP/ES)", field: "mostRecentDetectionType" },
      { label: "Most Recent Detection Date", field: "mostRecentDetectionDate" },
      { label: "Most Recent Detection Province(s)", field: "mostRecentDetectionProvinces" },
      { label: "Upcoming Campaign Type", field: "upcomingCampaignType" },
      { label: "Upcoming Campaign Antigen", field: "upcomingCampaignAntigen" },
      { label: "Target Age Group", field: "upcomingTargetAgeGroup" },
      { label: "Upcoming Campaign Dates", field: "upcomingCampaignDates" },
      { label: "CDC Country Focal Point(s)", field: "cdcFocalPoints", multiline: true }
    ]
  },
  {
    key: "capacity1",
    title: "Capacity 1 - Surveillance System Performance",
    fields: [
      { label: "Total Population", field: "totalPopulation" },
      { label: "Non-census/Displaced Populations", field: "nonCensusDisplacedPopulation" },
      { label: "Population Under-5", field: "populationUnder5" },
      { label: "Displaced Populations Under-5", field: "displacedUnder5" },
      { label: "Mobile Populations", field: "mobilePopulations" },
      { label: "Latest Census Year", field: "latestCensusYear" },
      { label: "National Schedule", field: "nationalSchedule", multiline: true },
      { label: "Geographic Clustering", field: "geographicClustering", multiline: true },
      { label: "Cross-Border Risk", field: "surveillanceCrossBorderRisk" },
      { label: "DTP3 Coverage (%)", field: "dtp3Coverage" },
      { label: "DTP1 Coverage (%)", field: "dtp1Coverage" },
      { label: "Measles Elimination Status", field: "measlesEliminationStatus" },
      { label: "Non-polio AFP Rate", field: "nonPolioAfpRate" },
      { label: "Stool Adequacy (%)", field: "stoolAdequacy" },
      { label: "% Districts Silent (60 days)", field: "silentDistrictShare60d" },
      { label: "ES Sites Detecting Within 14 Days (%)", field: "esDetection14d" },
      { label: "Case Investigation <=48h (%)", field: "caseInvestigation48h" },
      { label: "Weakest Districts", field: "weakestDistricts", multiline: true },
      { label: "Systems", field: "surveillanceSystems", multiline: true },
      { label: "Root Cause Issues", field: "rootCauseIssues", multiline: true }
    ]
  },
  {
    key: "capacity2",
    title: "Section 2 - Outbreak Response Performance",
    fields: [
      { label: "Days Case Confirmation to Response Campaign", field: "daysCaseToResponseCampaign" },
      { label: "% High-risk Districts Covered in First Round", field: "highRiskDistrictCoverageRound1" },
      { label: "LQAS Pass Rate (%)", field: "lqasPassRate" },
      { label: "Missed Children per 10,000", field: "missedChildrenPer10k" },
      { label: "Microplans Updated <=30 Days (%)", field: "microplansUpdated30d" },
      { label: "Campaign Execution Gaps", field: "campaignExecutionGaps", multiline: true },
      { label: "Microplanning Quality", field: "microplanningQuality", multiline: true },
      { label: "Mobility Assessment", field: "mobilityAssessment", multiline: true },
      { label: "Major Mobile Corridors", field: "majorMobileCorridors", multiline: true },
      { label: "IDP Routes", field: "idpRoutes", multiline: true },
      { label: "Seasonal Movements", field: "seasonalMovements", multiline: true },
      { label: "Informal Settlements", field: "informalSettlements", multiline: true },
      { label: "Cross-border Vaccination Capacity", field: "crossBorderVaccinationCapacity", multiline: true },
      { label: "Ancillary Support", field: "ancillarySupport", multiline: true }
    ]
  },
  {
    key: "capacity3",
    title: "Section 3 - Resource Mobilization",
    fields: [
      { label: "Current Health Priorities", field: "currentHealthPriorities", multiline: true },
      { label: "Current Non-health/Developmental Priorities", field: "currentNonHealthPriorities", multiline: true },
      { label: "Share of Government Financing for Vaccination", field: "govFinancingShareVaccination" },
      { label: "Doctor-to-Patient Ratio", field: "doctorPatientRatio" }
    ]
  },
  {
    key: "capacity4",
    title: "Section 4 - Governance & Oversight Mechanisms",
    fields: [
      { label: "Stability Assessment", field: "stabilityAssessment" },
      { label: "Upcoming Elections/Transitions", field: "upcomingElectionsTransitions", multiline: true },
      { label: "Subnational Governance Variability", field: "subnationalGovernanceVariability", multiline: true },
      { label: "Decentralization Effects on Campaign Authority", field: "decentralizationEffects", multiline: true },
      { label: "Accountability Controls", field: "accountabilityControls", multiline: true },
      { label: "Governance Weakness Type", field: "governanceWeaknessType", multiline: true },
      { label: "Anticipated Disruptive Events (Next 6 Months)", field: "anticipatedDisruptiveEvents", multiline: true },
      { label: "Security & Access Constraints", field: "securityAccessConstraints", multiline: true },
      { label: "No-go Districts", field: "noGoDistricts", multiline: true },
      { label: "Conflict Zones", field: "conflictZones", multiline: true },
      { label: "Areas Under Non-state Control", field: "nonStateControlAreas", multiline: true },
      { label: "Corrective Action if LQAS Fail >10%", field: "correctiveActionAfterLqasFail", multiline: true },
      { label: "Clear MoH Lead Authority (Y/N)", field: "mohLeadAuthority" },
      { label: "Monthly Coordination Meetings Documented", field: "monthlyCoordinationMeetings" },
      { label: "District-level Accountability Meetings Occurring", field: "districtAccountabilityMeetings" },
      { label: "Partner Role Duplication Observed", field: "partnerRoleDuplicationObserved" },
      { label: "Data Shared Across Partners in Real Time", field: "realTimePartnerDataSharing" },
      { label: "Cross-Border Joint Meetings", field: "crossBorderJointMeetings" },
      { label: "Cross-Border Shared Microplans", field: "crossBorderSharedMicroplans" },
      { label: "Border Vaccination Posts", field: "crossBorderVaccinationPostsStatus" }
    ]
  },
  {
    key: "capacity5",
    title: "Section 5 - Analytics",
    fields: [
      { label: "Denominator Sources & Reconciliation", field: "denominatorSources", multiline: true },
      { label: "Campaign Monitoring Forms Format", field: "campaignMonitoringFormsFormat", multiline: true },
      { label: "Vaccination Team Supervision Checklist", field: "vaccinationTeamSupervisionChecklist" },
      { label: "Vaccination Team Preparedness Checklist", field: "vaccinationTeamPreparednessChecklist" },
      { label: "Supervisory Checklist (1-page)", field: "supervisoryChecklistOnePage" },
      { label: "Tally Sheet", field: "tallySheetStatus" },
      { label: "LQAS Forms", field: "lqasFormsStatus" },
      { label: "End Process Monitoring", field: "endProcessMonitoringStatus" },
      { label: "Preparedness Assessment Form", field: "preparednessAssessmentFormStatus" },
      { label: "Specific Investigation Forms", field: "investigationFormsStatus" }
    ]
  },
  {
    key: "capacity6",
    title: "Section 6 - Networks & Partner Functionality",
    fields: [
      { label: "Community Influence Networks", field: "communityInfluenceNetworks", multiline: true },
      { label: "In-Country Stakeholders", field: "inCountryStakeholders", multiline: true },
      { label: "US Government Agencies", field: "usGovernmentAgencies", multiline: true },
      { label: "Required Decision", field: "requiredDecision", multiline: true },
      { label: "POC Identified (Y/N)", field: "pocIdentified" }
    ]
  },
  {
    key: "workstreamAssessment",
    title: "Workstream Assessment",
    fields: [
      { label: "Top 5 Operational Gaps", field: "top5OperationalGaps", multiline: true },
      { label: "Immediate Risk to Upcoming Campaign", field: "immediateRiskLevel" },
      { label: "Readiness Level (High/Moderate/Fragile)", field: "readinessLevel" },
      { label: "Most Likely Derailers", field: "likelyDerailers", multiline: true },
      { label: "Opportunities for Programmatic Synergies", field: "opportunitiesForProgrammaticSynergies", multiline: true }
    ]
  }
];

const diagnosticSections = diagnostics.flatMap((diagnostic) => [
  ["Epidemiology", 92], ["Coverage Gaps", 86], ["Population Dynamics", 78], ["Health System Constraints", 74],
  ["Existing Systems and Tools", 81], ["Operational Bottlenecks", 88], ["Missed Populations", 85],
  ["System Disconnects", 69], ["Opportunities / Recommendations", 82]
].map(([label, completionPct], idx) => ({
  id: `${diagnostic.id}-SEC-${idx + 1}`,
  diagnosticId: diagnostic.id,
  sectionKey: label.toLowerCase().replaceAll(" ", "_"),
  label,
  completionPct,
  missingEvidence: completionPct < 80 ? "Needs refreshed subnational denominator and team validation." : ""
})));

const capacities = [
  { id: "C1", label: "Surveillance System Performance" },
  { id: "C2", label: "Outbreak Response Performance" },
  { id: "C3", label: "Resource Mobilization" },
  { id: "C4", label: "Governance & Oversight Mechanisms" },
  { id: "C5", label: "Analytics" },
  { id: "C6", label: "Networks & Partner Functionality" }
];

const diagnosticCapacities = diagnostics.flatMap((diagnostic, idx) => {
  const countryAdmins = subnational.filter((admin) => admin.countryId === diagnostic.countryId);
  return capacities.map((capacity, capIndex) => ({
    id: `${diagnostic.id}-${capacity.id}`,
    diagnosticId: diagnostic.id,
    capacityId: capacity.id,
    capacityLabel: capacity.label,
    adminUnitId: countryAdmins[capIndex % countryAdmins.length].id,
    metric: capIndex % 2 ? "Timeliness" : "Coverage Quality",
    metricValue: 55 + ((idx + capIndex) % 35),
    standardValue: 80,
    status: 55 + ((idx + capIndex) % 35) >= 80 ? "On Track" : "Needs Action",
    notes: "Field validation requested for next review cycle."
  }));
});

const selectedSolutionsCatalog = selectedSolutionsCatalogSeed.map((row) => ({
  id: `SRC-SOL-${String(row.index).padStart(2, "0")}`,
  solutionId: `SOL-${String(row.index).padStart(2, "0")}`,
  ...row
}));

const solutions = selectedSolutionsCatalog.map((row, index) => ({
  id: row.solutionId,
  name: row.solutionName,
  challengeCategory: row.challengeAddressed,
  solutionType: row.solutionType === "Non-Digital" ? "Non-Digital" : "Digital",
  problemAddressed: row.challengeAddressed,
  targetPopulation: row.hardToReachTypology,
  evidenceStrength: index % 3 === 0 ? "Operational Evidence" : index % 2 === 0 ? "Case Study" : "Research",
  effectivenessSummary: row.description,
  scalability: index % 4 === 0 ? "High" : index % 3 === 0 ? "Medium" : "High",
  costEffectiveness: index % 5 === 0 ? "Moderate" : "High",
  gpeiCompatibility: "Aligned with campaign planning and operational accountability needs.",
  prerequisites: "Country focal point, partner coordination, and geography-level implementation planning.",
  recommendedContexts: row.countrySetting,
  limitations: "Context-specific operational, access, and data quality constraints.",
  status: index % 6 === 0 ? "Draft" : index % 4 === 0 ? "Vetted" : "Approved",
  feasibility: 56 + (index % 5) * 8,
  implementationSpeed: 52 + (index % 4) * 10,
  impactPotential: 62 + (index % 5) * 7,
  resourceIntensity: row.solutionType === "Non-Digital" ? "Medium" : index % 3 === 0 ? "Low" : "Medium",
  sourceReference: row.source,
  sourceWorkbookTab: "Selected Solutions (n=19)",
  remoteCapable: row.remoteCapable,
  relatedCountries: (() => {
    const inferred = countries
      .filter(
        (country) =>
          row.countrySetting.toLowerCase().includes(country.name.toLowerCase()) ||
          (country.id === "COD" && row.countrySetting.includes("Democratic Republic of the Congo"))
      )
      .map((country) => country.id);
    if (inferred.length) return inferred;
    return countries.filter((_, cIndex) => (cIndex + index) % 3 === 0).map((country) => country.id);
  })()
}));

const diagnosticOperationalGaps = diagnostics.flatMap((diagnostic, index) => [
  {
    id: `${diagnostic.id}-GAP-1`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    capacityId: "C1",
    challengeCategory: "Surveillance Gaps",
    gapSummary: "Silent district recurrence despite ES assets.",
    severity: "High",
    owner: "Field Epidemiologist",
    dueDate: "2026-05-15",
    status: "Open"
  },
  {
    id: `${diagnostic.id}-GAP-2`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    capacityId: "C2",
    challengeCategory: "Campaign Effectiveness",
    gapSummary: "Delayed post-campaign lot quality analysis feedback.",
    severity: index % 2 ? "Medium" : "High",
    owner: "M&E Specialist",
    dueDate: "2026-05-20",
    status: "In Progress"
  },
  {
    id: `${diagnostic.id}-GAP-3`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    capacityId: "C5",
    challengeCategory: "Population Enumeration",
    gapSummary: "Inconsistent denominator assumptions across partners.",
    severity: "High",
    owner: "Health Informatics SME",
    dueDate: "2026-05-18",
    status: "Open"
  }
]);

const diagnosticProposedSolutions = diagnosticOperationalGaps.map((gap, index) => {
  const solution = solutions[index % solutions.length];
  return {
    id: `PRO-${gap.id}`,
    diagnosticId: gap.diagnosticId,
    countryId: gap.countryId,
    gapId: gap.id,
    solutionId: solution.id,
    rationale: "High operational fit for mobility-linked service gaps and surveillance blind spots.",
    priority: index % 2 ? "Priority 1" : "Priority 2",
    feasibility: 65 + (index % 4) * 8,
    impact: 62 + (index % 4) * 9,
    speed: 55 + (index % 4) * 10,
    resourceIntensity: solution.resourceIntensity
  };
});

const diagnosticRisks = diagnostics.flatMap((diagnostic, index) => [
  {
    id: `${diagnostic.id}-RISK-1`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    riskType: "Lack of country buy-in",
    severity: index % 3 ? "Medium" : "High",
    owner: "Workstream Lead",
    dueDate: "2026-05-12",
    mitigationStatus: "Active",
    mitigation: "Align package milestones to country planning calendar."
  },
  {
    id: `${diagnostic.id}-RISK-2`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    riskType: "Data gaps",
    severity: "High",
    owner: "Health Informatics SME",
    dueDate: "2026-05-09",
    mitigationStatus: "Active",
    mitigation: "Triangulate ES, AFP, and satellite observations."
  }
]);

const diagnosticStakeholderSupport = diagnostics.flatMap((diagnostic) => [
  {
    id: `${diagnostic.id}-SH-1`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    stakeholder: "MoH",
    supportType: "Microplanning validation",
    status: "Committed",
    notes: "Provincial team engaged."
  },
  {
    id: `${diagnostic.id}-SH-2`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    stakeholder: "GPEI partners",
    supportType: "Surge analytics support",
    status: "Pending",
    notes: "Awaiting roster confirmation."
  }
]);

const diagnosticMissingData = diagnostics.flatMap((diagnostic) => [
  {
    id: `${diagnostic.id}-MISS-1`,
    diagnosticId: diagnostic.id,
    countryId: diagnostic.countryId,
    dataElement: "Updated settlement enumeration for cross-border belt",
    criticality: "Critical",
    owner: "GIS Specialist",
    status: "Open"
  }
]);

const annexBSourceUrl = "https://www.poliokit.org/sites/default/files/2025-10/GPEI-Action-Plan-Annex-B-Subnational-action-plans-20251013.pdf";

const regionalAnnexes = [
  {
    id: "ANNEX-HOA-2026",
    regionName: "Horn of Africa",
    countries: ["ETH", "SOM", "DJI", "SDN", "YEM"],
    timeframe: "2026 Q2",
    phaseView: "Diagnostics and TA Development",
    totalUnder5: 36130000,
    virusEmergenceGroups: "EG-1, EG-2, EG-4",
    hardToReachTypology: "Cross-border nomadic, displaced, conflict-affected, and urban informal settlements",
    status: "Submitted",
    epiSnapshot:
      "Annex B indicates persistent cross-border and insecurity-driven immunity gaps across Somalia-Ethiopia-Djibouti corridors and Sudan/Yemen access-constrained settings, with surveillance and campaign-quality variability concentrated in high-risk provinces.",
    identifiedChallenges:
      "Main constraints cited are access/security limitations, weak cross-border continuity, delayed integrated microplan quality checks, and uneven campaign monitoring quality at district/province level.",
    quantitativeHighlights: [
      "Somalia target: maintain 100% telephonic AFP validation in inaccessible areas and sustain LQAS pass rate >90% in high-risk settlements.",
      "Somalia target: at least one cross-border meeting each quarter plus one pre- and one post-campaign review per campaign.",
      "Djibouti plan: 2 bOPV rounds (September and October 2025) in high-risk operational zones.",
      "Sudan target: >=95% planned campaign coverage and PCM achievement by district in high-risk localities.",
      "Yemen target: >90% campaign coverage in southern governorates, with vaccine shipment cadence maintained at least monthly."
    ],
    qualitativeFindings: [
      "Annex B frames Horn response around cross-border synchronization, integrated microplanning quality, and faster campaign correction loops.",
      "Insecurity and population movement repeatedly disrupt last-mile implementation, requiring flexible provincial implementation modalities.",
      "Operational recommendations emphasize local ownership through recurrent review forums and province-level accountability."
    ],
    sourceReferences: [
      `Annex B (Somalia): operational targets and governance actions (approx. lines 2929-2963) | ${annexBSourceUrl}`,
      `Annex B (Djibouti): bOPV rounds and preparedness actions (approx. lines 3150-3180) | ${annexBSourceUrl}`,
      `Annex B (Sudan/Yemen): coverage and implementation priorities (approx. lines 3460-3490, 3684-3710) | ${annexBSourceUrl}`
    ],
    lastUpdatedBy: "Regional Annex Lead",
    lastUpdatedUtc: "2026-04-01T18:40:00Z"
  },
  {
    id: "ANNEX-LCB-2026",
    regionName: "Lake Chad Basin",
    countries: ["NGA", "TCD", "NER"],
    timeframe: "2026 Q2",
    phaseView: "Approval and Implementation",
    totalUnder5: 39560000,
    virusEmergenceGroups: "EG-2, EG-5",
    hardToReachTypology: "Mobile fishing communities, border settlements, and underserved peri-urban populations",
    status: "In Review",
    epiSnapshot:
      "Annex B highlights persistent transmission risk in insecure and border-adjacent LGAs/provinces despite campaign gains, with repeated immunity gaps among mobile and hard-to-reach populations in Nigeria, Chad, and Niger.",
    identifiedChallenges:
      "Core constraints include security-driven inaccessibility, non-compliance pockets, delayed fund disbursement, and weak denominator consistency for microplanning.",
    quantitativeHighlights: [
      "Nigeria (selected high-risk LGAs): OPV3 9%, IPV2 6%, and measles 9%; only 6.8k of 18k insecure settlements reached in two nOPV2 rounds.",
      "Nigeria target: reduce non-compliance by 80% by end-2025 and sustain 4 SIAs annually in high-risk areas.",
      "Chad target: >=80% district acceptance by LQAS in all SIAs and timely campaign funding release (>=4 weeks pre-SIA).",
      "Niger target: sustain 100% telephonic AFP validation in inaccessible areas (Diffa, Tillaberi, Tahoua) and complete mobile payment rollout.",
      "Niger target: run 4 OPV rounds annually plus at least one special intervention in inaccessible villages."
    ],
    qualitativeFindings: [
      "Annex B stresses cross-border operational continuity as the key determinant of sustained interruption in Lake Chad Basin.",
      "Priority recommendations focus on demand generation in non-compliant communities, stronger transit-point vaccination, and tighter supervisory accountability.",
      "Financing predictability and local implementation ownership are repeatedly identified as enabling conditions."
    ],
    sourceReferences: [
      `Annex B (Nigeria): epidemiologic context and operational targets (approx. lines 1973-2007, 2076-2083) | ${annexBSourceUrl}`,
      `Annex B (Chad): LQAS/funding and capacity actions (approx. lines 2086-2137) | ${annexBSourceUrl}`,
      `Annex B (Niger): surveillance and implementation targets (approx. lines 2253-2294) | ${annexBSourceUrl}`
    ],
    lastUpdatedBy: "Regional Annex Lead",
    lastUpdatedUtc: "2026-04-01T18:40:00Z"
  },
  {
    id: "ANNEX-DRC-2026",
    regionName: "DRC",
    countries: ["COD"],
    timeframe: "2026 Q2",
    phaseView: "Diagnostics and Approval",
    totalUnder5: 18700000,
    virusEmergenceGroups: "EG-3, EG-4, EG-6",
    hardToReachTypology: "Riverine, displaced, and peri-urban missed clusters in eastern and urban corridors",
    status: "Draft",
    epiSnapshot:
      "Annex B identifies Haut-Katanga, Haut-Lomami, Tanganyika, Tshopo, and Kinshasa as the highest-priority operational geographies with recurrent cVDPV risk, access barriers, and campaign quality variance.",
    identifiedChallenges:
      "Priority issues include late funding release, delayed post-detection response, variable microplan quality, and chronic HR payment/availability bottlenecks.",
    quantitativeHighlights: [
      "DRC target: campaigns launched within 14 days after variant confirmation in high-risk provinces.",
      "DRC target: >=95% of children in remote/HTR areas vaccinated in IM/LQAS and campaign monitoring.",
      "DRC target: 100% province-level QIPs and communication plans in high-risk provinces by end-September 2025.",
      "DRC target: 95% nOPV2 and bOPV coverage among children in Tshopo and Kinshasa by end-December 2025.",
      "DRC target: 0% HR non-payment before SIAs in QIP provinces and 100% identified HR roster by end-August 2025."
    ],
    qualitativeFindings: [
      "Annex B emphasizes synchronized province-level governance through EOC/coordination structures with monthly and campaign-cycle reviews.",
      "Risk mitigation requires parallel investments in social mobilization, logistics reliability, and provincial supervisory capability.",
      "Cross-border and mobility-linked risk management is treated as a routine operational layer rather than an ad hoc task."
    ],
    sourceReferences: [
      `Annex B (DRC): priority provinces and financing/response speed targets (approx. lines 3972-4008) | ${annexBSourceUrl}`,
      `Annex B (DRC): QIP, immunization, and HR implementation targets (approx. lines 4021-4096) | ${annexBSourceUrl}`
    ],
    lastUpdatedBy: "Regional Annex Lead",
    lastUpdatedUtc: "2026-04-01T18:40:00Z"
  }
];

const regionalCrossCountryGaps = [
  {
    id: "ANNEX-HOA-2026-CCG-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "SOM",
    capacityId: "C1",
    gapSummary: "Inaccessible-area AFP verification and campaign quality monitoring need sustained province-level execution discipline.",
    severity: "High"
  },
  {
    id: "ANNEX-HOA-2026-CCG-2",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "SDN",
    capacityId: "C2",
    gapSummary: "Coverage and PCM performance remain uneven across conflict-affected states and border localities.",
    severity: "High"
  },
  {
    id: "ANNEX-HOA-2026-CCG-3",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "YEM",
    capacityId: "C3",
    gapSummary: "Operational continuity constrained by access and differential campaign authorization across southern and northern areas.",
    severity: "High"
  },
  {
    id: "ANNEX-LCB-2026-CCG-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "NGA",
    capacityId: "C2",
    gapSummary: "High number of insecure settlements remain unreached and non-compliance pockets continue to suppress campaign quality.",
    severity: "High"
  },
  {
    id: "ANNEX-LCB-2026-CCG-2",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "TCD",
    capacityId: "C4",
    gapSummary: "Microplan quality and supervision consistency remain below desired threshold in highest-risk provinces.",
    severity: "Medium"
  },
  {
    id: "ANNEX-LCB-2026-CCG-3",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "NER",
    capacityId: "C1",
    gapSummary: "Inaccessible-area surveillance and campaign delivery require sustained telecom-enabled validation and rapid funding flow.",
    severity: "High"
  },
  {
    id: "ANNEX-DRC-2026-CCG-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    countryId: "COD",
    capacityId: "C3",
    gapSummary: "Resource mobilization and disbursement timelines do not consistently match campaign scheduling needs in priority provinces.",
    severity: "High"
  },
  {
    id: "ANNEX-DRC-2026-CCG-2",
    regionalAnnexId: "ANNEX-DRC-2026",
    countryId: "COD",
    capacityId: "C2",
    gapSummary: "Campaign readiness and post-detection response speed are uneven across provincial structures.",
    severity: "High"
  }
];

const regionalSwot = [
  {
    id: "ANNEX-HOA-2026-S-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    type: "Strength",
    text: "Clear cross-border governance actions and recurring review cadence are defined in Annex B country plans."
  },
  {
    id: "ANNEX-HOA-2026-W-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    type: "Weakness",
    text: "High operational dependence on access/security conditions creates volatile implementation performance."
  },
  {
    id: "ANNEX-HOA-2026-O-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    type: "Opportunity",
    text: "Integrated microplanning and structured border coordination can rapidly improve campaign quality."
  },
  {
    id: "ANNEX-HOA-2026-T-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    type: "Threat",
    text: "Mobility and conflict corridors can quickly re-seed transmission where campaign continuity weakens."
  },
  {
    id: "ANNEX-LCB-2026-S-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    type: "Strength",
    text: "Action plans include explicit measurable campaign and surveillance targets across all three countries."
  },
  {
    id: "ANNEX-LCB-2026-W-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    type: "Weakness",
    text: "Insecure and hard-to-reach settlements remain structurally under-covered despite repeated rounds."
  },
  {
    id: "ANNEX-LCB-2026-O-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    type: "Opportunity",
    text: "Targeted non-compliance management and transit-point vaccination can deliver high short-term gains."
  },
  {
    id: "ANNEX-LCB-2026-T-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    type: "Threat",
    text: "Delayed disbursement and weak supervision can reduce the impact of otherwise well-designed SIAs."
  },
  {
    id: "ANNEX-DRC-2026-S-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    type: "Strength",
    text: "Annex B sets province-specific execution metrics for financing, readiness, coverage, and human resources."
  },
  {
    id: "ANNEX-DRC-2026-W-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    type: "Weakness",
    text: "Operational bottlenecks are recurrent across funding speed, staffing reliability, and campaign readiness."
  },
  {
    id: "ANNEX-DRC-2026-O-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    type: "Opportunity",
    text: "Monthly province-level review tied to QIP milestones can materially improve implementation consistency."
  },
  {
    id: "ANNEX-DRC-2026-T-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    type: "Threat",
    text: "Continued delays in resource flow and HR payments can undermine high-priority provincial campaigns."
  }
];

function normalizeGeoName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

function lookupAdminUnit(countryId, adminName) {
  const target = normalizeGeoName(adminName);
  return subnational.find((item) => item.countryId === countryId && normalizeGeoName(item.name) === target) || null;
}

function buildRegionalRecommendation(config) {
  const admin = lookupAdminUnit(config.countryId, config.adminUnitName);
  return {
    id: config.id,
    regionalAnnexId: config.regionalAnnexId,
    countryId: config.countryId,
    adminUnitId: admin?.id || `${config.countryId}-${normalizeGeoName(config.adminUnitName)}`,
    adminUnitName: admin?.name || config.adminUnitName,
    adminType: admin?.adminType || "ADM1",
    solutionId: config.solutionId,
    challengeCategory: config.challengeCategory,
    timeframe: config.timeframe,
    phase: config.phase,
    recommendation: config.recommendation,
    sourceReference: config.sourceReference
  };
}

const regionalRecommendedSolutions = [
  buildRegionalRecommendation({
    id: "ANNEX-LCB-2026-REC-1",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "NGA",
    adminUnitName: "Sokoto",
    solutionId: "SOL-12",
    challengeCategory: "Cross-Border Populations",
    timeframe: "Through end-2025",
    phase: "Phase 2-3",
    recommendation: "Expand transit-point vaccination and cross-border microplanning with intensified non-compliance conversion support.",
    sourceReference: "Annex B Nigeria table (lines ~1973-2007)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-LCB-2026-REC-2",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "NGA",
    adminUnitName: "Katsina",
    solutionId: "SOL-14",
    challengeCategory: "Mobility and Migration",
    timeframe: "Quarterly",
    phase: "Phase 2-3",
    recommendation: "Institutionalize cross-border quarterly operational reviews and weekly settlement tracking in insecure areas.",
    sourceReference: "Annex B Nigeria table (lines ~2019-2033)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-LCB-2026-REC-3",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "TCD",
    adminUnitName: "Ouaddai",
    solutionId: "SOL-03",
    challengeCategory: "Campaign Effectiveness",
    timeframe: "Per campaign cycle",
    phase: "Phase 2-3",
    recommendation: "Enforce microplan quality checks and supervision protocol to sustain >=80% LQAS district acceptance.",
    sourceReference: "Annex B Chad table (lines ~2116-2137)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-LCB-2026-REC-4",
    regionalAnnexId: "ANNEX-LCB-2026",
    countryId: "NER",
    adminUnitName: "Diffa",
    solutionId: "SOL-16",
    challengeCategory: "Surveillance Gaps",
    timeframe: "Monthly",
    phase: "Phase 2-3",
    recommendation: "Maintain 100% telephonic AFP validation in inaccessible districts and link alerts to provincial rapid response workflows.",
    sourceReference: "Annex B Niger table (lines ~2253-2272)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-HOA-2026-REC-1",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "SOM",
    adminUnitName: "Galmudug",
    solutionId: "SOL-14",
    challengeCategory: "Cross-Border Populations",
    timeframe: "Quarterly",
    phase: "Phase 1-3",
    recommendation: "Sustain quarterly cross-border meetings and paired pre/post-campaign reviews for high-risk settlement corridors.",
    sourceReference: "Annex B Somalia table (lines ~2951-2963)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-HOA-2026-REC-2",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "DJI",
    adminUnitName: "Djibouti",
    solutionId: "SOL-03",
    challengeCategory: "Campaign Effectiveness",
    timeframe: "Sep-Oct 2025 cycle",
    phase: "Phase 1-2",
    recommendation: "Implement two bOPV rounds with updated ICMs and integrated supervisory checklists.",
    sourceReference: "Annex B Djibouti table (lines ~3150-3180)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-HOA-2026-REC-3",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "SDN",
    adminUnitName: "North Darfur",
    solutionId: "SOL-10",
    challengeCategory: "Health System Constraints",
    timeframe: "Each campaign round",
    phase: "Phase 2-3",
    recommendation: "Drive district readiness reviews to achieve >=95% planned coverage and PCM performance in priority localities.",
    sourceReference: "Annex B Sudan table (lines ~3460-3490)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-HOA-2026-REC-4",
    regionalAnnexId: "ANNEX-HOA-2026",
    countryId: "YEM",
    adminUnitName: "Aden",
    solutionId: "SOL-07",
    challengeCategory: "Campaign Effectiveness",
    timeframe: "Monthly",
    phase: "Phase 2-3",
    recommendation: "Sequence vaccine supply and campaign operations to protect >90% southern-governorate coverage while managing north/south constraints.",
    sourceReference: "Annex B Yemen table (lines ~3684-3710)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-DRC-2026-REC-1",
    regionalAnnexId: "ANNEX-DRC-2026",
    countryId: "COD",
    adminUnitName: "Tanganyika",
    solutionId: "SOL-03",
    challengeCategory: "Campaign Effectiveness",
    timeframe: "By end-September 2025",
    phase: "Phase 2-3",
    recommendation: "Deliver 100% province-level QIPs and communication plans; enforce readiness checks for each campaign cycle.",
    sourceReference: "Annex B DRC table (lines ~4021-4039)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-DRC-2026-REC-2",
    regionalAnnexId: "ANNEX-DRC-2026",
    countryId: "COD",
    adminUnitName: "Tshopo",
    solutionId: "SOL-07",
    challengeCategory: "Population Enumeration",
    timeframe: "By end-December 2025",
    phase: "Phase 3",
    recommendation: "Reach 95% nOPV2 and bOPV vaccination coverage among children in targeted high-risk communities.",
    sourceReference: "Annex B DRC table (lines ~4059-4070)"
  }),
  buildRegionalRecommendation({
    id: "ANNEX-DRC-2026-REC-3",
    regionalAnnexId: "ANNEX-DRC-2026",
    countryId: "COD",
    adminUnitName: "Kinshasa",
    solutionId: "SOL-16",
    challengeCategory: "Resource Mobilization",
    timeframe: "By end-August 2025",
    phase: "Phase 2-3",
    recommendation: "Eliminate HR non-payment before SIAs and maintain complete rostering for campaign workforce planning.",
    sourceReference: "Annex B DRC table (lines ~4088-4096)"
  })
];

const taPackages = [
  {
    id: "TA-NGA-2026-01",
    countryId: "NGA",
    title: "Borno and Yobe Mobile Corridor TA Packet",
    operationalGapAddressed: "Cross-border missed children and delayed campaign corrective action.",
    geographicScope: "Borno, Yobe, border corridor nodes",
    prerequisites: "Provincial incident manager endorsement and partner data-sharing protocol.",
    taType: "Hybrid technical assistance",
    startDate: "2026-04-20",
    endDate: "2026-06-20",
    interventionCycle: "Cycle-2",
    currentPhaseId: 3,
    approvalStatus: "Approved",
    status: "Active",
    owner: "Workstream Lead",
    readinessScore: 82,
    riskScore: 67,
    objectives: "Improve campaign precision and surveillance responsiveness in high-risk districts.",
    expectedOutputs: "Validated district microplans, operational dashboard, weekly corrective action brief.",
    dependencies: "MoH focal point availability; partner transport support.",
    contingencyPlan: "Fallback to remote weekly decision huddles if in-person deployment is restricted.",
    handoverPlan: "Transition dashboard ownership to provincial analytics cell by week 8."
  },
  {
    id: "TA-ETH-2026-01",
    countryId: "ETH",
    title: "Somali-Oromia Mobility Corridor TA Packet",
    operationalGapAddressed: "Cross-border mobility and missed settlement tracking gaps.",
    geographicScope: "Somali, Oromia, and Gambella priority corridors",
    prerequisites: "Regional surveillance triangulation and corridor focal point roster.",
    taType: "Hybrid analytics and field coaching",
    startDate: "2026-04-14",
    endDate: "2026-06-13",
    interventionCycle: "Cycle-1",
    currentPhaseId: 1,
    approvalStatus: "Under Review",
    status: "Pending Approval",
    owner: "Field Epidemiologist",
    readinessScore: 74,
    riskScore: 72,
    objectives: "Increase surveillance timeliness and close mobility-linked coverage gaps at province level.",
    expectedOutputs: "Province readiness scorecard, corridor route plan, and harmonized denominator update.",
    dependencies: "Partner mobility mapping input and district supervision roster.",
    contingencyPlan: "Prioritize remote triangulation and weekly virtual district action reviews if access constraints rise.",
    handoverPlan: "Regional analytics cell co-chairs weekly review by week 6."
  },
  {
    id: "TA-COD-2026-01",
    countryId: "COD",
    title: "Tanganyika Operational Recovery Packet",
    operationalGapAddressed: "Campaign quality and denominator uncertainty.",
    geographicScope: "Tanganyika and South Kivu",
    prerequisites: "Updated settlement baseline and district supervisor roster.",
    taType: "Embedded technical surge",
    startDate: "2026-04-28",
    endDate: "2026-06-27",
    interventionCycle: "Cycle-3",
    currentPhaseId: 3,
    approvalStatus: "Approved",
    status: "Active",
    owner: "Health Informatics SME",
    readinessScore: 79,
    riskScore: 70,
    objectives: "Raise implementation fidelity and reduce recurrence of missed clusters.",
    expectedOutputs: "District action tracker and validated route plans.",
    dependencies: "Data-sharing from humanitarian coordination cell.",
    contingencyPlan: "Deploy minimal viable district package where access is constrained.",
    handoverPlan: "Provincial EOC analytics lead becomes package custodian."
  },
  {
    id: "TA-NER-2026-01",
    countryId: "NER",
    title: "Diffa-Zinder Border Readiness Packet",
    operationalGapAddressed: "Silent district recurrence and weak cross-border response handoff.",
    geographicScope: "Diffa, Zinder, and Maradi operational zones",
    prerequisites: "Cross-border case investigation protocol and partner referral focal points.",
    taType: "Rapid implementation package",
    startDate: "2026-05-02",
    endDate: "2026-07-01",
    interventionCycle: "Cycle-3",
    currentPhaseId: 2,
    approvalStatus: "Pending",
    status: "Pending Approval",
    owner: "Workstream Lead",
    readinessScore: 69,
    riskScore: 76,
    objectives: "Stabilize surveillance and improve campaign quality in high-risk border regions.",
    expectedOutputs: "Cross-border escalation matrix and district rapid action dashboard.",
    dependencies: "Country office coordination and border operations roster.",
    contingencyPlan: "Prioritize highest-risk districts if funding release is delayed.",
    handoverPlan: "Country focal point and regional partner desk own tracker at end of cycle."
  }
];

const taSelectedSolutions = taPackages.flatMap((packet, index) => [0, 1, 2].map((offset) => {
  const solution = solutions[(index * 3 + offset) % solutions.length];
  return {
    id: `${packet.id}-SOL-${offset + 1}`,
    taPackageId: packet.id,
    solutionId: solution.id,
    rationale: "High fit to gap profile and operational timeline.",
    priority: offset === 0 ? "Primary" : "Secondary",
    feasibility: 68 + offset * 8,
    impact: 70 + offset * 6,
    speed: 62 + offset * 7,
    resources: solution.resourceIntensity
  };
}));

const taImplementationPlan = taPackages.flatMap((packet, packetIndex) => [
  {
    id: `${packet.id}-PLAN-1`,
    taPackageId: packet.id,
    weekWindow: "Week 1-2",
    objective: "Operational diagnostics closure and district action planning.",
    tasks: "Validate high-risk cluster list; align focal points; stand up weekly review room.",
    outputs: "Confirmed district priority map and action tracker.",
    owner: "Country Focal Point",
    status: packetIndex % 2 ? "Planned" : "In Progress",
    startDate: packet.startDate,
    endDate: "2026-05-07",
    geographyId: subnational.find((admin) => admin.countryId === packet.countryId)?.id || ""
  },
  {
    id: `${packet.id}-PLAN-2`,
    taPackageId: packet.id,
    weekWindow: "Week 3-4",
    objective: "Implementation coaching and rapid corrective action cycle.",
    tasks: "Run supervision blitz; monitor silent district trend; adjust route plans.",
    outputs: "Corrective action log and updated microplans.",
    owner: "M&E Specialist",
    status: "Planned",
    startDate: "2026-05-08",
    endDate: "2026-05-21",
    geographyId: subnational.find((admin) => admin.countryId === packet.countryId)?.id || ""
  }
]);

const taRoles = taPackages.flatMap((packet) => [
  { id: `${packet.id}-ROLE-1`, taPackageId: packet.id, stakeholder: "MoH", role: "Country Co-Lead", responsibility: "Approve district priorities and convene review", status: "Assigned" },
  { id: `${packet.id}-ROLE-2`, taPackageId: packet.id, stakeholder: "GPEI Partners", role: "Implementation Support", responsibility: "Field supervision and logistics", status: "Assigned" },
  { id: `${packet.id}-ROLE-3`, taPackageId: packet.id, stakeholder: "CDC Workstream", role: "Technical Steward", responsibility: "Analytics, quality review, and learning capture", status: "Assigned" }
]);

const approvals = taPackages.flatMap((packet, index) => [
  { id: `${packet.id}-APR-1`, taPackageId: packet.id, step: "Internal Workstream Review", reviewer: "Workstream Lead", status: "Approved", dueDate: "2026-04-05", comment: "Proceed with revisions addressed.", updatedUtc: "2026-03-30T18:15:00Z" },
  { id: `${packet.id}-APR-2`, taPackageId: packet.id, step: "Technical Review Panel Validation", reviewer: "TRP Chair", status: index % 2 ? "Pending" : "Approved", dueDate: "2026-04-08", comment: "Validate assumptions on denominator.", updatedUtc: "2026-03-31T10:22:00Z" },
  { id: `${packet.id}-APR-3`, taPackageId: packet.id, step: "PEB Leadership Review", reviewer: "PEB Deputy", status: index === 0 ? "Pending" : "Not Started", dueDate: "2026-04-11", comment: "", updatedUtc: "2026-03-31T10:22:00Z" },
  { id: `${packet.id}-APR-4`, taPackageId: packet.id, step: "Country Focal Point Signoff", reviewer: "Country Focal Point", status: "Not Started", dueDate: "2026-04-14", comment: "", updatedUtc: "2026-03-31T10:22:00Z" }
]);

const implementationCycles = taPackages.map((packet, index) => ({
  id: `CYCLE-${packet.id}`,
  countryId: packet.countryId,
  taPackageId: packet.id,
  startDate: packet.startDate,
  endDate: packet.endDate,
  status: packet.status,
  progressPct: 35 + index * 21,
  atRiskFlag: packet.riskScore > 70 ? 1 : 0
}));

const implementationActivities = implementationCycles.flatMap((cycle, idx) => [
  {
    id: `${cycle.id}-ACT-1`,
    cycleId: cycle.id,
    countryId: cycle.countryId,
    solutionId: solutions[idx % solutions.length].id,
    activity: "District onboarding and action plan launch",
    category: "Training & Supervision",
    status: "In Progress",
    owner: "Country Focal Point",
    startDate: cycle.startDate,
    endDate: "2026-05-05",
    progressPct: 62,
    blocker: "",
    partner: "MoH"
  },
  {
    id: `${cycle.id}-ACT-2`,
    cycleId: cycle.id,
    countryId: cycle.countryId,
    solutionId: solutions[(idx + 1) % solutions.length].id,
    activity: "Cross-border movement data validation",
    category: "Coordination",
    status: idx % 2 ? "At Risk" : "In Progress",
    owner: "GIS Specialist",
    startDate: "2026-05-06",
    endDate: "2026-05-21",
    progressPct: 44,
    blocker: idx % 2 ? "Partner data handoff delayed." : "",
    partner: "Humanitarian Agencies"
  }
]);

const monitoringIndicators = countries.flatMap((country, cIndex) => [
  { id: `${country.id}-COV`, countryId: country.id, indicator: "Immunization Coverage", baseline: 62 - (cIndex % 7), current: 66 + (cIndex % 7), target: 80, unit: "%", date: "2026-03-31" },
  { id: `${country.id}-MISSED`, countryId: country.id, indicator: "Missed Children", baseline: 120000 - cIndex * 5000, current: 94000 - cIndex * 4200, target: 60000, unit: "count", date: "2026-03-31" },
  { id: `${country.id}-SURV`, countryId: country.id, indicator: "Surveillance Timeliness", baseline: 54 + cIndex, current: 63 + cIndex, target: 80, unit: "%", date: "2026-03-31" }
]);

const months = ["2025-10-01", "2025-11-01", "2025-12-01", "2026-01-01", "2026-02-01", "2026-03-01"];
const epiTimeSeries = countries.flatMap((country, cIndex) =>
  months.map((month, mIndex) => ({
    id: `${country.id}-${month}`,
    countryId: country.id,
    date: month,
    cases: Math.max(2, 36 - mIndex * 4 + (cIndex % 5)),
    coverage: Number((country.coverage + mIndex * 0.015).toFixed(3)),
    surveillanceTimeliness: Number((0.52 + mIndex * 0.035 + cIndex * 0.004).toFixed(3)),
    silentDistrictShare: Number((0.24 - mIndex * 0.02 + (cIndex % 3) * 0.01).toFixed(3))
  }))
);

const lessonsLearned = countries.slice(0, 6).map((country, index) => ({
  id: `LESSON-${index + 1}`,
  countryId: country.id,
  date: `2026-03-${String(12 + index).padStart(2, "0")}`,
  challengeCategory: challengeCategories[index % challengeCategories.length],
  lesson: "Rapid district review cadence improves implementation correction speed when paired with shared evidence standards.",
  bestPractice: "Use one-page district signal dashboard before weekly review meetings.",
  feedsInventory: "Yes"
}));

const workflowStatus = countries.map((country, index) => ({
  id: `WF-${country.id}`,
  countryId: country.id,
  phaseId: country.currentPhaseId,
  owner: country.focalPoints[0],
  dueDate: `2026-05-${String(7 + index).padStart(2, "0")}`,
  completionPct: 30 + country.currentPhaseId * 22,
  blockers: country.currentPhaseId >= 2 ? "Partner coordination lead time." : "Incomplete subnational evidence package.",
  nextMilestone: country.currentPhaseId >= 2 ? "TRP review closure" : "Country review closure"
}));

const riskRegister = countries.map((country, index) => ({
  id: `RISK-${country.id}`,
  countryId: country.id,
  riskType: ["Lack of country buy-in", "Data gaps", "Coordination challenges", "Resource limitations"][index % 4],
  severity: index % 2 ? "Medium" : "High",
  owner: "Workstream Lead",
  dueDate: `2026-05-${String(10 + index).padStart(2, "0")}`,
  mitigationStatus: index % 3 ? "Active" : "Escalated",
  mitigation: "Escalation to regional coordination and weekly risk huddle."
}));

const activityFeed = [
  { id: "ACT-001", date: "2026-03-31 10:20", type: "Diagnostic Update", countryId: "ETH", summary: "Coverage gaps section completed with updated district risk flags.", user: "Field Epidemiologist" },
  { id: "ACT-002", date: "2026-03-31 11:45", type: "Solution Inventory", countryId: "NGA", summary: "Added evidence summary for GRID3 deployment in border districts.", user: "GIS Specialist" },
  { id: "ACT-003", date: "2026-03-31 13:10", type: "TA Package", countryId: "NER", summary: "Week 1-2 tasks revised after cross-border coordination feedback.", user: "Workstream Lead" },
  { id: "ACT-004", date: "2026-03-31 15:00", type: "Approval", countryId: "COD", summary: "TRP validation marked approved with one condition.", user: "Technical Panel" }
];

const auditEdits = activityFeed.map((item, index) => ({
  id: `AUD-${index + 1}`,
  entityType: item.type,
  entityId: item.id,
  countryId: item.countryId,
  user: item.user,
  timestamp: item.date,
  action: "Update",
  summary: item.summary
}));

const humanitarianActorsCatalog = [
  { id: "HUM-WHO", name: "WHO", actorType: "UN Agency" },
  { id: "HUM-UNICEF", name: "UNICEF", actorType: "UN Agency" },
  { id: "HUM-IOM", name: "IOM", actorType: "UN Agency" },
  { id: "HUM-WFP", name: "WFP", actorType: "UN Agency" },
  { id: "HUM-UNHCR", name: "UNHCR", actorType: "UN Agency" },
  { id: "HUM-MSF", name: "MSF", actorType: "INGO" },
  { id: "HUM-IRC", name: "IRC", actorType: "INGO" },
  { id: "HUM-ICRC", name: "ICRC", actorType: "INGO" },
  { id: "HUM-SC", name: "Save the Children", actorType: "INGO" },
  { id: "HUM-IMC", name: "International Medical Corps", actorType: "INGO" },
  { id: "HUM-NRC", name: "NRC", actorType: "INGO" },
  { id: "HUM-OCHA", name: "OCHA", actorType: "UN Coordination" }
];

const humanitarianActivityTypes = [
  "Health Services",
  "Surveillance Support",
  "Risk Communication",
  "Nutrition Support",
  "WASH Services",
  "Protection Services",
  "Logistics Support",
  "Cross-border Coordination"
];

const humanitarianActorByRegion = {
  "Horn of Africa": ["HUM-WHO", "HUM-UNICEF", "HUM-IOM", "HUM-UNHCR", "HUM-MSF", "HUM-OCHA"],
  "Lake Chad Basin": ["HUM-WHO", "HUM-UNICEF", "HUM-WFP", "HUM-ICRC", "HUM-IRC", "HUM-SC", "HUM-OCHA"],
  DRC: ["HUM-WHO", "HUM-UNICEF", "HUM-WFP", "HUM-IMC", "HUM-NRC", "HUM-MSF", "HUM-OCHA"]
};

const provinceLevelRegions = new Set(["Horn of Africa", "Lake Chad Basin", "DRC"]);
const humanitarianPresence = subnational.flatMap((admin, index) => {
  const country = countries.find((item) => item.id === admin.countryId);
  if (!country || !provinceLevelRegions.has(country.region)) return [];

  const actorPool = (humanitarianActorByRegion[country.region] || []).map((actorId) => humanitarianActorsCatalog.find((actor) => actor.id === actorId)).filter(Boolean);
  const actorCount = 2 + (index % 3);
  const selectedActors = actorPool.slice(index % Math.max(1, actorPool.length - actorCount + 1), (index % Math.max(1, actorPool.length - actorCount + 1)) + actorCount);
  const selectedActivities = [
    humanitarianActivityTypes[index % humanitarianActivityTypes.length],
    humanitarianActivityTypes[(index + 2) % humanitarianActivityTypes.length],
    humanitarianActivityTypes[(index + 5) % humanitarianActivityTypes.length]
  ];

  return selectedActors.map((actor, actorIndex) => ({
    id: `HUM-PRES-${admin.id}-${actor.id}`,
    year: 2026,
    asOfDate: "2026-03-31",
    regionName: country.region,
    countryId: admin.countryId,
    adminUnitId: admin.id,
    adminUnitName: admin.name,
    actorId: actor.id,
    actorName: actor.name,
    actorType: actor.actorType,
    what: selectedActivities[actorIndex % selectedActivities.length],
    programArea: actorIndex % 2 ? "Outbreak readiness and campaign support" : "Surveillance and humanitarian service continuity",
    whereDetail: `${admin.name}, ${country.name}`,
    status: "Active"
  }));
});

export const initialData = {
  metadata: {
    appName: "CDC Strategic Solutions Workstream Platform",
    version: "1.0.0-prototype",
    lastRefreshUtc: "2026-04-01T16:30:00Z",
    assumptions:
      "Demo data only. Geospatial panels are connected to official WHO/GPEI ArcGIS boundary layers."
  },
  dimensions: {
    phaseCatalog,
    challengeCategories,
    populationTypes: ["Zero-dose", "Missed children", "Mobile", "Cross-border", "Displaced", "Underserved"],
    epidemiologicProfiles: ["cVDPV", "WPV1", "Mixed Risk", "Surveillance Concern"],
    solutionTypes: ["Digital", "Non-Digital"],
    approvalStatuses: ["Not Started", "Pending", "Under Review", "Approved", "Rejected"],
    implementationPhases: phaseCatalog.map((phase) => `${phase.code} - ${phase.name}`),
    diagnosticFormTemplate
  },
  countries,
  subnational,
  diagnostics,
  diagnosticSections,
  diagnosticCapacities,
  diagnosticOperationalGaps,
  diagnosticProposedSolutions,
  diagnosticRisks,
  diagnosticStakeholderSupport,
  diagnosticMissingData,
  solutions,
  selectedSolutionsCatalog,
  solutionSummary,
  regionalAnnexes,
  regionalCrossCountryGaps,
  regionalSwot,
  regionalRecommendedSolutions,
  taPackages,
  taSelectedSolutions,
  taImplementationPlan,
  taRoles,
  approvals,
  implementationCycles,
  implementationActivities,
  monitoringIndicators,
  epiTimeSeries,
  lessonsLearned,
  workflowStatus,
  riskRegister,
  activityFeed,
  auditEdits,
  humanitarianActorsCatalog,
  humanitarianPresence
};
