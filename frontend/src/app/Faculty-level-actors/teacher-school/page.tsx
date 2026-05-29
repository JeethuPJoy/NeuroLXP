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
  // Teaching Responsibility
  gradesHandled: string;
  subjectsHandled: string;
  boardCurriculum: string;
  classTeacherResponsibility: string;
  // Academic Delivery Performance
  attendancePercentage: string;
  lessonPlanCompletion: string;
  syllabusCompletion: string;
  assignmentCompletion: string;
  studentAssessmentCompletion: string;
  learningOutcomeImprovement: string;
  // LMS & Digital Content
  lmsUsage: string;
  digitalContentCount: string;
  digitalContentSampleText: string;
  digitalContentSampleFile: string;
  // Student Support & Mentoring
  remedialSessions: string;
  parentInteractionFrequency: string;
  studentMentoringSessions: string;
  // School Duties & Activities
  examDutyParticipation: string;
  examDutyDocument: string;
  coCurricularInvolvement: string;
  activityProof: string;
  // Training, Inclusion & Audit
  teacherTrainingFdp: string;
  trainingFdpProof: string;
  inclusiveEducationTraining: string;
  inclusiveEducationProof: string;
  studentFeedbackScore: string;
  auditParticipation: string;
  auditDocumentText: string;
  auditDocumentFile: string;
  // Qualitative Fields
  teachingMethodology: string;
  studentChallenges: string;
  improvementAreas: string;
  // Confirmation
  teacherConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  gradesHandled?: string;
  subjectsHandled?: string;
  boardCurriculum?: string;
  classTeacherResponsibility?: string;
  attendancePercentage?: string;
  lessonPlanCompletion?: string;
  syllabusCompletion?: string;
  assignmentCompletion?: string;
  studentAssessmentCompletion?: string;
  learningOutcomeImprovement?: string;
  lmsUsage?: string;
  digitalContentCount?: string;
  remedialSessions?: string;
  parentInteractionFrequency?: string;
  studentMentoringSessions?: string;
  examDutyParticipation?: string;
  coCurricularInvolvement?: string;
  teacherTrainingFdp?: string;
  inclusiveEducationTraining?: string;
  studentFeedbackScore?: string;
  auditParticipation?: string;
  teachingMethodology?: string;
  studentChallenges?: string;
  improvementAreas?: string;
  teacherConfirmation?: string;
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

  // Teaching Responsibility
  if (!f.gradesHandled.trim()) e.gradesHandled = "Grades handled is required.";
  if (!f.subjectsHandled.trim()) e.subjectsHandled = "Subjects handled is required.";
  if (!f.boardCurriculum || f.boardCurriculum === "Select...") e.boardCurriculum = "Board curriculum expertise is required.";
  if (!f.classTeacherResponsibility || f.classTeacherResponsibility === "Select...") e.classTeacherResponsibility = "Class teacher responsibility is required.";

  // Academic Delivery Performance
  if (!f.attendancePercentage.trim()) e.attendancePercentage = "Attendance % is required.";
  if (!f.lessonPlanCompletion.trim()) e.lessonPlanCompletion = "Lesson plan completion % is required.";
  if (!f.syllabusCompletion.trim()) e.syllabusCompletion = "Syllabus completion % is required.";
  if (!f.assignmentCompletion.trim()) e.assignmentCompletion = "Assignment / activity completion % is required.";
  if (!f.studentAssessmentCompletion.trim()) e.studentAssessmentCompletion = "Student assessment completion % is required.";
  if (!f.learningOutcomeImprovement.trim()) e.learningOutcomeImprovement = "Learning outcome improvement % is required.";

  // LMS & Digital Content
  if (!f.lmsUsage.trim()) e.lmsUsage = "LMS usage % is required.";
  if (!f.digitalContentCount.trim()) e.digitalContentCount = "Digital content uploaded count is required.";

  // Student Support & Mentoring
  if (!f.remedialSessions.trim()) e.remedialSessions = "Remedial sessions conducted is required.";
  if (!f.parentInteractionFrequency || f.parentInteractionFrequency === "Select...") e.parentInteractionFrequency = "Parent interaction frequency is required.";
  if (!f.studentMentoringSessions.trim()) e.studentMentoringSessions = "Student mentoring sessions conducted is required.";

  // School Duties & Activities
  if (!f.examDutyParticipation || f.examDutyParticipation === "Select...") e.examDutyParticipation = "Examination duty participation is required.";
  if (!f.coCurricularInvolvement || f.coCurricularInvolvement === "Select...") e.coCurricularInvolvement = "Co-curricular activity involvement is required.";

  // Training, Inclusion & Audit
  if (!f.teacherTrainingFdp || f.teacherTrainingFdp === "Select...") e.teacherTrainingFdp = "Teacher training / FDP participation is required.";
  if (!f.inclusiveEducationTraining || f.inclusiveEducationTraining === "Select...") e.inclusiveEducationTraining = "Inclusive education training participation is required.";
  if (!f.studentFeedbackScore.trim()) e.studentFeedbackScore = "Student feedback score is required.";
  if (!f.auditParticipation || f.auditParticipation === "Select...") e.auditParticipation = "Audit participation is required.";

  // Qualitative Fields
  if (!f.teachingMethodology.trim()) e.teachingMethodology = "Teaching methodology summary is required.";
  if (!f.studentChallenges.trim()) e.studentChallenges = "Common student learning challenges is required.";
  if (!f.improvementAreas.trim()) e.improvementAreas = "Improvement areas identified is required.";

  // Confirmation
  if (!f.teacherConfirmation || f.teacherConfirmation === "Select...") e.teacherConfirmation = "Teacher / faculty confirmation is required.";

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
export default function SchoolTeacherFacultyProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    gradesHandled: "",
    subjectsHandled: "",
    boardCurriculum: "",
    classTeacherResponsibility: "",
    attendancePercentage: "",
    lessonPlanCompletion: "",
    syllabusCompletion: "",
    assignmentCompletion: "",
    studentAssessmentCompletion: "",
    learningOutcomeImprovement: "",
    lmsUsage: "",
    digitalContentCount: "",
    digitalContentSampleText: "",
    digitalContentSampleFile: "",
    remedialSessions: "",
    parentInteractionFrequency: "",
    studentMentoringSessions: "",
    examDutyParticipation: "",
    examDutyDocument: "",
    coCurricularInvolvement: "",
    activityProof: "",
    teacherTrainingFdp: "",
    trainingFdpProof: "",
    inclusiveEducationTraining: "",
    inclusiveEducationProof: "",
    studentFeedbackScore: "",
    auditParticipation: "",
    auditDocumentText: "",
    auditDocumentFile: "",
    teachingMethodology: "",
    studentChallenges: "",
    improvementAreas: "",
    teacherConfirmation: "",
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
          <div className="avatar">TF</div>
          <h3>Teacher / Faculty</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" className="active" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>School Teacher / Faculty Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoColumns">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. teacher@school.edu"
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

        {/* ── TEACHING RESPONSIBILITY ── */}
        <section className="sectionCard">
          <h2>TEACHING RESPONSIBILITY</h2>

          <div className="formGrid twoColumns">
            <div className={cls("gradesHandled")}>
              <label>GRADES HANDLED *</label>
              <input
                placeholder="e.g. Grade 6, Grade 7, Grade 8"
                value={form.gradesHandled}
                onChange={(e) => set("gradesHandled", e.target.value)}
              />
              <FieldError msg={errors.gradesHandled} />
            </div>

            <div className={cls("subjectsHandled")}>
              <label>SUBJECTS HANDLED *</label>
              <input
                placeholder="e.g. Mathematics, Science"
                value={form.subjectsHandled}
                onChange={(e) => set("subjectsHandled", e.target.value)}
              />
              <FieldError msg={errors.subjectsHandled} />
            </div>
          </div>

          <div className="formGrid twoColumns">
            <div className={cls("boardCurriculum")}>
              <label>BOARD CURRICULUM EXPERTISE *</label>
              <select value={form.boardCurriculum} onChange={(e) => set("boardCurriculum", e.target.value)}>
                <option>Select...</option>
                <option>CBSE</option>
                <option>ICSE</option>
                <option>State Board</option>
                <option>IB</option>
                <option>Cambridge</option>
                <option>Multiple Boards</option>
              </select>
              <FieldError msg={errors.boardCurriculum} />
            </div>

            <div className={cls("classTeacherResponsibility")}>
              <label>CLASS TEACHER RESPONSIBILITY *</label>
              <select value={form.classTeacherResponsibility} onChange={(e) => set("classTeacherResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Yes</option>
                <option>No</option>
                <option>Shared Responsibility</option>
              </select>
              <FieldError msg={errors.classTeacherResponsibility} />
            </div>
          </div>
        </section>

        {/* ── ACADEMIC DELIVERY PERFORMANCE ── */}
        <section className="sectionCard">
          <h2>ACADEMIC DELIVERY PERFORMANCE</h2>

          <div className="formGrid">
            <div className={cls("attendancePercentage")}>
              <label>ATTENDANCE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 94" value={form.attendancePercentage} onChange={(e) => set("attendancePercentage", e.target.value)} />
              <FieldError msg={errors.attendancePercentage} />
            </div>

            <div className={cls("lessonPlanCompletion")}>
              <label>LESSON PLAN COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 90" value={form.lessonPlanCompletion} onChange={(e) => set("lessonPlanCompletion", e.target.value)} />
              <FieldError msg={errors.lessonPlanCompletion} />
            </div>

            <div className={cls("syllabusCompletion")}>
              <label>SYLLABUS COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 88" value={form.syllabusCompletion} onChange={(e) => set("syllabusCompletion", e.target.value)} />
              <FieldError msg={errors.syllabusCompletion} />
            </div>

            <div className={cls("assignmentCompletion")}>
              <label>ASSIGNMENT / ACTIVITY COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 86" value={form.assignmentCompletion} onChange={(e) => set("assignmentCompletion", e.target.value)} />
              <FieldError msg={errors.assignmentCompletion} />
            </div>

            <div className={cls("studentAssessmentCompletion")}>
              <label>STUDENT ASSESSMENT COMPLETION PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 92" value={form.studentAssessmentCompletion} onChange={(e) => set("studentAssessmentCompletion", e.target.value)} />
              <FieldError msg={errors.studentAssessmentCompletion} />
            </div>

            <div className={cls("learningOutcomeImprovement")}>
              <label>LEARNING OUTCOME IMPROVEMENT PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 18" value={form.learningOutcomeImprovement} onChange={(e) => set("learningOutcomeImprovement", e.target.value)} />
              <FieldError msg={errors.learningOutcomeImprovement} />
            </div>
          </div>
        </section>

        {/* ── LMS & DIGITAL CONTENT ── */}
        <section className="sectionCard">
          <h2>LMS & DIGITAL CONTENT</h2>

          <div className="formGrid twoColumns">
            <div className={cls("lmsUsage")}>
              <label>LMS USAGE PERCENTAGE *</label>
              <input type="number" placeholder="e.g. 82" value={form.lmsUsage} onChange={(e) => set("lmsUsage", e.target.value)} />
              <FieldError msg={errors.lmsUsage} />
            </div>

            <div className={cls("digitalContentCount")}>
              <label>DIGITAL CONTENT UPLOADED COUNT *</label>
              <input type="number" placeholder="e.g. 25" value={form.digitalContentCount} onChange={(e) => set("digitalContentCount", e.target.value)} />
              <FieldError msg={errors.digitalContentCount} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>DIGITAL CONTENT SAMPLE</label>
              <input
                placeholder="e.g. Worksheets, PPT, video lessons"
                value={form.digitalContentSampleText}
                onChange={(e) => set("digitalContentSampleText", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD DIGITAL CONTENT SAMPLE</label>
              <FileUpload id="upload-digital-sample" field="digitalContentSampleFile" fileName={form.digitalContentSampleFile} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── STUDENT SUPPORT & MENTORING ── */}
        <section className="sectionCard">
          <h2>STUDENT SUPPORT & MENTORING</h2>

          <div className="formGrid">
            <div className={cls("remedialSessions")}>
              <label>REMEDIAL SESSIONS CONDUCTED *</label>
              <input type="number" placeholder="e.g. 12" value={form.remedialSessions} onChange={(e) => set("remedialSessions", e.target.value)} />
              <FieldError msg={errors.remedialSessions} />
            </div>

            <div className={cls("parentInteractionFrequency")}>
              <label>PARENT INTERACTION FREQUENCY *</label>
              <select value={form.parentInteractionFrequency} onChange={(e) => set("parentInteractionFrequency", e.target.value)}>
                <option>Select...</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Term-wise</option>
                <option>Need-based</option>
                <option>Rarely</option>
              </select>
              <FieldError msg={errors.parentInteractionFrequency} />
            </div>

            <div className={cls("studentMentoringSessions")}>
              <label>STUDENT MENTORING SESSIONS CONDUCTED *</label>
              <input type="number" placeholder="e.g. 15" value={form.studentMentoringSessions} onChange={(e) => set("studentMentoringSessions", e.target.value)} />
              <FieldError msg={errors.studentMentoringSessions} />
            </div>
          </div>
        </section>

        {/* ── SCHOOL DUTIES & ACTIVITIES ── */}
        <section className="sectionCard">
          <h2>SCHOOL DUTIES & ACTIVITIES</h2>

          <div className="inlineGroup">
            <div className={cls("examDutyParticipation")}>
              <label>EXAMINATION DUTY PARTICIPATION *</label>
              <select value={form.examDutyParticipation} onChange={(e) => set("examDutyParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Not Participated</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.examDutyParticipation} />
            </div>

            <div className="field">
              <label>UPLOAD EXAM DUTY DOCUMENT</label>
              <FileUpload id="upload-exam-duty" field="examDutyDocument" fileName={form.examDutyDocument} setForm={setForm} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("coCurricularInvolvement")}>
              <label>CO-CURRICULAR ACTIVITY INVOLVEMENT *</label>
              <select value={form.coCurricularInvolvement} onChange={(e) => set("coCurricularInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Sports</option>
                <option>Cultural Activities</option>
                <option>Clubs</option>
                <option>Competitions</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.coCurricularInvolvement} />
            </div>

            <div className="field">
              <label>UPLOAD ACTIVITY PROOF</label>
              <FileUpload id="upload-activity-proof" field="activityProof" fileName={form.activityProof} setForm={setForm} />
            </div>
          </div>
        </section>

        {/* ── TRAINING, INCLUSION & AUDIT ── */}
        <section className="sectionCard">
          <h2>TRAINING, INCLUSION & AUDIT</h2>

          <div className="inlineGroup">
            <div className={cls("teacherTrainingFdp")}>
              <label>TEACHER TRAINING / FDP PARTICIPATION *</label>
              <select value={form.teacherTrainingFdp} onChange={(e) => set("teacherTrainingFdp", e.target.value)}>
                <option>Select...</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Not Completed</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.teacherTrainingFdp} />
            </div>

            <div className="field">
              <label>UPLOAD TRAINING / FDP PROOF</label>
              <FileUpload id="upload-training-proof" field="trainingFdpProof" fileName={form.trainingFdpProof} setForm={setForm} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("inclusiveEducationTraining")}>
              <label>INCLUSIVE EDUCATION TRAINING PARTICIPATION *</label>
              <select value={form.inclusiveEducationTraining} onChange={(e) => set("inclusiveEducationTraining", e.target.value)}>
                <option>Select...</option>
                <option>Completed</option>
                <option>In Progress</option>
                <option>Not Completed</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.inclusiveEducationTraining} />
            </div>

            <div className="field">
              <label>UPLOAD INCLUSIVE EDUCATION PROOF</label>
              <FileUpload id="upload-inclusive-proof" field="inclusiveEducationProof" fileName={form.inclusiveEducationProof} setForm={setForm} />
            </div>
          </div>

          <div className="formGrid twoColumns">
            <div className={cls("studentFeedbackScore")}>
              <label>STUDENT FEEDBACK SCORE *</label>
              <input type="number" placeholder="e.g. 4.4 / 5" value={form.studentFeedbackScore} onChange={(e) => set("studentFeedbackScore", e.target.value)} />
              <FieldError msg={errors.studentFeedbackScore} />
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
                placeholder="e.g. Lesson audit, academic audit, compliance report"
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

          <div className={`field fullWidth${errors.teachingMethodology ? " fieldHasError" : ""}`}>
            <label>TEACHING METHODOLOGY SUMMARY *</label>
            <textarea
              placeholder="Describe teaching approach, classroom strategies, activities, assessments, learner engagement, and use of digital tools..."
              value={form.teachingMethodology}
              onChange={(e) => set("teachingMethodology", e.target.value)}
            />
            <FieldError msg={errors.teachingMethodology} />
          </div>

          <div className={`field fullWidth${errors.studentChallenges ? " fieldHasError" : ""}`}>
            <label>COMMON STUDENT LEARNING CHALLENGES *</label>
            <textarea
              placeholder="Mention common concept gaps, reading or writing difficulties, attendance issues, behavioural patterns, digital access gaps, or assessment challenges..."
              value={form.studentChallenges}
              onChange={(e) => set("studentChallenges", e.target.value)}
            />
            <FieldError msg={errors.studentChallenges} />
          </div>

          <div className={`field fullWidth${errors.improvementAreas ? " fieldHasError" : ""}`}>
            <label>IMPROVEMENT AREAS IDENTIFIED *</label>
            <textarea
              placeholder="Mention improvements needed in lesson planning, remedial teaching, parent communication, assessment design, LMS usage, or inclusive education support..."
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
            <div className={cls("teacherConfirmation")}>
              <label>TEACHER / FACULTY CONFIRMATION *</label>
              <select value={form.teacherConfirmation} onChange={(e) => set("teacherConfirmation", e.target.value)}>
                <option>Select...</option>
                <option>I confirm that the entered data is accurate</option>
                <option>I need to review before submission</option>
              </select>
              <FieldError msg={errors.teacherConfirmation} />
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
