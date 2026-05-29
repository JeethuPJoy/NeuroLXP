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
  // Expertise & Certification
  domainExpertise: string;
  trainingExpYears: string;
  certifiedStatus: string;
  certificationProof: string;
  sectorExpYears: string;
  batchesHandled: string;
  // Training Delivery Performance
  activeBeneficiaries: string;
  sessionCompletion: string;
  attendancePercentage: string;
  assessmentPass: string;
  practicalSessionCount: string;
  lmsUsage: string;
  // Digital Content & Documentation
  digitalContentCount: string;
  digitalContentSampleFile: string;
  reportingCompliance: string;
  reportingDocument: string;
  // Community, Mentoring & Awareness
  communityEngagement: string;
  communityEngagementProof: string;
  mentoringSessions: string;
  awarenessprogrammes: string;
  // FDP / ToT, Support & Audit
  fdpParticipation: string;
  fdpProof: string;
  placementSupport: string;
  supportProof: string;
  beneficiaryFeedbackScore: string;
  auditParticipation: string;
  auditDocumentText: string;
  auditDocumentFile: string;
  // Qualitative Fields
  trainingMethodology: string;
  beneficiaryChallenges: string;
  improvementAreas: string;
  // Confirmation
  trainerConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  domainExpertise?: string;
  trainingExpYears?: string;
  certifiedStatus?: string;
  sectorExpYears?: string;
  batchesHandled?: string;
  activeBeneficiaries?: string;
  sessionCompletion?: string;
  attendancePercentage?: string;
  assessmentPass?: string;
  practicalSessionCount?: string;
  lmsUsage?: string;
  digitalContentCount?: string;
  reportingCompliance?: string;
  communityEngagement?: string;
  mentoringSessions?: string;
  awarenessprogrammes?: string;
  fdpParticipation?: string;
  placementSupport?: string;
  beneficiaryFeedbackScore?: string;
  auditParticipation?: string;
  trainingMethodology?: string;
  beneficiaryChallenges?: string;
  improvementAreas?: string;
  trainerConfirmation?: string;
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

  // Expertise & Certification
  if (!f.domainExpertise.trim()) e.domainExpertise = "Domain expertise is required.";
  if (!f.trainingExpYears.trim()) e.trainingExpYears = "Training experience years is required.";
  if (!f.certifiedStatus || f.certifiedStatus === "Select...") e.certifiedStatus = "Certified trainer status is required.";
  if (!f.sectorExpYears.trim()) e.sectorExpYears = "Industry / social sector experience is required.";
  if (!f.batchesHandled.trim()) e.batchesHandled = "Batches / groups handled count is required.";

  // Training Delivery Performance
  if (!f.activeBeneficiaries.trim()) e.activeBeneficiaries = "Active beneficiaries count is required.";
  if (!f.sessionCompletion.trim()) e.sessionCompletion = "Session completion % is required.";
  if (!f.attendancePercentage.trim()) e.attendancePercentage = "Attendance % is required.";
  if (!f.assessmentPass.trim()) e.assessmentPass = "Assessment pass % is required.";
  if (!f.practicalSessionCount.trim()) e.practicalSessionCount = "Practical / activity session count is required.";
  if (!f.lmsUsage.trim()) e.lmsUsage = "LMS usage % is required.";

  // Digital Content & Documentation
  if (!f.digitalContentCount.trim()) e.digitalContentCount = "Digital content uploaded count is required.";
  if (!f.reportingCompliance || f.reportingCompliance === "Select...") e.reportingCompliance = "Reporting / documentation compliance is required.";

  // Community, Mentoring & Awareness
  if (!f.communityEngagement || f.communityEngagement === "Select...") e.communityEngagement = "Community engagement participation is required.";
  if (!f.mentoringSessions.trim()) e.mentoringSessions = "Mentoring sessions conducted is required.";
  if (!f.awarenessprogrammes.trim()) e.awarenessprogrammes = "Awareness programmes conducted is required.";

  // FDP / ToT, Support & Audit
  if (!f.fdpParticipation || f.fdpParticipation === "Select...") e.fdpParticipation = "FDP / ToT participation is required.";
  if (!f.placementSupport || f.placementSupport === "Select...") e.placementSupport = "Placement / livelihood support involvement is required.";
  if (!f.beneficiaryFeedbackScore.trim()) e.beneficiaryFeedbackScore = "Beneficiary feedback score is required.";
  if (!f.auditParticipation || f.auditParticipation === "Select...") e.auditParticipation = "Audit participation is required.";

  // Qualitative Fields
  if (!f.trainingMethodology.trim()) e.trainingMethodology = "Training methodology summary is required.";
  if (!f.beneficiaryChallenges.trim()) e.beneficiaryChallenges = "Common beneficiary challenges is required.";
  if (!f.improvementAreas.trim()) e.improvementAreas = "Improvement areas identified is required.";

  // Confirmation
  if (!f.trainerConfirmation || f.trainerConfirmation === "Select...") e.trainerConfirmation = "Trainer / facilitator confirmation is required.";

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
export default function NgoTrainerFacilitatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    domainExpertise: "",
    trainingExpYears: "",
    certifiedStatus: "",
    certificationProof: "",
    sectorExpYears: "",
    batchesHandled: "",
    activeBeneficiaries: "",
    sessionCompletion: "",
    attendancePercentage: "",
    assessmentPass: "",
    practicalSessionCount: "",
    lmsUsage: "",
    digitalContentCount: "",
    digitalContentSampleFile: "",
    reportingCompliance: "",
    reportingDocument: "",
    communityEngagement: "",
    communityEngagementProof: "",
    mentoringSessions: "",
    awarenessprogrammes: "",
    fdpParticipation: "",
    fdpProof: "",
    placementSupport: "",
    supportProof: "",
    beneficiaryFeedbackScore: "",
    auditParticipation: "",
    auditDocumentText: "",
    auditDocumentFile: "",
    trainingMethodology: "",
    beneficiaryChallenges: "",
    improvementAreas: "",
    trainerConfirmation: "",
    supportingDocuments: "",
  });

  const errors: FormErrors = submitted ? validateForm(form) : {};

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Returns "field" or "field fieldHasError" depending on whether that field has an error
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
          <div className="avatar">NF</div>
          <h3>NGO Facilitator</h3>
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
        <h1>NGO / Trust / Foundation Trainer Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoColumns">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. facilitator@ngo.org"
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

        {/* ── EXPERTISE & CERTIFICATION ── */}
        <section className="sectionCard">
          <h2>EXPERTISE & CERTIFICATION</h2>

          <div className="formGrid twoColumns">
            <div className={cls("domainExpertise")}>
              <label>DOMAIN EXPERTISE *</label>
              <input
                placeholder="e.g. Livelihood, Digital Literacy, Health Awareness"
                value={form.domainExpertise}
                onChange={(e) => set("domainExpertise", e.target.value)}
              />
              <FieldError msg={errors.domainExpertise} />
            </div>

            <div className={cls("trainingExpYears")}>
              <label>TRAINING EXPERIENCE YEARS *</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={form.trainingExpYears}
                onChange={(e) => set("trainingExpYears", e.target.value)}
              />
              <FieldError msg={errors.trainingExpYears} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("certifiedStatus")}>
              <label>CERTIFIED TRAINER STATUS *</label>
              <select value={form.certifiedStatus} onChange={(e) => set("certifiedStatus", e.target.value)}>
                <option>Select...</option>
                <option>Certified</option>
                <option>Not Certified</option>
                <option>Certification In Progress</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.certifiedStatus} />
            </div>

            <div className="field">
              <label>UPLOAD CERTIFICATION PROOF</label>
              <FileUpload id="upload-cert-proof" field="certificationProof" fileName={form.certificationProof} setForm={setForm} />
            </div>
          </div>

          <div className="formGrid twoColumns">
            <div className={cls("sectorExpYears")}>
              <label>INDUSTRY / SOCIAL SECTOR EXPERIENCE YEARS *</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={form.sectorExpYears}
                onChange={(e) => set("sectorExpYears", e.target.value)}
              />
              <FieldError msg={errors.sectorExpYears} />
            </div>

            <div className={cls("batchesHandled")}>
              <label>BATCHES / GROUPS HANDLED COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 15"
                value={form.batchesHandled}
                onChange={(e) => set("batchesHandled", e.target.value)}
              />
              <FieldError msg={errors.batchesHandled} />
            </div>
          </div>
        </section>

        {/* ── TRAINING DELIVERY PERFORMANCE ── */}
        <section className="sectionCard">
          <h2>TRAINING DELIVERY PERFORMANCE</h2>

          <div className="formGrid">
            <div className={cls("activeBeneficiaries")}>
              <label>ACTIVE BENEFICIARIES COUNT *</label>
              <input type="number" placeholder="e.g. 120" value={form.activeBeneficiaries} onChange={(e) => set("activeBeneficiaries", e.target.value)} />
              <FieldError msg={errors.activeBeneficiaries} />
            </div>

            <div className={cls("sessionCompletion")}>
              <label>SESSION COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 90" value={form.sessionCompletion} onChange={(e) => set("sessionCompletion", e.target.value)} />
              <FieldError msg={errors.sessionCompletion} />
            </div>

            <div className={cls("attendancePercentage")}>
              <label>ATTENDANCE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 86" value={form.attendancePercentage} onChange={(e) => set("attendancePercentage", e.target.value)} />
              <FieldError msg={errors.attendancePercentage} />
            </div>

            <div className={cls("assessmentPass")}>
              <label>ASSESSMENT PASS PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 78" value={form.assessmentPass} onChange={(e) => set("assessmentPass", e.target.value)} />
              <FieldError msg={errors.assessmentPass} />
            </div>

            <div className={cls("practicalSessionCount")}>
              <label>PRACTICAL / ACTIVITY SESSION COUNT *</label>
              <input type="number" placeholder="e.g. 24" value={form.practicalSessionCount} onChange={(e) => set("practicalSessionCount", e.target.value)} />
              <FieldError msg={errors.practicalSessionCount} />
            </div>

            <div className={cls("lmsUsage")}>
              <label>LMS USAGE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 75" value={form.lmsUsage} onChange={(e) => set("lmsUsage", e.target.value)} />
              <FieldError msg={errors.lmsUsage} />
            </div>
          </div>
        </section>

        {/* ── DIGITAL CONTENT & DOCUMENTATION ── */}
        <section className="sectionCard">
          <h2>DIGITAL CONTENT & DOCUMENTATION</h2>

          <div className="inlineGroup">
            <div className={cls("digitalContentCount")}>
              <label>DIGITAL CONTENT UPLOADED COUNT *</label>
              <input type="number" placeholder="e.g. 20" value={form.digitalContentCount} onChange={(e) => set("digitalContentCount", e.target.value)} />
              <FieldError msg={errors.digitalContentCount} />
            </div>

            <div className="field">
              <label>UPLOAD DIGITAL CONTENT SAMPLE</label>
              <FileUpload id="upload-digital-sample" field="digitalContentSampleFile" fileName={form.digitalContentSampleFile} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("reportingCompliance")}>
              <label>REPORTING / DOCUMENTATION COMPLIANCE *</label>
              <select value={form.reportingCompliance} onChange={(e) => set("reportingCompliance", e.target.value)}>
                <option>Select...</option>
                <option>Fully Compliant</option>
                <option>Partially Compliant</option>
                <option>Non-Compliant</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.reportingCompliance} />
            </div>

            <div className="field">
              <label>UPLOAD REPORTING DOCUMENT</label>
              <FileUpload id="upload-reporting-doc" field="reportingDocument" fileName={form.reportingDocument} setForm={setForm} />
            </div>
          </div>
        </section>

        {/* ── COMMUNITY, MENTORING & AWARENESS ── */}
        <section className="sectionCard">
          <h2>COMMUNITY, MENTORING & AWARENESS</h2>

          <div className="inlineGroup">
            <div className={cls("communityEngagement")}>
              <label>COMMUNITY ENGAGEMENT PARTICIPATION *</label>
              <select value={form.communityEngagement} onChange={(e) => set("communityEngagement", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Not Participated</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.communityEngagement} />
            </div>

            <div className="field">
              <label>UPLOAD COMMUNITY ENGAGEMENT PROOF</label>
              <FileUpload id="upload-community-proof" field="communityEngagementProof" fileName={form.communityEngagementProof} setForm={setForm} />
            </div>
          </div>

          <div className="formGrid twoColumns">
            <div className={cls("mentoringSessions")}>
              <label>MENTORING SESSIONS CONDUCTED *</label>
              <input type="number" placeholder="e.g. 18" value={form.mentoringSessions} onChange={(e) => set("mentoringSessions", e.target.value)} />
              <FieldError msg={errors.mentoringSessions} />
            </div>

            <div className={cls("awarenessprogrammes")}>
              <label>AWARENESS PROGRAMMES CONDUCTED *</label>
              <input type="number" placeholder="e.g. 10" value={form.awarenessprogrammes} onChange={(e) => set("awarenessprogrammes", e.target.value)} />
              <FieldError msg={errors.awarenessprogrammes} />
            </div>
          </div>
        </section>

        {/* ── FDP / ToT, SUPPORT & AUDIT ── */}
        <section className="sectionCard">
          <h2>FDP / ToT, SUPPORT & AUDIT</h2>

          <div className="inlineGroup">
            <div className={cls("fdpParticipation")}>
              <label>FDP / ToT PARTICIPATION *</label>
              <select value={form.fdpParticipation} onChange={(e) => set("fdpParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Not Completed</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.fdpParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD FDP / ToT PROOF</label>
              <FileUpload id="upload-fdp-proof" field="fdpProof" fileName={form.fdpProof} setForm={setForm} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("placementSupport")}>
              <label>PLACEMENT / LIVELIHOOD SUPPORT INVOLVEMENT *</label>
              <select value={form.placementSupport} onChange={(e) => set("placementSupport", e.target.value)}>
                <option>Select...</option>
                <option>Placement Counselling</option>
                <option>Employer Connect</option>
                <option>Livelihood Linkage</option>
                <option>Entrepreneurship Support</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementSupport} />
            </div>

            <div className="field">
              <label>UPLOAD SUPPORT PROOF</label>
              <FileUpload id="upload-support-proof" field="supportProof" fileName={form.supportProof} setForm={setForm} />
            </div>
          </div>

          <div className="formGrid twoColumns">
            <div className={cls("beneficiaryFeedbackScore")}>
              <label>BENEFICIARY FEEDBACK SCORE *</label>
              <input type="number" placeholder="e.g. 4.3 / 5" value={form.beneficiaryFeedbackScore} onChange={(e) => set("beneficiaryFeedbackScore", e.target.value)} />
              <FieldError msg={errors.beneficiaryFeedbackScore} />
            </div>

            <div className={cls("auditParticipation")}>
              <label>AUDIT PARTICIPATION *</label>
              <select value={form.auditParticipation} onChange={(e) => set("auditParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Not Participated</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.auditParticipation} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>AUDIT DOCUMENT</label>
              <input
                placeholder="e.g. Audit report, checklist, compliance summary"
                value={form.auditDocumentText}
                onChange={(e) => set("auditDocumentText", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD AUDIT DOCUMENT</label>
              <FileUpload id="upload-audit-doc" field="auditDocumentFile" fileName={form.auditDocumentFile} setForm={setForm} />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.trainingMethodology ? " fieldHasError" : ""}`}>
            <label>TRAINING METHODOLOGY SUMMARY *</label>
            <textarea
              placeholder="Describe training approach, group activities, community facilitation, practical sessions, and engagement methods..."
              value={form.trainingMethodology}
              onChange={(e) => set("trainingMethodology", e.target.value)}
            />
            <FieldError msg={errors.trainingMethodology} />
          </div>

          <div className={`field fullWidth${errors.beneficiaryChallenges ? " fieldHasError" : ""}`}>
            <label>COMMON BENEFICIARY CHALLENGES OBSERVED *</label>
            <textarea
              placeholder="Mention common learning, attendance, digital access, language, livelihood, family, or community-level challenges observed..."
              value={form.beneficiaryChallenges}
              onChange={(e) => set("beneficiaryChallenges", e.target.value)}
            />
            <FieldError msg={errors.beneficiaryChallenges} />
          </div>

          <div className={`field fullWidth${errors.improvementAreas ? " fieldHasError" : ""}`}>
            <label>IMPROVEMENT AREAS IDENTIFIED *</label>
            <textarea
              placeholder="Mention improvements needed in training delivery, counselling, follow-up, field support, LMS usage, or programme design..."
              value={form.improvementAreas}
              onChange={(e) => set("improvementAreas", e.target.value)}
            />
            <FieldError msg={errors.improvementAreas} />
          </div>
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={cls("trainerConfirmation")}>
              <label>TRAINER / FACILITATOR CONFIRMATION *</label>
              <select value={form.trainerConfirmation} onChange={(e) => set("trainerConfirmation", e.target.value)}>
                <option>Select...</option>
                <option>I confirm that the entered data is accurate</option>
                <option>I need to review before submission</option>
              </select>
              <FieldError msg={errors.trainerConfirmation} />
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
