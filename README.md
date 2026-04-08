# CDC Strategic Solutions Workstream Ops Platform (Custom Web App)

This is a full custom internal operations prototype for the CDC Strategic Innovations Workstream (PEB/GID), built as a modular browser app with realistic mock operational data.

## Run Locally

### Option A (No Node, No Python install)

1. In File Explorer, open:
`C:\Users\qrl9\OneDrive - CDC\[GID-PEB]\+Digital workstream\ssw-ops-platform`
2. Double-click:
`open-dashboard.cmd`
3. Your browser opens automatically to:
`http://localhost:4173` (or next available port if 4173 is in use)
4. Keep that terminal window open while you use the app.

### Option B (If Node is available)

1. Open terminal in:
`C:\Users\qrl9\OneDrive - CDC\[GID-PEB]\+Digital workstream\ssw-ops-platform`
2. Run:
`node server.mjs`
3. Open:
`http://localhost:4173`

## Share With Others (Single Internal URL)

Use IIS hosting so everyone can open one shared URL.

### 1. Build an IIS-ready package

From project root, run:

`powershell -NoProfile -ExecutionPolicy Bypass -File .\package-iis.ps1`

This creates:
- `deployment\out\<package-name>\` (publish folder)
- `deployment\out\<package-name>.zip` (share with IT)

### 2. Publish in IIS

1. Create a new IIS Site (or Application) and set physical path to extracted package folder.
2. Keep `web.config` from the package in the site root.
3. Ensure Default Document is enabled (`index.html`).
4. Browse using the internal site URL (for example: `https://intranet/ssw-ops/`).

### 3. Network allow-list (required for maps/data)

Allow outbound HTTPS from user browsers to:
- `services.arcgis.com`
- `services5.arcgis.com`
- `api.unhcr.org`

### Important sharing note

This is currently a static app with browser `localStorage` persistence.
That means each user sees/saves their own edits unless we add a shared backend (PostgreSQL/API).

## What This Includes

- Executive operations overview dashboard (KPI cards, trends, alerts, activity feed, operational map panel)
- Country case review workspace with SOP phase ribbon and structured diagnostic completion
- Dedicated form page: **Polio Response Diagnostic Sheet**
- Country Diagnostics now mirrors the **actual Polio Response Diagnostic Sheet** section structure (Background, Capacities 1-6, and Workstream Assessment)
- Strategic Resources pages for **Summary** and **Solutions Inventory** sourced from `Strategic.Innovations.Worksheet_2.25.2026.xlsx` (`Summary` + `Selected Solutions (n=19)` tabs)
- Dedicated form page: **Country Technical Assistance Packet**
- Merged **Implementation and M&E** internal tracker (cycle progress, blockers, workflow completion, references, and recent edits)
- Dedicated form page: **Regional Annex**
- Grouped navigation:
  - Main Dashboard
  - Country-by-country Review: Country Diagnostics, Regional Annex, TA Packages
  - Internal Tracker: Implementation and M&E (merged with previous Tools content)
  - Strategic Resources: Humanitarian Intelligence, Summary, Solutions Inventory
  - Settings pinned at bottom-left
- Global filter bar (country, region, epi profile, population type, implementation phase, challenge category, solution category)
- Prototype writeback behavior (in-app edits saved to browser local storage)
- Priority-group adaptation aligned to Annex B focus: **Horn of Africa, Lake Chad Basin, and DRC** only (Pakistan/Afghanistan removed)
- Regional Annex now includes **province/state/governorate-level map panels** and geography-linked solution recommendations
- Regional Annex mock narratives have been partially replaced with **Annex B-referenced quantitative targets and qualitative findings** for HoA, Lake Chad Basin, and DRC
- Migration and Displacement Tracker integrated into **Main Dashboard** and **Humanitarian Intelligence** with:
  - IOM DTM IDP/Returnee overlays (subnational where available)
  - UNHCR refugee/asylum context (country-level annual reporting)
  - trend summaries, source notes, refresh notes, and methodological caveats
- New **Settings** page for non-technical configuration:
  - app title
  - primary color
  - background color
  - dark/light mode
  - card/button/sidebar/table style controls
  - layout visibility toggles and section label overrides (App Builder)
  (saved to browser local storage and applied live without reload)

## Architecture Summary

- `app/main.js`: app bootstrap and store wiring
- `app/core/store.js`: global state, filters, and local-storage-backed data updates
- `app/data/mock-data.js`: typed-like structured mock entities for workflow/reporting
- `app/views/app-shell.js`: routing, page composition, interactions, and reusable render helpers
- `app/lib/maps/polio-boundaries.js`: WHO/GPEI ArcGIS boundary source config and GeoJSON loader
- `app/lib/maps/geo-join.js`: geography name normalization and app-record boundary join helpers
- `app/lib/maps/map-panel.js`: Leaflet map rendering, choropleth styling, tooltip, click-to-select, and fallback status
- `app/lib/data/migration-displacement.js`: official-source migration/displacement service (IOM DTM + UNHCR), name normalization, and trend/overlay shaping
- `styles/main.css`: operations-center visual system and responsive layout
- `server.mjs`: lightweight static server for local use

## Data Model (Prototype)

Mock entities include:
- Countries and subnational units
- Diagnostic headers, sections, capacities, gaps, risks, stakeholder support, missing data
- Solutions inventory and proposed solution links
- Regional annex, cross-country gaps, SWOT, and recommended geography-linked solutions
- Annex B source-reference fields (`sourceReferences`, `sourceReference`) for traceability of regional narrative updates
- TA packages, selected solutions, implementation plans, roles, and approvals
- Implementation cycles and activity tracker
- Monitoring indicators and epi trends
- Workflow status, risk register, activity feed, and audit trail

## Replacing Mock Data with Real APIs Later

You can swap to real services in two steps:

1. Replace `app/data/mock-data.js` with fetch-based loaders from API endpoints (or a `data-service.js` module).
2. Keep UI unchanged and feed the same entity shapes into the store.

Suggested future backend patterns:
- REST/GraphQL service with country/diagnostic/TA endpoints
- Authenticated writeback API for form edits and approvals
- Audit log and workflow status updates per record save
- GIS boundary API for true GPEI boundary layers

## Boundary Endpoints (WHO/GPEI ArcGIS Hub)

Boundary layers are configured in:
`app/lib/maps/polio-boundaries.js`

Current endpoints in use:
- Admin0: `https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/GLOBAL_POLIO_ADM0/FeatureServer/0`
- Admin1: `https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/GLOBAL_POLIO_ADM1/FeatureServer/0`
- Admin2: `https://services.arcgis.com/5T5nSi527N4F7luB/arcgis/rest/services/GLOBAL_POLIO_ADM2/FeatureServer/0`

Query pattern used by the app:
- `.../query?where=...&outFields=*&returnGeometry=true&f=geojson`

If WHO/GPEI updates layer URLs or names, update only the config object in `app/lib/maps/polio-boundaries.js`.

## Migration/Displacement Sources

Migration/displacement source config is in:
`app/lib/data/migration-displacement.js`

Current endpoints in use:
- IOM DTM FeatureServer root:
  `https://services5.arcgis.com/QYf5PkPqzJKVzrmF/ArcGIS/rest/services/Global_DTM_Data_Admin2/FeatureServer`
- IOM DTM IDP layer:
  `https://services5.arcgis.com/QYf5PkPqzJKVzrmF/ArcGIS/rest/services/Global_DTM_Data_Admin2/FeatureServer/0`
- IOM DTM Returnee layer:
  `https://services5.arcgis.com/QYf5PkPqzJKVzrmF/ArcGIS/rest/services/Global_DTM_Data_Admin2/FeatureServer/1`
- UNHCR population API:
  `https://api.unhcr.org/population/v1/population/`
- UNHCR API documentation:
  `https://api.unhcr.org/docs/refugee-statistics.html`

Query pattern used by the app:
- IOM DTM:
  `.../query?where=ISO3 IN (...)&outFields=...&returnGeometry=true|false&f=json`
- UNHCR:
  `.../population/?yearFrom=...&yearTo=...&coa=...&cf_type=ISO`

Notes:
- The tracker does **not** present data as real-time.
- IOM values are operational snapshots and recency can vary by country/admin area.
- UNHCR values are annual reporting-year context (country level in this app).
- If IOM/UNHCR endpoint paths change, update only constants in `app/lib/data/migration-displacement.js`.

## Current Limitations

- Geospatial rendering depends on access to ArcGIS services and internet connectivity
- Writeback is local-storage prototype only (not multi-user server persistence)
- No authentication/authorization enforced in this prototype

## Local Reset (Browser)

To clear all saved edits and UI settings for this app, remove these localStorage keys in browser dev tools:

- `ssw_ops_platform_state_v1`
- `ssw_ops_platform_settings_v1`
- `ssw_ops_platform_app_config_v1`
