# TRUEMEASURE — Sample Test Scenarios & Example Data Guide

> **Ministry of Consumer Affairs / Legal Metrology — SIH 2026 PS26036**  
> This guide details all the realistic sample data, personas, and step-by-step test scenarios pre-loaded into your TRUEMEASURE dashboard.

---

## ⚡ Quick Test: Interactive Scenario Launcher

In your web dashboard at **`http://localhost:5173`**:
1. Click the **`🧪 Test Scenarios`** button in the top navigation bar (or click the User Avatar icon).
2. Click **"Launch Scenario"** on any of the cards to instantly log in as that persona and navigate to their specific dashboard screen!

---

## 📋 Comprehensive List of Test Personas & Scenarios

---

### Scenario 1: Standard Shopkeeper Registration & Tracking
* **Persona:** **Rajesh Kumar**
* **User ID:** `USR-001`
* **Role:** Applicant (*Shopkeeper / Kirana Trader*)
* **Business:** Kumar General Store, Chandni Chowk, Delhi NCR
* **Contact:** `9876543210` | `rajesh@kumarstore.in`

#### Pre-seeded Instruments:
* **`INS-001`** — *Electronic Weighing Scale* (Essae DS-252, 30 kg). **Status:** `Certified` with active QR Certificate `CERT-001` expiring soon.
* **`INS-002`** — *Counter Scale* (Sansui SC-110, 10 kg). **Status:** `Officer Assigned` (`APP-002` scheduled with Inspector Vikram Singh).
* **`INS-003`** — *Standard Weights Set* (National 5 kg set). **Status:** `Application Submitted` (`APP-003`).
* **`INS-016`** — *Capacity Measure* (National CM-10L). **Status:** `Registered`.

#### Step-by-Step Test Procedure:
1. Open the dashboard (Rajesh Kumar is the default applicant).
2. Look at the **Summary Cards**: Observe 4 instruments, 2 pending applications, 1 active certificate.
3. Click **"My Applications"** in the sidebar:
   * View `APP-001`: Shows a completed 7-stage verification.
   * View `APP-002`: Stepper is at **Step 4: Officer Assigned**. Click **"Show Details"** to see the assigned officer (`USR-006`).
4. Click **"Register Instrument"** in the sidebar:
   * **Step 1 (Details):** Select "Electronic Weighing Scale", enter Make "Essae", Model "DS-300", Serial "EWS-2026-999", Capacity "30 kg", Region "Delhi NCR".
   * **Step 2 (Document Upload):** Click to upload any dummy PDF/image (e.g. business license).
   * **Step 3 (Review & Submit):** Check the legal confirmation checkbox and click **Submit Application**.
   * Notice that the instrument is immediately created and you can track it on the lifecycle stepper!

---

### Scenario 2: Expired Platform Scale & 1-Click Re-Verification
* **Persona:** **Priya Sharma**
* **User ID:** `USR-002`
* **Role:** Applicant (*Retail Trader*)
* **Business:** Sharma Kirana & Provisions, Dadar, Mumbai
* **Contact:** `9876543211` | `priya@sharmakirana.in`

#### Pre-seeded Instruments:
* **`INS-004`** — *Electronic Weighing Scale* (Essae DS-450, 50 kg). **Status:** `Active / Tracking`.
* **`INS-005`** — *Platform Scale* (Avery PL-200, 200 kg heavy warehouse scale). **Status:** `Expired` (Expired on 2026-04-01).
* **`INS-006`** — *Measuring Tape* (Stanley MT-30m, 30 m). **Status:** `Documents Uploaded` (`APP-005`).
* **`INS-017`** — *Water Meter* (Itron WM-50, 50 m³/h). **Status:** `Officer Assigned` (`APP-011`).

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Priya**.
2. Notice the summary card: **1 Expired Instrument** in red.
3. Click **"Alerts"** in the sidebar:
   * See the prominent red alert card: **Expired Platform Scale (`INS-005`, 200 kg Avery)**.
   * Click the **"Re-Verify"** button right on that card.
   * It immediately redirects to the registration form so the shopkeeper can renew the verification without manual paperwork!
4. Click **"Certificates"** in the sidebar:
   * Observe `CERT-006` marked as **EXPIRED** alongside her valid certificates.

---

### Scenario 3: Commercial Petroleum Dispenser Verification
* **Persona:** **Mohammed Iqbal**
* **User ID:** `USR-003`
* **Role:** Applicant (*Fuel Station Dealer*)
* **Business:** Iqbal Fuel Station, Secunderabad, Hyderabad
* **Contact:** `9876543212` | `iqbal@fuelstation.in`

#### Pre-seeded Instruments:
* **`INS-007`** — *Fuel Dispensing Unit* (Tokheim Q330, 100 L/min flow rate). **Status:** `Certified` (`CERT-003`).
* **`INS-008`** — *Fuel Dispensing Unit* (Gilbarco SK700, 100 L/min flow rate). **Status:** `Re-Verification Due`.
* **`INS-009`** — *Electronic Scale* (CAS ED-30, 30 kg). **Status:** `Field Verification` in progress (`APP-007`).
* **`INS-018`** — *Length Measure* (Freemans FT-15, 15 m). **Status:** `Application Submitted` (`APP-012`).

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Mohammed**.
2. Click **"Certificates"** in the sidebar:
   * View the digital certificate for **Tokheim Q330 Fuel Dispensing Unit**.
   * Inspect the dynamically rendered QR Code.
   * Click **"Download PDF"** and **"Print"** to test export capabilities.
3. Click **"My Applications"**:
   * View `APP-007` for his CAS ED-30 scale: Observe it is at **Step 5: Field Verification** assigned to Inspector Arjun Nair.

---

### Scenario 4: High-Precision Gold & Diamond Balance
* **Persona:** **Anita Desai**
* **User ID:** `USR-004`
* **Role:** Applicant (*Jeweller / Gold Merchant*)
* **Business:** Desai Jewellers, Maninagar, Ahmedabad
* **Contact:** `9876543213` | `anita@desaijewellers.in`

#### Pre-seeded Instruments:
* **`INS-010`** — *Beam Balance* (National BB-100g, 100 g precision). **Status:** `Certified` (`CERT-004`).
* **`INS-011`** — *Electronic Precision Scale* (Shimadzu UX-420H, 420 g with 0.001 g micro-sensitivity). **Status:** `Field Inspection Complete / Under Decision` (`APP-013`).
* **`INS-012`** — *Standard Reference Weights Set* (OIML E2-1mg to 200g). **Status:** `Registered`.

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Anita**.
2. Click **"My Applications"**:
   * View `APP-008` (Beam Balance): Expand details to review the officer's inspection note:
     > *"Precision balance in excellent condition. Sensitivity test passed. Meets precision requirements for jewellery trade."*
   * View `APP-013` (Shimadzu analytical scale): It has passed field verification with Class E2 weights and is under final decision.

---

### Scenario 5: Rejected Instrument with Legal Rationale
* **Persona:** **Suresh Patel**
* **User ID:** `USR-005`
* **Role:** Applicant (*Industrial Manufacturing*)
* **Business:** Patel Industrial Weighing, Hinjewadi, Pune
* **Contact:** `9876543214` | `suresh@patelindustrial.in`

#### Pre-seeded Instruments:
* **`INS-013`** — *Platform Scale* (Essae SI-810, 500 kg heavy industrial scale). **Status:** `Certified` (`CERT-005`).
* **`INS-014`** — *Electronic Scale* (Mettler Toledo ME-3002, 3200 g). **Status:** `Active / Tracking`.
* **`INS-015`** — *Spring Balance* (Salter SB-25, 25 kg). **Status:** `Rejected` (`APP-010`).

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Suresh**.
2. Click **"My Applications"**:
   * Locate application **`APP-010`** for the **Salter SB-25 Spring Balance**.
   * Notice the red **"Rejected"** badge at Step 6.
   * Click **"Show Details"** to read the mandatory rejection rationale recorded by the officer:
     > *"Instrument fails accuracy test. Spring mechanism fatigued, zero error exceeds tolerance. Recommend replacement."*
   * Notice that rejected applications are recorded in the audit trail without a certificate being issued.

---

### Scenario 6: Field Verification & AI OCR Audit (Officer Flow)
* **Persona:** **Inspector Vikram Singh**
* **User ID:** `USR-006`
* **Role:** LMO / GATC Officer (*Field Verifier*)
* **Division:** Legal Metrology Department — Delhi Division
* **Contact:** `9876543215` | `vikram.singh@lmd.gov.in`

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Inspector Vikram**.
2. **Officer Dashboard**: Review the 4 status cards (*Assigned Today, Pending Verification, Completed This Week, Total Assigned*).
3. Click **"Assigned Queue"** in the sidebar:
   * View all applications assigned to Inspector Vikram.
   * Filter by status (e.g. *Officer Assigned* or *Field Verification*).
4. Click **"Review"** on **`APP-002`** (Kumar General Store — Counter Scale):
   * **GPS Capture:** Click **"Capture GPS Location"** to record live coordinates.
   * **Photos:** Notice uploaded verification angle photos.
   * **Legal Checklist:** Check off the 8 Legal Metrology compliance items (Tampering check, serial number match, seal verification, accuracy tolerance).
   * **AI OCR Document Review:** View the split-screen comparison of the uploaded registration certificate against the OCR extracted fields. Edit any suggested field and click **Confirm**.
   * **Decision:** Click **"Verify & Approve"** to generate the digital certificate, OR click **"Reject"** and type a mandatory reason.

---

### Scenario 7: Legal Metrology Department Oversight (Admin Flow)
* **Persona:** **Dr. Kavita Mehta**
* **User ID:** `USR-009`
* **Role:** Admin (*Legal Metrology Director*)
* **Department:** Central Ministry of Consumer Affairs
* **Contact:** `9876543218` | `kavita.mehta@lmd.gov.in`

#### Step-by-Step Test Procedure:
1. In the Topbar, click **Test Scenarios** → **Launch Scenario as Dr. Kavita Mehta**.
2. **KPI Header**:
   * Total Registered Instruments: **18**
   * Pending Verifications: **5**
   * Verified This Month: **2**
   * Expiring in 30 Days: **2**
   * Active Officers: **3**
3. **Interactive Charts (Recharts)**:
   * Hover over the **Applications Over Time** chart to view month-by-month trends.
   * Inspect the **Status Breakdown** donut chart.
   * Check the **Officer Workload** grouped bar chart comparing Inspector Vikram Singh, Meena Rao, and Arjun Nair.
4. Click **"Instrument Registry"**:
   * Filter by Region: Select **"Mumbai"** to see Priya Sharma's instruments.
   * Filter by Expiry: Select **"30"** to see instruments expiring in under 30 days.
5. Click **"Audit Log"**:
   * View the complete chronological record of all actions across applicants, officers, and automated background alerts.
6. Click **"User Management"**:
   * Filter by **Applicants**, **Officers**, and **Admins**.
   * Click **"+ Add User"** to test the modal for provisioning new users.

---

## 💾 Permanent Location on Your Computer
* **Root Guide:** `weighing an instrument measurment dashboard\TEST_SCENARIOS_AND_EXAMPLES.md`
* **App Guide:** `weighing an instrument measurment dashboard\truemeasure-dashboard\TEST_SCENARIOS_AND_EXAMPLES.md`
* **Launcher:** `c:\Users\ADMIN\Desktop\LAUNCH_TRUEMEASURE.bat`
