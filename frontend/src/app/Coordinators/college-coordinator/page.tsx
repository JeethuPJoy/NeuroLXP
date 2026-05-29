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
  // Academic & Administrative Profile
  educationalQualifications: string;
  certifications: string;
  administrativeExperience: string;
  areasOfExpertise: string;
  departmentAffiliation: string;
  academicResponsibilities: string;
  institutionalCommittees: string;
  committeeProof: string;
  iqacNaacNba: string;
  iqacNaacNbaProof: string;
  accreditationResponsibilities: string;
  timetableCoordination: string;
  examinationCoordinationRole: string;
  studentMentoringResponsibility: string;
  facultyCoordinationResponsibility: string;
  industryInteractionResponsibility: string;
  // Operational Coordination Analytics
  coursesCoordinated: string;
  batchesManaged: string;
  studentCountManaged: string;
  facultyCountCoordinated: string;
  timetablePreparationCompletion: string;
  attendanceMonitoringFrequency: string;
  syllabusTrackingCompliance: string;
  assignmentMonitoring: string;
  examinationSchedulingCompletion: string;
  internalMarksVerification: string;
  academicCalendarAdherence: string;
  studentIssueResolutionTime: string;
  escalationHandlingCount: string;
  facultyIssueResolutionTime: string;
  communicationFrequency: string;
  meetingCoordinationCount: string;
  academicAuditTaskCompletion: string;
  complianceTaskCompletion: string;
  // Student Success & Engagement Metrics
  studentAttendanceImprovement: string;
  atRiskStudentInterventions: string;
  mentoringSessionsCoordinated: string;
  dropoutReductionContribution: string;
  studentGrievanceResolution: string;
  placementCoordinationContribution: string;
  internshipCoordinationCount: string;
  remedialProgrammeCoordination: string;
  studentParticipationInActivities: string;
  studentProgressionTracking: string;
  certificationCompletionMonitoring: string;
  parentCommunicationFrequency: string;
  studentSatisfactionScore: string;
  // NAAC, IQAC & Compliance Data
  naacDocumentationHandled: string;
  naacDocumentSample: string;
  criterionOwnership: string;
  aqarContribution: string;
  ssrContribution: string;
  academicAuditParticipation: string;
  departmentAuditReadiness: string;
  evidenceUploadCompletion: string;
  feedbackCollectionCoordination: string;
  coPoAttainmentTracking: string;
  bestPracticesDocumented: string;
  valueAddedActivities: string;
  extensionActivities: string;
  eventReportsSubmitted: string;
  academicRecordsVerification: string;
  complianceSubmissionPunctuality: string;
  facultyAppraisalCoordination: string;
  stakeholderFeedbackCollection: string;
  alumniActivityCoordination: string;
  // Event, Programme & Activity Management
  workshopsCoordinated: string;
  fdpsOrganized: string;
  guestLecturesManaged: string;
  industrialVisitsCoordinated: string;
  placementDrivesCoordinated: string;
  hackathonsEventsManaged: string;
  clubsStudentActivities: string;
  outreachProgrammes: string;
  mouCoordination: string;
  alumniEventsCoordinated: string;
  communityEngagementProgrammes: string;
  innovationIncubationActivities: string;
  // Confirmation
  coordinatorConfirmation: string;
  supportingDocuments: string;
}

interface FormErrors {
  email?: string;
  phone?: string;
  educationalQualifications?: string;
  administrativeExperience?: string;
  areasOfExpertise?: string;
  departmentAffiliation?: string;
  academicResponsibilities?: string;
  institutionalCommittees?: string;
  iqacNaacNba?: string;
  accreditationResponsibilities?: string;
  timetableCoordination?: string;
  examinationCoordinationRole?: string;
  studentMentoringResponsibility?: string;
  facultyCoordinationResponsibility?: string;
  industryInteractionResponsibility?: string;
  coursesCoordinated?: string;
  batchesManaged?: string;
  studentCountManaged?: string;
  facultyCountCoordinated?: string;
  timetablePreparationCompletion?: string;
  attendanceMonitoringFrequency?: string;
  syllabusTrackingCompliance?: string;
  assignmentMonitoring?: string;
  examinationSchedulingCompletion?: string;
  internalMarksVerification?: string;
  academicCalendarAdherence?: string;
  studentIssueResolutionTime?: string;
  escalationHandlingCount?: string;
  facultyIssueResolutionTime?: string;
  communicationFrequency?: string;
  meetingCoordinationCount?: string;
  academicAuditTaskCompletion?: string;
  complianceTaskCompletion?: string;
  studentAttendanceImprovement?: string;
  atRiskStudentInterventions?: string;
  mentoringSessionsCoordinated?: string;
  dropoutReductionContribution?: string;
  studentGrievanceResolution?: string;
  placementCoordinationContribution?: string;
  internshipCoordinationCount?: string;
  remedialProgrammeCoordination?: string;
  studentParticipationInActivities?: string;
  studentProgressionTracking?: string;
  certificationCompletionMonitoring?: string;
  parentCommunicationFrequency?: string;
  studentSatisfactionScore?: string;
  naacDocumentationHandled?: string;
  criterionOwnership?: string;
  aqarContribution?: string;
  ssrContribution?: string;
  academicAuditParticipation?: string;
  departmentAuditReadiness?: string;
  evidenceUploadCompletion?: string;
  feedbackCollectionCoordination?: string;
  coPoAttainmentTracking?: string;
  bestPracticesDocumented?: string;
  valueAddedActivities?: string;
  extensionActivities?: string;
  eventReportsSubmitted?: string;
  academicRecordsVerification?: string;
  complianceSubmissionPunctuality?: string;
  facultyAppraisalCoordination?: string;
  stakeholderFeedbackCollection?: string;
  alumniActivityCoordination?: string;
  workshopsCoordinated?: string;
  fdpsOrganized?: string;
  guestLecturesManaged?: string;
  industrialVisitsCoordinated?: string;
  placementDrivesCoordinated?: string;
  hackathonsEventsManaged?: string;
  clubsStudentActivities?: string;
  outreachProgrammes?: string;
  mouCoordination?: string;
  alumniEventsCoordinated?: string;
  communityEngagementProgrammes?: string;
  innovationIncubationActivities?: string;
  coordinatorConfirmation?: string;
}

// ─── Validation ───────────────────────────────────────────────
function isBlank(v: string) { return !v.trim(); }
function isUnselected(v: string) { return !v || v === "Select..."; }

function validateForm(f: FormState): FormErrors {
  const e: FormErrors = {};

  // Contact
  if (isBlank(f.email)) e.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address.";
  if (isBlank(f.phone)) e.phone = "Phone number is required.";
  else if (!/^[6-9]\d{9}$/.test(f.phone.trim())) e.phone = "Enter a valid 10-digit mobile number.";

  // Academic & Administrative Profile
  if (isBlank(f.educationalQualifications)) e.educationalQualifications = "Educational qualifications is required.";
  if (isBlank(f.administrativeExperience)) e.administrativeExperience = "Administrative experience is required.";
  if (isBlank(f.areasOfExpertise)) e.areasOfExpertise = "Areas of expertise is required.";
  if (isBlank(f.departmentAffiliation)) e.departmentAffiliation = "Department affiliation is required.";
  if (isBlank(f.academicResponsibilities)) e.academicResponsibilities = "Academic responsibilities is required.";
  if (isBlank(f.institutionalCommittees)) e.institutionalCommittees = "Institutional committees involved is required.";
  if (isUnselected(f.iqacNaacNba)) e.iqacNaacNba = "IQAC / NAAC / NBA participation is required.";
  if (isBlank(f.accreditationResponsibilities)) e.accreditationResponsibilities = "Accreditation responsibilities is required.";
  if (isUnselected(f.timetableCoordination)) e.timetableCoordination = "Timetable coordination responsibility is required.";
  if (isUnselected(f.examinationCoordinationRole)) e.examinationCoordinationRole = "Examination coordination role is required.";
  if (isUnselected(f.studentMentoringResponsibility)) e.studentMentoringResponsibility = "Student mentoring responsibility is required.";
  if (isUnselected(f.facultyCoordinationResponsibility)) e.facultyCoordinationResponsibility = "Faculty coordination responsibility is required.";
  if (isUnselected(f.industryInteractionResponsibility)) e.industryInteractionResponsibility = "Industry interaction responsibility is required.";

  // Operational Coordination Analytics
  if (isBlank(f.coursesCoordinated)) e.coursesCoordinated = "Courses coordinated is required.";
  if (isBlank(f.batchesManaged)) e.batchesManaged = "Batches managed is required.";
  if (isBlank(f.studentCountManaged)) e.studentCountManaged = "Student count managed is required.";
  if (isBlank(f.facultyCountCoordinated)) e.facultyCountCoordinated = "Faculty count coordinated is required.";
  if (isBlank(f.timetablePreparationCompletion)) e.timetablePreparationCompletion = "Timetable preparation completion % is required.";
  if (isUnselected(f.attendanceMonitoringFrequency)) e.attendanceMonitoringFrequency = "Attendance monitoring frequency is required.";
  if (isBlank(f.syllabusTrackingCompliance)) e.syllabusTrackingCompliance = "Syllabus tracking compliance % is required.";
  if (isBlank(f.assignmentMonitoring)) e.assignmentMonitoring = "Assignment monitoring % is required.";
  if (isBlank(f.examinationSchedulingCompletion)) e.examinationSchedulingCompletion = "Examination scheduling completion % is required.";
  if (isBlank(f.internalMarksVerification)) e.internalMarksVerification = "Internal marks verification completion % is required.";
  if (isBlank(f.academicCalendarAdherence)) e.academicCalendarAdherence = "Academic calendar adherence % is required.";
  if (isBlank(f.studentIssueResolutionTime)) e.studentIssueResolutionTime = "Student issue resolution time is required.";
  if (isBlank(f.escalationHandlingCount)) e.escalationHandlingCount = "Escalation handling count is required.";
  if (isBlank(f.facultyIssueResolutionTime)) e.facultyIssueResolutionTime = "Faculty issue resolution time is required.";
  if (isUnselected(f.communicationFrequency)) e.communicationFrequency = "Communication frequency is required.";
  if (isBlank(f.meetingCoordinationCount)) e.meetingCoordinationCount = "Meeting coordination count is required.";
  if (isBlank(f.academicAuditTaskCompletion)) e.academicAuditTaskCompletion = "Academic audit task completion % is required.";
  if (isBlank(f.complianceTaskCompletion)) e.complianceTaskCompletion = "Compliance task completion % is required.";

  // Student Success & Engagement Metrics
  if (isBlank(f.studentAttendanceImprovement)) e.studentAttendanceImprovement = "Student attendance improvement % is required.";
  if (isBlank(f.atRiskStudentInterventions)) e.atRiskStudentInterventions = "At-risk student interventions is required.";
  if (isBlank(f.mentoringSessionsCoordinated)) e.mentoringSessionsCoordinated = "Mentoring sessions coordinated is required.";
  if (isBlank(f.dropoutReductionContribution)) e.dropoutReductionContribution = "Dropout reduction contribution is required.";
  if (isBlank(f.studentGrievanceResolution)) e.studentGrievanceResolution = "Student grievance resolution % is required.";
  if (isBlank(f.placementCoordinationContribution)) e.placementCoordinationContribution = "Placement coordination contribution is required.";
  if (isBlank(f.internshipCoordinationCount)) e.internshipCoordinationCount = "Internship coordination count is required.";
  if (isBlank(f.remedialProgrammeCoordination)) e.remedialProgrammeCoordination = "Remedial programme coordination is required.";
  if (isBlank(f.studentParticipationInActivities)) e.studentParticipationInActivities = "Student participation in activities is required.";
  if (isUnselected(f.studentProgressionTracking)) e.studentProgressionTracking = "Student progression tracking is required.";
  if (isUnselected(f.certificationCompletionMonitoring)) e.certificationCompletionMonitoring = "Certification completion monitoring is required.";
  if (isUnselected(f.parentCommunicationFrequency)) e.parentCommunicationFrequency = "Parent communication frequency is required.";
  if (isBlank(f.studentSatisfactionScore)) e.studentSatisfactionScore = "Student satisfaction score is required.";

  // NAAC, IQAC & Compliance Data
  if (isUnselected(f.naacDocumentationHandled)) e.naacDocumentationHandled = "NAAC documentation handled is required.";
  if (isUnselected(f.criterionOwnership)) e.criterionOwnership = "Criterion ownership is required.";
  if (isUnselected(f.aqarContribution)) e.aqarContribution = "AQAR contribution is required.";
  if (isUnselected(f.ssrContribution)) e.ssrContribution = "SSR contribution is required.";
  if (isUnselected(f.academicAuditParticipation)) e.academicAuditParticipation = "Academic audit participation is required.";
  if (isBlank(f.departmentAuditReadiness)) e.departmentAuditReadiness = "Department audit readiness % is required.";
  if (isBlank(f.evidenceUploadCompletion)) e.evidenceUploadCompletion = "Evidence / document upload completion % is required.";
  if (isUnselected(f.feedbackCollectionCoordination)) e.feedbackCollectionCoordination = "Feedback collection coordination is required.";
  if (isUnselected(f.coPoAttainmentTracking)) e.coPoAttainmentTracking = "CO-PO attainment tracking is required.";
  if (isBlank(f.bestPracticesDocumented)) e.bestPracticesDocumented = "Best practices documented is required.";
  if (isBlank(f.valueAddedActivities)) e.valueAddedActivities = "Value-added activities coordinated is required.";
  if (isBlank(f.extensionActivities)) e.extensionActivities = "Extension activities coordinated is required.";
  if (isBlank(f.eventReportsSubmitted)) e.eventReportsSubmitted = "Event reports submitted is required.";
  if (isBlank(f.academicRecordsVerification)) e.academicRecordsVerification = "Academic records verification % is required.";
  if (isUnselected(f.complianceSubmissionPunctuality)) e.complianceSubmissionPunctuality = "Compliance submission punctuality is required.";
  if (isUnselected(f.facultyAppraisalCoordination)) e.facultyAppraisalCoordination = "Faculty appraisal coordination is required.";
  if (isUnselected(f.stakeholderFeedbackCollection)) e.stakeholderFeedbackCollection = "Stakeholder feedback collection is required.";
  if (isUnselected(f.alumniActivityCoordination)) e.alumniActivityCoordination = "Alumni activity coordination is required.";

  // Event, Programme & Activity Management
  if (isBlank(f.workshopsCoordinated)) e.workshopsCoordinated = "Workshops coordinated is required.";
  if (isBlank(f.fdpsOrganized)) e.fdpsOrganized = "FDPs organized is required.";
  if (isBlank(f.guestLecturesManaged)) e.guestLecturesManaged = "Guest lectures managed is required.";
  if (isBlank(f.industrialVisitsCoordinated)) e.industrialVisitsCoordinated = "Industrial visits coordinated is required.";
  if (isBlank(f.placementDrivesCoordinated)) e.placementDrivesCoordinated = "Placement drives coordinated is required.";
  if (isBlank(f.hackathonsEventsManaged)) e.hackathonsEventsManaged = "Hackathons / events managed is required.";
  if (isBlank(f.clubsStudentActivities)) e.clubsStudentActivities = "Clubs / student activities supervised is required.";
  if (isBlank(f.outreachProgrammes)) e.outreachProgrammes = "Outreach programmes handled is required.";
  if (isBlank(f.mouCoordination)) e.mouCoordination = "MoU coordination is required.";
  if (isBlank(f.alumniEventsCoordinated)) e.alumniEventsCoordinated = "Alumni events coordinated is required.";
  if (isBlank(f.communityEngagementProgrammes)) e.communityEngagementProgrammes = "Community engagement programmes is required.";
  if (isBlank(f.innovationIncubationActivities)) e.innovationIncubationActivities = "Innovation / incubation support activities is required.";

  // Confirmation
  if (isUnselected(f.coordinatorConfirmation)) e.coordinatorConfirmation = "Coordinator confirmation is required.";

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
  id, field, fileName, setForm, multiple = false,
}: {
  id: string; field: keyof FormState; fileName: string;
  setForm: React.Dispatch<React.SetStateAction<FormState>>; multiple?: boolean;
}) {
  return (
    <>
      <input id={id} type="file" accept=".pdf,.doc,.docx,.jpg,.png"
        multiple={multiple} style={{ display: "none" }}
        onChange={makeFileHandler(field, setForm, multiple)} />
      <label htmlFor={id} className="uploadBtn">
        📎 {multiple ? "Choose Files" : "Choose File"}
      </label>
      {fileName && <span className="uploadFileName">✓ {fileName}</span>}
    </>
  );
}

// ─── Main Page ────────────────────────────────────────────────
export default function CollegeCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [saved, setSaved]             = useState(false);

  const [form, setForm] = useState<FormState>({
    email: "", phone: "",
    educationalQualifications: "", certifications: "", administrativeExperience: "",
    areasOfExpertise: "", departmentAffiliation: "", academicResponsibilities: "",
    institutionalCommittees: "", committeeProof: "", iqacNaacNba: "", iqacNaacNbaProof: "",
    accreditationResponsibilities: "", timetableCoordination: "", examinationCoordinationRole: "",
    studentMentoringResponsibility: "", facultyCoordinationResponsibility: "", industryInteractionResponsibility: "",
    coursesCoordinated: "", batchesManaged: "", studentCountManaged: "", facultyCountCoordinated: "",
    timetablePreparationCompletion: "", attendanceMonitoringFrequency: "", syllabusTrackingCompliance: "",
    assignmentMonitoring: "", examinationSchedulingCompletion: "", internalMarksVerification: "",
    academicCalendarAdherence: "", studentIssueResolutionTime: "", escalationHandlingCount: "",
    facultyIssueResolutionTime: "", communicationFrequency: "", meetingCoordinationCount: "",
    academicAuditTaskCompletion: "", complianceTaskCompletion: "",
    studentAttendanceImprovement: "", atRiskStudentInterventions: "", mentoringSessionsCoordinated: "",
    dropoutReductionContribution: "", studentGrievanceResolution: "", placementCoordinationContribution: "",
    internshipCoordinationCount: "", remedialProgrammeCoordination: "", studentParticipationInActivities: "",
    studentProgressionTracking: "", certificationCompletionMonitoring: "", parentCommunicationFrequency: "",
    studentSatisfactionScore: "",
    naacDocumentationHandled: "", naacDocumentSample: "", criterionOwnership: "", aqarContribution: "",
    ssrContribution: "", academicAuditParticipation: "", departmentAuditReadiness: "",
    evidenceUploadCompletion: "", feedbackCollectionCoordination: "", coPoAttainmentTracking: "",
    bestPracticesDocumented: "", valueAddedActivities: "", extensionActivities: "",
    eventReportsSubmitted: "", academicRecordsVerification: "", complianceSubmissionPunctuality: "",
    facultyAppraisalCoordination: "", stakeholderFeedbackCollection: "", alumniActivityCoordination: "",
    workshopsCoordinated: "", fdpsOrganized: "", guestLecturesManaged: "", industrialVisitsCoordinated: "",
    placementDrivesCoordinated: "", hackathonsEventsManaged: "", clubsStudentActivities: "",
    outreachProgrammes: "", mouCoordination: "", alumniEventsCoordinated: "",
    communityEngagementProgrammes: "", innovationIncubationActivities: "",
    coordinatorConfirmation: "", supportingDocuments: "",
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
      <button type="button" className="menuButton" onClick={() => setSidebarOpen(true)} aria-label="Open sidebar">☰</button>

      {sidebarOpen && (
        <button type="button" className="sidebarOverlay" onClick={closeSidebar} aria-label="Close sidebar overlay" />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <button type="button" className="closeSidebar" onClick={closeSidebar} aria-label="Close sidebar">×</button>
        <div className="profileCard">
          <div className="avatar">CC</div>
          <h3>College Coordinator</h3>
          <p>current-user-id</p>
        </div>
        <div className="tenantMenu">
          <button type="button" className="active" onClick={() => handleTenantClick("Colleges / Universities")}>Colleges / Universities</button>
          <button type="button" onClick={() => handleTenantClick("Corporate")}>Corporate</button>
          <button type="button" onClick={() => handleTenantClick("Skill Academy")}>Skill Academy</button>
          <button type="button" onClick={() => handleTenantClick("Government")}>Government</button>
          <button type="button" onClick={() => handleTenantClick("NGO")}>NGO</button>
          <button type="button" onClick={() => handleTenantClick("School")}>School</button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>College / University Coordinator Self Profiling</h1>

        {/* ── CONTACT DETAILS ── */}
        <section className="sectionCard">
          <h2>CONTACT DETAILS</h2>
          <div className="formGrid twoCol">
            <div className={cls("email")}>
              <label>EMAIL ID *</label>
              <input type="email" placeholder="e.g. coordinator@college.edu"
                value={form.email} onChange={(e) => set("email", e.target.value)} />
              <FieldError msg={errors.email} />
            </div>
            <div className={cls("phone")}>
              <label>PHONE NUMBER *</label>
              <input type="tel" placeholder="e.g. 9876543210" maxLength={10}
                value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} />
              <FieldError msg={errors.phone} />
            </div>
          </div>
        </section>

        {/* ── ACADEMIC & ADMINISTRATIVE PROFILE ── */}
        <section className="sectionCard">
          <h2>ACADEMIC & ADMINISTRATIVE PROFILE</h2>
          <div className="formGrid">
            <div className={cls("educationalQualifications")}>
              <label>EDUCATIONAL QUALIFICATIONS *</label>
              <input placeholder="e.g. MBA, MTech, PhD" value={form.educationalQualifications} onChange={(e) => set("educationalQualifications", e.target.value)} />
              <FieldError msg={errors.educationalQualifications} />
            </div>
            <div className="field">
              <label>CERTIFICATIONS</label>
              <input placeholder="e.g. NAAC, NBA, Project Management" value={form.certifications} onChange={(e) => set("certifications", e.target.value)} />
            </div>
            <div className={cls("administrativeExperience")}>
              <label>ADMINISTRATIVE EXPERIENCE *</label>
              <input type="number" placeholder="e.g. 6 years" value={form.administrativeExperience} onChange={(e) => set("administrativeExperience", e.target.value)} />
              <FieldError msg={errors.administrativeExperience} />
            </div>
            <div className={cls("areasOfExpertise")}>
              <label>AREAS OF EXPERTISE *</label>
              <input placeholder="e.g. Academic coordination, IQAC, exams" value={form.areasOfExpertise} onChange={(e) => set("areasOfExpertise", e.target.value)} />
              <FieldError msg={errors.areasOfExpertise} />
            </div>
            <div className={cls("departmentAffiliation")}>
              <label>DEPARTMENT AFFILIATION *</label>
              <input placeholder="e.g. CSE, ECE, MBA" value={form.departmentAffiliation} onChange={(e) => set("departmentAffiliation", e.target.value)} />
              <FieldError msg={errors.departmentAffiliation} />
            </div>
            <div className={cls("academicResponsibilities")}>
              <label>ACADEMIC RESPONSIBILITIES *</label>
              <input placeholder="e.g. Timetable, mentoring, audit" value={form.academicResponsibilities} onChange={(e) => set("academicResponsibilities", e.target.value)} />
              <FieldError msg={errors.academicResponsibilities} />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("institutionalCommittees")}>
              <label>INSTITUTIONAL COMMITTEES INVOLVED *</label>
              <input placeholder="e.g. IQAC, exam cell, placement cell" value={form.institutionalCommittees} onChange={(e) => set("institutionalCommittees", e.target.value)} />
              <FieldError msg={errors.institutionalCommittees} />
            </div>
            <div className="field">
              <label>UPLOAD COMMITTEE PROOF</label>
              <FileUpload id="upload-committee-proof" field="committeeProof" fileName={form.committeeProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="inlineGroup">
            <div className={cls("iqacNaacNba")}>
              <label>IQAC / NAAC / NBA PARTICIPATION *</label>
              <select value={form.iqacNaacNba} onChange={(e) => set("iqacNaacNba", e.target.value)}>
                <option>Select...</option>
                <option>IQAC</option><option>NAAC</option><option>NBA</option>
                <option>IQAC and NAAC</option><option>NAAC and NBA</option>
                <option>All</option><option>Not Participated</option>
              </select>
              <FieldError msg={errors.iqacNaacNba} />
            </div>
            <div className="field">
              <label>UPLOAD IQAC / NAAC / NBA PROOF</label>
              <FileUpload id="upload-iqac-proof" field="iqacNaacNbaProof" fileName={form.iqacNaacNbaProof} setForm={setForm} multiple />
            </div>
          </div>

          <div className="formGrid">
            <div className={cls("accreditationResponsibilities")}>
              <label>ACCREDITATION RESPONSIBILITIES *</label>
              <input placeholder="e.g. Criterion 2, evidence collection" value={form.accreditationResponsibilities} onChange={(e) => set("accreditationResponsibilities", e.target.value)} />
              <FieldError msg={errors.accreditationResponsibilities} />
            </div>
            <div className={cls("timetableCoordination")}>
              <label>TIMETABLE COORDINATION RESPONSIBILITY *</label>
              <select value={form.timetableCoordination} onChange={(e) => set("timetableCoordination", e.target.value)}>
                <option>Select...</option>
                <option>Full Responsibility</option><option>Partial Responsibility</option>
                <option>Supporting Role</option><option>Not Applicable</option>
              </select>
              <FieldError msg={errors.timetableCoordination} />
            </div>
            <div className={cls("examinationCoordinationRole")}>
              <label>EXAMINATION COORDINATION ROLE *</label>
              <select value={form.examinationCoordinationRole} onChange={(e) => set("examinationCoordinationRole", e.target.value)}>
                <option>Select...</option>
                <option>Exam Coordinator</option><option>Internal Assessment Coordinator</option>
                <option>Supporting Role</option><option>Not Applicable</option>
              </select>
              <FieldError msg={errors.examinationCoordinationRole} />
            </div>
            <div className={cls("studentMentoringResponsibility")}>
              <label>STUDENT MENTORING RESPONSIBILITY *</label>
              <select value={form.studentMentoringResponsibility} onChange={(e) => set("studentMentoringResponsibility", e.target.value)}>
                <option>Select...</option><option>Yes</option><option>No</option><option>Shared Responsibility</option>
              </select>
              <FieldError msg={errors.studentMentoringResponsibility} />
            </div>
            <div className={cls("facultyCoordinationResponsibility")}>
              <label>FACULTY COORDINATION RESPONSIBILITY *</label>
              <select value={form.facultyCoordinationResponsibility} onChange={(e) => set("facultyCoordinationResponsibility", e.target.value)}>
                <option>Select...</option><option>Yes</option><option>No</option><option>Shared Responsibility</option>
              </select>
              <FieldError msg={errors.facultyCoordinationResponsibility} />
            </div>
            <div className={cls("industryInteractionResponsibility")}>
              <label>INDUSTRY INTERACTION RESPONSIBILITY *</label>
              <select value={form.industryInteractionResponsibility} onChange={(e) => set("industryInteractionResponsibility", e.target.value)}>
                <option>Select...</option><option>Yes</option><option>No</option><option>Shared Responsibility</option>
              </select>
              <FieldError msg={errors.industryInteractionResponsibility} />
            </div>
          </div>
        </section>

        {/* ── OPERATIONAL COORDINATION ANALYTICS ── */}
        <section className="sectionCard">
          <h2>OPERATIONAL COORDINATION ANALYTICS</h2>
          <div className="formGrid">
            <div className={cls("coursesCoordinated")}><label>COURSES COORDINATED *</label><input type="number" placeholder="e.g. 8" value={form.coursesCoordinated} onChange={(e) => set("coursesCoordinated", e.target.value)} /><FieldError msg={errors.coursesCoordinated} /></div>
            <div className={cls("batchesManaged")}><label>BATCHES MANAGED *</label><input type="number" placeholder="e.g. 6" value={form.batchesManaged} onChange={(e) => set("batchesManaged", e.target.value)} /><FieldError msg={errors.batchesManaged} /></div>
            <div className={cls("studentCountManaged")}><label>STUDENT COUNT MANAGED *</label><input type="number" placeholder="e.g. 420" value={form.studentCountManaged} onChange={(e) => set("studentCountManaged", e.target.value)} /><FieldError msg={errors.studentCountManaged} /></div>
            <div className={cls("facultyCountCoordinated")}><label>FACULTY COUNT COORDINATED *</label><input type="number" placeholder="e.g. 32" value={form.facultyCountCoordinated} onChange={(e) => set("facultyCountCoordinated", e.target.value)} /><FieldError msg={errors.facultyCountCoordinated} /></div>
            <div className={cls("timetablePreparationCompletion")}><label>TIMETABLE PREPARATION COMPLETION % *</label><input type="number" placeholder="e.g. 95" value={form.timetablePreparationCompletion} onChange={(e) => set("timetablePreparationCompletion", e.target.value)} /><FieldError msg={errors.timetablePreparationCompletion} /></div>
            <div className={cls("attendanceMonitoringFrequency")}>
              <label>ATTENDANCE MONITORING FREQUENCY *</label>
              <select value={form.attendanceMonitoringFrequency} onChange={(e) => set("attendanceMonitoringFrequency", e.target.value)}>
                <option>Select...</option><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Need-based</option>
              </select>
              <FieldError msg={errors.attendanceMonitoringFrequency} />
            </div>
            <div className={cls("syllabusTrackingCompliance")}><label>SYLLABUS TRACKING COMPLIANCE % *</label><input type="number" placeholder="e.g. 92" value={form.syllabusTrackingCompliance} onChange={(e) => set("syllabusTrackingCompliance", e.target.value)} /><FieldError msg={errors.syllabusTrackingCompliance} /></div>
            <div className={cls("assignmentMonitoring")}><label>ASSIGNMENT MONITORING % *</label><input type="number" placeholder="e.g. 88" value={form.assignmentMonitoring} onChange={(e) => set("assignmentMonitoring", e.target.value)} /><FieldError msg={errors.assignmentMonitoring} /></div>
            <div className={cls("examinationSchedulingCompletion")}><label>EXAMINATION SCHEDULING COMPLETION % *</label><input type="number" placeholder="e.g. 96" value={form.examinationSchedulingCompletion} onChange={(e) => set("examinationSchedulingCompletion", e.target.value)} /><FieldError msg={errors.examinationSchedulingCompletion} /></div>
            <div className={cls("internalMarksVerification")}><label>INTERNAL MARKS VERIFICATION COMPLETION % *</label><input type="number" placeholder="e.g. 94" value={form.internalMarksVerification} onChange={(e) => set("internalMarksVerification", e.target.value)} /><FieldError msg={errors.internalMarksVerification} /></div>
            <div className={cls("academicCalendarAdherence")}><label>ACADEMIC CALENDAR ADHERENCE % *</label><input type="number" placeholder="e.g. 90" value={form.academicCalendarAdherence} onChange={(e) => set("academicCalendarAdherence", e.target.value)} /><FieldError msg={errors.academicCalendarAdherence} /></div>
            <div className={cls("studentIssueResolutionTime")}><label>STUDENT ISSUE RESOLUTION TIME *</label><input placeholder="e.g. 2 days average" value={form.studentIssueResolutionTime} onChange={(e) => set("studentIssueResolutionTime", e.target.value)} /><FieldError msg={errors.studentIssueResolutionTime} /></div>
            <div className={cls("escalationHandlingCount")}><label>ESCALATION HANDLING COUNT *</label><input type="number" placeholder="e.g. 14" value={form.escalationHandlingCount} onChange={(e) => set("escalationHandlingCount", e.target.value)} /><FieldError msg={errors.escalationHandlingCount} /></div>
            <div className={cls("facultyIssueResolutionTime")}><label>FACULTY ISSUE RESOLUTION TIME *</label><input placeholder="e.g. 3 days average" value={form.facultyIssueResolutionTime} onChange={(e) => set("facultyIssueResolutionTime", e.target.value)} /><FieldError msg={errors.facultyIssueResolutionTime} /></div>
            <div className={cls("communicationFrequency")}>
              <label>COMMUNICATION FREQUENCY WITH FACULTY / STUDENTS *</label>
              <select value={form.communicationFrequency} onChange={(e) => set("communicationFrequency", e.target.value)}>
                <option>Select...</option><option>Daily</option><option>Weekly</option><option>Monthly</option><option>Need-based</option>
              </select>
              <FieldError msg={errors.communicationFrequency} />
            </div>
            <div className={cls("meetingCoordinationCount")}><label>MEETING COORDINATION COUNT *</label><input type="number" placeholder="e.g. 24" value={form.meetingCoordinationCount} onChange={(e) => set("meetingCoordinationCount", e.target.value)} /><FieldError msg={errors.meetingCoordinationCount} /></div>
            <div className={cls("academicAuditTaskCompletion")}><label>ACADEMIC AUDIT TASK COMPLETION % *</label><input type="number" placeholder="e.g. 91" value={form.academicAuditTaskCompletion} onChange={(e) => set("academicAuditTaskCompletion", e.target.value)} /><FieldError msg={errors.academicAuditTaskCompletion} /></div>
            <div className={cls("complianceTaskCompletion")}><label>COMPLIANCE TASK COMPLETION % *</label><input type="number" placeholder="e.g. 89" value={form.complianceTaskCompletion} onChange={(e) => set("complianceTaskCompletion", e.target.value)} /><FieldError msg={errors.complianceTaskCompletion} /></div>
          </div>
        </section>

        {/* ── STUDENT SUCCESS & ENGAGEMENT METRICS ── */}
        <section className="sectionCard">
          <h2>STUDENT SUCCESS & ENGAGEMENT METRICS</h2>
          <div className="formGrid">
            <div className={cls("studentAttendanceImprovement")}><label>STUDENT ATTENDANCE IMPROVEMENT % *</label><input type="number" placeholder="e.g. 12" value={form.studentAttendanceImprovement} onChange={(e) => set("studentAttendanceImprovement", e.target.value)} /><FieldError msg={errors.studentAttendanceImprovement} /></div>
            <div className={cls("atRiskStudentInterventions")}><label>AT-RISK STUDENT INTERVENTIONS *</label><input type="number" placeholder="e.g. 35" value={form.atRiskStudentInterventions} onChange={(e) => set("atRiskStudentInterventions", e.target.value)} /><FieldError msg={errors.atRiskStudentInterventions} /></div>
            <div className={cls("mentoringSessionsCoordinated")}><label>MENTORING SESSIONS COORDINATED *</label><input type="number" placeholder="e.g. 20" value={form.mentoringSessionsCoordinated} onChange={(e) => set("mentoringSessionsCoordinated", e.target.value)} /><FieldError msg={errors.mentoringSessionsCoordinated} /></div>
            <div className={cls("dropoutReductionContribution")}><label>DROPOUT REDUCTION CONTRIBUTION *</label><input placeholder="e.g. Reduced by 8%" value={form.dropoutReductionContribution} onChange={(e) => set("dropoutReductionContribution", e.target.value)} /><FieldError msg={errors.dropoutReductionContribution} /></div>
            <div className={cls("studentGrievanceResolution")}><label>STUDENT GRIEVANCE RESOLUTION % *</label><input type="number" placeholder="e.g. 93" value={form.studentGrievanceResolution} onChange={(e) => set("studentGrievanceResolution", e.target.value)} /><FieldError msg={errors.studentGrievanceResolution} /></div>
            <div className={cls("placementCoordinationContribution")}><label>PLACEMENT COORDINATION CONTRIBUTION *</label><input placeholder="e.g. Drives, student mapping, follow-up" value={form.placementCoordinationContribution} onChange={(e) => set("placementCoordinationContribution", e.target.value)} /><FieldError msg={errors.placementCoordinationContribution} /></div>
            <div className={cls("internshipCoordinationCount")}><label>INTERNSHIP COORDINATION COUNT *</label><input type="number" placeholder="e.g. 45" value={form.internshipCoordinationCount} onChange={(e) => set("internshipCoordinationCount", e.target.value)} /><FieldError msg={errors.internshipCoordinationCount} /></div>
            <div className={cls("remedialProgrammeCoordination")}><label>REMEDIAL PROGRAMME COORDINATION *</label><input placeholder="e.g. Maths remedial, coding support" value={form.remedialProgrammeCoordination} onChange={(e) => set("remedialProgrammeCoordination", e.target.value)} /><FieldError msg={errors.remedialProgrammeCoordination} /></div>
            <div className={cls("studentParticipationInActivities")}><label>STUDENT PARTICIPATION IN ACTIVITIES *</label><input placeholder="e.g. 70%" value={form.studentParticipationInActivities} onChange={(e) => set("studentParticipationInActivities", e.target.value)} /><FieldError msg={errors.studentParticipationInActivities} /></div>
            <div className={cls("studentProgressionTracking")}>
              <label>STUDENT PROGRESSION TRACKING *</label>
              <select value={form.studentProgressionTracking} onChange={(e) => set("studentProgressionTracking", e.target.value)}>
                <option>Select...</option><option>Regular</option><option>Periodic</option><option>Need-based</option><option>Not Maintained</option>
              </select>
              <FieldError msg={errors.studentProgressionTracking} />
            </div>
            <div className={cls("certificationCompletionMonitoring")}>
              <label>CERTIFICATION COMPLETION MONITORING *</label>
              <select value={form.certificationCompletionMonitoring} onChange={(e) => set("certificationCompletionMonitoring", e.target.value)}>
                <option>Select...</option><option>Regular</option><option>Periodic</option><option>Need-based</option><option>Not Applicable</option>
              </select>
              <FieldError msg={errors.certificationCompletionMonitoring} />
            </div>
            <div className={cls("parentCommunicationFrequency")}>
              <label>PARENT COMMUNICATION FREQUENCY *</label>
              <select value={form.parentCommunicationFrequency} onChange={(e) => set("parentCommunicationFrequency", e.target.value)}>
                <option>Select...</option><option>Weekly</option><option>Monthly</option><option>Term-wise</option><option>Need-based</option>
              </select>
              <FieldError msg={errors.parentCommunicationFrequency} />
            </div>
            <div className={cls("studentSatisfactionScore")}><label>STUDENT SATISFACTION SCORE *</label><input type="number" placeholder="e.g. 4.3 / 5" value={form.studentSatisfactionScore} onChange={(e) => set("studentSatisfactionScore", e.target.value)} /><FieldError msg={errors.studentSatisfactionScore} /></div>
          </div>
        </section>

        {/* ── NAAC, IQAC & COMPLIANCE DATA ── */}
        <section className="sectionCard">
          <h2>NAAC, IQAC & COMPLIANCE DATA</h2>
          <div className="inlineGroup">
            <div className={cls("naacDocumentationHandled")}>
              <label>NAAC DOCUMENTATION HANDLED *</label>
              <select value={form.naacDocumentationHandled} onChange={(e) => set("naacDocumentationHandled", e.target.value)}>
                <option>Select...</option><option>Yes</option><option>No</option><option>Partial</option>
              </select>
              <FieldError msg={errors.naacDocumentationHandled} />
            </div>
            <div className="field">
              <label>UPLOAD NAAC DOCUMENT SAMPLE</label>
              <FileUpload id="upload-naac-docs" field="naacDocumentSample" fileName={form.naacDocumentSample} setForm={setForm} multiple />
            </div>
          </div>
          <div className="formGrid">
            <div className={cls("criterionOwnership")}>
              <label>CRITERION OWNERSHIP *</label>
              <select value={form.criterionOwnership} onChange={(e) => set("criterionOwnership", e.target.value)}>
                <option>Select...</option>
                <option>Criterion 1 - Curriculum Aspects</option><option>Criterion 2 - Teaching-Learning</option>
                <option>Criterion 5 - Student Support</option><option>Criterion 6 - Governance</option>
                <option>Criterion 7 - Best Practices</option><option>Multiple Criteria</option>
              </select>
              <FieldError msg={errors.criterionOwnership} />
            </div>
            <div className={cls("aqarContribution")}>
              <label>AQAR CONTRIBUTION *</label>
              <select value={form.aqarContribution} onChange={(e) => set("aqarContribution", e.target.value)}>
                <option>Select...</option><option>Major Contribution</option><option>Supporting Contribution</option><option>Not Involved</option>
              </select>
              <FieldError msg={errors.aqarContribution} />
            </div>
            <div className={cls("ssrContribution")}>
              <label>SSR CONTRIBUTION *</label>
              <select value={form.ssrContribution} onChange={(e) => set("ssrContribution", e.target.value)}>
                <option>Select...</option><option>Major Contribution</option><option>Supporting Contribution</option><option>Not Involved</option>
              </select>
              <FieldError msg={errors.ssrContribution} />
            </div>
            <div className={cls("academicAuditParticipation")}>
              <label>ACADEMIC AUDIT PARTICIPATION *</label>
              <select value={form.academicAuditParticipation} onChange={(e) => set("academicAuditParticipation", e.target.value)}>
                <option>Select...</option><option>Participated</option><option>Not Participated</option>
              </select>
              <FieldError msg={errors.academicAuditParticipation} />
            </div>
            <div className={cls("departmentAuditReadiness")}><label>DEPARTMENT AUDIT READINESS % *</label><input type="number" placeholder="e.g. 87" value={form.departmentAuditReadiness} onChange={(e) => set("departmentAuditReadiness", e.target.value)} /><FieldError msg={errors.departmentAuditReadiness} /></div>
            <div className={cls("evidenceUploadCompletion")}><label>EVIDENCE / DOCUMENT UPLOAD COMPLETION % *</label><input type="number" placeholder="e.g. 90" value={form.evidenceUploadCompletion} onChange={(e) => set("evidenceUploadCompletion", e.target.value)} /><FieldError msg={errors.evidenceUploadCompletion} /></div>
            <div className={cls("feedbackCollectionCoordination")}>
              <label>FEEDBACK COLLECTION COORDINATION *</label>
              <select value={form.feedbackCollectionCoordination} onChange={(e) => set("feedbackCollectionCoordination", e.target.value)}>
                <option>Select...</option><option>Student Feedback</option><option>Faculty Feedback</option>
                <option>Employer Feedback</option><option>Alumni Feedback</option><option>All Stakeholders</option>
              </select>
              <FieldError msg={errors.feedbackCollectionCoordination} />
            </div>
            <div className={cls("coPoAttainmentTracking")}>
              <label>CO-PO ATTAINMENT TRACKING *</label>
              <select value={form.coPoAttainmentTracking} onChange={(e) => set("coPoAttainmentTracking", e.target.value)}>
                <option>Select...</option><option>Regular</option><option>Periodic</option><option>Not Maintained</option>
              </select>
              <FieldError msg={errors.coPoAttainmentTracking} />
            </div>
            <div className={cls("bestPracticesDocumented")}><label>BEST PRACTICES DOCUMENTED *</label><input type="number" placeholder="e.g. 4" value={form.bestPracticesDocumented} onChange={(e) => set("bestPracticesDocumented", e.target.value)} /><FieldError msg={errors.bestPracticesDocumented} /></div>
            <div className={cls("valueAddedActivities")}><label>INSTITUTIONAL VALUE-ADDED ACTIVITIES COORDINATED *</label><input type="number" placeholder="e.g. 6" value={form.valueAddedActivities} onChange={(e) => set("valueAddedActivities", e.target.value)} /><FieldError msg={errors.valueAddedActivities} /></div>
            <div className={cls("extensionActivities")}><label>EXTENSION ACTIVITIES COORDINATED *</label><input type="number" placeholder="e.g. 8" value={form.extensionActivities} onChange={(e) => set("extensionActivities", e.target.value)} /><FieldError msg={errors.extensionActivities} /></div>
            <div className={cls("eventReportsSubmitted")}><label>EVENT REPORTS SUBMITTED *</label><input type="number" placeholder="e.g. 18" value={form.eventReportsSubmitted} onChange={(e) => set("eventReportsSubmitted", e.target.value)} /><FieldError msg={errors.eventReportsSubmitted} /></div>
            <div className={cls("academicRecordsVerification")}><label>ACADEMIC RECORDS VERIFICATION % *</label><input type="number" placeholder="e.g. 95" value={form.academicRecordsVerification} onChange={(e) => set("academicRecordsVerification", e.target.value)} /><FieldError msg={errors.academicRecordsVerification} /></div>
            <div className={cls("complianceSubmissionPunctuality")}>
              <label>COMPLIANCE SUBMISSION PUNCTUALITY *</label>
              <select value={form.complianceSubmissionPunctuality} onChange={(e) => set("complianceSubmissionPunctuality", e.target.value)}>
                <option>Select...</option><option>Always On Time</option><option>Mostly On Time</option><option>Delayed</option>
              </select>
              <FieldError msg={errors.complianceSubmissionPunctuality} />
            </div>
            <div className={cls("facultyAppraisalCoordination")}>
              <label>FACULTY APPRAISAL COORDINATION *</label>
              <select value={form.facultyAppraisalCoordination} onChange={(e) => set("facultyAppraisalCoordination", e.target.value)}>
                <option>Select...</option><option>Handled</option><option>Supported</option><option>Not Involved</option>
              </select>
              <FieldError msg={errors.facultyAppraisalCoordination} />
            </div>
            <div className={cls("stakeholderFeedbackCollection")}>
              <label>STAKEHOLDER FEEDBACK COLLECTION *</label>
              <select value={form.stakeholderFeedbackCollection} onChange={(e) => set("stakeholderFeedbackCollection", e.target.value)}>
                <option>Select...</option><option>Handled</option><option>Supported</option><option>Not Involved</option>
              </select>
              <FieldError msg={errors.stakeholderFeedbackCollection} />
            </div>
            <div className={cls("alumniActivityCoordination")}>
              <label>ALUMNI ACTIVITY COORDINATION *</label>
              <select value={form.alumniActivityCoordination} onChange={(e) => set("alumniActivityCoordination", e.target.value)}>
                <option>Select...</option><option>Handled</option><option>Supported</option><option>Not Involved</option>
              </select>
              <FieldError msg={errors.alumniActivityCoordination} />
            </div>
          </div>
        </section>

        {/* ── EVENT, PROGRAMME & ACTIVITY MANAGEMENT ── */}
        <section className="sectionCard">
          <h2>EVENT, PROGRAMME & ACTIVITY MANAGEMENT</h2>
          <div className="formGrid">
            <div className={cls("workshopsCoordinated")}><label>WORKSHOPS COORDINATED *</label><input type="number" placeholder="e.g. 10" value={form.workshopsCoordinated} onChange={(e) => set("workshopsCoordinated", e.target.value)} /><FieldError msg={errors.workshopsCoordinated} /></div>
            <div className={cls("fdpsOrganized")}><label>FDPs ORGANIZED *</label><input type="number" placeholder="e.g. 3" value={form.fdpsOrganized} onChange={(e) => set("fdpsOrganized", e.target.value)} /><FieldError msg={errors.fdpsOrganized} /></div>
            <div className={cls("guestLecturesManaged")}><label>GUEST LECTURES MANAGED *</label><input type="number" placeholder="e.g. 12" value={form.guestLecturesManaged} onChange={(e) => set("guestLecturesManaged", e.target.value)} /><FieldError msg={errors.guestLecturesManaged} /></div>
            <div className={cls("industrialVisitsCoordinated")}><label>INDUSTRIAL VISITS COORDINATED *</label><input type="number" placeholder="e.g. 5" value={form.industrialVisitsCoordinated} onChange={(e) => set("industrialVisitsCoordinated", e.target.value)} /><FieldError msg={errors.industrialVisitsCoordinated} /></div>
            <div className={cls("placementDrivesCoordinated")}><label>PLACEMENT DRIVES COORDINATED *</label><input type="number" placeholder="e.g. 4" value={form.placementDrivesCoordinated} onChange={(e) => set("placementDrivesCoordinated", e.target.value)} /><FieldError msg={errors.placementDrivesCoordinated} /></div>
            <div className={cls("hackathonsEventsManaged")}><label>HACKATHONS / EVENTS MANAGED *</label><input type="number" placeholder="e.g. 6" value={form.hackathonsEventsManaged} onChange={(e) => set("hackathonsEventsManaged", e.target.value)} /><FieldError msg={errors.hackathonsEventsManaged} /></div>
            <div className={cls("clubsStudentActivities")}><label>CLUBS / STUDENT ACTIVITIES SUPERVISED *</label><input type="number" placeholder="e.g. 7" value={form.clubsStudentActivities} onChange={(e) => set("clubsStudentActivities", e.target.value)} /><FieldError msg={errors.clubsStudentActivities} /></div>
            <div className={cls("outreachProgrammes")}><label>OUTREACH PROGRAMMES HANDLED *</label><input type="number" placeholder="e.g. 5" value={form.outreachProgrammes} onChange={(e) => set("outreachProgrammes", e.target.value)} /><FieldError msg={errors.outreachProgrammes} /></div>
            <div className={cls("mouCoordination")}><label>MoU COORDINATION *</label><input type="number" placeholder="e.g. 3" value={form.mouCoordination} onChange={(e) => set("mouCoordination", e.target.value)} /><FieldError msg={errors.mouCoordination} /></div>
            <div className={cls("alumniEventsCoordinated")}><label>ALUMNI EVENTS COORDINATED *</label><input type="number" placeholder="e.g. 2" value={form.alumniEventsCoordinated} onChange={(e) => set("alumniEventsCoordinated", e.target.value)} /><FieldError msg={errors.alumniEventsCoordinated} /></div>
            <div className={cls("communityEngagementProgrammes")}><label>COMMUNITY ENGAGEMENT PROGRAMMES *</label><input type="number" placeholder="e.g. 6" value={form.communityEngagementProgrammes} onChange={(e) => set("communityEngagementProgrammes", e.target.value)} /><FieldError msg={errors.communityEngagementProgrammes} /></div>
            <div className={cls("innovationIncubationActivities")}><label>INNOVATION / INCUBATION SUPPORT ACTIVITIES *</label><input type="number" placeholder="e.g. 4" value={form.innovationIncubationActivities} onChange={(e) => set("innovationIncubationActivities", e.target.value)} /><FieldError msg={errors.innovationIncubationActivities} /></div>
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
          <button type="button" className={`saveBtn${saved ? " savedBtn" : ""}`} onClick={handleSave}>
            {saved ? "✓ Saved!" : "Save Profile"}
          </button>
          <button type="button" className="nextBtn">Next</button>
        </div>
      </main>
    </div>
  );
}
