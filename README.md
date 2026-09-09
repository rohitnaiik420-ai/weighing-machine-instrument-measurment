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

---

## ⚡ Backend Architecture (FastAPI + PostgreSQL / SQLite)

> **Team Alpha Coders | Smart India Hackathon 2026**

The backend is built in **Python 3.13** using **FastAPI**, **SQLAlchemy 2.0 ORM**, and **PyJWT + RBAC**:

### 🛠️ Backend Tech Stack
- **Framework**: FastAPI (high-performance async REST API)
- **Server**: Uvicorn ASGI
- **ORM & Database**: SQLAlchemy 2.0 — Dual compatible:
  - **Default**: Zero-config SQLite (`truemeasure.db`) for immediate offline/local run
  - **PostgreSQL**: Set `DATABASE_URL=postgresql://user:password@localhost:5432/truemeasure` in `.env`
- **Security**: JWT Bearer authentication + RBAC decorators (`applicant`, `officer`, `admin`)
- **Document & File Storage**: Multi-part document upload handling with static serving (`/static/documents`)
- **Audit Logs**: Immutable database audit log tracking every user action and lifecycle event
- **Public QR Validation**: Public endpoint verifying digital certificates for on-site machines

### 📡 Core REST Endpoints
| Method | Endpoint | Description | Auth / RBAC |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user account | Public |
| `POST` | `/api/auth/login` | Authenticate & get JWT token | Public |
| `GET` | `/api/auth/me` | Current authenticated profile | Bearer Token |
| `GET` | `/api/instruments` | List instruments (filtered by role/owner) | Authenticated |
| `POST` | `/api/instruments` | Register new weighing machine | Applicant / Admin |
| `GET` | `/api/applications` | Applications queue & tracking | Authenticated |
| `POST` | `/api/applications` | Submit verification application | Applicant |
| `PUT` | `/api/applications/{id}/assign` | Assign inspector & schedule date | Officer / Admin |
| `POST` | `/api/applications/{id}/verification`| Record on-site GPS & checklist | Officer |
| `POST` | `/api/applications/{id}/decision`| Verification decision (certify/reject) | Officer / Admin |
| `GET` | `/api/certificates` | List issued digital certificates | Authenticated |
| `GET` | `/api/certificates/verify-qr/{code}` | Public QR code authenticity check | **Public** |
| `POST` | `/api/documents/upload` | Upload invoices, specs & photos | Authenticated |
| `GET` | `/api/audit-logs` | Query system audit trail | Officer / Admin |
| `GET` | `/api/analytics/kpis` | Summary KPIs for executive dashboard | Authenticated |
| `GET` | `/api/analytics/charts` | Visual data for Recharts widgets | Authenticated |

---

## 🚀 One-Click Launchers

You can launch components individually or run the complete full-stack platform:
- **`START_FULLSTACK.bat`**: Launches both FastAPI Backend (Port 8000) and React Frontend (Port 5173) together.
- **`START_BACKEND.bat`**: Launches only the FastAPI backend server on `http://localhost:8000`.
- **`START_DASHBOARD.bat`**: Launches only the React frontend on `http://localhost:5173`.
- **Interactive Swagger Docs**: Open `http://localhost:8000/docs` while the backend is running.

