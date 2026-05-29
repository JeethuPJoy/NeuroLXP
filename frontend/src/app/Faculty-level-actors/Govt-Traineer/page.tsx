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
  activeLearnersCount: string;
  sessionCompletion: string;
  attendancePercentage: string;
  assessmentPass: string;
  practicalSessions: string;
  lmsUsage: string;
  // Digital Content & Documentation
  digitalContentCount: string;
  digitalContentSampleFile: string;
  reportingCompliance: string;
  reportingDocument: string;
  // Community & Mentoring
  communityEngagement: string;
  communityEngagementProof: string;
  mentoringSessions: string;
  awarenessprogrammes: string;
  // FDP / ToT, Outcomes & Audit
  fdpParticipation: string;
  fdpProof: string;
  certSuccessRate: string;
  learnerFeedbackScore: string;
  auditParticipation: string;
  auditDocument: string;
  // Qualitative Fields
  trainingMethodology: string;
  learnerChallenges: string;
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
  activeLearnersCount?: string;
  sessionCompletion?: string;
  attendancePercentage?: string;
  assessmentPass?: string;
  practicalSessions?: string;
  lmsUsage?: string;
  digitalContentCount?: string;
  reportingCompliance?: string;
  communityEngagement?: string;
  mentoringSessions?: string;
  awarenessprogrammes?: string;
  fdpParticipation?: string;
  certSuccessRate?: string;
  learnerFeedbackScore?: string;
  auditParticipation?: string;
  trainingMethodology?: string;
  learnerChallenges?: string;
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
  if (!f.sectorExpYears.trim()) e.sectorExpYears = "Industry / government sector experience is required.";
  if (!f.batchesHandled.trim()) e.batchesHandled = "Batches / programmes handled count is required.";

  // Training Delivery Performance
  if (!f.activeLearnersCount.trim()) e.activeLearnersCount = "Active learners count is required.";
  if (!f.sessionCompletion.trim()) e.sessionCompletion = "Session completion % is required.";
  if (!f.attendancePercentage.trim()) e.attendancePercentage = "Attendance % is required.";
  if (!f.assessmentPass.trim()) e.assessmentPass = "Assessment pass % is required.";
  if (!f.practicalSessions.trim()) e.practicalSessions = "Practical / activity sessions conducted is required.";
  if (!f.lmsUsage.trim()) e.lmsUsage = "LMS usage % is required.";

  // Digital Content & Documentation
  if (!f.digitalContentCount.trim()) e.digitalContentCount = "Digital content uploaded count is required.";
  if (!f.reportingCompliance || f.reportingCompliance === "Select...") e.reportingCompliance = "Reporting / documentation compliance is required.";

  // Community & Mentoring
  if (!f.communityEngagement || f.communityEngagement === "Select...") e.communityEngagement = "Community engagement participation is required.";
  if (!f.mentoringSessions.trim()) e.mentoringSessions = "Mentoring sessions conducted is required.";
  if (!f.awarenessprogrammes.trim()) e.awarenessprogrammes = "Awareness programmes conducted is required.";

  // FDP / ToT, Outcomes & Audit
  if (!f.fdpParticipation || f.fdpParticipation === "Select...") e.fdpParticipation = "FDP / ToT participation is required.";
  if (!f.certSuccessRate.trim()) e.certSuccessRate = "Certification success rate is required.";
  if (!f.learnerFeedbackScore.trim()) e.learnerFeedbackScore = "Learner feedback score is required.";
  if (!f.auditParticipation || f.auditParticipation === "Select...") e.auditParticipation = "Audit participation is required.";

  // Qualitative Fields
  if (!f.trainingMethodology.trim()) e.trainingMethodology = "Training methodology summary is required.";
  if (!f.learnerChallenges.trim()) e.learnerChallenges = "Common learner challenges observed is required.";
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
export default function GovernmentTrainerFacilitatorProfilePage() {
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
    activeLearnersCount: "",
    sessionCompletion: "",
    attendancePercentage: "",
    assessmentPass: "",
    practicalSessions: "",
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
    certSuccessRate: "",
    learnerFeedbackScore: "",
    auditParticipation: "",
    auditDocument: "",
    trainingMethodology: "",
    learnerChallenges: "",
    improvementAreas: "",
    trainerConfirmation: "",
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
          <div className="avatar">GF</div>
          <h3>Govt. Facilitator</h3>
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
        <h1>Government Trainer / Facilitator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoColumns">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. trainer@gov.in"
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
                placeholder="e.g. Public Administration, Health, Education"
                value={form.domainExpertise}
                onChange={(e) => set("domainExpertise", e.target.value)}
              />
              <FieldError msg={errors.domainExpertise} />
            </div>

            <div className={cls("trainingExpYears")}>
              <label>TRAINING EXPERIENCE YEARS *</label>
              <input
                type="number"
                placeholder="e.g. 6"
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
              <label>INDUSTRY / GOVERNMENT SECTOR EXPERIENCE YEARS *</label>
              <input
                type="number"
                placeholder="e.g. 10"
                value={form.sectorExpYears}
                onChange={(e) => set("sectorExpYears", e.target.value)}
              />
              <FieldError msg={errors.sectorExpYears} />
            </div>

            <div className={cls("batchesHandled")}>
              <label>BATCHES / PROGRAMMES HANDLED COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 18"
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
            <div className={cls("activeLearnersCount")}>
              <label>ACTIVE LEARNERS COUNT *</label>
              <input type="number" placeholder="e.g. 150" value={form.activeLearnersCount} onChange={(e) => set("activeLearnersCount", e.target.value)} />
              <FieldError msg={errors.activeLearnersCount} />
            </div>

            <div className={cls("sessionCompletion")}>
              <label>SESSION COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 94" value={form.sessionCompletion} onChange={(e) => set("sessionCompletion", e.target.value)} />
              <FieldError msg={errors.sessionCompletion} />
            </div>

            <div className={cls("attendancePercentage")}>
              <label>ATTENDANCE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 89" value={form.attendancePercentage} onChange={(e) => set("attendancePercentage", e.target.value)} />
              <FieldError msg={errors.attendancePercentage} />
            </div>

            <div className={cls("assessmentPass")}>
              <label>ASSESSMENT PASS PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 82" value={form.assessmentPass} onChange={(e) => set("assessmentPass", e.target.value)} />
              <FieldError msg={errors.assessmentPass} />
            </div>

            <div className={cls("practicalSessions")}>
              <label>PRACTICAL / ACTIVITY SESSIONS CONDUCTED *</label>
              <input type="number" placeholder="e.g. 24" value={form.practicalSessions} onChange={(e) => set("practicalSessions", e.target.value)} />
              <FieldError msg={errors.practicalSessions} />
            </div>

            <div className={cls("lmsUsage")}>
              <label>LMS USAGE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 86" value={form.lmsUsage} onChange={(e) => set("lmsUsage", e.target.value)} />
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
              <input type="number" placeholder="e.g. 32" value={form.digitalContentCount} onChange={(e) => set("digitalContentCount", e.target.value)} />
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

        {/* ── COMMUNITY & MENTORING ── */}
        <section className="sectionCard">
          <h2>COMMUNITY & MENTORING</h2>

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
              <input type="number" placeholder="e.g. 20" value={form.mentoringSessions} onChange={(e) => set("mentoringSessions", e.target.value)} />
              <FieldError msg={errors.mentoringSessions} />
            </div>

            <div className={cls("awarenessprogrammes")}>
              <label>AWARENESS PROGRAMMES CONDUCTED *</label>
              <input type="number" placeholder="e.g. 8" value={form.awarenessprogrammes} onChange={(e) => set("awarenessprogrammes", e.target.value)} />
              <FieldError msg={errors.awarenessprogrammes} />
            </div>
          </div>
        </section>

        {/* ── FDP / ToT, OUTCOMES & AUDIT ── */}
        <section className="sectionCard">
          <h2>FDP / ToT, OUTCOMES & AUDIT</h2>

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

          <div className="formGrid twoColumns">
            <div className={cls("certSuccessRate")}>
              <label>CERTIFICATION SUCCESS RATE *</label>
              <input type="number" placeholder="e.g. 78" value={form.certSuccessRate} onChange={(e) => set("certSuccessRate", e.target.value)} />
              <FieldError msg={errors.certSuccessRate} />
            </div>

            <div className={cls("learnerFeedbackScore")}>
              <label>LEARNER FEEDBACK SCORE *</label>
              <input type="number" placeholder="e.g. 4.4 / 5" value={form.learnerFeedbackScore} onChange={(e) => set("learnerFeedbackScore", e.target.value)} />
              <FieldError msg={errors.learnerFeedbackScore} />
            </div>
          </div>

          <div className="inlineGroup">
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

            <div className="field">
              <label>UPLOAD AUDIT DOCUMENT</label>
              <FileUpload id="upload-audit-doc" field="auditDocument" fileName={form.auditDocument} setForm={setForm} />
            </div>
          </div>
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.trainingMethodology ? " fieldHasError" : ""}`}>
            <label>TRAINING METHODOLOGY SUMMARY *</label>
            <textarea
              placeholder="Describe delivery methods, activities, demonstrations, learner engagement, and facilitation style..."
              value={form.trainingMethodology}
              onChange={(e) => set("trainingMethodology", e.target.value)}
            />
            <FieldError msg={errors.trainingMethodology} />
          </div>

          <div className={`field fullWidth${errors.learnerChallenges ? " fieldHasError" : ""}`}>
            <label>COMMON LEARNER CHALLENGES OBSERVED *</label>
            <textarea
              placeholder="Mention common learning, participation, digital, language, or field-level challenges observed..."
              value={form.learnerChallenges}
              onChange={(e) => set("learnerChallenges", e.target.value)}
            />
            <FieldError msg={errors.learnerChallenges} />
          </div>

          <div className={`field fullWidth${errors.improvementAreas ? " fieldHasError" : ""}`}>
            <label>IMPROVEMENT AREAS IDENTIFIED *</label>
            <textarea
              placeholder="Mention improvements needed in content, assessment, field practice, mentoring, LMS usage, or learner support..."
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
