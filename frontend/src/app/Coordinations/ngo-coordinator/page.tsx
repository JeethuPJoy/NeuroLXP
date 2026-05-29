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
  // Section 2: Detailed Profiling
  activeBatchesManaged: string;
  beneficiariesManagedCount: string;
  programmeCompletionTracking: string;
  attendanceMonitoringResponsibility: string;
  fieldVisitParticipation: string;
  communityMobilizationInvolvement: string;
  // Documentation & Coordination
  documentationVerificationResponsibility: string;
  documentVerificationProof: string;
  assessmentEventCoordinationInvolvement: string;
  assessmentEventProof: string;
  volunteerCoordinationParticipation: string;
  placementLivelihoodFollowUp: string;
  parentCommunityInteractionFrequency: string;
  // Issue Handling & Dropout Monitoring
  beneficiaryGrievanceHandlingCount: string;
  escalationHandlingCount: string;
  dropoutMonitoringParticipation: string;
  // Reporting & Activity Management
  governmentReportingParticipation: string;
  csrReportingParticipation: string;
  eventActivityCoordination: string;
  awarenessCampaignsConducted: string;
  surveyDataCollectionParticipation: string;
  reportingActivityDoc: string;
  reportingActivityProof: string;
  // Qualitative Fields
  communityChallengesObserved: string;
  beneficiaryEngagementObservations: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  activeBatchesManaged?: string;
  beneficiariesManagedCount?: string;
  programmeCompletionTracking?: string;
  attendanceMonitoringResponsibility?: string;
  fieldVisitParticipation?: string;
  communityMobilizationInvolvement?: string;
  documentationVerificationResponsibility?: string;
  assessmentEventCoordinationInvolvement?: string;
  volunteerCoordinationParticipation?: string;
  placementLivelihoodFollowUp?: string;
  parentCommunityInteractionFrequency?: string;
  beneficiaryGrievanceHandlingCount?: string;
  escalationHandlingCount?: string;
  dropoutMonitoringParticipation?: string;
  governmentReportingParticipation?: string;
  csrReportingParticipation?: string;
  eventActivityCoordination?: string;
  awarenessCampaignsConducted?: string;
  surveyDataCollectionParticipation?: string;
  communityChallengesObserved?: string;
  beneficiaryEngagementObservations?: string;
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

  // Section 2: Detailed Profiling
  if (!f.activeBatchesManaged.trim()) e.activeBatchesManaged = "Active batches / groups managed is required.";
  if (!f.beneficiariesManagedCount.trim()) e.beneficiariesManagedCount = "Beneficiaries managed count is required.";
  if (!f.programmeCompletionTracking || f.programmeCompletionTracking === "Select...") e.programmeCompletionTracking = "Programme completion tracking is required.";
  if (!f.attendanceMonitoringResponsibility || f.attendanceMonitoringResponsibility === "Select...") e.attendanceMonitoringResponsibility = "Attendance monitoring responsibility is required.";
  if (!f.fieldVisitParticipation || f.fieldVisitParticipation === "Select...") e.fieldVisitParticipation = "Field visit participation is required.";
  if (!f.communityMobilizationInvolvement || f.communityMobilizationInvolvement === "Select...") e.communityMobilizationInvolvement = "Community mobilization involvement is required.";

  // Documentation & Coordination
  if (!f.documentationVerificationResponsibility || f.documentationVerificationResponsibility === "Select...") e.documentationVerificationResponsibility = "Documentation verification responsibility is required.";
  if (!f.assessmentEventCoordinationInvolvement || f.assessmentEventCoordinationInvolvement === "Select...") e.assessmentEventCoordinationInvolvement = "Assessment / event coordination involvement is required.";
  if (!f.volunteerCoordinationParticipation || f.volunteerCoordinationParticipation === "Select...") e.volunteerCoordinationParticipation = "Volunteer coordination participation is required.";
  if (!f.placementLivelihoodFollowUp || f.placementLivelihoodFollowUp === "Select...") e.placementLivelihoodFollowUp = "Placement / livelihood follow-up participation is required.";
  if (!f.parentCommunityInteractionFrequency || f.parentCommunityInteractionFrequency === "Select...") e.parentCommunityInteractionFrequency = "Parent / community interaction frequency is required.";

  // Issue Handling & Dropout Monitoring
  if (!f.beneficiaryGrievanceHandlingCount.trim()) e.beneficiaryGrievanceHandlingCount = "Beneficiary grievance handling count is required.";
  if (!f.escalationHandlingCount.trim()) e.escalationHandlingCount = "Escalation handling count is required.";
  if (!f.dropoutMonitoringParticipation || f.dropoutMonitoringParticipation === "Select...") e.dropoutMonitoringParticipation = "Dropout monitoring participation is required.";

  // Reporting & Activity Management
  if (!f.governmentReportingParticipation || f.governmentReportingParticipation === "Select...") e.governmentReportingParticipation = "Government reporting participation is required.";
  if (!f.csrReportingParticipation || f.csrReportingParticipation === "Select...") e.csrReportingParticipation = "CSR reporting participation is required.";
  if (!f.eventActivityCoordination || f.eventActivityCoordination === "Select...") e.eventActivityCoordination = "Event / activity coordination is required.";
  if (!f.awarenessCampaignsConducted.trim()) e.awarenessCampaignsConducted = "Awareness campaigns conducted is required.";
  if (!f.surveyDataCollectionParticipation || f.surveyDataCollectionParticipation === "Select...") e.surveyDataCollectionParticipation = "Survey / data collection participation is required.";

  // Qualitative Fields
  if (!f.communityChallengesObserved.trim()) e.communityChallengesObserved = "Community challenges observed is required.";
  if (!f.beneficiaryEngagementObservations.trim()) e.beneficiaryEngagementObservations = "Beneficiary engagement observations is required.";

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
export default function NgoCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    activeBatchesManaged: "",
    beneficiariesManagedCount: "",
    programmeCompletionTracking: "",
    attendanceMonitoringResponsibility: "",
    fieldVisitParticipation: "",
    communityMobilizationInvolvement: "",
    documentationVerificationResponsibility: "",
    documentVerificationProof: "",
    assessmentEventCoordinationInvolvement: "",
    assessmentEventProof: "",
    volunteerCoordinationParticipation: "",
    placementLivelihoodFollowUp: "",
    parentCommunityInteractionFrequency: "",
    beneficiaryGrievanceHandlingCount: "",
    escalationHandlingCount: "",
    dropoutMonitoringParticipation: "",
    governmentReportingParticipation: "",
    csrReportingParticipation: "",
    eventActivityCoordination: "",
    awarenessCampaignsConducted: "",
    surveyDataCollectionParticipation: "",
    reportingActivityDoc: "",
    reportingActivityProof: "",
    communityChallengesObserved: "",
    beneficiaryEngagementObservations: "",
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
          <div className="avatar">NC</div>
          <h3>NGO Coordinator</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" className="active" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>NGO Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoCol">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. coordinator@ngo.org"
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

        {/* ── SECTION 2: DETAILED PROFILING ── */}
        <section className="sectionCard">
          <h2>SECTION 2: DETAILED PROFILING</h2>

          <div className="formGrid">
            <div className={cls("activeBatchesManaged")}>
              <label>ACTIVE BATCHES / GROUPS MANAGED *</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={form.activeBatchesManaged}
                onChange={(e) => set("activeBatchesManaged", e.target.value)}
              />
              <FieldError msg={errors.activeBatchesManaged} />
            </div>

            <div className={cls("beneficiariesManagedCount")}>
              <label>BENEFICIARIES MANAGED COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 240"
                value={form.beneficiariesManagedCount}
                onChange={(e) => set("beneficiariesManagedCount", e.target.value)}
              />
              <FieldError msg={errors.beneficiariesManagedCount} />
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
        </section>

        {/* ── DOCUMENTATION & COORDINATION ── */}
        <section className="sectionCard">
          <h2>DOCUMENTATION & COORDINATION</h2>

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
              <label>UPLOAD DOCUMENT VERIFICATION PROOF</label>
              <FileUpload id="upload-doc-verification" field="documentVerificationProof" fileName={form.documentVerificationProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("assessmentEventCoordinationInvolvement")}>
              <label>ASSESSMENT / EVENT COORDINATION INVOLVEMENT *</label>
              <select value={form.assessmentEventCoordinationInvolvement} onChange={(e) => set("assessmentEventCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Assessment Coordination</option>
                <option>Event Coordination</option>
                <option>Both</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.assessmentEventCoordinationInvolvement} />
            </div>

            <div className="field">
              <label>UPLOAD ASSESSMENT / EVENT PROOF</label>
              <FileUpload id="upload-assessment-event" field="assessmentEventProof" fileName={form.assessmentEventProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("volunteerCoordinationParticipation")}>
              <label>VOLUNTEER COORDINATION PARTICIPATION *</label>
              <select value={form.volunteerCoordinationParticipation} onChange={(e) => set("volunteerCoordinationParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Need-based</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.volunteerCoordinationParticipation} />
            </div>

            <div className={cls("placementLivelihoodFollowUp")}>
              <label>PLACEMENT / LIVELIHOOD FOLLOW-UP PARTICIPATION *</label>
              <select value={form.placementLivelihoodFollowUp} onChange={(e) => set("placementLivelihoodFollowUp", e.target.value)}>
                <option>Select...</option>
                <option>Regular Follow-up</option>
                <option>Periodic Follow-up</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementLivelihoodFollowUp} />
            </div>

            <div className={cls("parentCommunityInteractionFrequency")}>
              <label>PARENT / COMMUNITY INTERACTION FREQUENCY *</label>
              <select value={form.parentCommunityInteractionFrequency} onChange={(e) => set("parentCommunityInteractionFrequency", e.target.value)}>
                <option>Select...</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.parentCommunityInteractionFrequency} />
            </div>
          </div>
        </section>

        {/* ── ISSUE HANDLING & DROPOUT MONITORING ── */}
        <section className="sectionCard">
          <h2>ISSUE HANDLING & DROPOUT MONITORING</h2>

          <div className="formGrid">
            <div className={cls("beneficiaryGrievanceHandlingCount")}>
              <label>BENEFICIARY GRIEVANCE HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 18"
                value={form.beneficiaryGrievanceHandlingCount}
                onChange={(e) => set("beneficiaryGrievanceHandlingCount", e.target.value)}
              />
              <FieldError msg={errors.beneficiaryGrievanceHandlingCount} />
            </div>

            <div className={cls("escalationHandlingCount")}>
              <label>ESCALATION HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 6"
                value={form.escalationHandlingCount}
                onChange={(e) => set("escalationHandlingCount", e.target.value)}
              />
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
        </section>

        {/* ── REPORTING & ACTIVITY MANAGEMENT ── */}
        <section className="sectionCard">
          <h2>REPORTING & ACTIVITY MANAGEMENT</h2>

          <div className="formGrid">
            <div className={cls("governmentReportingParticipation")}>
              <label>GOVERNMENT REPORTING PARTICIPATION *</label>
              <select value={form.governmentReportingParticipation} onChange={(e) => set("governmentReportingParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Data Entry Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.governmentReportingParticipation} />
            </div>

            <div className={cls("csrReportingParticipation")}>
              <label>CSR REPORTING PARTICIPATION *</label>
              <select value={form.csrReportingParticipation} onChange={(e) => set("csrReportingParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Data Entry Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.csrReportingParticipation} />
            </div>

            <div className={cls("eventActivityCoordination")}>
              <label>EVENT / ACTIVITY COORDINATION *</label>
              <select value={form.eventActivityCoordination} onChange={(e) => set("eventActivityCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Logistics Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.eventActivityCoordination} />
            </div>

            <div className={cls("awarenessCampaignsConducted")}>
              <label>AWARENESS CAMPAIGNS CONDUCTED *</label>
              <input
                type="number"
                placeholder="e.g. 12"
                value={form.awarenessCampaignsConducted}
                onChange={(e) => set("awarenessCampaignsConducted", e.target.value)}
              />
              <FieldError msg={errors.awarenessCampaignsConducted} />
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
              <label>REPORTING / ACTIVITY DOCUMENT</label>
              <input
                placeholder="e.g. CSR report, government report, event report"
                value={form.reportingActivityDoc}
                onChange={(e) => set("reportingActivityDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD REPORTING / ACTIVITY PROOF</label>
              <FileUpload id="upload-reporting-activity" field="reportingActivityProof" fileName={form.reportingActivityProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.communityChallengesObserved ? " fieldHasError" : ""}`}>
            <label>COMMUNITY CHALLENGES OBSERVED *</label>
            <textarea
              placeholder="Mention attendance barriers, family constraints, transport issues, livelihood pressure, digital access issues, social barriers, or community-level concerns..."
              value={form.communityChallengesObserved}
              onChange={(e) => set("communityChallengesObserved", e.target.value)}
            />
            <FieldError msg={errors.communityChallengesObserved} />
          </div>

          <div className={`field fullWidth${errors.beneficiaryEngagementObservations ? " fieldHasError" : ""}`}>
            <label>BENEFICIARY ENGAGEMENT OBSERVATIONS *</label>
            <textarea
              placeholder="Mention beneficiary participation trends, motivation levels, dropout risk, parent/community response, activity engagement, and support needs..."
              value={form.beneficiaryEngagementObservations}
              onChange={(e) => set("beneficiaryEngagementObservations", e.target.value)}
            />
            <FieldError msg={errors.beneficiaryEngagementObservations} />
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
