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
  // Academic Coordination
  gradesSectionsManaged: string;
  teachersCoordinatedCount: string;
  studentsManagedCount: string;
  timetableCoordinationResponsibility: string;
  attendanceMonitoringResponsibility: string;
  learningOutcomeTracking: string;
  // Examination & Activity Coordination
  examinationCoordinationInvolvement: string;
  assignmentActivityCoordination: string;
  boardExaminationParticipation: string;
  examActivityDoc: string;
  examActivityProof: string;
  // Parent Communication & Student Support
  ptmCoordinationInvolvement: string;
  parentCommunicationFrequency: string;
  remedialProgrammeCoordination: string;
  studentGrievanceHandlingCount: string;
  escalationHandlingCount: string;
  studentDisciplineCoordination: string;
  // School Events & Co-Curricular Activities
  schoolEventCoordination: string;
  coCurricularActivityCoordination: string;
  reportingDataEntryResponsibility: string;
  eventCoCurricularDoc: string;
  eventActivityProof: string;
  // Documentation & Verification
  documentationVerificationResponsibility: string;
  documentVerificationProof: string;
  // Qualitative Fields
  academicCoordinationChallenges: string;
  studentEngagementObservations: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  gradesSectionsManaged?: string;
  teachersCoordinatedCount?: string;
  studentsManagedCount?: string;
  timetableCoordinationResponsibility?: string;
  attendanceMonitoringResponsibility?: string;
  learningOutcomeTracking?: string;
  examinationCoordinationInvolvement?: string;
  assignmentActivityCoordination?: string;
  boardExaminationParticipation?: string;
  ptmCoordinationInvolvement?: string;
  parentCommunicationFrequency?: string;
  remedialProgrammeCoordination?: string;
  studentGrievanceHandlingCount?: string;
  escalationHandlingCount?: string;
  studentDisciplineCoordination?: string;
  schoolEventCoordination?: string;
  coCurricularActivityCoordination?: string;
  reportingDataEntryResponsibility?: string;
  documentationVerificationResponsibility?: string;
  academicCoordinationChallenges?: string;
  studentEngagementObservations?: string;
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

  // Academic Coordination
  if (!f.gradesSectionsManaged.trim()) e.gradesSectionsManaged = "Grades / sections managed is required.";
  if (!f.teachersCoordinatedCount.trim()) e.teachersCoordinatedCount = "Teachers coordinated count is required.";
  if (!f.studentsManagedCount.trim()) e.studentsManagedCount = "Students managed count is required.";
  if (!f.timetableCoordinationResponsibility || f.timetableCoordinationResponsibility === "Select...") e.timetableCoordinationResponsibility = "Timetable coordination responsibility is required.";
  if (!f.attendanceMonitoringResponsibility || f.attendanceMonitoringResponsibility === "Select...") e.attendanceMonitoringResponsibility = "Attendance monitoring responsibility is required.";
  if (!f.learningOutcomeTracking || f.learningOutcomeTracking === "Select...") e.learningOutcomeTracking = "Learning outcome tracking participation is required.";

  // Examination & Activity Coordination
  if (!f.examinationCoordinationInvolvement || f.examinationCoordinationInvolvement === "Select...") e.examinationCoordinationInvolvement = "Examination coordination involvement is required.";
  if (!f.assignmentActivityCoordination || f.assignmentActivityCoordination === "Select...") e.assignmentActivityCoordination = "Assignment / activity coordination is required.";
  if (!f.boardExaminationParticipation || f.boardExaminationParticipation === "Select...") e.boardExaminationParticipation = "Board examination coordination participation is required.";

  // Parent Communication & Student Support
  if (!f.ptmCoordinationInvolvement || f.ptmCoordinationInvolvement === "Select...") e.ptmCoordinationInvolvement = "PTM coordination involvement is required.";
  if (!f.parentCommunicationFrequency || f.parentCommunicationFrequency === "Select...") e.parentCommunicationFrequency = "Parent communication frequency is required.";
  if (!f.remedialProgrammeCoordination || f.remedialProgrammeCoordination === "Select...") e.remedialProgrammeCoordination = "Remedial programme coordination is required.";
  if (!f.studentGrievanceHandlingCount.trim()) e.studentGrievanceHandlingCount = "Student grievance handling count is required.";
  if (!f.escalationHandlingCount.trim()) e.escalationHandlingCount = "Escalation handling count is required.";
  if (!f.studentDisciplineCoordination || f.studentDisciplineCoordination === "Select...") e.studentDisciplineCoordination = "Student discipline coordination is required.";

  // School Events & Co-Curricular Activities
  if (!f.schoolEventCoordination || f.schoolEventCoordination === "Select...") e.schoolEventCoordination = "School event coordination is required.";
  if (!f.coCurricularActivityCoordination || f.coCurricularActivityCoordination === "Select...") e.coCurricularActivityCoordination = "Co-curricular activity coordination is required.";
  if (!f.reportingDataEntryResponsibility || f.reportingDataEntryResponsibility === "Select...") e.reportingDataEntryResponsibility = "Reporting / data entry responsibility is required.";

  // Documentation & Verification
  if (!f.documentationVerificationResponsibility || f.documentationVerificationResponsibility === "Select...") e.documentationVerificationResponsibility = "Documentation verification responsibility is required.";

  // Qualitative Fields
  if (!f.academicCoordinationChallenges.trim()) e.academicCoordinationChallenges = "Academic coordination challenges is required.";
  if (!f.studentEngagementObservations.trim()) e.studentEngagementObservations = "Student engagement observations is required.";

  // Confirmation
  if (!f.coordinatorConfirmation || f.coordinatorConfirmation === "Select...") e.coordinatorConfirmation = "Student coordinator confirmation is required.";

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
export default function SchoolStudentCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "",
    phone: "",
    gradesSectionsManaged: "",
    teachersCoordinatedCount: "",
    studentsManagedCount: "",
    timetableCoordinationResponsibility: "",
    attendanceMonitoringResponsibility: "",
    learningOutcomeTracking: "",
    examinationCoordinationInvolvement: "",
    assignmentActivityCoordination: "",
    boardExaminationParticipation: "",
    examActivityDoc: "",
    examActivityProof: "",
    ptmCoordinationInvolvement: "",
    parentCommunicationFrequency: "",
    remedialProgrammeCoordination: "",
    studentGrievanceHandlingCount: "",
    escalationHandlingCount: "",
    studentDisciplineCoordination: "",
    schoolEventCoordination: "",
    coCurricularActivityCoordination: "",
    reportingDataEntryResponsibility: "",
    eventCoCurricularDoc: "",
    eventActivityProof: "",
    documentationVerificationResponsibility: "",
    documentVerificationProof: "",
    academicCoordinationChallenges: "",
    studentEngagementObservations: "",
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
          <div className="avatar">SC</div>
          <h3>Student Coordinator</h3>
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
        <h1>School Student Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>

          <div className="formGrid twoCol">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input
                type="email"
                placeholder="e.g. coordinator@school.edu"
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

        {/* ── ACADEMIC COORDINATION ── */}
        <section className="sectionCard">
          <h2>ACADEMIC COORDINATION</h2>

          <div className="formGrid">
            <div className={cls("gradesSectionsManaged")}>
              <label>GRADES / SECTIONS MANAGED *</label>
              <input
                placeholder="e.g. Grade 6A, 7B, 8C"
                value={form.gradesSectionsManaged}
                onChange={(e) => set("gradesSectionsManaged", e.target.value)}
              />
              <FieldError msg={errors.gradesSectionsManaged} />
            </div>

            <div className={cls("teachersCoordinatedCount")}>
              <label>TEACHERS COORDINATED COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 18"
                value={form.teachersCoordinatedCount}
                onChange={(e) => set("teachersCoordinatedCount", e.target.value)}
              />
              <FieldError msg={errors.teachersCoordinatedCount} />
            </div>

            <div className={cls("studentsManagedCount")}>
              <label>STUDENTS MANAGED COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 420"
                value={form.studentsManagedCount}
                onChange={(e) => set("studentsManagedCount", e.target.value)}
              />
              <FieldError msg={errors.studentsManagedCount} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("timetableCoordinationResponsibility")}>
              <label>TIMETABLE COORDINATION RESPONSIBILITY *</label>
              <select value={form.timetableCoordinationResponsibility} onChange={(e) => set("timetableCoordinationResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.timetableCoordinationResponsibility} />
            </div>

            <div className={cls("attendanceMonitoringResponsibility")}>
              <label>ATTENDANCE MONITORING RESPONSIBILITY *</label>
              <select value={form.attendanceMonitoringResponsibility} onChange={(e) => set("attendanceMonitoringResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.attendanceMonitoringResponsibility} />
            </div>

            <div className={cls("learningOutcomeTracking")}>
              <label>LEARNING OUTCOME TRACKING PARTICIPATION *</label>
              <select value={form.learningOutcomeTracking} onChange={(e) => set("learningOutcomeTracking", e.target.value)}>
                <option>Select...</option>
                <option>Regular Tracking</option>
                <option>Periodic Tracking</option>
                <option>Need-based Tracking</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.learningOutcomeTracking} />
            </div>
          </div>
        </section>

        {/* ── EXAMINATION & ACTIVITY COORDINATION ── */}
        <section className="sectionCard">
          <h2>EXAMINATION & ACTIVITY COORDINATION</h2>

          <div className="formGrid">
            <div className={cls("examinationCoordinationInvolvement")}>
              <label>EXAMINATION COORDINATION INVOLVEMENT *</label>
              <select value={form.examinationCoordinationInvolvement} onChange={(e) => set("examinationCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.examinationCoordinationInvolvement} />
            </div>

            <div className={cls("assignmentActivityCoordination")}>
              <label>ASSIGNMENT / ACTIVITY COORDINATION *</label>
              <select value={form.assignmentActivityCoordination} onChange={(e) => set("assignmentActivityCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Monitoring Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.assignmentActivityCoordination} />
            </div>

            <div className={cls("boardExaminationParticipation")}>
              <label>BOARD EXAMINATION COORDINATION PARTICIPATION *</label>
              <select value={form.boardExaminationParticipation} onChange={(e) => set("boardExaminationParticipation", e.target.value)}>
                <option>Select...</option>
                <option>Participated</option>
                <option>Supporting Role</option>
                <option>Not Participated</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.boardExaminationParticipation} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>EXAM / ACTIVITY DOCUMENT</label>
              <input
                placeholder="e.g. Exam schedule, activity report"
                value={form.examActivityDoc}
                onChange={(e) => set("examActivityDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD EXAM / ACTIVITY PROOF</label>
              <FileUpload id="upload-exam-activity" field="examActivityProof" fileName={form.examActivityProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── PARENT COMMUNICATION & STUDENT SUPPORT ── */}
        <section className="sectionCard">
          <h2>PARENT COMMUNICATION & STUDENT SUPPORT</h2>

          <div className="formGrid">
            <div className={cls("ptmCoordinationInvolvement")}>
              <label>PTM COORDINATION INVOLVEMENT *</label>
              <select value={form.ptmCoordinationInvolvement} onChange={(e) => set("ptmCoordinationInvolvement", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Logistics Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.ptmCoordinationInvolvement} />
            </div>

            <div className={cls("parentCommunicationFrequency")}>
              <label>PARENT COMMUNICATION FREQUENCY *</label>
              <select value={form.parentCommunicationFrequency} onChange={(e) => set("parentCommunicationFrequency", e.target.value)}>
                <option>Select...</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Term-wise</option>
                <option>Need-based</option>
              </select>
              <FieldError msg={errors.parentCommunicationFrequency} />
            </div>

            <div className={cls("remedialProgrammeCoordination")}>
              <label>REMEDIAL PROGRAMME COORDINATION *</label>
              <select value={form.remedialProgrammeCoordination} onChange={(e) => set("remedialProgrammeCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Monitoring Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.remedialProgrammeCoordination} />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("studentGrievanceHandlingCount")}>
              <label>STUDENT GRIEVANCE HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 22"
                value={form.studentGrievanceHandlingCount}
                onChange={(e) => set("studentGrievanceHandlingCount", e.target.value)}
              />
              <FieldError msg={errors.studentGrievanceHandlingCount} />
            </div>

            <div className={cls("escalationHandlingCount")}>
              <label>ESCALATION HANDLING COUNT *</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={form.escalationHandlingCount}
                onChange={(e) => set("escalationHandlingCount", e.target.value)}
              />
              <FieldError msg={errors.escalationHandlingCount} />
            </div>

            <div className={cls("studentDisciplineCoordination")}>
              <label>STUDENT DISCIPLINE COORDINATION *</label>
              <select value={form.studentDisciplineCoordination} onChange={(e) => set("studentDisciplineCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Escalation Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.studentDisciplineCoordination} />
            </div>
          </div>
        </section>

        {/* ── SCHOOL EVENTS & CO-CURRICULAR ACTIVITIES ── */}
        <section className="sectionCard">
          <h2>SCHOOL EVENTS & CO-CURRICULAR ACTIVITIES</h2>

          <div className="formGrid">
            <div className={cls("schoolEventCoordination")}>
              <label>SCHOOL EVENT COORDINATION *</label>
              <select value={form.schoolEventCoordination} onChange={(e) => set("schoolEventCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Logistics Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.schoolEventCoordination} />
            </div>

            <div className={cls("coCurricularActivityCoordination")}>
              <label>CO-CURRICULAR ACTIVITY COORDINATION *</label>
              <select value={form.coCurricularActivityCoordination} onChange={(e) => set("coCurricularActivityCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Handled</option>
                <option>Supported</option>
                <option>Monitoring Only</option>
                <option>Not Involved</option>
              </select>
              <FieldError msg={errors.coCurricularActivityCoordination} />
            </div>

            <div className={cls("reportingDataEntryResponsibility")}>
              <label>REPORTING / DATA ENTRY RESPONSIBILITY *</label>
              <select value={form.reportingDataEntryResponsibility} onChange={(e) => set("reportingDataEntryResponsibility", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Verification Only</option>
                <option>Not Applicable</option>
              </select>
              <FieldError msg={errors.reportingDataEntryResponsibility} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>EVENT / CO-CURRICULAR DOCUMENT</label>
              <input
                placeholder="e.g. Event report, activity register"
                value={form.eventCoCurricularDoc}
                onChange={(e) => set("eventCoCurricularDoc", e.target.value)}
              />
            </div>

            <div className="field">
              <label>UPLOAD EVENT / ACTIVITY PROOF</label>
              <FileUpload id="upload-event-activity" field="eventActivityProof" fileName={form.eventActivityProof} setForm={setForm} multiple />
            </div>
          </div>
        </section>

        {/* ── DOCUMENTATION & VERIFICATION ── */}
        <section className="sectionCard">
          <h2>DOCUMENTATION & VERIFICATION</h2>

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
        </section>

        {/* ── ESSENTIAL QUALITATIVE FIELDS ── */}
        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className={`field fullWidth${errors.academicCoordinationChallenges ? " fieldHasError" : ""}`}>
            <label>ACADEMIC COORDINATION CHALLENGES *</label>
            <textarea
              placeholder="Mention timetable issues, teacher coordination gaps, attendance challenges, examination coordination issues, documentation delays, or remedial programme challenges..."
              value={form.academicCoordinationChallenges}
              onChange={(e) => set("academicCoordinationChallenges", e.target.value)}
            />
            <FieldError msg={errors.academicCoordinationChallenges} />
          </div>

          <div className={`field fullWidth${errors.studentEngagementObservations ? " fieldHasError" : ""}`}>
            <label>STUDENT ENGAGEMENT OBSERVATIONS *</label>
            <textarea
              placeholder="Mention student participation trends, learning gaps, parent communication response, discipline patterns, activity engagement, and support needs..."
              value={form.studentEngagementObservations}
              onChange={(e) => set("studentEngagementObservations", e.target.value)}
            />
            <FieldError msg={errors.studentEngagementObservations} />
          </div>
        </section>

        {/* ── CONFIRMATION ── */}
        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className={cls("coordinatorConfirmation")}>
              <label>STUDENT COORDINATOR CONFIRMATION *</label>
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
