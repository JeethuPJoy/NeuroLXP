"use client";

import { useState } from "react";
import "./profile.css";

// ─── Constants ───────────────────────────────────────────────
const MAX_FILE_SIZE = 10 * 1024; // 10 KB

// ─── Types ───────────────────────────────────────────────────
interface FormState {
  email: string;
  phone: string;
  domainExpertise: string;
  trainerType: string;
  certifiedStatus: string;
  certificationProof: string;
  industryExp: string;
  trainingExp: string;
  batchesHandled: string;
  activeLearnersCount: string;
  sessionCompletion: string;
  attendancePercentage: string;
  assessmentPass: string;
  lmsUsage: string;
  digitalContentCount: string;
  learningMaterialContributions: string;
  learningMaterial: string;
  mentoringsessions: string;
  certSuccessRate: string;
  webinarParticipation: string;
  webinarProof: string;
  skillAssessmentInvolvement: string;
  feedbackScore: string;
  auditParticipation: string;
  auditDocument: string;
  fdpParticipation: string;
  fdpCertificate: string;
  trainingMethodology: string;
  skillGapsObserved: string;
  improvementRecommendations: string;
  trainerConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  domainExpertise?: string;
  trainerType?: string;
  certifiedStatus?: string;
  industryExp?: string;
  trainingExp?: string;
  batchesHandled?: string;
  activeLearnersCount?: string;
  sessionCompletion?: string;
  attendancePercentage?: string;
  assessmentPass?: string;
  lmsUsage?: string;
  digitalContentCount?: string;
  learningMaterialContributions?: string;
  mentoringessions?: string;
  certSuccessRate?: string;
  webinarParticipation?: string;
  skillAssessmentInvolvement?: string;
  feedbackScore?: string;
  auditParticipation?: string;
  fdpParticipation?: string;
  trainingMethodology?: string;
  skillGapsObserved?: string;
  improvementRecommendations?: string;
  trainerConfirmation?: string;
}

// ─── Validation ───────────────────────────────────────────────
function validateForm(form: FormState): FormErrors {
  const e: FormErrors = {};

  // Email
  if (!form.email.trim()) {
    e.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    e.email = "Enter a valid email address.";
  }

  // Phone
  if (!form.phone.trim()) {
    e.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
    e.phone = "Enter a valid 10-digit Indian mobile number.";
  }

  // Required text / select fields
  if (!form.domainExpertise.trim()) e.domainExpertise = "Domain expertise is required.";
  if (!form.trainerType || form.trainerType === "Select...") e.trainerType = "Trainer type is required.";
  if (!form.certifiedStatus || form.certifiedStatus === "Select...") e.certifiedStatus = "Certified trainer status is required.";
  if (!form.industryExp.trim()) e.industryExp = "Industry experience is required.";
  if (!form.trainingExp.trim()) e.trainingExp = "Training experience is required.";
  if (!form.batchesHandled.trim()) e.batchesHandled = "Batches handled count is required.";
  if (!form.activeLearnersCount.trim()) e.activeLearnersCount = "Active learners count is required.";
  if (!form.sessionCompletion.trim()) e.sessionCompletion = "Session completion % is required.";
  if (!form.attendancePercentage.trim()) e.attendancePercentage = "Attendance % is required.";
  if (!form.assessmentPass.trim()) e.assessmentPass = "Assessment pass % is required.";
  if (!form.lmsUsage.trim()) e.lmsUsage = "LMS usage % is required.";
  if (!form.digitalContentCount.trim()) e.digitalContentCount = "Digital content count is required.";
  if (!form.learningMaterialContributions.trim()) e.learningMaterialContributions = "Learning material contributions is required.";
  if (!form.mentoringessions || !form.mentoringessions.trim()) e.mentoringessions = "Mentoring sessions is required.";
  if (!form.certSuccessRate.trim()) e.certSuccessRate = "Certification success rate is required.";
  if (!form.webinarParticipation || form.webinarParticipation === "Select...") e.webinarParticipation = "Webinar participation is required.";
  if (!form.skillAssessmentInvolvement || form.skillAssessmentInvolvement === "Select...") e.skillAssessmentInvolvement = "Skill assessment involvement is required.";
  if (!form.feedbackScore.trim()) e.feedbackScore = "Feedback score is required.";
  if (!form.auditParticipation || form.auditParticipation === "Select...") e.auditParticipation = "Audit participation is required.";
  if (!form.fdpParticipation || form.fdpParticipation === "Select...") e.fdpParticipation = "FDP / ToT participation is required.";
  if (!form.trainingMethodology.trim()) e.trainingMethodology = "Training methodology summary is required.";
  if (!form.skillGapsObserved.trim()) e.skillGapsObserved = "Skill gaps observed is required.";
  if (!form.improvementRecommendations.trim()) e.improvementRecommendations = "Improvement recommendations is required.";
  if (!form.trainerConfirmation || form.trainerConfirmation === "Select...") e.trainerConfirmation = "Trainer confirmation is required.";

  return e;
}

// ─── File upload handler factory ─────────────────────────────
function makeFileHandler(
  fieldName: keyof FormState,
  setForm: React.Dispatch<React.SetStateAction<FormState>>,
  multiple = false
) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (multiple) {
      const oversized = Array.from(files).find((f) => f.size > MAX_FILE_SIZE);
      if (oversized) {
        alert(`"${oversized.name}" exceeds 10 KB. Please upload a smaller file.`);
        e.target.value = "";
        return;
      }
      const names = Array.from(files).map((f) => f.name).join(", ");
      setForm((prev) => ({ ...prev, [fieldName]: names }));
    } else {
      const file = files[0];
      if (file.size > MAX_FILE_SIZE) {
        alert(`"${file.name}" exceeds 10 KB. Please upload a smaller file.`);
        e.target.value = "";
        return;
      }
      setForm((prev) => ({ ...prev, [fieldName]: file.name }));
    }
  };
}

// ─── Small helper components ──────────────────────────────────
function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="fieldError">{msg}</span>;
}

function FileUpload({
  id,
  fieldName,
  fileName,
  setForm,
  multiple = false,
}: {
  id: string;
  fieldName: keyof FormState;
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
        onChange={makeFileHandler(fieldName, setForm, multiple)}
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
export default function SkillAcademyProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    domainExpertise: "",
    trainerType: "",
    certifiedStatus: "",
    certificationProof: "",
    industryExp: "",
    trainingExp: "",
    batchesHandled: "",
    activeLearnersCount: "",
    sessionCompletion: "",
    attendancePercentage: "",
    assessmentPass: "",
    lmsUsage: "",
    digitalContentCount: "",
    learningMaterialContributions: "",
    learningMaterial: "",
    mentoringessions: "",
    certSuccessRate: "",
    webinarParticipation: "",
    webinarProof: "",
    skillAssessmentInvolvement: "",
    feedbackScore: "",
    auditParticipation: "",
    auditDocument: "",
    fdpParticipation: "",
    fdpCertificate: "",
    trainingMethodology: "",
    skillGapsObserved: "",
    improvementRecommendations: "",
    trainerConfirmation: "",
    supportingDocuments: "",
  });

  const errors: FormErrors = submitted ? validateForm(form) : {};

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    // API call would go here
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
          <div className="avatar">JA</div>
          <h3>Jeethu Aben</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>
            Colleges / Universities
          </button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>
            Corporate
          </button>
          <button type="button" className="active" onClick={() => handleTenantClick("Skill Academy")}>
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
        <h1>Trainer Profile</h1>

        {/* ── CONTACT FIELDS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid">
            <div className={`field${errors.email ? " fieldHasError" : ""}`}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. trainer@example.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
              <FieldError msg={errors.email} />
            </div>

            <div className={`field${errors.phone ? " fieldHasError" : ""}`}>
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

        {/* ── OBJECTIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>OBJECTIVE FIELDS</h2>

          <div className="formGrid">
            <div className={`field${errors.domainExpertise ? " fieldHasError" : ""}`}>
              <label>DOMAIN EXPERTISE *</label>
              <input
                placeholder="e.g. Electrical, IT, Healthcare"
                value={form.domainExpertise}
                onChange={(e) => set("domainExpertise", e.target.value)}
              />
              <FieldError msg={errors.domainExpertise} />
            </div>

            <div className={`field${errors.trainerType ? " fieldHasError" : ""}`}>
              <label>INTERNAL / EXTERNAL TRAINER TYPE *</label>
              <select value={form.trainerType} onChange={(e) => set("trainerType", e.target.value)}>
                <option>Select...</option>
                <option>Internal Trainer</option>
                <option>External Trainer</option>
                <option>Guest Trainer</option>
                <option>Industry Trainer</option>
              </select>
              <FieldError msg={errors.trainerType} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={`field${errors.certifiedStatus ? " fieldHasError" : ""}`}>
              <label>CERTIFIED TRAINER STATUS *</label>
              <select value={form.certifiedStatus} onChange={(e) => set("certifiedStatus", e.target.value)}>
                <option>Select...</option>
                <option>Certified</option>
                <option>Not Certified</option>
                <option>Certification In Progress</option>
              </select>
              <FieldError msg={errors.certifiedStatus} />
            </div>

            <div className="field">
              <label>UPLOAD CERTIFICATION PROOF</label>
              <FileUpload
                id="upload-cert-proof"
                fieldName="certificationProof"
                fileName={form.certificationProof}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="formGrid">
            <div className={`field${errors.industryExp ? " fieldHasError" : ""}`}>
              <label>INDUSTRY EXPERIENCE YEARS *</label>
              <input type="number" placeholder="e.g. 8" value={form.industryExp} onChange={(e) => set("industryExp", e.target.value)} />
              <FieldError msg={errors.industryExp} />
            </div>

            <div className={`field${errors.trainingExp ? " fieldHasError" : ""}`}>
              <label>TRAINING EXPERIENCE YEARS *</label>
              <input type="number" placeholder="e.g. 5" value={form.trainingExp} onChange={(e) => set("trainingExp", e.target.value)} />
              <FieldError msg={errors.trainingExp} />
            </div>

            <div className={`field${errors.batchesHandled ? " fieldHasError" : ""}`}>
              <label>BATCHES / PROGRAMMES HANDLED COUNT *</label>
              <input type="number" placeholder="e.g. 12" value={form.batchesHandled} onChange={(e) => set("batchesHandled", e.target.value)} />
              <FieldError msg={errors.batchesHandled} />
            </div>
          </div>

          <div className="formGrid">
            <div className={`field${errors.activeLearnersCount ? " fieldHasError" : ""}`}>
              <label>ACTIVE LEARNERS COUNT *</label>
              <input type="number" placeholder="e.g. 120" value={form.activeLearnersCount} onChange={(e) => set("activeLearnersCount", e.target.value)} />
              <FieldError msg={errors.activeLearnersCount} />
            </div>

            <div className={`field${errors.sessionCompletion ? " fieldHasError" : ""}`}>
              <label>SESSION COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 92" value={form.sessionCompletion} onChange={(e) => set("sessionCompletion", e.target.value)} />
              <FieldError msg={errors.sessionCompletion} />
            </div>

            <div className={`field${errors.attendancePercentage ? " fieldHasError" : ""}`}>
              <label>ATTENDANCE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 88" value={form.attendancePercentage} onChange={(e) => set("attendancePercentage", e.target.value)} />
              <FieldError msg={errors.attendancePercentage} />
            </div>
          </div>

          <div className="formGrid">
            <div className={`field${errors.assessmentPass ? " fieldHasError" : ""}`}>
              <label>ASSESSMENT PASS PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 76" value={form.assessmentPass} onChange={(e) => set("assessmentPass", e.target.value)} />
              <FieldError msg={errors.assessmentPass} />
            </div>

            <div className={`field${errors.lmsUsage ? " fieldHasError" : ""}`}>
              <label>LMS USAGE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 85" value={form.lmsUsage} onChange={(e) => set("lmsUsage", e.target.value)} />
              <FieldError msg={errors.lmsUsage} />
            </div>

            <div className={`field${errors.digitalContentCount ? " fieldHasError" : ""}`}>
              <label>DIGITAL CONTENT UPLOADED COUNT *</label>
              <input type="number" placeholder="e.g. 30" value={form.digitalContentCount} onChange={(e) => set("digitalContentCount", e.target.value)} />
              <FieldError msg={errors.digitalContentCount} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={`field${errors.learningMaterialContributions ? " fieldHasError" : ""}`}>
              <label>LEARNING MATERIAL CONTRIBUTIONS *</label>
              <input placeholder="e.g. Notes, Videos, Assignments" value={form.learningMaterialContributions} onChange={(e) => set("learningMaterialContributions", e.target.value)} />
              <FieldError msg={errors.learningMaterialContributions} />
            </div>

            <div className="field">
              <label>UPLOAD LEARNING MATERIAL</label>
              <FileUpload
                id="upload-learning-material"
                fieldName="learningMaterial"
                fileName={form.learningMaterial}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="formGrid">
            <div className={`field${errors.mentoringessions ? " fieldHasError" : ""}`}>
              <label>MENTORING / COACHING SESSIONS *</label>
              <input type="number" placeholder="e.g. 18" value={form.mentoringessions} onChange={(e) => set("mentoringessions", e.target.value)} />
              <FieldError msg={errors.mentoringessions} />
            </div>

            <div className={`field${errors.certSuccessRate ? " fieldHasError" : ""}`}>
              <label>CERTIFICATION SUCCESS RATE *</label>
              <input type="number" placeholder="e.g. 72" value={form.certSuccessRate} onChange={(e) => set("certSuccessRate", e.target.value)} />
              <FieldError msg={errors.certSuccessRate} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={`field${errors.webinarParticipation ? " fieldHasError" : ""}`}>
              <label>WEBINAR / WORKSHOP PARTICIPATION *</label>
              <select value={form.webinarParticipation} onChange={(e) => set("webinarParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              <FieldError msg={errors.webinarParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD WEBINAR PROOF</label>
              <FileUpload
                id="upload-webinar-proof"
                fieldName="webinarProof"
                fileName={form.webinarProof}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="formGrid">
            <div className={`field${errors.skillAssessmentInvolvement ? " fieldHasError" : ""}`}>
              <label>SKILL ASSESSMENT INVOLVEMENT *</label>
              <select value={form.skillAssessmentInvolvement} onChange={(e) => set("skillAssessmentInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Question Paper Creation</option>
                <option>Evaluation</option>
                <option>Practical Assessment</option>
                <option>Viva / Interview</option>
              </select>
              <FieldError msg={errors.skillAssessmentInvolvement} />
            </div>

            <div className={`field${errors.feedbackScore ? " fieldHasError" : ""}`}>
              <label>FEEDBACK SCORE *</label>
              <input type="number" placeholder="e.g. 4.5 / 5" value={form.feedbackScore} onChange={(e) => set("feedbackScore", e.target.value)} />
              <FieldError msg={errors.feedbackScore} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={`field${errors.auditParticipation ? " fieldHasError" : ""}`}>
              <label>AUDIT / COMPLIANCE PARTICIPATION *</label>
              <select value={form.auditParticipation} onChange={(e) => set("auditParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Not Participated</option>
              </select>
              <FieldError msg={errors.auditParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD AUDIT DOCUMENT</label>
              <FileUpload
                id="upload-audit-doc"
                fieldName="auditDocument"
                fileName={form.auditDocument}
                setForm={setForm}
              />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={`field${errors.fdpParticipation ? " fieldHasError" : ""}`}>
              <label>FDP / ToT PARTICIPATION *</label>
              <select value={form.fdpParticipation} onChange={(e) => set("fdpParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Not Completed</option>
              </select>
              <FieldError msg={errors.fdpParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD FDP / ToT CERTIFICATE</label>
              <FileUpload
                id="upload-fdp-cert"
                fieldName="fdpCertificate"
                fileName={form.fdpCertificate}
                setForm={setForm}
              />
            </div>
          </div>
        </section>

        {/* ── QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.trainingMethodology ? " fieldHasError" : ""}`}>
            <label>TRAINING METHODOLOGY SUMMARY *</label>
            <textarea
              placeholder="Describe the training methods, delivery style, learner engagement approach, and practical methodologies..."
              value={form.trainingMethodology}
              onChange={(e) => set("trainingMethodology", e.target.value)}
            />
            <FieldError msg={errors.trainingMethodology} />
          </div>

          <div className={`field fullWidth${errors.skillGapsObserved ? " fieldHasError" : ""}`}>
            <label>COMMON LEARNER SKILL GAPS OBSERVED *</label>
            <textarea
              placeholder="Mention common technical, communication, behavioural, or digital skill gaps observed among learners..."
              value={form.skillGapsObserved}
              onChange={(e) => set("skillGapsObserved", e.target.value)}
            />
            <FieldError msg={errors.skillGapsObserved} />
          </div>

          <div className={`field fullWidth${errors.improvementRecommendations ? " fieldHasError" : ""}`}>
            <label>IMPROVEMENT RECOMMENDATIONS *</label>
            <textarea
              placeholder="Provide recommendations for curriculum, mentoring, assessments, delivery methods, or learner improvement..."
              value={form.improvementRecommendations}
              onChange={(e) => set("improvementRecommendations", e.target.value)}
            />
            <FieldError msg={errors.improvementRecommendations} />
          </div>
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={`field${errors.trainerConfirmation ? " fieldHasError" : ""}`}>
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
              <FileUpload
                id="upload-supporting-docs"
                fieldName="supportingDocuments"
                fileName={form.supportingDocuments}
                setForm={setForm}
                multiple
              />
            </div>
          </div>
        </section>

        <div className="footerButtons">
          <button type="button" className={`saveBtn${saved ? " savedBtn" : ""}`} onClick={handleSave}>
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
