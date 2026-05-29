"use client";

import { useState } from "react";
import "./profile.css";

// ─── Constants ────────────────────────────────────────────────
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ─── Types ────────────────────────────────────────────────────
interface FormState {
  // Contact
  email: string;
  phone: string;
  // Programme & Employee Management
  activeBatchesManaged: string;
  employeesManagedCount: string;
  learningCompletionTracking: string;
  trainingSchedulingResponsibility: string;
  attendanceMonitoringResponsibility: string;
  assessmentCoordinationInvolvement: string;
  // Certification, LMS & Communication
  certificationCoordinationInvolvement: string;
  lmsCommunicationResponsibility: string;
  reminderNotificationManagement: string;
  certificationCoordinationDoc: string;
  certificationProof: string;
  // Onboarding & Compliance Tracking
  employeeOnboardingSupport: string;
  complianceTrainingTracking: string;
  internalReportingResponsibility: string;
  complianceTrainingDoc: string;
  complianceReport: string;
  // Support & Escalation Handling
  escalationHandlingCount: string;
  helpdeskSupportCoordination: string;
  feedbackCollectionResponsibility: string;
  helpdeskSupportDoc: string;
  supportDocument: string;
  // Event, Vendor & Data Coordination
  eventWebinarCoordination: string;
  vendorTrainerCoordination: string;
  surveyDataCollectionParticipation: string;
  eventWebinarDoc: string;
  eventDataProof: string;
  // Qualitative Fields
  operationalChallenges: string;
  employeeEngagementObservations: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  activeBatchesManaged?: string;
  employeesManagedCount?: string;
  learningCompletionTracking?: string;
  trainingSchedulingResponsibility?: string;
  attendanceMonitoringResponsibility?: string;
  assessmentCoordinationInvolvement?: string;
  certificationCoordinationInvolvement?: string;
  lmsCommunicationResponsibility?: string;
  reminderNotificationManagement?: string;
  employeeOnboardingSupport?: string;
  complianceTrainingTracking?: string;
  internalReportingResponsibility?: string;
  escalationHandlingCount?: string;
  helpdeskSupportCoordination?: string;
  feedbackCollectionResponsibility?: string;
  eventWebinarCoordination?: string;
  vendorTrainerCoordination?: string;
  surveyDataCollectionParticipation?: string;
  operationalChallenges?: string;
  employeeEngagementObservations?: string;
  coordinatorConfirmation?: string;
}

// ─── Validation ───────────────────────────────────────────────
function validateForm(f: FormState): FormErrors {
  const e: FormErrors = {};

  // Contact
  if (!f.email.trim())
    e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Enter a valid email address.";

  if (!f.phone.trim())
    e.phone = "Phone number is required.";
  else if (!/^[6-9]\d{9}$/.test(f.phone.trim()))
    e.phone = "Enter a valid 10-digit mobile number.";

  // Programme & Employee Management
  if (!f.activeBatchesManaged.trim()) e.activeBatchesManaged = "Active batches / programmes managed is required.";
  if (!f.employeesManagedCount.trim()) e.employeesManagedCount = "Employees managed count is required.";
  if (!f.learningCompletionTracking || f.learningCompletionTracking === "Select...") e.learningCompletionTracking = "Learning completion tracking is required.";
  if (!f.trainingSchedulingResponsibility || f.trainingSchedulingResponsibility === "Select...") e.trainingSchedulingResponsibility = "Training scheduling responsibility is required.";
  if (!f.attendanceMonitoringResponsibility || f.attendanceMonitoringResponsibility === "Select...") e.attendanceMonitoringResponsibility = "Attendance monitoring responsibility is required.";
  if (!f.assessmentCoordinationInvolvement || f.assessmentCoordinationInvolvement === "Select...") e.assessmentCoordinationInvolvement = "Assessment coordination involvement is required.";

  // Certification, LMS & Communication
  if (!f.certificationCoordinationInvolvement || f.certificationCoordinationInvolvement === "Select...") e.certificationCoordinationInvolvement = "Certification coordination involvement is required.";
  if (!f.lmsCommunicationResponsibility || f.lmsCommunicationResponsibility === "Select...") e.lmsCommunicationResponsibility = "LMS communication responsibility is required.";
  if (!f.reminderNotificationManagement || f.reminderNotificationManagement === "Select...") e.reminderNotificationManagement = "Reminder / notification management is required.";

  // Onboarding & Compliance Tracking
  if (!f.employeeOnboardingSupport || f.employeeOnboardingSupport === "Select...") e.employeeOnboardingSupport = "Employee onboarding support is required.";
  if (!f.complianceTrainingTracking || f.complianceTrainingTracking === "Select...") e.complianceTrainingTracking = "Compliance training tracking is required.";
  if (!f.internalReportingResponsibility || f.internalReportingResponsibility === "Select...") e.internalReportingResponsibility = "Internal reporting responsibility is required.";

  // Support & Escalation Handling
  if (!f.escalationHandlingCount.trim()) e.escalationHandlingCount = "Escalation handling count is required.";
  if (!f.helpdeskSupportCoordination || f.helpdeskSupportCoordination === "Select...") e.helpdeskSupportCoordination = "Helpdesk / support coordination is required.";
  if (!f.feedbackCollectionResponsibility || f.feedbackCollectionResponsibility === "Select...") e.feedbackCollectionResponsibility = "Feedback collection responsibility is required.";

  // Event, Vendor & Data Coordination
  if (!f.eventWebinarCoordination || f.eventWebinarCoordination === "Select...") e.eventWebinarCoordination = "Event / webinar coordination is required.";
  if (!f.vendorTrainerCoordination || f.vendorTrainerCoordination === "Select...") e.vendorTrainerCoordination = "Vendor / trainer coordination is required.";
  if (!f.surveyDataCollectionParticipation || f.surveyDataCollectionParticipation === "Select...") e.surveyDataCollectionParticipation = "Survey / data collection participation is required.";

  // Qualitative Fields
  if (!f.operationalChallenges.trim()) e.operationalChallenges = "Operational challenges observed is required.";
  if (!f.employeeEngagementObservations.trim()) e.employeeEngagementObservations = "Employee engagement observations is required.";

  // Confirmation
  if (!f.coordinatorConfirmation || f.coordinatorConfirmation === "Select...") e.coordinatorConfirmation = "Coordinator confirmation is required.";

  return e;
}

// ─── File upload handler factory ─────────────────────────────
function makeFileHandler(
  field: keyof FormState,
  setForm: React.Dispatch<React.SetStateAction<FormState>>,
  multiple = false
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const oversized = Array.from(files).find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      alert(`"${oversized.name}" exceeds 5 MB. Please upload a smaller file.`);
      e.target.value = "";
      return;
    }

    const names = Array.from(files).map((f) => f.name).join(", ");
    setForm((prev) => ({ ...prev, [field]: names }));
  };
}

// ─── Small reusable components ────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="fieldError">{msg}</span>;
}

function FileUpload({
  id,
  field,
  fileName,
  setForm,
  multiple = false,
}: {
  id: string;
  field: keyof FormState;
  fileName: string;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  multiple?: boolean;
}) {
  return (
    <>
      <input
        id={id}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.png"
        multiple={multiple}
        style={{ display: "none" }}
        onChange={makeFileHandler(field, setForm, multiple)}
      />
      <label htmlFor={id} className="uploadBtn">
        📎 {multiple ? "Choose Files" : "Choose File"}
      </label>
      {fileName && (
        <span className="uploadFileName">✓ {fileName}</span>
      )}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function CorporateCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    activeBatchesManaged: "",
    employeesManagedCount: "",
    learningCompletionTracking: "",
    trainingSchedulingResponsibility: "",
    attendanceMonitoringResponsibility: "",
    assessmentCoordinationInvolvement: "",
    certificationCoordinationInvolvement: "",
    lmsCommunicationResponsibility: "",
    reminderNotificationManagement: "",
    certificationCoordinationDoc: "",
    certificationProof: "",
    employeeOnboardingSupport: "",
    complianceTrainingTracking: "",
    internalReportingResponsibility: "",
    complianceTrainingDoc: "",
    complianceReport: "",
    escalationHandlingCount: "",
    helpdeskSupportCoordination: "",
    feedbackCollectionResponsibility: "",
    helpdeskSupportDoc: "",
    supportDocument: "",
    eventWebinarCoordination: "",
    vendorTrainerCoordination: "",
    surveyDataCollectionParticipation: "",
    eventWebinarDoc: "",
    eventDataProof: "",
    operationalChallenges: "",
    employeeEngagementObservations: "",
    coordinatorConfirmation: "",
    supportingDocuments: "",
  });

  const errors: FormErrors = submitted ? validateForm(form) : {};

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function cls(field: keyof FormErrors) {
    return `field${errors[field] ? " fieldHasError" : ""}`;
  }

  function closeSidebar() { setSidebarOpen(false); }

  function handleTenantClick(tenantName: string) {
    console.log("Selected tenant profile:", tenantName);
    closeSidebar();
  }

  function handleSave() {
    setSubmitted(true);
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) return;
    // API call goes here when backend is ready
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="profilePage">
      <button type="button" className="menuButton" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">
        ☰
      </button>

      {sidebarOpen && (
        <button type="button" className="sidebarOverlay" onClick={closeSidebar} aria-label="Close sidebar overlay" />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <button type="button" className="closeSidebar" onClick={closeSidebar} aria-label="Close sidebar">×</button>

        <div className="profileCard">
          <div className="avatar">CC</div>
          <h3>Corporate Coordinator</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" className="active" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>Corporate Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoCol">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. coordinator@company.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <FieldError msg={errors.email} />
            </div>

            <div className={cls("phone")}>
              <label>PHONE NUMBER *</label>
              <input
                type="tel"
                placeholder="e.g. 9876543210"
                maxLength={10}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))}
              />
              <FieldError msg={errors.phone} />
            </div>
          </div>
        </section>

        {/* ── PROGRAMME & EMPLOYEE MANAGEMENT ── */}
        <section className="sectionCard">
          <h2>PROGRAMME & EMPLOYEE MANAGEMENT</h2>

          <div className="formGrid">
            <div className={cls("activeBatchesManaged")}>
              <label>ACTIVE BATCHES / PROGRAMMES MANAGED *</label>
              <input type="number" placeholder="e.g. 8" value={form.activeBatchesManaged} onChange={(e) => set("activeBatchesManaged", e.target.value)} />
              <FieldError msg={errors.activeBatchesManaged} />
            </div>

            <div className={cls("employeesManagedCount")}>
              <label>EMPLOYEES MANAGED COUNT *</label>
              <input type="number" placeholder="e.g. 250" value={form.employeesManagedCount} onChange={(e) => set("employeesManagedCount", e.target.value)} />
              <FieldError msg={errors.employeesManagedCount} />
            </div>

            <div className={cls("learningCompletionTracking")}>
              <label>LEARNING COMPLETION TRACKING *</label>
              <select value={form.learningCompletionTracking} onChange={(e) => set("learningCompletionTracking", e.target.value)}>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.learningCompletionTracking} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("trainingSchedulingResponsibility")}>
              <label>TRAINING SCHEDULING RESPONSIBILITY *</label>
              <select value={form.trainingSchedulingResponsibility} onChange={(e) => set("trainingSchedulingResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.trainingSchedulingResponsibility} />
            </div>

            <div className={cls("attendanceMonitoringResponsibility")}>
              <label>ATTENDANCE MONITORING RESPONSIBILITY *</label>
              <select value={form.attendanceMonitoringResponsibility} onChange={(e) => set("attendanceMonitoringResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.attendanceMonitoringResponsibility} />
            </div>

            <div className={cls("assessmentCoordinationInvolvement")}>
              <label>ASSESSMENT COORDINATION INVOLVEMENT *</label>
              <select value={form.assessmentCoordinationInvolvement} onChange={(e) => set("assessmentCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.assessmentCoordinationInvolvement} />
            </div>
          </div>
        </section>

        {/* ── CERTIFICATION, LMS & COMMUNICATION ── */}
        <section className="sectionCard">
          <h2>CERTIFICATION, LMS & COMMUNICATION</h2>

          <div className="formGrid">
            <div className={cls("certificationCoordinationInvolvement")}>
              <label>CERTIFICATION COORDINATION INVOLVEMENT *</label>
              <select value={form.certificationCoordinationInvolvement} onChange={(e) => set("certificationCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.certificationCoordinationInvolvement} />
            </div>

            <div className={cls("lmsCommunicationResponsibility")}>
              <label>LMS COMMUNICATION RESPONSIBILITY *</label>
              <select value={form.lmsCommunicationResponsibility} onChange={(e) => set("lmsCommunicationResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Notification Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.lmsCommunicationResponsibility} />
            </div>

            <div className={cls("reminderNotificationManagement")}>
              <label>REMINDER / NOTIFICATION MANAGEMENT *</label>
              <select value={form.reminderNotificationManagement} onChange={(e) => set("reminderNotificationManagement", e.target.value)}>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Campaign-based</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.reminderNotificationManagement} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>CERTIFICATION COORDINATION DOCUMENT</label>
              <input
                placeholder="e.g. Certification tracker, completion report"
                value={form.certificationCoordinationDoc}
                onChange={(e) => set("certificationCoordinationDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD CERTIFICATION PROOF</label>
              <FileUpload id="upload-cert-proof" field="certificationProof" fileName={form.certificationProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── ONBOARDING & COMPLIANCE TRACKING ── */}
        <section className="sectionCard">
          <h2>ONBOARDING & COMPLIANCE TRACKING</h2>

          <div className="formGrid">
            <div className={cls("employeeOnboardingSupport")}>
              <label>EMPLOYEE ONBOARDING SUPPORT *</label>
              <select value={form.employeeOnboardingSupport} onChange={(e) => set("employeeOnboardingSupport", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.employeeOnboardingSupport} />
            </div>

            <div className={cls("complianceTrainingTracking")}>
              <label>COMPLIANCE TRAINING TRACKING *</label>
              <select value={form.complianceTrainingTracking} onChange={(e) => set("complianceTrainingTracking", e.target.value)}>
                <option>Select...</option>
                <option>Fully Tracked</option>
                <option>Partially Tracked</option>
                <option>Manual Tracking</option>
                <option>Not Tracked</option>
              </select>
              <FieldError msg={errors.complianceTrainingTracking} />
            </div>

            <div className={cls("internalReportingResponsibility")}>
              <label>INTERNAL REPORTING RESPONSIBILITY *</label>
              <select value={form.internalReportingResponsibility} onChange={(e) => set("internalReportingResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Daily Reports</option>
                <option>Weekly Reports</option>
                <option>Monthly Reports</option>
                <option>Need-based Reports</option>
              </select>
              <FieldError msg={errors.internalReportingResponsibility} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>COMPLIANCE TRAINING DOCUMENT</label>
              <input
                placeholder="e.g. POSH, data security, code of conduct"
                value={form.complianceTrainingDoc}
                onChange={(e) => set("complianceTrainingDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD COMPLIANCE REPORT</label>
              <FileUpload id="upload-compliance-report" field="complianceReport" fileName={form.complianceReport} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── SUPPORT & ESCALATION HANDLING ── */}
        <section className="sectionCard">
          <h2>SUPPORT & ESCALATION HANDLING</h2>

          <div className="formGrid">
            <div className={cls("escalationHandlingCount")}>
              <label>ESCALATION HANDLING COUNT *</label>
              <input type="number" placeholder="e.g. 12" value={form.escalationHandlingCount} onChange={(e) => set("escalationHandlingCount", e.target.value)} />
              <FieldError msg={errors.escalationHandlingCount} />
            </div>

            <div className={cls("helpdeskSupportCoordination")}>
              <label>HELPDESK / SUPPORT COORDINATION *</label>
              <select value={form.helpdeskSupportCoordination} onChange={(e) => set("helpdeskSupportCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Escalation Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.helpdeskSupportCoordination} />
            </div>

            <div className={cls("feedbackCollectionResponsibility")}>
              <label>FEEDBACK COLLECTION RESPONSIBILITY *</label>
              <select value={form.feedbackCollectionResponsibility} onChange={(e) => set("feedbackCollectionResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Survey Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.feedbackCollectionResponsibility} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>HELPDESK / SUPPORT DOCUMENT</label>
              <input
                placeholder="e.g. Helpdesk tracker, support summary"
                value={form.helpdeskSupportDoc}
                onChange={(e) => set("helpdeskSupportDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD SUPPORT DOCUMENT</label>
              <FileUpload id="upload-support-doc" field="supportDocument" fileName={form.supportDocument} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── EVENT, VENDOR & DATA COORDINATION ── */}
        <section className="sectionCard">
          <h2>EVENT, VENDOR & DATA COORDINATION</h2>

          <div className="formGrid">
            <div className={cls("eventWebinarCoordination")}>
              <label>EVENT / WEBINAR COORDINATION *</label>
              <select value={form.eventWebinarCoordination} onChange={(e) => set("eventWebinarCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Promotion Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.eventWebinarCoordination} />
            </div>

            <div className={cls("vendorTrainerCoordination")}>
              <label>VENDOR / TRAINER COORDINATION *</label>
              <select value={form.vendorTrainerCoordination} onChange={(e) => set("vendorTrainerCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Scheduling Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.vendorTrainerCoordination} />
            </div>

            <div className={cls("surveyDataCollectionParticipation")}>
              <label>SURVEY / DATA COLLECTION PARTICIPATION *</label>
              <select value={form.surveyDataCollectionParticipation} onChange={(e) => set("surveyDataCollectionParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Data Entry Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.surveyDataCollectionParticipation} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>EVENT / WEBINAR DOCUMENT</label>
              <input
                placeholder="e.g. Attendance sheet, event report"
                value={form.eventWebinarDoc}
                onChange={(e) => set("eventWebinarDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD EVENT / DATA PROOF</label>
              <FileUpload id="upload-event-proof" field="eventDataProof" fileName={form.eventDataProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.operationalChallenges ? " fieldHasError" : ""}`}>
            <label>OPERATIONAL CHALLENGES OBSERVED *</label>
            <textarea
              placeholder="Mention scheduling conflicts, employee attendance issues, LMS access issues, vendor delays, escalation patterns, compliance training gaps, or reporting delays..."
              value={form.operationalChallenges}
              onChange={(e) => set("operationalChallenges", e.target.value)}
            />
            <FieldError msg={errors.operationalChallenges} />
          </div>

          <div className={`field fullWidth${errors.employeeEngagementObservations ? " fieldHasError" : ""}`}>
            <label>EMPLOYEE ENGAGEMENT OBSERVATIONS *</label>
            <textarea
              placeholder="Mention employee participation trends, completion behaviour, feedback quality, webinar attendance, reminder response, and learning motivation patterns..."
              value={form.employeeEngagementObservations}
              onChange={(e) => set("employeeEngagementObservations", e.target.value)}
            />
            <FieldError msg={errors.employeeEngagementObservations} />
          </div>
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={cls("coordinatorConfirmation")}>
              <label>COORDINATOR CONFIRMATION *</label>
              <select value={form.coordinatorConfirmation} onChange={(e) => set("coordinatorConfirmation", e.target.value)}>
                <option>Select...</option>
                <option>I confirm that the entered data is accurate</option>
                <option>I need to review before submission</option>
              </select>
              <FieldError msg={errors.coordinatorConfirmation} />
            </div>

            <div className="field">
              <label>SUPPORTING DOCUMENTS</label>
              <FileUpload id="upload-supporting-docs" field="supportingDocuments" fileName={form.supportingDocuments} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        <div className="footerButtons">
          <button
            type="button"
            className={`saveBtn${saved ? " savedBtn" : ""}`}
            onClick={handleSave}
          >
            {saved ? "✓ Saved!" : "Save Profile"}
          </button>

          <button type="button" className="nextBtn">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
