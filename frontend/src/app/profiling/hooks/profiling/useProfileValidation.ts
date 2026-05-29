import { ProfileData } from "@/app/profiling/hooks/profiling/useProfile";

export type ValidationErrors = Record<string, string>;

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
  if (!val?.trim()) return undefined; 
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

export function validateCsvProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

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

export function validateCorporateProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

  const altContactErr = requirePhone(
    data.alternateContact,
    "Alternate Contact",
  );
  if (altContactErr) e.alternateContact = altContactErr;

  if (!data.alternateemailid?.trim())
    e.alternateemailid = "Email-id is required";
  else if (!emailRe.test(data.alternateemailid.trim()))
    e.alternateemailid = "Enter a valid email address";

  if (!data.careerGoals?.trim()) e.careerGoals = "Career Goals is required";
  else if (data.careerGoals.trim().length < 10)
    e.careerGoals = "Career Goals should be at least 10 characters";

  if (!data.learningGoals?.trim())
    e.learningGoals = "Learning Goals is required";
  else if (data.learningGoals.trim().length < 10)
    e.learningGoals = "Learning Goals should be at least 10 characters";

  if (!data.certifications?.length || !data.certifications[0]?.name?.trim())
    e.certifications = "At least one Certification is required";

  if (!data.careerGoal?.trim()) e.careerGoal = "Career Goal is required";
  else if (data.careerGoal.trim().length < 10)
    e.careerGoal = "Career Goal should be at least 10 characters";

  if (!data.preferredRoles?.some((r) => r.trim()))
    e.preferredRole = "At least one Preferred Role is required";

  if (!data.preferredIndustries?.some((i) => i.trim()))
    e.preferredIndustry = "At least one Preferred Industry is required";

  if (!data.employmentStatus?.trim())
    e.employmentStatus = "Employment Status is required";

  if (!data.desiredRole?.trim()) e.desiredRole = "Desired Role is required";

  if (!data.preferredLocation?.some((l) => l.trim()))
    e.preferredLocation = "At least one Preferred Location is required";

  if (!data.expectedSalary?.trim())
    e.expectedSalary = "Expected Salary is required";

  if (!data.workHistory?.length || !data.workHistory[0]?.company?.trim()) {
    e.workHistory = "At least one Work History entry is required";
  } else {
    const hasInvalid = data.workHistory.some(
      (entry) =>
        !entry.company?.trim() ||
        !entry.role?.trim() ||
        !entry.from?.trim() ||
        !entry.to?.trim(),
    );
    if (hasInvalid)
      e.workHistory = "Please complete all required Work History fields";
  }

  if (!data.selfSkills?.length) {
    e.selfSkills = "At least one skill is required";
  } else {
    const hasInvalid = data.selfSkills.some(
      (skill) =>
        !skill.name?.trim() ||
        !skill.category?.trim() ||
        !skill.domain?.trim() ||
        !skill.level?.trim(),
    );
    if (hasInvalid)
      e.selfSkills =
        "Please complete all required skill fields (Name, Category, Domain, Level)";
  }

  if (!data.learningGoal?.trim()) e.learningGoal = "Learning Goal is required";
  else if (data.learningGoal.trim().length < 10)
    e.learningGoal = "Learning Goal should be at least 10 characters";

  if (!data.preferredLearningMode?.trim())
    e.preferredLearningMode = "Preferred Learning Mode is required";

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

  return e;
}

export function validateProfile(data: ProfileData): ValidationErrors {
  return {
    ...validateCsvProfile(data),
    ...validateSelfProfile(data),
  };
}

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

  if (!data.nationality?.trim()) e.nationality = "Nationality is required";

  if (!data.id_proof_type?.trim())
    e.id_proof_type = "Identity Document Type is required";

  if (!data.id_proof_number?.trim())
    e.id_proof_number = "Identity Document Number is required";

  if (!data.identity_issuing_country?.trim())
    e.identity_issuing_country = "Issuing Country is required";

  const altContactErr = requirePhone(
    data.alternateContact,
    "Alternate Contact",
  );
  if (altContactErr) e.alternateContact = altContactErr;

  if (!data.alternateemailid?.trim())
    e.alternateemailid = "Alternate Email-id is required";
  else if (!emailRe.test(data.alternateemailid.trim()))
    e.alternateemailid = "Enter a valid email address";

  if (!data.educationHistory?.length) {
    e.educationHistory = "At least one education record is required";
  } else {
    const hasInvalid = data.educationHistory.some(
      (edu) =>
        !edu.level?.trim() ||
        !edu.qualification?.trim() ||
        !edu.institution?.trim() ||
        !edu.fieldOfStudy?.trim() ||
        !edu.startYear?.trim() ||
        !edu.endYear?.trim(),
    );
    if (hasInvalid)
      e.educationHistory = "Please complete all required education fields";
  }

  if (data.certifications?.length) {
    const hasInvalid = data.certifications.some(
      (cert) =>
        !cert.name?.trim() ||
        !cert.issuingOrg?.trim() ||
        !cert.issueDate?.trim(),
    );
    if (hasInvalid)
      e.certifications = "Please complete all required certification fields";
  }

  if (!data.careerGoal?.trim()) e.careerGoal = "Career Goal is required";
  else if (data.careerGoal.trim().length < 10)
    e.careerGoal = "Career Goal should be at least 10 characters";

  if (!data.preferredRoles?.some((r) => r.trim()))
    e.preferredRole = "At least one Preferred Role is required";

  if (!data.preferredIndustries?.some((i) => i.trim()))
    e.preferredIndustry = "At least one Preferred Industry is required";

  if (!data.learningGoal?.trim()) e.learningGoal = "Learning Goal is required";
  else if (data.learningGoal.trim().length < 10)
    e.learningGoal = "Learning Goal should be at least 10 characters";

  if (!data.preferredLearningMode?.trim())
    e.preferredLearningMode = "Preferred Learning Mode is required";

  if (!data.selfSkills?.length) {
    e.selfSkills = "At least one skill is required";
  } else {
    const hasInvalid = data.selfSkills.some(
      (skill) =>
        !skill.name?.trim() ||
        !skill.category?.trim() ||
        !skill.domain?.trim() ||
        !skill.level?.trim(),
    );
    if (hasInvalid) e.selfSkills = "Please complete all required skill fields";
  }

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

export function validateNgoProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d\s\-().]{7,15}$/;
  const urlRe = /^https?:\/\/.+/i;

  if (!data.ngo_gender?.trim()) e.ngo_gender = "Gender is required";

  if (!data.ngo_dateOfBirth) e.ngo_dateOfBirth = "Date of Birth is required";
  else {
    const dob = new Date(data.ngo_dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    if (dob > today)
      e.ngo_dateOfBirth = "Date of Birth cannot be in the future";
    else if (age < 10)
      e.ngo_dateOfBirth = "Age seems too low — please check the date";
    else if (age > 100) e.ngo_dateOfBirth = "Date of Birth seems too far back";
  }

  if (!data.ngo_nationality?.trim())
    e.ngo_nationality = "Nationality is required";

  if (!data.ngo_primaryEmail?.trim()) e.ngo_primaryEmail = "Email is required";
  else if (!emailRe.test(data.ngo_primaryEmail.trim()))
    e.ngo_primaryEmail = "Enter a valid email address";

  if (!data.ngo_mobileNumber?.trim())
    e.ngo_mobileNumber = "Mobile number is required";
  else if (!phoneRe.test(data.ngo_mobileNumber.trim()))
    e.ngo_mobileNumber = "Enter a valid phone number (e.g. +91 98765 43210)";

  if (!data.ngo_preferredLanguage?.trim())
    e.ngo_preferredLanguage = "Preferred Language is required";

  if (!data.ngo_country?.trim()) e.ngo_country = "Country is required";

  if (!data.ngo_highestEducation?.trim())
    e.ngo_highestEducation = "Highest Education Level is required";

  if (!data.ngo_learningModePreference?.trim())
    e.ngo_learningModePreference = "Learning Mode Preference is required";

  if (!data.ngo_primaryLearningGoal?.trim())
    e.ngo_primaryLearningGoal = "Primary Learning Goal is required";
  else if (data.ngo_primaryLearningGoal.trim().length < 10)
    e.ngo_primaryLearningGoal =
      "Please describe your goal in at least 10 characters";

  if (!data.ngo_state?.trim()) e.ngo_state = "State / Province is required";
  if (!data.ngo_district?.trim())
    e.ngo_district = "District / City is required";

  if (!data.ngo_sector?.trim()) e.ngo_sector = "Sector / Industry is required";

  if (!data.ngo_targetRoleType?.trim())
    e.ngo_targetRoleType = "Target Role Type is required";

  if (!data.ngo_programmeName?.trim())
    e.ngo_programmeName = "Programme Enrolled In is required";

  if (!data.ngo_careerGoal?.trim())
    e.ngo_careerGoal = "Long-term Career Goal is required";
  else if (data.ngo_careerGoal.trim().length < 10)
    e.ngo_careerGoal = "Career Goal should be at least 10 characters";

  if (!data.ngo_preferredJobRole?.trim())
    e.ngo_preferredJobRole = "Preferred Job Role is required";

  if (!data.ngo_workModePreference?.trim())
    e.ngo_workModePreference = "Work Mode Preference is required";

  if (!data.resumeFileName?.trim()) e.resumeFileName = "Resume is required";

  if (!data.portfolioLink?.trim())
    e.portfolioLink = "Portfolio Link is required";
  else if (!urlRe.test(data.portfolioLink.trim()))
    e.portfolioLink = "Enter a valid URL starting with https://";

  if (!data.linkedinUrl?.trim()) e.linkedinUrl = "LinkedIn URL is required";
  else if (!urlRe.test(data.linkedinUrl.trim()))
    e.linkedinUrl = "Enter a valid URL starting with https://";
  else if (!data.linkedinUrl.includes("linkedin.com"))
    e.linkedinUrl = "Must be a linkedin.com URL";

  if (!data.portfolioEvidence?.length || !data.portfolioEvidence[0]?.trim())
    e.portfolioEvidence = "At least one Portfolio Evidence entry is required";

  return e;
}

export function validateGovernmentProfile(data: ProfileData): ValidationErrors {
  const e: ValidationErrors = {};

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

  if (!data.gov_communicationModes?.length)
    e.gov_communicationModes = "At least one Communication Mode is required";

  if (!data.gov_timezone?.trim()) e.gov_timezone = "Timezone is required";

  if (!data.gov_highestEducation?.trim())
    e.gov_highestEducation = "Highest Education Level is required";

  if (!data.gov_digitalLiteracy?.trim())
    e.gov_digitalLiteracy = "Digital Literacy Level is required";

  if (
    !data.gov_primaryResponsibilities?.length ||
    !data.gov_primaryResponsibilities[0]?.trim()
  )
    e.gov_primaryResponsibilities =
      "At least one Primary Responsibility is required";

  if (!data.gov_workDomain?.trim())
    e.gov_workDomain = "Work Domain is required";

  if (!data.gov_learningModePreference?.trim())
    e.gov_learningModePreference = "Preferred Learning Mode is required";

  if (!data.gov_deviceAvailability?.length)
    e.gov_deviceAvailability = "Select at least one available device";

  if (!data.gov_roleCompetency?.trim())
    e.gov_roleCompetency = "Role Competency Level is required";

  if (!data.gov_digitalCompetency?.trim())
    e.gov_digitalCompetency = "Digital Competency Level is required";

  if (!data.gov_governanceCapability?.trim())
    e.gov_governanceCapability = "Governance Capability Area is required";

  if (!data.gov_erpProficiency?.trim())
    e.gov_erpProficiency = "ERP / System Proficiency is required";

  if (!data.gov_jobTitle?.trim())
    e.gov_jobTitle = "Job Title / Designation is required";

  if (!data.gov_jobGrade?.trim())
    e.gov_jobGrade = "Pay Grade / Band is required";

  if (!data.gov_serviceCategory?.trim())
    e.gov_serviceCategory = "Service Category is required";

  if (!data.gov_roleType?.trim()) e.gov_roleType = "Role Type is required";

  if (!data.gov_ministry?.trim()) e.gov_ministry = "Ministry is required";

  if (!data.gov_department?.trim())
    e.gov_department = "Department / Agency is required";

  if (!data.gov_trainingComplianceStatus?.trim())
    e.gov_trainingComplianceStatus = "Training Compliance Status is required";

  if (!data.gov_yearsInCurrentRole?.trim())
    e.gov_yearsInCurrentRole = "Years in Current Role is required";

  if (!data.gov_totalGovtService?.trim())
    e.gov_totalGovtService = "Total Government Service is required";

  if (!data.gov_internetConnectivity?.trim())
    e.gov_internetConnectivity = "Internet Connectivity Type is required";

  if (!data.gov_postingLocationType?.trim())
    e.gov_postingLocationType = "Posting Location Type is required";

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

  return e;
}

export function validateSchoolProfile(data: ProfileData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!data.grade) errors.grade = "Grade / Class is required";
  if (!data.rollNumber?.trim()) errors.rollNumber = "Roll Number is required";
  if (!data.schoolName?.trim()) errors.schoolName = "School Name is required";
  if (!data.schoolBoard?.trim()) errors.schoolBoard = "Board is required";

  if (!data.alternateContact?.trim()) {
    errors.alternateContact = "Contact Number is required";
  } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(data.alternateContact.trim())) {
    errors.alternateContact = "Enter a valid contact number";
  }

  if (!data.alternateemailid?.trim()) {
    errors.alternateemailid = "Email ID is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.alternateemailid.trim())) {
    errors.alternateemailid = "Enter a valid email address";
  }

  if (!data.streamOrGroup?.trim())
    errors.streamOrGroup = "Stream / Group is required";
  if (!data.overallPercentage?.trim())
    errors.overallPercentage = "Overall Percentage / CGPA is required";
  if (!data.favouriteSubject?.trim())
    errors.favouriteSubject = "Favourite Subject is required";

  if (!data.careerGoal?.trim()) errors.careerGoal = "Career Goal is required";

  if (!data.preferredLearningMode?.trim())
    errors.preferredLearningMode = "Preferred Learning Mode is required";
  if (!data.learningStyle?.trim())
    errors.learningStyle = "Learning Style is required";

  if (!data.guardianName?.trim())
    errors.guardianName = "Guardian Name is required";
  if (!data.guardianRelation?.trim())
    errors.guardianRelation = "Relationship is required";
  if (!data.guardianContact?.trim()) {
    errors.guardianContact = "Guardian Contact is required";
  } else if (!/^[+]?[\d\s\-()]{7,15}$/.test(data.guardianContact.trim())) {
    errors.guardianContact = "Enter a valid contact number";
  }

  return errors;
}

export function validateSkillAcademyProfile(
  data: ProfileData,
): ValidationErrors {
  const e: ValidationErrors = {};

  const altContactErr = requirePhone(
    data.alternateContact,
    "Alternate Contact",
  );
  if (altContactErr) e.alternateContact = altContactErr;

  if (!data.alternateemailid?.trim())
    e.alternateemailid = "Alternate Email-id is required";
  else if (!emailRe.test(data.alternateemailid.trim()))
    e.alternateemailid = "Enter a valid email address";

  if (!data.deviceAccess?.trim()) e.deviceAccess = "Device Access is required";

  if (!data.careerGoal?.trim()) e.careerGoal = "Career Goal is required";
  else if (data.careerGoal.trim().length < 10)
    e.careerGoal = "Career Goal should be at least 10 characters";

  if (!data.preferredRoles?.some((r) => r.trim()))
    e.preferredRole = "At least one Preferred Role is required";

  if (!data.preferredIndustries?.some((i) => i.trim()))
    e.preferredIndustry = "At least one Preferred Industry is required";

  if (!data.learningGoal?.trim()) e.learningGoal = "Learning Goal is required";
  else if (data.learningGoal.trim().length < 10)
    e.learningGoal = "Learning Goal should be at least 10 characters";

  if (!data.preferredLearningMode?.trim())
    e.preferredLearningMode = "Preferred Learning Mode is required";

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

  return e;
}
