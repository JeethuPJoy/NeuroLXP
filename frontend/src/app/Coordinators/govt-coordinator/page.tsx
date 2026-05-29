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
  // Programme Operations
  activeBatchesManaged: string;
  learnersManagedCount: string;
  programmeCompletionTracking: string;
  attendanceMonitoringResponsibility: string;
  programmeSchedulingResponsibility: string;
  assessmentCoordinationInvolvement: string;
  // Certification & Documentation
  certificationCoordinationInvolvement: string;
  certificationProof: string;
  documentationVerificationResponsibility: string;
  verificationProof: string;
  // Field, Awareness & Mobilization
  fieldVisitParticipation: string;
  awarenessCampaignCoordination: string;
  communityMobilizationInvolvement: string;
  fieldAwarenessDoc: string;
  fieldCampaignProof: string;
  // Reporting & Government Portal
  reportingDataEntryResponsibility: string;
  reportingSample: string;
  governmentPortalUpdateResponsibility: string;
  portalUpdateProof: string;
  // Issue Handling & Learner Follow-up
  grievanceHandlingCount: string;
  escalationHandlingCount: string;
  dropoutMonitoringParticipation: string;
  placementEmploymentFollowUp: string;
  surveyDataCollectionParticipation: string;
  trainingEventCoordinationInvolvement: string;
  // Qualitative Fields
  fieldLevelOperationalChallenges: string;
  learnerCommunityEngagementObservations: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  activeBatchesManaged?: string;
  learnersManagedCount?: string;
  programmeCompletionTracking?: string;
  attendanceMonitoringResponsibility?: string;
  programmeSchedulingResponsibility?: string;
  assessmentCoordinationInvolvement?: string;
  certificationCoordinationInvolvement?: string;
  documentationVerificationResponsibility?: string;
  fieldVisitParticipation?: string;
  awarenessCampaignCoordination?: string;
  communityMobilizationInvolvement?: string;
  reportingDataEntryResponsibility?: string;
  governmentPortalUpdateResponsibility?: string;
  grievanceHandlingCount?: string;
  escalationHandlingCount?: string;
  dropoutMonitoringParticipation?: string;
  placementEmploymentFollowUp?: string;
  surveyDataCollectionParticipation?: string;
  trainingEventCoordinationInvolvement?: string;
  fieldLevelOperationalChallenges?: string;
  learnerCommunityEngagementObservations?: string;
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

  // Programme Operations
  if (!f.activeBatchesManaged.trim()) e.activeBatchesManaged = "Active batches / programmes managed is required.";
  if (!f.learnersManagedCount.trim()) e.learnersManagedCount = "Learners managed count is required.";
  if (!f.programmeCompletionTracking || f.programmeCompletionTracking === "Select...") e.programmeCompletionTracking = "Programme completion tracking is required.";
  if (!f.attendanceMonitoringResponsibility || f.attendanceMonitoringResponsibility === "Select...") e.attendanceMonitoringResponsibility = "Attendance monitoring responsibility is required.";
  if (!f.programmeSchedulingResponsibility || f.programmeSchedulingResponsibility === "Select...") e.programmeSchedulingResponsibility = "Programme scheduling responsibility is required.";
  if (!f.assessmentCoordinationInvolvement || f.assessmentCoordinationInvolvement === "Select...") e.assessmentCoordinationInvolvement = "Assessment coordination involvement is required.";

  // Certification & Documentation
  if (!f.certificationCoordinationInvolvement || f.certificationCoordinationInvolvement === "Select...") e.certificationCoordinationInvolvement = "Certification coordination involvement is required.";
  if (!f.documentationVerificationResponsibility || f.documentationVerificationResponsibility === "Select...") e.documentationVerificationResponsibility = "Documentation verification responsibility is required.";

  // Field, Awareness & Mobilization
  if (!f.fieldVisitParticipation || f.fieldVisitParticipation === "Select...") e.fieldVisitParticipation = "Field visit participation is required.";
  if (!f.awarenessCampaignCoordination || f.awarenessCampaignCoordination === "Select...") e.awarenessCampaignCoordination = "Awareness campaign coordination is required.";
  if (!f.communityMobilizationInvolvement || f.communityMobilizationInvolvement === "Select...") e.communityMobilizationInvolvement = "Community mobilization involvement is required.";

  // Reporting & Government Portal
  if (!f.reportingDataEntryResponsibility || f.reportingDataEntryResponsibility === "Select...") e.reportingDataEntryResponsibility = "Reporting / data entry responsibility is required.";
  if (!f.governmentPortalUpdateResponsibility || f.governmentPortalUpdateResponsibility === "Select...") e.governmentPortalUpdateResponsibility = "Government portal update responsibility is required.";

  // Issue Handling & Learner Follow-up
  if (!f.grievanceHandlingCount.trim()) e.grievanceHandlingCount = "Grievance handling count is required.";
  if (!f.escalationHandlingCount.trim()) e.escalationHandlingCount = "Escalation handling count is required.";
  if (!f.dropoutMonitoringParticipation || f.dropoutMonitoringParticipation === "Select...") e.dropoutMonitoringParticipation = "Dropout monitoring participation is required.";
  if (!f.placementEmploymentFollowUp || f.placementEmploymentFollowUp === "Select...") e.placementEmploymentFollowUp = "Placement / employment follow-up participation is required.";
  if (!f.surveyDataCollectionParticipation || f.surveyDataCollectionParticipation === "Select...") e.surveyDataCollectionParticipation = "Survey / data collection participation is required.";
  if (!f.trainingEventCoordinationInvolvement || f.trainingEventCoordinationInvolvement === "Select...") e.trainingEventCoordinationInvolvement = "Training / event coordination involvement is required.";

  // Qualitative Fields
  if (!f.fieldLevelOperationalChallenges.trim()) e.fieldLevelOperationalChallenges = "Field-level operational challenges is required.";
  if (!f.learnerCommunityEngagementObservations.trim()) e.learnerCommunityEngagementObservations = "Learner / community engagement observations is required.";

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
export default function GovernmentCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    activeBatchesManaged: "",
    learnersManagedCount: "",
    programmeCompletionTracking: "",
    attendanceMonitoringResponsibility: "",
    programmeSchedulingResponsibility: "",
    assessmentCoordinationInvolvement: "",
    certificationCoordinationInvolvement: "",
    certificationProof: "",
    documentationVerificationResponsibility: "",
    verificationProof: "",
    fieldVisitParticipation: "",
    awarenessCampaignCoordination: "",
    communityMobilizationInvolvement: "",
    fieldAwarenessDoc: "",
    fieldCampaignProof: "",
    reportingDataEntryResponsibility: "",
    reportingSample: "",
    governmentPortalUpdateResponsibility: "",
    portalUpdateProof: "",
    grievanceHandlingCount: "",
    escalationHandlingCount: "",
    dropoutMonitoringParticipation: "",
    placementEmploymentFollowUp: "",
    surveyDataCollectionParticipation: "",
    trainingEventCoordinationInvolvement: "",
    fieldLevelOperationalChallenges: "",
    learnerCommunityEngagementObservations: "",
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
          <div className="avatar">GC</div>
          <h3>Government Coordinator</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" className="active" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>Government Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoCol">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. coordinator@gov.in"
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

        {/* ── PROGRAMME OPERATIONS ── */}
        <section className="sectionCard">
          <h2>PROGRAMME OPERATIONS</h2>

          <div className="formGrid">
            <div className={cls("activeBatchesManaged")}>
              <label>ACTIVE BATCHES / PROGRAMMES MANAGED *</label>
              <input type="number" placeholder="e.g. 10" value={form.activeBatchesManaged} onChange={(e) => set("activeBatchesManaged", e.target.value)} />
              <FieldError msg={errors.activeBatchesManaged} />
            </div>

            <div className={cls("learnersManagedCount")}>
              <label>LEARNERS MANAGED COUNT *</label>
              <input type="number" placeholder="e.g. 350" value={form.learnersManagedCount} onChange={(e) => set("learnersManagedCount", e.target.value)} />
              <FieldError msg={errors.learnersManagedCount} />
            </div>

            <div className={cls("programmeCompletionTracking")}>
              <label>PROGRAMME COMPLETION TRACKING *</label>
              <select value={form.programmeCompletionTracking} onChange={(e) => set("programmeCompletionTracking", e.target.value)}>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.programmeCompletionTracking} />
            </div>
          </div>

          <div className="formGrid">
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

            <div className={cls("programmeSchedulingResponsibility")}>
              <label>PROGRAMME SCHEDULING RESPONSIBILITY *</label>
              <select value={form.programmeSchedulingResponsibility} onChange={(e) => set("programmeSchedulingResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.programmeSchedulingResponsibility} />
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

        {/* ── CERTIFICATION & DOCUMENTATION ── */}
        <section className="sectionCard">
          <h2>CERTIFICATION & DOCUMENTATION</h2>

          <div className="inlineGroup">
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

            <div className="field">
              <label>UPLOAD CERTIFICATION PROOF</label>
              <FileUpload id="upload-cert-proof" field="certificationProof" fileName={form.certificationProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("documentationVerificationResponsibility")}>
              <label>DOCUMENTATION VERIFICATION RESPONSIBILITY *</label>
              <select value={form.documentationVerificationResponsibility} onChange={(e) => set("documentationVerificationResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Verification Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.documentationVerificationResponsibility} />
            </div>

            <div className="field">
              <label>UPLOAD VERIFICATION PROOF</label>
              <FileUpload id="upload-verification-proof" field="verificationProof" fileName={form.verificationProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── FIELD, AWARENESS & MOBILIZATION ── */}
        <section className="sectionCard">
          <h2>FIELD, AWARENESS & MOBILIZATION</h2>

          <div className="formGrid">
            <div className={cls("fieldVisitParticipation")}>
              <label>FIELD VISIT PARTICIPATION *</label>
              <select value={form.fieldVisitParticipation} onChange={(e) => set("fieldVisitParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Regular Participation</option>
                <option>Occasional Participation</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.fieldVisitParticipation} />
            </div>

            <div className={cls("awarenessCampaignCoordination")}>
              <label>AWARENESS CAMPAIGN COORDINATION *</label>
              <select value={form.awarenessCampaignCoordination} onChange={(e) => set("awarenessCampaignCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Coordinated</option>
                <option>Supported</option>
                <option>Planned but Not Completed</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.awarenessCampaignCoordination} />
            </div>

            <div className={cls("communityMobilizationInvolvement")}>
              <label>COMMUNITY MOBILIZATION INVOLVEMENT *</label>
              <select value={form.communityMobilizationInvolvement} onChange={(e) => set("communityMobilizationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.communityMobilizationInvolvement} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>FIELD / AWARENESS DOCUMENT</label>
              <input
                placeholder="e.g. Visit report, awareness report"
                value={form.fieldAwarenessDoc}
                onChange={(e) => set("fieldAwarenessDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD FIELD / CAMPAIGN PROOF</label>
              <FileUpload id="upload-field-campaign" field="fieldCampaignProof" fileName={form.fieldCampaignProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── REPORTING & GOVERNMENT PORTAL ── */}
        <section className="sectionCard">
          <h2>REPORTING & GOVERNMENT PORTAL</h2>

          <div className="inlineGroup">
            <div className={cls("reportingDataEntryResponsibility")}>
              <label>REPORTING / DATA ENTRY RESPONSIBILITY *</label>
              <select value={form.reportingDataEntryResponsibility} onChange={(e) => set("reportingDataEntryResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Data Verification Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.reportingDataEntryResponsibility} />
            </div>

            <div className="field">
              <label>UPLOAD REPORTING SAMPLE</label>
              <FileUpload id="upload-reporting-sample" field="reportingSample" fileName={form.reportingSample} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("governmentPortalUpdateResponsibility")}>
              <label>GOVERNMENT PORTAL UPDATE RESPONSIBILITY *</label>
              <select value={form.governmentPortalUpdateResponsibility} onChange={(e) => set("governmentPortalUpdateResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Review Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.governmentPortalUpdateResponsibility} />
            </div>

            <div className="field">
              <label>UPLOAD PORTAL UPDATE PROOF</label>
              <FileUpload id="upload-portal-proof" field="portalUpdateProof" fileName={form.portalUpdateProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── ISSUE HANDLING & LEARNER FOLLOW-UP ── */}
        <section className="sectionCard">
          <h2>ISSUE HANDLING & LEARNER FOLLOW-UP</h2>

          <div className="formGrid">
            <div className={cls("grievanceHandlingCount")}>
              <label>GRIEVANCE HANDLING COUNT *</label>
              <input type="number" placeholder="e.g. 20" value={form.grievanceHandlingCount} onChange={(e) => set("grievanceHandlingCount", e.target.value)} />
              <FieldError msg={errors.grievanceHandlingCount} />
            </div>

            <div className={cls("escalationHandlingCount")}>
              <label>ESCALATION HANDLING COUNT *</label>
              <input type="number" placeholder="e.g. 8" value={form.escalationHandlingCount} onChange={(e) => set("escalationHandlingCount", e.target.value)} />
              <FieldError msg={errors.escalationHandlingCount} />
            </div>

            <div className={cls("dropoutMonitoringParticipation")}>
              <label>DROPOUT MONITORING PARTICIPATION *</label>
              <select value={form.dropoutMonitoringParticipation} onChange={(e) => set("dropoutMonitoringParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Regular Monitoring</option>
                <option>Periodic Monitoring</option>
                <option>Need-based Monitoring</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.dropoutMonitoringParticipation} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("placementEmploymentFollowUp")}>
              <label>PLACEMENT / EMPLOYMENT FOLLOW-UP PARTICIPATION *</label>
              <select value={form.placementEmploymentFollowUp} onChange={(e) => set("placementEmploymentFollowUp", e.target.value)}>
                <option>Select...</option>
                <option>Regular Follow-up</option>
                <option>Periodic Follow-up</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementEmploymentFollowUp} />
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

            <div className={cls("trainingEventCoordinationInvolvement")}>
              <label>TRAINING / EVENT COORDINATION INVOLVEMENT *</label>
              <select value={form.trainingEventCoordinationInvolvement} onChange={(e) => set("trainingEventCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Logistics Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.trainingEventCoordinationInvolvement} />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.fieldLevelOperationalChallenges ? " fieldHasError" : ""}`}>
            <label>FIELD-LEVEL OPERATIONAL CHALLENGES *</label>
            <textarea
              placeholder="Mention field visit issues, attendance problems, learner documentation gaps, portal update delays, awareness campaign challenges, or programme follow-up issues..."
              value={form.fieldLevelOperationalChallenges}
              onChange={(e) => set("fieldLevelOperationalChallenges", e.target.value)}
            />
            <FieldError msg={errors.fieldLevelOperationalChallenges} />
          </div>

          <div className={`field fullWidth${errors.learnerCommunityEngagementObservations ? " fieldHasError" : ""}`}>
            <label>LEARNER / COMMUNITY ENGAGEMENT OBSERVATIONS *</label>
            <textarea
              placeholder="Mention learner participation patterns, community response, dropout risks, mobilisation challenges, communication gaps, or employment follow-up observations..."
              value={form.learnerCommunityEngagementObservations}
              onChange={(e) => set("learnerCommunityEngagementObservations", e.target.value)}
            />
            <FieldError msg={errors.learnerCommunityEngagementObservations} />
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
