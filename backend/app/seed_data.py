import json
from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, engine, Base
from backend.app.models.user import User
from backend.app.models.instrument import Instrument
from backend.app.models.application import Application
from backend.app.models.certificate import Certificate
from backend.app.models.audit_log import AuditLog
from backend.app.auth.security import get_password_hash

def seed_database(db: Session = None):
    """Seed initial data matching TRUEMEASURE prototype personas."""
    close_db = False
    if db is None:
        Base.metadata.create_all(bind=engine)
        db = SessionLocal()
        close_db = True

    try:
        # Check if already seeded
        if db.query(User).count() > 0:
            print("Database already contains data. Skipping seeding.")
            return

        print("Seeding database with initial SIH 2026 data...")
        default_pwd_hash = get_password_hash("password123")

        # 1. Seed Users (10 Users)
        users_data = [
            # Applicants
            {"id": "USR-001", "name": "Rajesh Kumar", "role": "applicant", "business_name": "Kumar General Store", "phone": "9876543210", "email": "rajesh@kumarstore.in", "region": "Delhi NCR"},
            {"id": "USR-002", "name": "Priya Sharma", "role": "applicant", "business_name": "Sharma Kirana & Provisions", "phone": "9876543211", "email": "priya@sharmakirana.in", "region": "Mumbai"},
            {"id": "USR-003", "name": "Mohammed Iqbal", "role": "applicant", "business_name": "Iqbal Fuel Station", "phone": "9876543212", "email": "iqbal@fuelstation.in", "region": "Hyderabad"},
            {"id": "USR-004", "name": "Anita Desai", "role": "applicant", "business_name": "Desai Jewellers", "phone": "9876543213", "email": "anita@desaijewellers.in", "region": "Ahmedabad"},
            {"id": "USR-005", "name": "Suresh Patel", "role": "applicant", "business_name": "Patel Industrial Weighing", "phone": "9876543214", "email": "suresh@patelindustrial.in", "region": "Pune"},
            # Officers
            {"id": "USR-006", "name": "Inspector Vikram Singh", "role": "officer", "business_name": "LMO — Delhi Division", "phone": "9876543215", "email": "vikram.singh@lmd.gov.in", "region": "Delhi NCR"},
            {"id": "USR-007", "name": "Inspector Meena Rao", "role": "officer", "business_name": "GATC — Mumbai Division", "phone": "9876543216", "email": "meena.rao@lmd.gov.in", "region": "Mumbai"},
            {"id": "USR-008", "name": "Inspector Arjun Nair", "role": "officer", "business_name": "LMO — Hyderabad Division", "phone": "9876543217", "email": "arjun.nair@lmd.gov.in", "region": "Hyderabad"},
            # Admins
            {"id": "USR-009", "name": "Dr. Kavita Mehta", "role": "admin", "business_name": "Legal Metrology Department", "phone": "9876543218", "email": "kavita.mehta@lmd.gov.in", "region": "Delhi NCR"},
            {"id": "USR-010", "name": "Sanjay Gupta", "role": "admin", "business_name": "Legal Metrology Department", "phone": "9876543219", "email": "sanjay.gupta@lmd.gov.in", "region": "Delhi NCR"},
        ]
        for u in users_data:
            db.add(User(
                id=u["id"],
                name=u["name"],
                email=u["email"],
                hashed_password=default_pwd_hash,
                role=u["role"],
                phone=u["phone"],
                business_name=u["business_name"],
                region=u["region"],
                is_active=True
            ))

        # 2. Seed Instruments (18 Instruments)
        instruments_data = [
            {"id": 'INS-001', "owner_id": 'USR-001', "category": 'Electronic Weighing Scale', "manufacturer": 'Essae', "model_number": 'DS-252', "serial_number": 'EWS-2024-00145', "capacity": '30 kg', "accuracy_class": 'Class III', "location": 'Shop Floor, Chandni Chowk, Delhi', "installation_date": '2025-08-15', "status": 'certified', "last_verified_date": '2025-09-01', "expiry_date": '2026-09-01'},
            {"id": 'INS-002', "owner_id": 'USR-001', "category": 'Counter Scale', "manufacturer": 'Sansui', "model_number": 'SC-110', "serial_number": 'CS-2024-00312', "capacity": '10 kg', "accuracy_class": 'Class III', "location": 'Counter, Chandni Chowk, Delhi', "installation_date": '2026-07-10', "status": 'officer_assigned'},
            {"id": 'INS-003', "owner_id": 'USR-001', "category": 'Weights (Standard Set)', "manufacturer": 'National', "model_number": 'WS-5kg', "serial_number": 'WT-2025-00089', "capacity": '5 kg set', "accuracy_class": 'Class M1', "location": 'Shop Floor, Chandni Chowk, Delhi', "installation_date": '2026-08-20', "status": 'submitted'},
            {"id": 'INS-004', "owner_id": 'USR-002', "category": 'Electronic Weighing Scale', "manufacturer": 'Essae', "model_number": 'DS-450', "serial_number": 'EWS-2024-00267', "capacity": '50 kg', "accuracy_class": 'Class III', "location": 'Main Store, Dadar, Mumbai', "installation_date": '2025-06-20', "status": 'certified', "last_verified_date": '2025-07-15', "expiry_date": '2026-07-15'},
            {"id": 'INS-005', "owner_id": 'USR-002', "category": 'Platform Scale', "manufacturer": 'Avery', "model_number": 'PL-200', "serial_number": 'PS-2024-00098', "capacity": '200 kg', "accuracy_class": 'Class III', "location": 'Warehouse, Dadar, Mumbai', "installation_date": '2025-03-10', "status": 'expired', "last_verified_date": '2025-04-01', "expiry_date": '2026-04-01'},
            {"id": 'INS-006', "owner_id": 'USR-002', "category": 'Measuring Tape', "manufacturer": 'Stanley', "model_number": 'MT-30m', "serial_number": 'MT-2026-00034', "capacity": '30 m', "accuracy_class": 'Class II', "location": 'Store, Dadar, Mumbai', "installation_date": '2026-08-01', "status": 'documents_uploaded'},
            {"id": 'INS-007', "owner_id": 'USR-003', "category": 'Fuel Dispensing Unit', "manufacturer": 'Tokheim', "model_number": 'Q330', "serial_number": 'FDU-2024-00056', "capacity": '100 L/min', "accuracy_class": 'Class 0.5', "location": 'Pump 1, Secunderabad, Hyderabad', "installation_date": '2025-05-15', "status": 'certified', "last_verified_date": '2025-06-10', "expiry_date": '2026-12-10'},
            {"id": 'INS-008', "owner_id": 'USR-003', "category": 'Fuel Dispensing Unit', "manufacturer": 'Gilbarco', "model_number": 'SK700', "serial_number": 'FDU-2024-00057', "capacity": '100 L/min', "accuracy_class": 'Class 0.5', "location": 'Pump 2, Secunderabad, Hyderabad', "installation_date": '2025-05-15', "status": 'reverification', "last_verified_date": '2025-06-10', "expiry_date": '2026-09-10'},
            {"id": 'INS-009', "owner_id": 'USR-003', "category": 'Electronic Weighing Scale', "manufacturer": 'CAS', "model_number": 'ED-30', "serial_number": 'EWS-2026-00401', "capacity": '30 kg', "accuracy_class": 'Class III', "location": 'Shop, Secunderabad, Hyderabad', "installation_date": '2026-08-25', "status": 'field_verification'},
            {"id": 'INS-010', "owner_id": 'USR-004', "category": 'Beam Balance', "manufacturer": 'National', "model_number": 'BB-100g', "serial_number": 'BB-2025-00023', "capacity": '100 g', "accuracy_class": 'Class II', "location": 'Workshop, Maninagar, Ahmedabad', "installation_date": '2025-11-01', "status": 'certified', "last_verified_date": '2025-12-05', "expiry_date": '2026-12-05'},
            {"id": 'INS-011', "owner_id": 'USR-004', "category": 'Electronic Weighing Scale', "manufacturer": 'Shimadzu', "model_number": 'UX-420H', "serial_number": 'EWS-2026-00512', "capacity": '420 g (0.001g)', "accuracy_class": 'Class I', "location": 'Lab, Maninagar, Ahmedabad', "installation_date": '2026-07-15', "status": 'verified', "last_verified_date": '2026-08-10', "expiry_date": '2027-08-10'},
            {"id": 'INS-012', "owner_id": 'USR-004', "category": 'Weights (Standard Set)', "manufacturer": 'OIML', "model_number": 'E2-1mg', "serial_number": 'WT-2026-00102', "capacity": '1 mg – 200 g', "accuracy_class": 'Class E2', "location": 'Lab, Maninagar, Ahmedabad', "installation_date": '2026-08-30', "status": 'registered'},
            {"id": 'INS-013', "owner_id": 'USR-005', "category": 'Platform Scale', "manufacturer": 'Essae', "model_number": 'SI-810', "serial_number": 'PS-2025-00156', "capacity": '500 kg', "accuracy_class": 'Class III', "location": 'Factory, Hinjewadi, Pune', "installation_date": '2025-07-20', "status": 'certified', "last_verified_date": '2025-08-15', "expiry_date": '2026-08-15'},
            {"id": 'INS-014', "owner_id": 'USR-005', "category": 'Electronic Weighing Scale', "manufacturer": 'Mettler Toledo', "model_number": 'ME-3002', "serial_number": 'EWS-2025-00678', "capacity": '3200 g', "accuracy_class": 'Class II', "location": 'Lab, Hinjewadi, Pune', "installation_date": '2025-09-10', "status": 'tracking', "last_verified_date": '2025-10-05', "expiry_date": '2026-10-05'},
            {"id": 'INS-015', "owner_id": 'USR-005', "category": 'Spring Balance', "manufacturer": 'Salter', "model_number": 'SB-25', "serial_number": 'SB-2026-00045', "capacity": '25 kg', "accuracy_class": 'Class IIII', "location": 'Warehouse, Hinjewadi, Pune', "installation_date": '2026-06-01', "status": 'rejected'},
            {"id": 'INS-016', "owner_id": 'USR-001', "category": 'Capacity Measure', "manufacturer": 'National', "model_number": 'CM-10L', "serial_number": 'CM-2026-00078', "capacity": '10 L', "accuracy_class": 'Class III', "location": 'Shop, Chandni Chowk, Delhi', "installation_date": '2026-09-01', "status": 'registered'},
            {"id": 'INS-017', "owner_id": 'USR-002', "category": 'Water Meter', "manufacturer": 'Itron', "model_number": 'WM-50', "serial_number": 'WM-2026-00034', "capacity": '50 m³/h', "accuracy_class": 'Class 2', "location": 'Warehouse, Dadar, Mumbai', "installation_date": '2026-08-15', "status": 'officer_assigned'},
            {"id": 'INS-018', "owner_id": 'USR-003', "category": 'Length Measure', "manufacturer": 'Freemans', "model_number": 'FT-15', "serial_number": 'LM-2026-00012', "capacity": '15 m', "accuracy_class": 'Class II', "location": 'Shop, Secunderabad, Hyderabad', "installation_date": '2026-08-28', "status": 'submitted'},
        ]
        for inst in instruments_data:
            db.add(Instrument(
                id=inst["id"],
                owner_id=inst["owner_id"],
                category=inst["category"],
                model_number=inst["model_number"],
                serial_number=inst["serial_number"],
                manufacturer=inst["manufacturer"],
                capacity=inst["capacity"],
                accuracy_class=inst.get("accuracy_class", "Class III"),
                location=inst["location"],
                installation_date=inst["installation_date"],
                status=inst["status"],
                last_verified_date=inst.get("last_verified_date"),
                expiry_date=inst.get("expiry_date")
            ))

        # 3. Seed Applications (13 Applications)
        applications_data = [
            {
                "id": 'APP-001', "instrument_id": 'INS-001', "applicant_id": 'USR-001', "status": 'certified',
                "documents": [{'name': 'Business License.pdf', 'size': '1.2 MB'}, {'name': 'Previous Certificate.pdf', 'size': '0.8 MB'}],
                "ocr_extract": {'Business Name': 'Kumar General Store', 'License No': 'DL/LM/2024/1156', 'Capacity': '30 kg'},
                "assigned_officer_id": 'USR-006', "schedule_date": '2025-08-28',
                "field_verification": {'gps': {'lat': 28.6505, 'lng': 77.2303}, 'notes': 'Scale in good condition. All seals intact.'},
                "decision": 'verified', "decision_date": '2025-09-01', "decision_reason": 'All parameters within tolerance.',
                "certificate_id": 'CERT-001', "created_at": '2025-08-15'
            },
            {
                "id": 'APP-002', "instrument_id": 'INS-002', "applicant_id": 'USR-001', "status": 'officer_assigned',
                "documents": [{'name': 'Business License.pdf', 'size': '1.2 MB'}],
                "ocr_extract": {'Business Name': 'Kumar General Store', 'Instrument Type': 'Counter Scale'},
                "assigned_officer_id": 'USR-006', "schedule_date": '2026-09-05',
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-07-10'
            },
            {
                "id": 'APP-003', "instrument_id": 'INS-003', "applicant_id": 'USR-001', "status": 'submitted',
                "documents": [{'name': 'Business License.pdf', 'size': '1.2 MB'}],
                "ocr_extract": {'Business Name': 'Kumar General Store', 'Instrument Type': 'Weights Set'},
                "assigned_officer_id": None, "schedule_date": None,
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-08-20'
            },
            {
                "id": 'APP-004', "instrument_id": 'INS-004', "applicant_id": 'USR-002', "status": 'certified',
                "documents": [{'name': 'Shop License.pdf', 'size': '0.9 MB'}],
                "ocr_extract": {'Business Name': 'Sharma Kirana', 'Capacity': '50 kg'},
                "assigned_officer_id": 'USR-007', "schedule_date": '2025-07-10',
                "field_verification": {'gps': {'lat': 19.0178, 'lng': 72.8478}, 'notes': 'Instrument calibrated correctly.'},
                "decision": 'verified', "decision_date": '2025-07-15', "decision_reason": 'Meets all requirements.',
                "certificate_id": 'CERT-002', "created_at": '2025-06-20'
            },
            {
                "id": 'APP-005', "instrument_id": 'INS-006', "applicant_id": 'USR-002', "status": 'documents_uploaded',
                "documents": [{'name': 'Shop License.pdf', 'size': '0.9 MB'}, {'name': 'Tape Calibration Report.pdf', 'size': '0.3 MB'}],
                "ocr_extract": {'Business Name': 'Sharma Kirana', 'Make': 'Stanley MT-30m'},
                "assigned_officer_id": None, "schedule_date": None,
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-08-01'
            },
            {
                "id": 'APP-006', "instrument_id": 'INS-007', "applicant_id": 'USR-003', "status": 'certified',
                "documents": [{'name': 'Fuel License.pdf', 'size': '1.5 MB'}],
                "ocr_extract": {'Business Name': 'Iqbal Fuel Station', 'Model': 'Tokheim Q330'},
                "assigned_officer_id": 'USR-008', "schedule_date": '2025-06-05',
                "field_verification": {'gps': {'lat': 17.4399, 'lng': 78.4983}, 'notes': 'Flow rate calibration verified.'},
                "decision": 'verified', "decision_date": '2025-06-10', "decision_reason": 'Dispenser calibration within tolerance.',
                "certificate_id": 'CERT-003', "created_at": '2025-05-15'
            },
            {
                "id": 'APP-007', "instrument_id": 'INS-009', "applicant_id": 'USR-003', "status": 'field_verification',
                "documents": [{'name': 'Fuel License.pdf', 'size': '1.5 MB'}],
                "ocr_extract": {'Business Name': 'Iqbal Fuel Station', 'Make': 'CAS ED-30'},
                "assigned_officer_id": 'USR-008', "schedule_date": '2026-09-03',
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-08-25'
            },
            {
                "id": 'APP-008', "instrument_id": 'INS-010', "applicant_id": 'USR-004', "status": 'certified',
                "documents": [{'name': 'Jeweller License.pdf', 'size': '1.1 MB'}],
                "ocr_extract": {'Business Name': 'Desai Jewellers', 'Capacity': '100 g'},
                "assigned_officer_id": 'USR-006', "schedule_date": '2025-11-28',
                "field_verification": {'gps': {'lat': 23.0225, 'lng': 72.5714}, 'notes': 'Precision balance passed.'},
                "decision": 'verified', "decision_date": '2025-12-05', "decision_reason": 'Meets precision requirements.',
                "certificate_id": 'CERT-004', "created_at": '2025-11-01'
            },
            {
                "id": 'APP-009', "instrument_id": 'INS-013', "applicant_id": 'USR-005', "status": 'certified',
                "documents": [{'name': 'Factory License.pdf', 'size': '1.8 MB'}],
                "ocr_extract": {'Business Name': 'Patel Industrial Weighing', 'Capacity': '500 kg'},
                "assigned_officer_id": 'USR-007', "schedule_date": '2025-08-10',
                "field_verification": {'gps': {'lat': 18.5913, 'lng': 73.7389}, 'notes': 'Accuracy within tolerance.'},
                "decision": 'verified', "decision_date": '2025-08-15', "decision_reason": 'All industrial tolerances met.',
                "certificate_id": 'CERT-005', "created_at": '2025-07-20'
            },
            {
                "id": 'APP-010', "instrument_id": 'INS-015', "applicant_id": 'USR-005', "status": 'rejected',
                "documents": [{'name': 'Factory License.pdf', 'size': '1.8 MB'}],
                "ocr_extract": {'Business Name': 'Patel Industrial Weighing', 'Make': 'Salter SB-25'},
                "assigned_officer_id": 'USR-007', "schedule_date": '2026-06-15',
                "field_verification": {'gps': {'lat': 18.5913, 'lng': 73.7389}, 'notes': 'Spring mechanism shows fatigue.'},
                "decision": 'rejected', "decision_date": '2026-06-20', "decision_reason": 'Fails accuracy test. Fatigue detected.',
                "certificate_id": None, "created_at": '2026-06-01'
            },
            {
                "id": 'APP-011', "instrument_id": 'INS-017', "applicant_id": 'USR-002', "status": 'officer_assigned',
                "documents": [{'name': 'Shop License.pdf', 'size': '0.9 MB'}],
                "ocr_extract": {'Business Name': 'Sharma Kirana', 'Make': 'Itron WM-50'},
                "assigned_officer_id": 'USR-007', "schedule_date": '2026-09-08',
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-08-15'
            },
            {
                "id": 'APP-012', "instrument_id": 'INS-018', "applicant_id": 'USR-003', "status": 'submitted',
                "documents": [{'name': 'Fuel License.pdf', 'size': '1.5 MB'}],
                "ocr_extract": {'Business Name': 'Iqbal Fuel Station'},
                "assigned_officer_id": None, "schedule_date": None,
                "field_verification": None, "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-08-28'
            },
            {
                "id": 'APP-013', "instrument_id": 'INS-011', "applicant_id": 'USR-004', "status": 'decision',
                "documents": [{'name': 'Jeweller License.pdf', 'size': '1.1 MB'}, {'name': 'Shimadzu Manual.pdf', 'size': '0.8 MB'}],
                "ocr_extract": {'Business Name': 'Desai Jewellers', 'Sensitivity': '0.001g'},
                "assigned_officer_id": 'USR-006', "schedule_date": '2026-09-02',
                "field_verification": {'gps': {'lat': 23.0225, 'lng': 72.5714}, 'notes': 'Corner load test within 0.002g.'},
                "decision": None, "decision_date": None, "decision_reason": None,
                "certificate_id": None, "created_at": '2026-07-15'
            },
        ]
        for a in applications_data:
            db.add(Application(
                id=a["id"],
                instrument_id=a["instrument_id"],
                applicant_id=a["applicant_id"],
                status=a["status"],
                documents=a["documents"],
                ocr_extract=a["ocr_extract"],
                assigned_officer_id=a["assigned_officer_id"],
                schedule_date=a["schedule_date"],
                field_verification=a["field_verification"],
                decision=a["decision"],
                decision_date=a["decision_date"],
                decision_reason=a["decision_reason"],
                certificate_id=a["certificate_id"],
                created_at=a["created_at"]
            ))

        # 4. Seed Certificates (6 Certificates)
        certificates_data = [
            {"id": 'CERT-001', "application_id": 'APP-001', "instrument_id": 'INS-001', "issue_date": '2025-09-01', "expiry_date": '2026-09-01', "status": 'active', "owner": 'Rajesh Kumar'},
            {"id": 'CERT-002', "application_id": 'APP-004', "instrument_id": 'INS-004', "issue_date": '2025-07-15', "expiry_date": '2026-07-15', "status": 'active', "owner": 'Priya Sharma'},
            {"id": 'CERT-003', "application_id": 'APP-006', "instrument_id": 'INS-007', "issue_date": '2025-06-10', "expiry_date": '2026-12-10', "status": 'active', "owner": 'Mohammed Iqbal'},
            {"id": 'CERT-004', "application_id": 'APP-008', "instrument_id": 'INS-010', "issue_date": '2025-12-05', "expiry_date": '2026-12-05', "status": 'active', "owner": 'Anita Desai'},
            {"id": 'CERT-005', "application_id": 'APP-009', "instrument_id": 'INS-013', "issue_date": '2025-08-15', "expiry_date": '2026-08-15', "status": 'active', "owner": 'Suresh Patel'},
            {"id": 'CERT-006', "application_id": 'APP-010', "instrument_id": 'INS-005', "issue_date": '2025-04-01', "expiry_date": '2026-04-01', "status": 'expired', "owner": 'Priya Sharma'},
        ]
        for c in certificates_data:
            qr_payload = json.dumps({
                "cert": c["id"],
                "instrument": c["instrument_id"],
                "owner": c["owner"],
                "verified": c["issue_date"],
                "expires": c["expiry_date"],
                "status": c["status"],
                "authority": "Legal Metrology Department, Govt of India"
            })
            db.add(Certificate(
                id=c["id"],
                application_id=c["application_id"],
                instrument_id=c["instrument_id"],
                qr_payload=qr_payload,
                issue_date=c["issue_date"],
                expiry_date=c["expiry_date"],
                status=c["status"]
            ))

        # 5. Seed Audit Logs (20 logs)
        audit_logs_data = [
            {"id": 'AUD-001', "actor_id": 'USR-001', "action": 'Registered Instrument', "target_id": 'INS-001', "details": 'Electronic Weighing Scale — Kumar General Store', "timestamp": '2025-08-15T10:30:00Z'},
            {"id": 'AUD-002', "actor_id": 'USR-001', "action": 'Submitted Application', "target_id": 'APP-001', "details": 'Verification request for INS-001', "timestamp": '2025-08-15T10:35:00Z'},
            {"id": 'AUD-003', "actor_id": 'USR-009', "action": 'Assigned Officer', "target_id": 'APP-001', "details": 'Assigned to Inspector Vikram Singh', "timestamp": '2025-08-20T09:15:00Z'},
            {"id": 'AUD-004', "actor_id": 'USR-006', "action": 'Completed Field Verification', "target_id": 'APP-001', "details": 'GPS captured, 3 photos, checklist passed', "timestamp": '2025-08-28T14:30:00Z'},
            {"id": 'AUD-005', "actor_id": 'USR-006', "action": 'Verified Instrument', "target_id": 'APP-001', "details": 'Decision: Verified — meets legal standards', "timestamp": '2025-09-01T11:00:00Z'},
            {"id": 'AUD-006', "actor_id": 'SYSTEM', "action": 'Certificate Issued', "target_id": 'CERT-001', "details": 'Certificate generated for INS-001', "timestamp": '2025-09-01T11:01:00Z'},
            {"id": 'AUD-007', "actor_id": 'USR-002', "action": 'Registered Instrument', "target_id": 'INS-004', "details": 'Electronic Weighing Scale — Sharma Kirana', "timestamp": '2025-06-20T09:00:00Z'},
            {"id": 'AUD-008', "actor_id": 'USR-007', "action": 'Verified Instrument', "target_id": 'APP-004', "details": 'Decision: Verified', "timestamp": '2025-07-15T16:00:00Z'},
            {"id": 'AUD-009', "actor_id": 'USR-003', "action": 'Registered Instrument', "target_id": 'INS-007', "details": 'Fuel Dispensing Unit — Iqbal Fuel Station', "timestamp": '2025-05-15T08:30:00Z'},
            {"id": 'AUD-010', "actor_id": 'USR-008', "action": 'Verified Instrument', "target_id": 'APP-006', "details": 'Decision: Verified — dispenser calibration OK', "timestamp": '2025-06-10T15:45:00Z'},
            {"id": 'AUD-011', "actor_id": 'USR-007', "action": 'Rejected Instrument', "target_id": 'APP-010', "details": 'Spring balance failed accuracy test', "timestamp": '2026-06-20T10:30:00Z'},
            {"id": 'AUD-012', "actor_id": 'USR-001', "action": 'Registered Instrument', "target_id": 'INS-002', "details": 'Counter Scale — Kumar General Store', "timestamp": '2026-07-10T11:00:00Z'},
            {"id": 'AUD-013', "actor_id": 'USR-001', "action": 'Submitted Application', "target_id": 'APP-002', "details": 'Verification request for INS-002', "timestamp": '2026-07-10T11:05:00Z'},
            {"id": 'AUD-014', "actor_id": 'USR-009', "action": 'Assigned Officer', "target_id": 'APP-002', "details": 'Assigned to Inspector Vikram Singh', "timestamp": '2026-07-15T09:00:00Z'},
            {"id": 'AUD-015', "actor_id": 'USR-001', "action": 'Submitted Application', "target_id": 'APP-003', "details": 'Verification request for INS-003', "timestamp": '2026-08-20T14:00:00Z'},
            {"id": 'AUD-016', "actor_id": 'USR-002', "action": 'Uploaded Documents', "target_id": 'APP-005', "details": '2 documents uploaded for measuring tape', "timestamp": '2026-08-03T10:00:00Z'},
            {"id": 'AUD-017', "actor_id": 'USR-009', "action": 'Assigned Officer', "target_id": 'APP-007', "details": 'Assigned to Inspector Arjun Nair', "timestamp": '2026-08-27T09:30:00Z'},
            {"id": 'AUD-018', "actor_id": 'SYSTEM', "action": 'Expiry Alert', "target_id": 'CERT-001', "details": 'Certificate expiring in 30 days', "timestamp": '2026-08-01T00:00:00Z'},
            {"id": 'AUD-019', "actor_id": 'SYSTEM', "action": 'Expiry Alert', "target_id": 'CERT-005', "details": 'Certificate expiring in 30 days', "timestamp": '2026-07-15T00:00:00Z'},
            {"id": 'AUD-020', "actor_id": 'USR-004', "action": 'Registered Instrument', "target_id": 'INS-012', "details": 'Weights Set — Desai Jewellers', "timestamp": '2026-08-30T16:00:00Z'},
        ]
        for log in audit_logs_data:
            db.add(AuditLog(
                id=log["id"],
                actor_id=log["actor_id"],
                action=log["action"],
                target_id=log["target_id"],
                details=log["details"],
                timestamp=log["timestamp"]
            ))

        db.commit()
        print("Database seeding completed successfully!")
    except Exception as e:
        db.rollback()
        print(f"Error during seeding: {e}")
        raise
    finally:
        if close_db:
            db.close()

if __name__ == "__main__":
    seed_database()
