import { ProfileData } from "@/hooks/profiling/useProfile";

export type ValidationErrors = Partial<Record<keyof ProfileData, string>>;

/* ─────────────────── helpers ─────────────────── */
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRe = /^[+]?[\d\s\-().]{7,15}$/;
const urlRe = /^https?:\/\/.+/i;

function phone(val?: string | null): string | undefined {
  if (!val?.trim()) return undefined;
  return phoneRe.test(val.trim())
    ? undefined
    : "Enter a valid phone number (e.g. +91 98765 43210)";
}

function requirePhone(
  val?: string | null,
  label = "Phone",
): string | undefined {
  if (!val?.trim()) return `${label} is required`;
  return phone(val);
}

function requireUrl(val?: string | null, label = "URL"): string | undefined {
  if (!val?.trim()) return `${label} is required`;
  return urlRe.test(val.trim())
    ? undefined
    : `Enter a valid ${label} starting with https://`;
}

function validateUrl(val?: string | null, label = "URL"): string | undefined {
  if (!val?.trim()) return undefined; // optional — only format-check if provided
  return urlRe.test(val.trim())
    ? undefined
    : `Enter a valid ${label} starting with https://`;
}

function percentage(
  val?: string | null,
  label = "Percentage",
): string | undefined {
  if (!val?.trim()) return undefined;
  const n = parseFloat(val.replace("%", "").trim());
  return !isNaN(n) && n >= 0 && n <= 100 ? undefined : `${label} must be 0–100`;
}

function requirePercentage(
  val?: string | null,
  label = "Percentage",
): string | undefined {
  if (!val?.trim()) return `${label} is required`;
  return percentage(val, label);
}

function requireScore(
  val?: string | null,
  label = "Score",
): string | undefined {
  if (!val?.trim()) return `${label} is required`;
  const n = parseFloat(val.trim());
  if (isNaN(n) || n < 0) return `${label} must be a positive number`;
  return undefined;
}

function notPast(val?: string | null, label = "Date"): string | undefined {
  if (!val) return undefined;
  return new Date(val) > new Date()
    ? `${label} cannot be in the future`
    : undefined;
}

/* ─────────────────── CSV-tab validator (Identity / Location / Enrollment) ─────────────────── */
export function validateCsvProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

  /* Identity */
  if (!data.fullName?.trim()) e.fullName = "Full Name is required";
  else if (data.fullName.trim().length < 2)
    e.fullName = "Full Name must be at least 2 characters";

  if (!data.email?.trim()) e.email = "Email is required";
  else if (!emailRe.test(data.email.trim()))
    e.email = "Enter a valid email address";

  if (!data.mobile?.trim()) e.mobile = "Mobile number is required";
  else {
    const mErr = phone(data.mobile);
    if (mErr) e.mobile = mErr;
  }

  if (data.dob) {
    const dobDate = new Date(data.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    if (dobDate > today) e.dob = "Date of Birth cannot be in the future";
    else if (age < 10) e.dob = "Age seems too low — please check the date";
    else if (age > 100) e.dob = "Date of Birth seems too far back";
  }

  /* Location — optional but format-checked if provided */
  if (data.country?.trim() && data.country.trim().length < 2)
    e.country = "Enter a valid country name";
  if (data.state?.trim() && data.state.trim().length < 2)
    e.state = "Enter a valid state name";
  if (data.city?.trim() && data.city.trim().length < 2)
    e.city = "Enter a valid city name";
  if (!data.nationality?.trim()) e.nationality = "Nationality is required";

  if (!data.id_proof_type?.trim())
    e.id_proof_type = "Identity Document Type is required";

  if (!data.id_proof_number?.trim())
    e.id_proof_number = "Identity Document Number is required";

  if (!data.identity_issuing_country?.trim())
    e.identity_issuing_country = "Issuing Country is required";

  if (!data.alternateemailid?.trim())
    e.alternateemailid = "Alternate Email-id is required";
  else if (!emailRe.test(data.alternateemailid.trim()))
    e.alternateemailid = "Enter a valid email address";

  if (!data.preferredRoles?.some((r) => r.trim()))
    e.preferredRole = "At least one Preferred Role is required";

  if (!data.preferredIndustries?.some((i) => i.trim()))
    e.preferredIndustry = "At least one Preferred Industry is required";

  if (!data.selfSkills?.some((s) => s.name?.trim()))
    e.selfSkills = "At least one Skill is required";

  const websiteErr = validateUrl(data.personalWebsite, "Personal Website");
  if (websiteErr) e.personalWebsite = websiteErr;

  /* Enrollment dates */
  const enrollErr = notPast(data.enrollmentDate, "Enrollment Date");
  if (enrollErr) e.enrollmentDate = enrollErr;

  const joinErr = notPast(data.joiningDate, "Joining Date");
  if (joinErr) e.joiningDate = joinErr;

  if (data.enrollmentDate && data.joiningDate) {
    if (new Date(data.joiningDate) < new Date(data.enrollmentDate))
      e.joiningDate = "Joining Date cannot be before Enrollment Date";
  }

  return e;
}

/* ─────────────────── Corporate Stage-tab validator ─────────────────── */
export function validateCorporateProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

  /* Stage 1 — Identity & Organisation */
  if (!data.employeeIdentity?.trim())
    e.employeeIdentity = "Employee Identity is required";

  if (!data.department?.trim()) e.department = "Department is required";

  if (!data.role?.trim()) e.role = "Role is required";

  if (!data.employmentStatus?.trim())
    e.employmentStatus = "Employment Status is required";

  const filledLocations = (data.preferredLocation ?? []).filter((l) =>
    l.trim(),
  );
  if (filledLocations.length === 0)
    e.preferredLocation = "At least one Preferred Location is required";
  else if ((data.preferredLocation ?? []).some((l) => !l.trim()))
    e.preferredLocation = "Remove empty location entries";

  /* Stage 2 — Self Profile */
  if (!data.careerGoals?.trim()) e.careerGoals = "Career Goals is required";
  else if (data.careerGoals.trim().length < 10)
    e.careerGoals = "Career Goals should be at least 10 characters";

  if (!data.learningGoals?.trim())
    e.learningGoals = "Learning Goals is required";
  else if (data.learningGoals.trim().length < 10)
    e.learningGoals = "Learning Goals should be at least 10 characters";

  /* Stage 3 — Assessment */
  if (!data.technicalSkillScore?.trim())
    e.technicalSkillScore = "Technical Skill Score is required";

  if (!data.functionalSkillScore?.trim())
    e.functionalSkillScore = "Functional Skill Score is required";

  /* Stage 4 — Learning Behaviour */
  if (!data.trainingAttendance?.trim())
    e.trainingAttendance = "Training Attendance is required";
  else {
    const pct = parseFloat(data.trainingAttendance.replace("%", "").trim());
    if (isNaN(pct) || pct < 0 || pct > 100)
      e.trainingAttendance = "Attendance must be a percentage between 0–100";
  }

  /* Stage 5 — Certification */
  if (!data.certificationTracking?.trim())
    e.certificationTracking = "At least one Certification is required";

  /* Stage 6 — Performance */
  if (!data.kpiPerformance?.trim())
    e.kpiPerformance = "KPI Performance is required";

  /* Stage 7 — Career Progression */
  if (!data.careerGrowth?.trim()) e.careerGrowth = "Career Growth is required";

  /* Stage 8 — Compliance */
  if (!data.mandatoryTrainingCompletion?.trim())
    e.mandatoryTrainingCompletion = "Mandatory Training Completion is required";

  return e;
}

/* ─────────────────── Combined validator (used in page.tsx handleSave) ─────────────────── */
export function validateProfile(data: ProfileData): ValidationErrors {
  return {
    ...validateCsvProfile(data),
    ...validateSelfProfile(data),
  };
}

/* ─────────────────── field-level (on blur) ─────────────────── */
export function validateField(
  field: keyof ProfileData,
  value: unknown,
  allData?: ProfileData,
): string | undefined {
  const dummy = { ...(allData ?? {}), [field]: value } as ProfileData;
  return validateProfile(dummy)[field];
}

export function validateSelfProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

  // NGO Required Fields
  if (!data.ngo_gender?.trim()) e.ngo_gender = "Gender is required";

  if (!data.ngo_dateOfBirth?.trim())
    e.ngo_dateOfBirth = "Date of birth is required";

  if (!data.ngo_nationality?.trim())
    e.ngo_nationality = "Nationality is required";

  if (!data.ngo_primaryLearningGoal?.trim())
    e.ngo_primaryLearningGoal = "Primary learning goal is required";

  // Personal Preferences
  if (!data.nationality?.trim()) e.nationality = "Nationality is required";

  if (!data.id_proof_type?.trim())
    e.id_proof_type = "Identity Document Type is required";

  if (!data.id_proof_number?.trim())
    e.id_proof_number = "Identity Document Number is required";

  if (!data.identity_issuing_country?.trim())
    e.identity_issuing_country = "Issuing Country is required";

  // Contact
  const altErr = requirePhone(data.alternateContact, "Alternate Contact");
  if (altErr) e.alternateContact = altErr;

  if (!data.alternateemailid?.trim())
    e.alternateemailid = "Alternate Email-id is required";
  else if (!emailRe.test(data.alternateemailid.trim()))
    e.alternateemailid = "Enter a valid email address";

  // Education History
  if (!data.educationHistory?.length) {
    e.educationHistory = "At least one education record is required";
  } else {
    const hasInvalidEducation = data.educationHistory.some(
      (edu) =>
        !edu.level?.trim() ||
        !edu.qualification?.trim() ||
        !edu.institution?.trim() ||
        !edu.fieldOfStudy?.trim() ||
        !edu.startYear?.trim() ||
        !edu.endYear?.trim(),
    );

    if (hasInvalidEducation)
      e.educationHistory = "Please complete all required education fields";
  }

  // Certifications
  if (data.certifications?.length) {
    const hasInvalidCertification = data.certifications.some(
      (cert) =>
        !cert.name?.trim() ||
        !cert.issuingOrg?.trim() ||
        !cert.issueDate?.trim(),
    );

    if (hasInvalidCertification)
      e.certifications = "Please complete all required certification fields";
  }

  // Career Intent
  if (!data.careerGoal?.trim()) e.careerGoal = "Career Goal is required";
  else if (data.careerGoal.trim().length < 10)
    e.careerGoal = "Career Goal should be at least 10 characters";

  if (!data.preferredRoles?.some((role) => role.trim()))
    e.preferredRole = "At least one Preferred Role is required";

  if (!data.preferredIndustries?.some((industry) => industry.trim()))
    e.preferredIndustry = "At least one Preferred Industry is required";

  if (!data.employmentStatus?.trim())
    e.employmentStatus = "Employment Status is required";

  if (!data.desiredRole?.trim()) e.desiredRole = "Desired Role is required";

  if (!data.preferredLocation?.some((location) => location.trim()))
    e.preferredLocation = "At least one Preferred Location is required";

  if (!data.expectedSalary?.trim())
    e.expectedSalary = "Expected Salary is required";

  if (!data.workHistory?.length) {
    e.workHistory = "At least one Work History entry is required";
  } else {
    const hasInvalidWorkHistory = data.workHistory.some(
      (entry) =>
        !entry.company?.trim() ||
        !entry.role?.trim() ||
        !entry.from?.trim() ||
        !entry.to?.trim(),
    );

    if (hasInvalidWorkHistory)
      e.workHistory = "Please complete all required Work History fields";
  }

  // Learning Intent
  if (!data.learningGoal?.trim()) e.learningGoal = "Learning Goal is required";
  else if (data.learningGoal.trim().length < 10)
    e.learningGoal = "Learning Goal should be at least 10 characters";

  if (!data.preferredLearningMode?.trim())
    e.preferredLearningMode = "Preferred Learning Mode is required";

  if (!data.preferredContentType?.trim())
    e.preferredContentType = "Preferred Content Type is required";

  if (!data.languagePreference?.trim())
    e.languagePreference = "Language preference is required";

  // Self Skills
  if (!data.selfSkills?.length) {
    e.selfSkills = "At least one skill is required";
  } else {
    const hasInvalidSkill = data.selfSkills.some(
      (skill) =>
        !skill.name?.trim() ||
        !skill.category?.trim() ||
        !skill.domain?.trim() ||
        !skill.level?.trim(),
    );

    if (hasInvalidSkill)
      e.selfSkills = "Please complete all required skill fields";
  }

  // Portfolio
  if (!data.resumeFileName?.trim()) e.resumeFileName = "Resume is required";

  const portfolioErr = requireUrl(data.portfolioLink, "Portfolio Link");
  if (portfolioErr) e.portfolioLink = portfolioErr;

  const linkedinErr = requireUrl(data.linkedinUrl, "LinkedIn URL");
  if (linkedinErr) e.linkedinUrl = linkedinErr;
  else if (
    data.linkedinUrl?.trim() &&
    !data.linkedinUrl.includes("linkedin.com")
  )
    e.linkedinUrl = "Must be a linkedin.com URL";

  if (!data.instagramId?.trim()) e.instagramId = "Instagram ID is required";
  else if (!/^@?[\w.]{1,30}$/.test(data.instagramId.trim()))
    e.instagramId = "Enter a valid Instagram username";

  if (!data.facebookId?.trim()) e.facebookId = "Facebook ID / URL is required";

  const githubErr = requireUrl(data.githubUrl, "GitHub URL");
  if (githubErr) e.githubUrl = githubErr;
  else if (data.githubUrl?.trim() && !data.githubUrl.includes("github.com"))
    e.githubUrl = "Must be a github.com URL";

  const twitterErr = requireUrl(data.twitterUrl, "Twitter / X URL");
  if (twitterErr) e.twitterUrl = twitterErr;

  if (!data.portfolioEvidence?.length || !data.portfolioEvidence[0]?.trim())
    e.portfolioEvidence = "At least one Portfolio Evidence entry is required";

  const websiteErr = validateUrl(data.personalWebsite, "Personal Website");
  if (websiteErr) e.personalWebsite = websiteErr;

  return e;
}

/* ─────────────────── NGO Profile validator ─────────────────── */
export function validateNgoProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d\s\-().]{7,15}$/;
  const urlRe   = /^https?:\/\/.+/i;

  // ── Personal Identity ──
  if (!data.ngo_gender?.trim())
    e.ngo_gender = "Gender is required";

  if (!data.ngo_dateOfBirth)
    e.ngo_dateOfBirth = "Date of Birth is required";
  else {
    const dob   = new Date(data.ngo_dateOfBirth);
    const today = new Date();
    const age   = today.getFullYear() - dob.getFullYear();
    if (dob > today)      e.ngo_dateOfBirth = "Date of Birth cannot be in the future";
    else if (age < 10)    e.ngo_dateOfBirth = "Age seems too low — please check the date";
    else if (age > 100)   e.ngo_dateOfBirth = "Date of Birth seems too far back";
  }

  if (!data.ngo_nationality?.trim())
    e.ngo_nationality = "Nationality is required";

  // ── Communication ── ngo_primaryEmail ngo_mobileNumber ngo_preferredLanguage
  if (!data.ngo_primaryEmail?.trim())
    e.ngo_primaryEmail = "Email is required";
  else if (!emailRe.test(data.ngo_primaryEmail.trim()))
    e.ngo_primaryEmail = "Enter a valid email address";

  if (!data.ngo_mobileNumber?.trim())
    e.ngo_mobileNumber = "Mobile number is required";
  else if (!phoneRe.test(data.ngo_mobileNumber.trim()))
    e.ngo_mobileNumber = "Enter a valid phone number (e.g. +91 98765 43210)";

  if (!data.ngo_preferredLanguage?.trim())
    e.ngo_preferredLanguage = "Preferred Language is required";

  // ── Location ──
  if (!data.ngo_country?.trim())
    e.ngo_country = "Country is required";

  // ── Education ──
  if (!data.ngo_highestEducation?.trim())
    e.ngo_highestEducation = "Highest Education Level is required";

  // ── Access & Learning ──
  if (!data.ngo_learningModePreference?.trim())
    e.ngo_learningModePreference = "Learning Mode Preference is required";

  // ── Learning Goals ──
  if (!data.ngo_primaryLearningGoal?.trim())
    e.ngo_primaryLearningGoal = "Primary Learning Goal is required";
  else if (data.ngo_primaryLearningGoal.trim().length < 10)
    e.ngo_primaryLearningGoal = "Please describe your goal in at least 10 characters";

  // ── Work Domain ──
  if (!data.ngo_sector?.trim())
    e.ngo_sector = "Sector / Industry is required";

  // ── Role ──
  if (!data.ngo_targetRoleType?.trim())
    e.ngo_targetRoleType = "Target Role Type is required";

  // ── Programme ──
  if (!data.ngo_programmeName?.trim())
    e.ngo_programmeName = "Programme Enrolled In is required";

  // ── Career Intent ──
  if (!data.ngo_careerGoal?.trim())
    e.ngo_careerGoal = "Long-term Career Goal is required";
  else if (data.ngo_careerGoal.trim().length < 10)
    e.ngo_careerGoal = "Career Goal should be at least 10 characters";

  if (!data.ngo_preferredJobRole?.trim())
    e.ngo_preferredJobRole = "Preferred Job Role is required";

  if (!data.ngo_workModePreference?.trim())
    e.ngo_workModePreference = "Work Mode Preference is required";

  // ── Portfolio ──
  if (!data.resumeFileName?.trim())
    e.resumeFileName = "Resume is required";

  if (!data.portfolioLink?.trim())
    e.portfolioLink = "Portfolio Link is required";
  else if (!urlRe.test(data.portfolioLink.trim()))
    e.portfolioLink = "Enter a valid URL starting with https://";

  if (!data.linkedinUrl?.trim())
    e.linkedinUrl = "LinkedIn URL is required";
  else if (!urlRe.test(data.linkedinUrl.trim()))
    e.linkedinUrl = "Enter a valid URL starting with https://";
  else if (!data.linkedinUrl.includes("linkedin.com"))
    e.linkedinUrl = "Must be a linkedin.com URL";

  if (!data.portfolioEvidence?.length || !data.portfolioEvidence[0]?.trim())
    e.portfolioEvidence = "At least one Portfolio Evidence entry is required";

  return e;
}

/* ─────────────────── Government Profile validator ─────────────────── */
export function validateGovernmentProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

  // ── Communication & Language ──
  if (!data.gov_primaryEmail?.trim())
    e.gov_primaryEmail = "Primary email is required";
  else if (!emailRe.test(data.gov_primaryEmail.trim()))
    e.gov_primaryEmail = "Enter a valid email address";

  if (!data.gov_mobileNumber?.trim())
    e.gov_mobileNumber = "Mobile number is required";
  else if (!phoneRe.test(data.gov_mobileNumber.trim()))
    e.gov_mobileNumber = "Enter a valid phone number (e.g. +91 98765 43210)";

  if (!data.gov_preferredLanguage?.trim())
    e.gov_preferredLanguage = "Preferred language is required";

  if (!data.gov_timezone?.trim())
    e.gov_timezone = "Timezone is required";

  // ── Learning Background ──
  if (!data.gov_highestEducation?.trim())
    e.gov_highestEducation = "Highest Education Level is required";

  if (!data.gov_digitalLiteracy?.trim())
    e.gov_digitalLiteracy = "Digital Literacy Level is required";

  // ── Skills, Career Goals & Learning Preferences ──
  if (!data.gov_primaryResponsibilities?.length || !data.gov_primaryResponsibilities[0]?.trim())
    e.gov_primaryResponsibilities = "At least one Primary Responsibility is required";

  if (!data.gov_workDomain?.trim())
    e.gov_workDomain = "Work Domain is required";

  if (!data.gov_learningModePreference?.trim())
    e.gov_learningModePreference = "Preferred Learning Mode is required";

  if (!data.gov_deviceAvailability?.length)
    e.gov_deviceAvailability = "Select at least one available device";

  // ── Competency & Role Profiling ──
  if (!data.gov_roleCompetency?.trim())
    e.gov_roleCompetency = "Role Competency Level is required";

  if (!data.gov_digitalCompetency?.trim())
    e.gov_digitalCompetency = "Digital Competency Level is required";

  if (!data.gov_governanceCapability?.trim())
    e.gov_governanceCapability = "Governance Capability Area is required";

  if (!data.gov_erpProficiency?.trim())
    e.gov_erpProficiency = "ERP / System Proficiency is required";

  // ── Job / Role Identity ──
  if (!data.gov_jobTitle?.trim())
    e.gov_jobTitle = "Job Title / Designation is required";

  if (!data.gov_jobGrade?.trim())
    e.gov_jobGrade = "Pay Grade / Band is required";

  if (!data.gov_serviceCategory?.trim())
    e.gov_serviceCategory = "Service Category is required";

  if (!data.gov_roleType?.trim())
    e.gov_roleType = "Role Type is required";

  // ── Department & Ministry ──
  if (!data.gov_ministry?.trim())
    e.gov_ministry = "Ministry is required";

  if (!data.gov_department?.trim())
    e.gov_department = "Department / Agency is required";

  // ── Training Mandate Tracking ──
  if (!data.gov_trainingComplianceStatus?.trim())
    e.gov_trainingComplianceStatus = "Training Compliance Status is required";

  // ── Years of Service ──
  if (!data.gov_yearsInCurrentRole?.trim())
    e.gov_yearsInCurrentRole = "Years in Current Role is required";

  if (!data.gov_totalGovtService?.trim())
    e.gov_totalGovtService = "Total Government Service is required";

  // ── Connectivity ──
  if (!data.gov_internetConnectivity?.trim())
    e.gov_internetConnectivity = "Internet Connectivity Type is required";

  // ── Posting Location ──
  if (!data.gov_postingLocationType?.trim())
    e.gov_postingLocationType = "Posting Location Type is required";

  // ── Portfolio ──
  if (!data.resumeFileName?.trim())
    e.resumeFileName = "Resume is required";

  const portfolioErr = requireUrl(data.portfolioLink, "Portfolio Link");
  if (portfolioErr) e.portfolioLink = portfolioErr;

  const linkedinErr = requireUrl(data.linkedinUrl, "LinkedIn URL");
  if (linkedinErr) e.linkedinUrl = linkedinErr;
  else if (data.linkedinUrl?.trim() && !data.linkedinUrl.includes("linkedin.com"))
    e.linkedinUrl = "Must be a linkedin.com URL";

  if (!data.instagramId?.trim())
    e.instagramId = "Instagram ID is required";
  else if (!/^@?[\w.]{1,30}$/.test(data.instagramId.trim()))
    e.instagramId = "Enter a valid Instagram username";

  if (!data.facebookId?.trim())
    e.facebookId = "Facebook ID / URL is required";

  const githubErr = requireUrl(data.githubUrl, "GitHub URL");
  if (githubErr) e.githubUrl = githubErr;
  else if (data.githubUrl?.trim() && !data.githubUrl.includes("github.com"))
    e.githubUrl = "Must be a github.com URL";

  const twitterErr = requireUrl(data.twitterUrl, "Twitter / X URL");
  if (twitterErr) e.twitterUrl = twitterErr;

  if (!data.portfolioEvidence?.length || !data.portfolioEvidence[0]?.trim())
    e.portfolioEvidence = "At least one Portfolio Evidence entry is required";

  return e;
}