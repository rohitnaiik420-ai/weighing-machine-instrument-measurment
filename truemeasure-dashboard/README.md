# TRUEMEASURE — Digital Verification Platform (Web Dashboard)

> **SIH 2026 | PS26036 | Ministry of Consumer Affairs / Legal Metrology**  
> Modern, role-based digital verification platform for weighing & measuring instruments. Replaces manual verification with online registration, officer scheduling, field verification (GPS + photo + notes), and QR-authenticated digital certificates.

---

## 🚀 Quick Launch (One-Click)

Simply double-click **`START_DASHBOARD.bat`** located in this folder or in the parent folder! It will:
1. Verify dependencies
2. Start the Vite development server on `http://localhost:5173`
3. Automatically launch your default web browser

---

## 👥 Role-Based Architecture & Demo Switcher

TRUEMEASURE provides 3 fully functional, integrated role experiences that you can seamlessly toggle using the **Role Switcher pill** in the top right navigation bar:

### 1. 🏪 Applicant View (Shopkeepers / Traders / Manufacturers)
- **Summary Cards**: My Instruments, Pending Applications, Active Certificates, Expiring Soon
- **Instrument Registration**: 3-step intuitive wizard (Details → Document Upload with mock AI OCR extraction → Review & Confirm)
- **Application Tracker**: Interactive horizontal 9-step stepper tracking the canonical lifecycle
- **Digital Certificates**: QR-authenticated certificates with expiry countdown, print, and PDF download triggers
- **Expiry Alerts & Reminders**: Color-coded urgency alerts (<30 days critical, 30–60 days warning, 60–90 days upcoming) with 1-click "Re-Verify" action

### 2. 🛡️ LMO / GATC Officer View (Field Verifiers)
- **Assigned Queue**: Search and filter by status (Assigned, Field Verification, Decision, Completed, Rejected), location, and dates
- **Field Verification Form**:
  - Live GPS auto-capture (falls back to calibrated municipal benchmarks)
  - Multi-angle field photo upload
  - Standard Legal Metrology compliance checklist
  - Inspector inspection notes
- **Document Review & AI OCR Inspection**: Split-view comparing original uploaded documents with OCR extractions. AI assists with field suggestions, while the officer maintains full audit decision power (auto-approval is strictly prevented)
- **Decision Panel**: Verified approval or mandatory-reason rejection modal
- **Monthly Schedule Calendar**: Interactive day-by-day inspection calendar

### 3. 🏛️ Admin View (Legal Metrology Department)
- **Executive KPI Row**: Total Registered Instruments, Pending Verifications, Verified This Month, Expiring in 30 Days, Active Officers
- **Visual Analytics (Recharts)**:
  - Applications Trend over Time (Applications vs Verified vs Rejected)
  - Live Status Breakdown donut chart
  - Officer Workload comparative bar charts
- **Instrument Registry Table**: Comprehensive multi-column sortable, searchable, and filterable table across regions, owners, and expiry brackets
- **Complete Audit Trail**: Immutable system and human actor activity log
- **User & Access Management**: Filterable directory of Applicants, Officers, and Admins with quick role assignment and modal additions

---

## 🔄 Canonical Application Lifecycle

Every screen adheres strictly to the canonical 9-step lifecycle:
1. **Instrument Registration**
2. **Application Submitted**
3. **Documents Uploaded**
4. **Officer Assigned**
5. **Field Verification** *(GPS + photos + checklist)*
6. **Decision** *(Verified / Non-Verified)*
7. **Digital Certificate + QR Issued**
8. **Tracking & Expiry Alerts**
9. **Re-Verification**

---

## 🔌 Swappable Service Architecture

The data layer is decoupled in `src/data/services.js`:
- All functions (`getApplicationsByApplicant`, `submitFieldVerification`, `submitDecision`, etc.) return standard Promises with simulated async latency.
- Currently backed by a rich, realistic in-memory dataset in `src/data/mockData.js` (10 users, 18 instruments, 12 applications, 5 certificates, 20 audit logs).
- **Wiring FastAPI + PostgreSQL**: Simply swap the mock return values in `services.js` with `fetch('/api/...')` or axios calls — **zero UI components need to be modified**.

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler & Dev Server**: Vite 5
- **Styling**: Tailwind CSS (Gov / DigiLocker-inspired Navy `#1e3a5f`, Brand Blue `#2563eb`, and high-contrast status colors)
- **Charts**: Recharts
- **QR Codes**: `qrcode.react` (SVG)
- **Icons**: Lucide React
