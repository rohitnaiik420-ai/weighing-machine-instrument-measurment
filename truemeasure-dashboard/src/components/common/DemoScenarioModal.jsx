import React from 'react';
import Modal from './Modal';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, CheckCircle, ArrowRight, AlertTriangle, 
  Fuel, Gem, ShieldAlert, ClipboardCheck, BarChart3, Scale 
} from 'lucide-react';

export const SCENARIOS = [
  {
    id: 's1',
    title: '1. Standard Shopkeeper Registration & Tracking',
    personaName: 'Rajesh Kumar',
    personaRole: 'applicant',
    userId: 'USR-001',
    targetView: 'dashboard',
    badge: 'Delhi NCR • Kirana Store',
    icon: Scale,
    iconColor: 'bg-blue-100 text-blue-700',
    description: 'Active Kirana store owner with an active weighing scale (Essae DS-252) expiring soon, plus a newly submitted application for standard weights.',
    tasks: [
      'View My Instruments and active certificate count',
      'Go to "My Applications" and inspect the 9-step canonical lifecycle stepper',
      'Go to "Register Instrument" to try the 3-step registration wizard',
    ],
  },
  {
    id: 's2',
    title: '2. Expired Scale Alert & 1-Click Re-Verification',
    personaName: 'Priya Sharma',
    personaRole: 'applicant',
    userId: 'USR-002',
    targetView: 'alerts',
    badge: 'Mumbai • Retailer',
    icon: AlertTriangle,
    iconColor: 'bg-red-100 text-red-700',
    description: 'Grocery trader with an EXPIRED 200 kg heavy platform scale (Avery PL-200) that requires immediate legal re-verification.',
    tasks: [
      'Observe the red "Expired" banner under Expiry Alerts',
      'Click the "Re-Verify" button directly on the alert card',
      'Notice how it opens the registration wizard for instant re-certification',
    ],
  },
  {
    id: 's3',
    title: '3. Commercial Fuel Station Metering & Verification',
    personaName: 'Mohammed Iqbal',
    personaRole: 'applicant',
    userId: 'USR-003',
    targetView: 'certificates',
    badge: 'Hyderabad • Petroleum Dealer',
    icon: Fuel,
    iconColor: 'bg-amber-100 text-amber-700',
    description: 'High-flow commercial dispenser pumps (Tokheim Q330, 100 L/min) and an active inspection in progress.',
    tasks: [
      'View the high-resolution QR Certificate for the fuel dispenser',
      'Test "Print" or "Download PDF" for the certificate',
      'Go to "My Applications" to track APP-007 currently at Step 5 (Field Verification)',
    ],
  },
  {
    id: 's4',
    title: '4. High-Precision Gold & Diamond Balance',
    personaName: 'Anita Desai',
    personaRole: 'applicant',
    userId: 'USR-004',
    targetView: 'applications',
    badge: 'Ahmedabad • Jeweller',
    icon: Gem,
    iconColor: 'bg-purple-100 text-purple-700',
    description: 'Jewellery merchant with 0.001g micro-analytical balances and certified Class E2 reference weights.',
    tasks: [
      'Click "Show Details" on APP-008 to review officer sensitivity test notes',
      'Observe the verification certificate generated for her gold beam balance',
    ],
  },
  {
    id: 's5',
    title: '5. Rejected Instrument with Mandatory Reason',
    personaName: 'Suresh Patel',
    personaRole: 'applicant',
    userId: 'USR-005',
    targetView: 'applications',
    badge: 'Pune • Industrial Plant',
    icon: ShieldAlert,
    iconColor: 'bg-rose-100 text-rose-700',
    description: 'Industrial facility with an approved 500kg platform scale AND a failed, rejected spring balance.',
    tasks: [
      'Look for APP-010 marked with the red "Rejected" status badge',
      'Expand details to read the mandatory rejection rationale recorded by the officer',
      'Notice that rejection halts certificate issuance while providing legal transparency',
    ],
  },
  {
    id: 's6',
    title: '6. Officer Field Inspection & AI OCR Review',
    personaName: 'Inspector Vikram Singh',
    personaRole: 'officer',
    userId: 'USR-006',
    targetView: 'queue',
    badge: 'Delhi • Legal Metrology Officer',
    icon: ClipboardCheck,
    iconColor: 'bg-indigo-100 text-indigo-700',
    description: 'Field officer reviewing assigned queues, recording live GPS, completing checklists, reviewing OCR extractions, and rendering approval decisions.',
    tasks: [
      'In Assigned Queue, click "Review" on APP-002 (Counter Scale)',
      'Click "Capture GPS Location" to test live geolocation benchmarking',
      'Complete the compliance checklist and test the split-screen AI OCR review',
      'Submit approval or rejection with custom remarks',
    ],
  },
  {
    id: 's7',
    title: '7. Ministry / Admin Oversight & Analytics',
    personaName: 'Dr. Kavita Mehta',
    personaRole: 'admin',
    userId: 'USR-009',
    targetView: 'dashboard',
    badge: 'Central Ministry • Legal Metrology Admin',
    icon: BarChart3,
    iconColor: 'bg-emerald-100 text-emerald-700',
    description: 'Central Department director monitoring national compliance KPIs, inspection trends, registry audits, and officer workloads.',
    tasks: [
      'Review the 5 top KPIs (Total Instruments, Pending, Monthly Verified, 30d Expirations)',
      'Hover over the Recharts trend graphs and status donut breakdown',
      'Go to "Instrument Registry" to filter instruments by Mumbai, Delhi, or Expiry',
      'Go to "Audit Log" to view chronological activity across all users and system events',
    ],
  },
];

export default function DemoScenarioModal({ isOpen, onClose }) {
  const { switchUser, setActiveView } = useApp();

  const handleLaunchScenario = (scenario) => {
    switchUser(scenario.userId);
    setActiveView(scenario.targetView);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="🧪 TRUEMEASURE Interactive Test Scenarios" size="xl">
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Click <strong className="text-navy-700">"Launch Scenario"</strong> on any card below to instantly load that test persona, switch to their dashboard, and test their specific workflow!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[68vh] overflow-y-auto pr-1">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="card border border-gray-200 hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between p-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${s.iconColor}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-700 text-sm leading-snug">{s.title}</h4>
                        <span className="text-[11px] font-semibold text-gray-500">{s.badge}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="bg-gray-50 rounded-lg p-2.5 mb-3 border border-gray-100">
                    <p className="text-[11px] font-bold text-navy-600 mb-1">What to test:</p>
                    <ul className="text-[11px] text-gray-600 space-y-1 list-disc list-inside">
                      {s.tasks.map((t, idx) => (
                        <li key={idx}>{t}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchScenario(s)}
                  className="w-full btn-primary text-xs py-2 flex items-center justify-center gap-1.5 mt-auto"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Launch Scenario as {s.personaName.split(' ')[0]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
