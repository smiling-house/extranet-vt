# extranet-vt — Repository Summary

## Overview
**Package name:** `villatrackerfrontend`
**Repository folder:** `extranet-vt`
**Purpose:** The **VillaTracker Extranet** — a React SPA that acts as the internal/partner-facing management hub for VillaTracker's vacation-rental operation. It handles property listings, reservations, agent & agency management, partner onboarding, and multi-source channel integration (Guesty, RomanticUrentals, BreakingPlus, Invenio, BART, SH).

> README.md in the repo is the default Create-React-App boilerplate — this SUMMARY supersedes it.

## Tech Stack

### Core
- **React 18.2** (Create React App / react-scripts 5.0.1)
- **React Router v5** (`react-router-dom`)
- **Redux Toolkit** + `react-redux` for state
- **Axios** for HTTP, **JWT decode** for auth tokens
- **Sass** + Emotion for styling

### UI / UX
- **Material-UI (MUI) v5** + Material React Table
- **React Bootstrap** + Bootstrap 5
- **Framer Motion** (animations), **React Toastify** (toasts), **SweetAlert**
- React Data Table, multiple DatePickers (MUI, react-datepicker, react-dates, tw-daterange)

### Integrations
- **Mapbox GL / MapLibre GL / React Google Maps** — mapping & geolocation
- **Stripe** (`@stripe/react-stripe-js`, `stripe`) — payments
- **OpenAI SDK** (`openai` ^4.63) — AI-powered region/zipcode mapping for unmapped properties
- **Papa Parse** — CSV import/export
- Day.js, Moment.js, Numeral

## What the App Does
A feature-rich extranet (~58 page modules, ~51 component modules) covering:

| Area | Capabilities |
|---|---|
| **Auth** | Login, admin login, signup, password reset, 2FA with QR |
| **Property management** | Listings (SH / RU / BP variants), property edit, duplicated-listing detection, advanced search, property approval flow |
| **Reservations** | Reservation management, property reservation flow, guest picker |
| **Partners** | Multi-source partner dashboards: Partners, PartnersSH, PartnersVT, PartnersBP, PartnersRU, PartnersBART, PartnersINVENIO |
| **Admin** | User management, task queue, agent approval/disapproval, collections, hot destinations |
| **Region mapping** | AI-assisted (OpenAI) mapping for unmapped zipcodes/regions, grouped by country |
| **EPS extranet** | Enterprise partner listings & reservations |
| **Search & discovery** | Filters, map view, favorites, wishlist, hot destinations |
| **Reporting** | Reporting dashboard |

### Backend endpoints (referenced in code)
- `https://backend.villatracker.com`
- `https://api.villatracker.com` (SH)

## Project Structure
```
extranet-vt/
├── src/
│   ├── pages/          # ~58 feature pages
│   ├── components/     # ~51 reusable components (tables, forms, modals, icons)
│   ├── store/          # Redux reducers + API slices
│   ├── api/            # Request helpers / reload utilities
│   ├── services/       # Auth service, backend calls
│   └── Util/           # Constants, validation, CSV utils, country/timezone/amenity data
├── public/             # Static assets, fonts, geojson continents
├── guestyReservation/  # Sample Guesty reservation JSON (OTA-style payload)
├── package.json
├── .htaccess           # Apache SPA rewrite rules
├── .env                # Environment config (present; not checked in normally)
└── *.bat               # Windows helper scripts (install / start / build / open editor)
```

## Git State
- **Branches (5):** `main`, `prav-extranet-vt`, `jaison-dev-branch`, `2FA-prav`, `origin/HEAD`
- **Commits:** ~201 total — actively developed
- **Recent work (Asana-tracked):**
  - Property-listing search — locate by title to change status
  - Login email-symbol encoding fix
  - Unmapped-property handling + OpenAI region lookups
  - RU/BP declined-but-live reservation status handling
  - Persistent sorting on partner pages

## Deployment
- SPA served through **Apache** using `.htaccess` (`mod_rewrite` → `/index.html`)
- Standard CRA build pipeline: `npm run build` produces the `build/` folder
- `.bat` helpers exist for Windows dev workflow (install, start, build, open VS Code)

## Notable Implementation Details
- Heavy use of **localStorage** for user context (token, agent, agency, cached regions/destinations/cities/countries)
- **Role-based access** derived from JWT + partner-type regex (sh-ru, sh-bp, ObjectID patterns)
- **Responsive sidebar** that collapses below 800px
- Redux + Axios middleware pipeline for authenticated requests
- Multi-source **property sync & deduplication** logic across channels

## Quick Start
```bash
# Install
npm install    # or: yarn

# Dev server (http://localhost:3000)
npm start

# Production build
npm run build
```

## Status
**Active, production-grade frontend** for the VillaTracker partner/admin extranet. Many channel integrations are wired up. The only weak spot is documentation — the repo ships with default CRA README and no architectural overview (this file fills that gap).

## Suggested Next Steps
1. Replace default CRA README with a real project overview (this file can seed it).
2. Extract hard-coded backend URLs into environment config.
3. Consolidate the many date-picker libraries (MUI + react-datepicker + react-dates + tw-daterange) — pick one.
4. Add a CONTRIBUTING / branching guide given 5 active branches.
5. Document required `.env` variables in a committed `.env.example`.
