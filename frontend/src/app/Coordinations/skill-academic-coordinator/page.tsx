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
  // Batch Operations
  activeBatchesManaged: string;
  activeTraineesManaged: string;
  batchCompletionTracking: string;
  attendanceMonitoringResponsibility: string;
  batchSchedulingResponsibility: string;
  timetableCoordination: string;
  // Training & Assessment Coordination
  assessmentSchedulingInvolvement: string;
  trainerCoordinationInvolvement: string;
  trainingMaterialDistributionTracking: string;
  certificationCoordination: string;
  certificationCoordinationProof: string;
  // SDMS & Documentation
  sdmsDataEntryResponsibility: string;
  sdmsRecordSample: string;
  candidateDocumentationVerification: string;
  documentVerificationProof: string;
  // Communication & Issue Handling
  parentStudentCommunicationFrequency: string;
  grievanceHandlingCount: string;
  escalationHandlingCount: string;
  dropoutMonitoringParticipation: string;
  placementFollowUpParticipation: string;
  placementCoordinationInvolvement: string;
  // Mobilization & Industry Coordination
  mobilizationActivityParticipation: string;
  mobilizationProof: string;
  industryVisitCoordination: string;
  industryVisitProof: string;
  // Qualitative Fields
  batchLevelOperationalIssues: string;
  candidateEngagementObservations: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  activeBatchesManaged?: string;
  activeTraineesManaged?: string;
  batchCompletionTracking?: string;
  attendanceMonitoringResponsibility?: string;
  batchSchedulingResponsibility?: string;
  timetableCoordination?: string;
  assessmentSchedulingInvolvement?: string;
  trainerCoordinationInvolvement?: string;
  trainingMaterialDistributionTracking?: string;
  certificationCoordination?: string;
  sdmsDataEntryResponsibility?: string;
  candidateDocumentationVerification?: string;
  parentStudentCommunicationFrequency?: string;
  grievanceHandlingCount?: string;
  escalationHandlingCount?: string;
  dropoutMonitoringParticipation?: string;
  placementFollowUpParticipation?: string;
  placementCoordinationInvolvement?: string;
  mobilizationActivityParticipation?: string;
  industryVisitCoordination?: string;
  batchLevelOperationalIssues?: string;
  candidateEngagementObservations?: string;
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
    e.phone = "Enter a valid 10-digit mobile number starting with 6–9.";

  // Batch Operations
  if (!f.activeBatchesManaged.trim()) e.activeBatchesManaged = "Active batches managed is required.";
  if (!f.activeTraineesManaged.trim()) e.activeTraineesManaged = "Active trainees managed is required.";
  if (!f.batchCompletionTracking || f.batchCompletionTracking === "Select...") e.batchCompletionTracking = "Batch completion tracking is required.";
  if (!f.attendanceMonitoringResponsibility || f.attendanceMonitoringResponsibility === "Select...") e.attendanceMonitoringResponsibility = "Attendance monitoring responsibility is required.";
  if (!f.batchSchedulingResponsibility || f.batchSchedulingResponsibility === "Select...") e.batchSchedulingResponsibility = "Batch scheduling responsibility is required.";
  if (!f.timetableCoordination || f.timetableCoordination === "Select...") e.timetableCoordination = "Timetable coordination is required.";

  // Training & Assessment Coordination
  if (!f.assessmentSchedulingInvolvement || f.assessmentSchedulingInvolvement === "Select...") e.assessmentSchedulingInvolvement = "Assessment scheduling involvement is required.";
  if (!f.trainerCoordinationInvolvement || f.trainerCoordinationInvolvement === "Select...") e.trainerCoordinationInvolvement = "Trainer coordination involvement is required.";
  if (!f.trainingMaterialDistributionTracking || f.trainingMaterialDistributionTracking === "Select...") e.trainingMaterialDistributionTracking = "Training material distribution tracking is required.";
  if (!f.certificationCoordination || f.certificationCoordination === "Select...") e.certificationCoordination = "Certification coordination is required.";

  // SDMS & Documentation
  if (!f.sdmsDataEntryResponsibility || f.sdmsDataEntryResponsibility === "Select...") e.sdmsDataEntryResponsibility = "SDMS data entry responsibility is required.";
  if (!f.candidateDocumentationVerification || f.candidateDocumentationVerification === "Select...") e.candidateDocumentationVerification = "Candidate documentation verification is required.";

  // Communication & Issue Handling
  if (!f.parentStudentCommunicationFrequency || f.parentStudentCommunicationFrequency === "Select...") e.parentStudentCommunicationFrequency = "Communication frequency is required.";
  if (!f.grievanceHandlingCount.trim()) e.grievanceHandlingCount = "Grievance handling count is required.";
  if (!f.escalationHandlingCount.trim()) e.escalationHandlingCount = "Escalation handling count is required.";
  if (!f.dropoutMonitoringParticipation || f.dropoutMonitoringParticipation === "Select...") e.dropoutMonitoringParticipation = "Dropout monitoring participation is required.";
  if (!f.placementFollowUpParticipation || f.placementFollowUpParticipation === "Select...") e.placementFollowUpParticipation = "Placement follow-up participation is required.";
  if (!f.placementCoordinationInvolvement || f.placementCoordinationInvolvement === "Select...") e.placementCoordinationInvolvement = "Placement coordination involvement is required.";

  // Mobilization & Industry Coordination
  if (!f.mobilizationActivityParticipation || f.mobilizationActivityParticipation === "Select...") e.mobilizationActivityParticipation = "Mobilization activity participation is required.";
  if (!f.industryVisitCoordination || f.industryVisitCoordination === "Select...") e.industryVisitCoordination = "Industry visit coordination is required.";

  // Qualitative
  if (!f.batchLevelOperationalIssues.trim()) e.batchLevelOperationalIssues = "Batch-level operational issues is required.";
  if (!f.candidateEngagementObservations.trim()) e.candidateEngagementObservations = "Candidate engagement observations is required.";

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
      {fileName && <span className="uploadFileName">✓ {fileName}</span>}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function SkillAcademyCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    activeBatchesManaged: "",
    activeTraineesManaged: "",
    batchCompletionTracking: "",
    attendanceMonitoringResponsibility: "",
    batchSchedulingResponsibility: "",
    timetableCoordination: "",
    assessmentSchedulingInvolvement: "",
    trainerCoordinationInvolvement: "",
    trainingMaterialDistributionTracking: "",
    certificationCoordination: "",
    certificationCoordinationProof: "",
    sdmsDataEntryResponsibility: "",
    sdmsRecordSample: "",
    candidateDocumentationVerification: "",
    documentVerificationProof: "",
    parentStudentCommunicationFrequency: "",
    grievanceHandlingCount: "",
    escalationHandlingCount: "",
    dropoutMonitoringParticipation: "",
    placementFollowUpParticipation: "",
    placementCoordinationInvolvement: "",
    mobilizationActivityParticipation: "",
    mobilizationProof: "",
    industryVisitCoordination: "",
    industryVisitProof: "",
    batchLevelOperationalIssues: "",
    candidateEngagementObservations: "",
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

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function handleTenantClick(tenantName: string) {
    console.log("Selected tenant profile:", tenantName);
    closeSidebar();
  }

  function handleSave() {
    setSubmitted(true);
    const errs = validateForm(form);
    if (Object.keys(errs).length > 0) return;
    // TODO: API call goes here when backend is ready
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="profilePage">
      <button
        type="button"
        className="menuButton"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebarOverlay"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <button
          type="button"
          className="closeSidebar"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          ×
        </button>

        <div className="profileCard">
          <div className="avatar">SC</div>
          <h3>Skill Coordinator</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>
            Colleges / Universities
          </button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>
            Corporate
          </button>
          <button
            type="button"
            className="active"
            onClick={() => handleTenantClick("Skill Academy")}
          >
            Skill Academy
          </button>
          <button type="button" onClick={() => handleTenantClick("Government")}>
            Government
          </button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>
            NGO
          </button>
          <button type="button" onClick={() => handleTenantClick("School")}>
            School
          </button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>Skill Academy Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoColumns">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. coordinator@skillacademy.in"
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

        {/* ── BATCH OPERATIONS ── */}
        <section className="sectionCard">
          <h2>BATCH OPERATIONS</h2>

          <div className="formGrid">
            <div className={cls("activeBatchesManaged")}>
              <label>ACTIVE BATCHES MANAGED *</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={form.activeBatchesManaged}
                onChange={(e) => set("activeBatchesManaged", e.target.value)}
              />
              <FieldError msg={errors.activeBatchesManaged} />
            </div>

            <div className={cls("activeTraineesManaged")}>
              <label>ACTIVE TRAINEES MANAGED *</label>
              <input
                type="number"
                placeholder="e.g. 240"
                value={form.activeTraineesManaged}
                onChange={(e) => set("activeTraineesManaged", e.target.value)}
              />
              <FieldError msg={errors.activeTraineesManaged} />
            </div>

            <div className={cls("batchCompletionTracking")}>
              <label>BATCH COMPLETION TRACKING *</label>
              <select
                value={form.batchCompletionTracking}
                onChange={(e) => set("batchCompletionTracking", e.target.value)}
              >
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.batchCompletionTracking} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("attendanceMonitoringResponsibility")}>
              <label>ATTENDANCE MONITORING RESPONSIBILITY *</label>
              <select
                value={form.attendanceMonitoringResponsibility}
                onChange={(e) => set("attendanceMonitoringResponsibility", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.attendanceMonitoringResponsibility} />
            </div>

            <div className={cls("batchSchedulingResponsibility")}>
              <label>BATCH SCHEDULING RESPONSIBILITY *</label>
              <select
                value={form.batchSchedulingResponsibility}
                onChange={(e) => set("batchSchedulingResponsibility", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.batchSchedulingResponsibility} />
            </div>

            <div className={cls("timetableCoordination")}>
              <label>TIMETABLE COORDINATION *</label>
              <select
                value={form.timetableCoordination}
                onChange={(e) => set("timetableCoordination", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.timetableCoordination} />
            </div>
          </div>
        </section>

        {/* ── TRAINING & ASSESSMENT COORDINATION ── */}
        <section className="sectionCard">
          <h2>TRAINING & ASSESSMENT COORDINATION</h2>

          <div className="formGrid">
            <div className={cls("assessmentSchedulingInvolvement")}>
              <label>ASSESSMENT SCHEDULING INVOLVEMENT *</label>
              <select
                value={form.assessmentSchedulingInvolvement}
                onChange={(e) => set("assessmentSchedulingInvolvement", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.assessmentSchedulingInvolvement} />
            </div>

            <div className={cls("trainerCoordinationInvolvement")}>
              <label>TRAINER COORDINATION INVOLVEMENT *</label>
              <select
                value={form.trainerCoordinationInvolvement}
                onChange={(e) => set("trainerCoordinationInvolvement", e.target.value)}
              >
                <option>Select...</option>
                <option>Daily Coordination</option>
                <option>Weekly Coordination</option>
                <option>Need-based Coordination</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.trainerCoordinationInvolvement} />
            </div>

            <div className={cls("trainingMaterialDistributionTracking")}>
              <label>TRAINING MATERIAL DISTRIBUTION TRACKING *</label>
              <select
                value={form.trainingMaterialDistributionTracking}
                onChange={(e) => set("trainingMaterialDistributionTracking", e.target.value)}
              >
                <option>Select...</option>
                <option>Fully Tracked</option>
                <option>Partially Tracked</option>
                <option>Manual Tracking</option>
                <option>Not Tracked</option>
              </select>
              <FieldError msg={errors.trainingMaterialDistributionTracking} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("certificationCoordination")}>
              <label>CERTIFICATION COORDINATION *</label>
              <select
                value={form.certificationCoordination}
                onChange={(e) => set("certificationCoordination", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.certificationCoordination} />
            </div>

            <div className="field">
              <label>UPLOAD CERTIFICATION COORDINATION PROOF</label>
              <FileUpload
                id="upload-cert-coord-proof"
                field="certificationCoordinationProof"
                fileName={form.certificationCoordinationProof}
                setForm={setForm}
                multiple
              />
            </div>
          </div>
        </section>

        {/* ── SDMS & DOCUMENTATION ── */}
        <section className="sectionCard">
          <h2>SDMS & DOCUMENTATION</h2>

          <div className="inlineGroup">
            <div className={cls("sdmsDataEntryResponsibility")}>
              <label>SDMS DATA ENTRY RESPONSIBILITY *</label>
              <select
                value={form.sdmsDataEntryResponsibility}
                onChange={(e) => set("sdmsDataEntryResponsibility", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Verification Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.sdmsDataEntryResponsibility} />
            </div>

            <div className="field">
              <label>UPLOAD SDMS RECORD SAMPLE</label>
              <FileUpload
                id="upload-sdms-record"
                field="sdmsRecordSample"
                fileName={form.sdmsRecordSample}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("candidateDocumentationVerification")}>
              <label>CANDIDATE DOCUMENTATION VERIFICATION *</label>
              <select
                value={form.candidateDocumentationVerification}
                onChange={(e) => set("candidateDocumentationVerification", e.target.value)}
              >
                <option>Select...</option>
                <option>Fully Verified</option>
                <option>Partially Verified</option>
                <option>Pending Verification</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.candidateDocumentationVerification} />
            </div>

            <div className="field">
              <label>UPLOAD DOCUMENT VERIFICATION PROOF</label>
              <FileUpload
                id="upload-doc-verify-proof"
                field="documentVerificationProof"
                fileName={form.documentVerificationProof}
                setForm={setForm}
                multiple
              />
            </div>
          </div>
        </section>

        {/* ── COMMUNICATION & ISSUE HANDLING ── */}
        <section className="sectionCard">
          <h2>COMMUNICATION & ISSUE HANDLING</h2>

          <div className="formGrid">
            <div className={cls("parentStudentCommunicationFrequency")}>
              <label>PARENT / STUDENT COMMUNICATION FREQUENCY *</label>
              <select
                value={form.parentStudentCommunicationFrequency}
                onChange={(e) => set("parentStudentCommunicationFrequency", e.target.value)}
              >
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.parentStudentCommunicationFrequency} />
            </div>

            <div className={cls("grievanceHandlingCount")}>
              <label>GRIEVANCE HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 18"
                value={form.grievanceHandlingCount}
                onChange={(e) => set("grievanceHandlingCount", e.target.value)}
              />
              <FieldError msg={errors.grievanceHandlingCount} />
            </div>

            <div className={cls("escalationHandlingCount")}>
              <label>ESCALATION HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 7"
                value={form.escalationHandlingCount}
                onChange={(e) => set("escalationHandlingCount", e.target.value)}
              />
              <FieldError msg={errors.escalationHandlingCount} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("dropoutMonitoringParticipation")}>
              <label>DROPOUT MONITORING PARTICIPATION *</label>
              <select
                value={form.dropoutMonitoringParticipation}
                onChange={(e) => set("dropoutMonitoringParticipation", e.target.value)}
              >
                <option>Select...</option>
                <option>Regular Monitoring</option>
                <option>Periodic Monitoring</option>
                <option>Need-based Monitoring</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.dropoutMonitoringParticipation} />
            </div>

            <div className={cls("placementFollowUpParticipation")}>
              <label>PLACEMENT FOLLOW-UP PARTICIPATION *</label>
              <select
                value={form.placementFollowUpParticipation}
                onChange={(e) => set("placementFollowUpParticipation", e.target.value)}
              >
                <option>Select...</option>
                <option>Regular Follow-up</option>
                <option>Periodic Follow-up</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementFollowUpParticipation} />
            </div>

            <div className={cls("placementCoordinationInvolvement")}>
              <label>PLACEMENT COORDINATION INVOLVEMENT *</label>
              <select
                value={form.placementCoordinationInvolvement}
                onChange={(e) => set("placementCoordinationInvolvement", e.target.value)}
              >
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementCoordinationInvolvement} />
            </div>
          </div>
        </section>

        {/* ── MOBILIZATION & INDUSTRY COORDINATION ── */}
        <section className="sectionCard">
          <h2>MOBILIZATION & INDUSTRY COORDINATION</h2>

          <div className="inlineGroup">
            <div className={cls("mobilizationActivityParticipation")}>
              <label>MOBILIZATION ACTIVITY PARTICIPATION *</label>
              <select
                value={form.mobilizationActivityParticipation}
                onChange={(e) => set("mobilizationActivityParticipation", e.target.value)}
              >
                <option>Select...</option>
                <option>Regular Participation</option>
                <option>Occasional Participation</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.mobilizationActivityParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD MOBILIZATION PROOF</label>
              <FileUpload
                id="upload-mobilization-proof"
                field="mobilizationProof"
                fileName={form.mobilizationProof}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("industryVisitCoordination")}>
              <label>INDUSTRY VISIT COORDINATION *</label>
              <select
                value={form.industryVisitCoordination}
                onChange={(e) => set("industryVisitCoordination", e.target.value)}
              >
                <option>Select...</option>
                <option>Coordinated</option>
                <option>Supported</option>
                <option>Planned but Not Completed</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.industryVisitCoordination} />
            </div>

            <div className="field">
              <label>UPLOAD INDUSTRY VISIT PROOF</label>
              <FileUpload
                id="upload-industry-visit-proof"
                field="industryVisitProof"
                fileName={form.industryVisitProof}
                setForm={setForm}
              />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.batchLevelOperationalIssues ? " fieldHasError" : ""}`}>
            <label>BATCH-LEVEL OPERATIONAL ISSUES *</label>
            <textarea
              placeholder="Mention batch scheduling issues, attendance gaps, trainer availability, documentation delays, SDMS issues, or learner follow-up problems..."
              value={form.batchLevelOperationalIssues}
              onChange={(e) => set("batchLevelOperationalIssues", e.target.value)}
            />
            <FieldError msg={errors.batchLevelOperationalIssues} />
          </div>

          <div className={`field fullWidth${errors.candidateEngagementObservations ? " fieldHasError" : ""}`}>
            <label>CANDIDATE ENGAGEMENT OBSERVATIONS *</label>
            <textarea
              placeholder="Mention candidate participation patterns, engagement level, dropout risks, motivation gaps, parent/student communication issues, or support needs..."
              value={form.candidateEngagementObservations}
              onChange={(e) => set("candidateEngagementObservations", e.target.value)}
            />
            <FieldError msg={errors.candidateEngagementObservations} />
          </div>
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={cls("coordinatorConfirmation")}>
              <label>COORDINATOR CONFIRMATION *</label>
              <select
                value={form.coordinatorConfirmation}
                onChange={(e) => set("coordinatorConfirmation", e.target.value)}
              >
                <option>Select...</option>
                <option>I confirm that the entered data is accurate</option>
                <option>I need to review before submission</option>
              </select>
              <FieldError msg={errors.coordinatorConfirmation} />
            </div>

            <div className="field">
              <label>SUPPORTING DOCUMENTS</label>
              <FileUpload
                id="upload-supporting-docs"
                field="supportingDocuments"
                fileName={form.supportingDocuments}
                setForm={setForm}
                multiple
              />
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
