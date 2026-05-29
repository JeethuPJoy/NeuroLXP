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
  // Certification Details
  sscStatus: string;
  sscCertificate: string;
  totStatus: string;
  totCertificate: string;
  certifiedJobRoles: string;
  jobRoleCertProof: string;
  // Experience & Batch Load
  industryExp: string;
  trainingExp: string;
  batchesHandled: string;
  activeTrainees: string;
  trainingHours: string;
  // Training Delivery Performance
  sessionCompletion: string;
  attendancePercentage: string;
  assessmentPass: string;
  practicalSessionCount: string;
  remedialSessions: string;
  traineeFeedbackScore: string;
  // Project, OJT & Mentoring
  ojtInvolvement: string;
  ojtProof: string;
  mentoringessions: string;
  mockInterviewParticipation: string;
  placementSupportInvolvement: string;
  // LMS & Digital Content
  lmsUsage: string;
  digitalContentCount: string;
  questionPapersCreated: string;
  questionPaperSamples: string;
  digitalContentSample: string;
  digitalContentSampleFile: string;
  // Certification & Placement Outcomes
  certSuccessRate: string;
  placementConversionRate: string;
  placementOutcomeDoc: string;
  placementProof: string;
  // Audit & Development
  auditParticipation: string;
  auditDocument: string;
  fdpParticipation: string;
  fdpProof: string;
  // Confirmation
  trainerConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  sscStatus?: string;
  totStatus?: string;
  certifiedJobRoles?: string;
  industryExp?: string;
  trainingExp?: string;
  batchesHandled?: string;
  activeTrainees?: string;
  trainingHours?: string;
  sessionCompletion?: string;
  attendancePercentage?: string;
  assessmentPass?: string;
  practicalSessionCount?: string;
  remedialSessions?: string;
  traineeFeedbackScore?: string;
  ojtInvolvement?: string;
  mentoringessions?: string;
  mockInterviewParticipation?: string;
  placementSupportInvolvement?: string;
  lmsUsage?: string;
  digitalContentCount?: string;
  questionPapersCreated?: string;
  certSuccessRate?: string;
  placementConversionRate?: string;
  auditParticipation?: string;
  fdpParticipation?: string;
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

  // Certification Details
  if (!f.sscStatus || f.sscStatus === "Select...") e.sscStatus = "SSC certification status is required.";
  if (!f.totStatus || f.totStatus === "Select...") e.totStatus = "ToT certification status is required.";
  if (!f.certifiedJobRoles.trim()) e.certifiedJobRoles = "Certified job roles is required.";

  // Experience & Batch Load
  if (!f.industryExp.trim()) e.industryExp = "Industry experience is required.";
  if (!f.trainingExp.trim()) e.trainingExp = "Training experience is required.";
  if (!f.batchesHandled.trim()) e.batchesHandled = "Batches handled count is required.";
  if (!f.activeTrainees.trim()) e.activeTrainees = "Active trainees count is required.";
  if (!f.trainingHours.trim()) e.trainingHours = "Training hours delivered is required.";

  // Training Delivery Performance
  if (!f.sessionCompletion.trim()) e.sessionCompletion = "Session completion % is required.";
  if (!f.attendancePercentage.trim()) e.attendancePercentage = "Attendance % is required.";
  if (!f.assessmentPass.trim()) e.assessmentPass = "Assessment pass % is required.";
  if (!f.practicalSessionCount.trim()) e.practicalSessionCount = "Practical session count is required.";
  if (!f.remedialSessions.trim()) e.remedialSessions = "Remedial sessions count is required.";
  if (!f.traineeFeedbackScore.trim()) e.traineeFeedbackScore = "Trainee feedback score is required.";

  // Project, OJT & Mentoring
  if (!f.ojtInvolvement || f.ojtInvolvement === "Select...") e.ojtInvolvement = "OJT involvement is required.";
  if (!f.mentoringessions.trim()) e.mentoringessions = "Mentoring sessions count is required.";
  if (!f.mockInterviewParticipation || f.mockInterviewParticipation === "Select...") e.mockInterviewParticipation = "Mock interview participation is required.";
  if (!f.placementSupportInvolvement || f.placementSupportInvolvement === "Select...") e.placementSupportInvolvement = "Placement support involvement is required.";

  // LMS & Digital Content
  if (!f.lmsUsage.trim()) e.lmsUsage = "LMS usage % is required.";
  if (!f.digitalContentCount.trim()) e.digitalContentCount = "Digital content count is required.";
  if (!f.questionPapersCreated.trim()) e.questionPapersCreated = "Question papers created count is required.";

  // Certification & Placement Outcomes
  if (!f.certSuccessRate.trim()) e.certSuccessRate = "Certification success rate is required.";
  if (!f.placementConversionRate.trim()) e.placementConversionRate = "Placement conversion rate is required.";

  // Audit & Development
  if (!f.auditParticipation || f.auditParticipation === "Select...") e.auditParticipation = "Audit participation is required.";
  if (!f.fdpParticipation || f.fdpParticipation === "Select...") e.fdpParticipation = "FDP / ToT participation is required.";

  // Confirmation
  if (!f.trainerConfirmation || f.trainerConfirmation === "Select...") e.trainerConfirmation = "Trainer confirmation is required.";

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
export default function SkillAcademyTrainerProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    sscStatus: "",
    sscCertificate: "",
    totStatus: "",
    totCertificate: "",
    certifiedJobRoles: "",
    jobRoleCertProof: "",
    industryExp: "",
    trainingExp: "",
    batchesHandled: "",
    activeTrainees: "",
    trainingHours: "",
    sessionCompletion: "",
    attendancePercentage: "",
    assessmentPass: "",
    practicalSessionCount: "",
    remedialSessions: "",
    traineeFeedbackScore: "",
    ojtInvolvement: "",
    ojtProof: "",
    mentoringessions: "",
    mockInterviewParticipation: "",
    placementSupportInvolvement: "",
    lmsUsage: "",
    digitalContentCount: "",
    questionPapersCreated: "",
    questionPaperSamples: "",
    digitalContentSample: "",
    digitalContentSampleFile: "",
    certSuccessRate: "",
    placementConversionRate: "",
    placementOutcomeDoc: "",
    placementProof: "",
    auditParticipation: "",
    auditDocument: "",
    fdpParticipation: "",
    fdpProof: "",
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
          <div className="avatar">TR</div>
          <h3>Trainer Profile</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" className="active" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>Skill Academy Trainer Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. trainer@example.com"
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

        {/* ── CERTIFICATION DETAILS ── */}
        <section className="sectionCard">
          <h2>CERTIFICATION DETAILS</h2>

          <div className="inlineGroup">
            <div className={cls("sscStatus")}>
              <label>SSC CERTIFICATION STATUS *</label>
              <select value={form.sscStatus} onChange={(e) => set("sscStatus", e.target.value)}>
                <option>Select...</option>
                <option>Certified</option>
                <option>Not Certified</option>
                <option>Certification In Progress</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.sscStatus} />
            </div>

            <div className="field">
              <label>UPLOAD SSC CERTIFICATE</label>
              <FileUpload id="upload-ssc-cert" field="sscCertificate" fileName={form.sscCertificate} setForm={setForm} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("totStatus")}>
              <label>ToT CERTIFICATION STATUS *</label>
              <select value={form.totStatus} onChange={(e) => set("totStatus", e.target.value)}>
                <option>Select...</option>
                <option>Certified</option>
                <option>Not Certified</option>
                <option>Certification In Progress</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.totStatus} />
            </div>

            <div className="field">
              <label>UPLOAD ToT CERTIFICATE</label>
              <FileUpload id="upload-tot-cert" field="totCertificate" fileName={form.totCertificate} setForm={setForm} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("certifiedJobRoles")}>
              <label>CERTIFIED JOB ROLES *</label>
              <input
                placeholder="e.g. Electrician, Python Trainer, Retail Associate"
                value={form.certifiedJobRoles}
                onChange={(e) => set("certifiedJobRoles", e.target.value)}
              />
              <FieldError msg={errors.certifiedJobRoles} />
            </div>

            <div className="field">
              <label>UPLOAD JOB ROLE CERTIFICATION PROOF</label>
              <FileUpload id="upload-jobrole-proof" field="jobRoleCertProof" fileName={form.jobRoleCertProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE & BATCH LOAD ── */}
        <section className="sectionCard">
          <h2>EXPERIENCE & BATCH LOAD</h2>

          <div className="formGrid">
            <div className={cls("industryExp")}>
              <label>INDUSTRY EXPERIENCE YEARS *</label>
              <input type="number" placeholder="e.g. 8" value={form.industryExp} onChange={(e) => set("industryExp", e.target.value)} />
              <FieldError msg={errors.industryExp} />
            </div>

            <div className={cls("trainingExp")}>
              <label>TRAINING EXPERIENCE YEARS *</label>
              <input type="number" placeholder="e.g. 5" value={form.trainingExp} onChange={(e) => set("trainingExp", e.target.value)} />
              <FieldError msg={errors.trainingExp} />
            </div>

            <div className={cls("batchesHandled")}>
              <label>BATCHES HANDLED COUNT *</label>
              <input type="number" placeholder="e.g. 12" value={form.batchesHandled} onChange={(e) => set("batchesHandled", e.target.value)} />
              <FieldError msg={errors.batchesHandled} />
            </div>

            <div className={cls("activeTrainees")}>
              <label>ACTIVE TRAINEES COUNT *</label>
              <input type="number" placeholder="e.g. 120" value={form.activeTrainees} onChange={(e) => set("activeTrainees", e.target.value)} />
              <FieldError msg={errors.activeTrainees} />
            </div>

            <div className={cls("trainingHours")}>
              <label>TRAINING HOURS DELIVERED *</label>
              <input type="number" placeholder="e.g. 240" value={form.trainingHours} onChange={(e) => set("trainingHours", e.target.value)} />
              <FieldError msg={errors.trainingHours} />
            </div>
          </div>
        </section>

        {/* ── TRAINING DELIVERY PERFORMANCE ── */}
        <section className="sectionCard">
          <h2>TRAINING DELIVERY PERFORMANCE</h2>

          <div className="formGrid">
            <div className={cls("sessionCompletion")}>
              <label>SESSION COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 92" value={form.sessionCompletion} onChange={(e) => set("sessionCompletion", e.target.value)} />
              <FieldError msg={errors.sessionCompletion} />
            </div>

            <div className={cls("attendancePercentage")}>
              <label>ATTENDANCE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 88" value={form.attendancePercentage} onChange={(e) => set("attendancePercentage", e.target.value)} />
              <FieldError msg={errors.attendancePercentage} />
            </div>

            <div className={cls("assessmentPass")}>
              <label>ASSESSMENT PASS PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 76" value={form.assessmentPass} onChange={(e) => set("assessmentPass", e.target.value)} />
              <FieldError msg={errors.assessmentPass} />
            </div>

            <div className={cls("practicalSessionCount")}>
              <label>PRACTICAL SESSION COUNT *</label>
              <input type="number" placeholder="e.g. 35" value={form.practicalSessionCount} onChange={(e) => set("practicalSessionCount", e.target.value)} />
              <FieldError msg={errors.practicalSessionCount} />
            </div>

            <div className={cls("remedialSessions")}>
              <label>REMEDIAL SESSIONS CONDUCTED *</label>
              <input type="number" placeholder="e.g. 8" value={form.remedialSessions} onChange={(e) => set("remedialSessions", e.target.value)} />
              <FieldError msg={errors.remedialSessions} />
            </div>

            <div className={cls("traineeFeedbackScore")}>
              <label>TRAINEE FEEDBACK SCORE *</label>
              <input type="number" placeholder="e.g. 4.5 / 5" value={form.traineeFeedbackScore} onChange={(e) => set("traineeFeedbackScore", e.target.value)} />
              <FieldError msg={errors.traineeFeedbackScore} />
            </div>
          </div>
        </section>

        {/* ── PROJECT, OJT & MENTORING ── */}
        <section className="sectionCard">
          <h2>PROJECT, OJT & MENTORING</h2>

          <div className="inlineGroup">
            <div className={cls("ojtInvolvement")}>
              <label>OJT / PROJECT GUIDANCE INVOLVEMENT *</label>
              <select value={form.ojtInvolvement} onChange={(e) => set("ojtInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Partial</option>
              </select>
              <FieldError msg={errors.ojtInvolvement} />
            </div>

            <div className="field">
              <label>UPLOAD OJT / PROJECT PROOF</label>
              <FileUpload id="upload-ojt-proof" field="ojtProof" fileName={form.ojtProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("mentoringessions")}>
              <label>CANDIDATE MENTORING SESSIONS *</label>
              <input type="number" placeholder="e.g. 20" value={form.mentoringessions} onChange={(e) => set("mentoringessions", e.target.value)} />
              <FieldError msg={errors.mentoringessions} />
            </div>

            <div className={cls("mockInterviewParticipation")}>
              <label>MOCK INTERVIEW PARTICIPATION *</label>
              <select value={form.mockInterviewParticipation} onChange={(e) => set("mockInterviewParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Not Participated</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.mockInterviewParticipation} />
            </div>

            <div className={cls("placementSupportInvolvement")}>
              <label>PLACEMENT SUPPORT INVOLVEMENT *</label>
              <select value={form.placementSupportInvolvement} onChange={(e) => set("placementSupportInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Resume Support</option>
                <option>Mock Interviews</option>
                <option>Employer Coordination</option>
                <option>Placement Follow-up</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.placementSupportInvolvement} />
            </div>
          </div>
        </section>

        {/* ── LMS & DIGITAL CONTENT ── */}
        <section className="sectionCard">
          <h2>LMS & DIGITAL CONTENT</h2>

          <div className="formGrid">
            <div className={cls("lmsUsage")}>
              <label>LMS USAGE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 85" value={form.lmsUsage} onChange={(e) => set("lmsUsage", e.target.value)} />
              <FieldError msg={errors.lmsUsage} />
            </div>

            <div className={cls("digitalContentCount")}>
              <label>DIGITAL CONTENT UPLOADED COUNT *</label>
              <input type="number" placeholder="e.g. 30" value={form.digitalContentCount} onChange={(e) => set("digitalContentCount", e.target.value)} />
              <FieldError msg={errors.digitalContentCount} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("questionPapersCreated")}>
              <label>ASSESSMENT / QUESTION PAPERS CREATED *</label>
              <input type="number" placeholder="e.g. 15" value={form.questionPapersCreated} onChange={(e) => set("questionPapersCreated", e.target.value)} />
              <FieldError msg={errors.questionPapersCreated} />
            </div>

            <div className="field">
              <label>UPLOAD QUESTION PAPER SAMPLES</label>
              <FileUpload id="upload-qpaper-samples" field="questionPaperSamples" fileName={form.questionPaperSamples} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>DIGITAL CONTENT SAMPLE</label>
              <input
                placeholder="e.g. PPT, PDF, video, assignment"
                value={form.digitalContentSample}
                onChange={(e) => set("digitalContentSample", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD DIGITAL CONTENT SAMPLE</label>
              <FileUpload id="upload-digital-content" field="digitalContentSampleFile" fileName={form.digitalContentSampleFile} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── CERTIFICATION & PLACEMENT OUTCOMES ── */}
        <section className="sectionCard">
          <h2>CERTIFICATION & PLACEMENT OUTCOMES</h2>

          <div className="formGrid">
            <div className={cls("certSuccessRate")}>
              <label>CERTIFICATION SUCCESS RATE *</label>
              <input type="number" placeholder="e.g. 72" value={form.certSuccessRate} onChange={(e) => set("certSuccessRate", e.target.value)} />
              <FieldError msg={errors.certSuccessRate} />
            </div>

            <div className={cls("placementConversionRate")}>
              <label>PLACEMENT CONVERSION RATE *</label>
              <input type="number" placeholder="e.g. 64" value={form.placementConversionRate} onChange={(e) => set("placementConversionRate", e.target.value)} />
              <FieldError msg={errors.placementConversionRate} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>PLACEMENT OUTCOME DOCUMENT</label>
              <input
                placeholder="e.g. Placement report, conversion summary"
                value={form.placementOutcomeDoc}
                onChange={(e) => set("placementOutcomeDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD PLACEMENT PROOF</label>
              <FileUpload id="upload-placement-proof" field="placementProof" fileName={form.placementProof} setForm={setForm} />
            </div>
          </div>
        </section>

        {/* ── AUDIT & DEVELOPMENT PARTICIPATION ── */}
        <section className="sectionCard">
          <h2>AUDIT & DEVELOPMENT PARTICIPATION</h2>

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
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={cls("trainerConfirmation")}>
              <label>TRAINER CONFIRMATION *</label>
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
