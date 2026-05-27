"use client";

import { useState, useEffect } from "react";
import { fetchMyProfile } from "@/lib/profiling/profiling.api";

export type SelfSkill = {
  name: string;
  category: string;
  domain: string;
  level: string;
};

export interface ProfileData {
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  dob: string;
  alternateemailid: string;
  careerGoals: string;
  learningGoals: string;
  careerAspirations: string;
  country: string;
  state: string;
  city: string;
  tenantId: string;
  institutionName: string;
  department: string;
  programme: string;
  businessUnit: string;
  cohort: string;
  batch: string;
  enrollmentDate: string;
  joiningDate: string;
  currentStatus: string;
  highestQualification: string;
  academicScore: string;
  existingSkillName: string;
  existingSkillCategory: string;
  existingSkillLevel: string;
  assignedLearningPath: string;
  mandatoryTraining: string;
  attendance: string;
  scores: string;
  eligibility: string;
  resumeStatus: string;
  placementEligibility: string;
  offers: string;
  preferredName: string;
  // languagePreference: string;
  accessibilityNeeds: string;
  deviceAccess: string;
  alternateContact: string;
  emergencyContact: string;
  careerGoal: string;
  preferredRole?: string;
  preferredIndustry?: string;
  learningGoal: string;
  preferredLearningMode: string;
  selfSkillName?: string[];
  selfSkillNames?: string[];
  selfSkillCategory: string;
  selfSkillDomain?: string;
  selfSkillLevel: string;
  resumeFileName: string;
  portfolioLink: string;
  linkedinUrl: string;
  dataProcessingConsent: boolean;
  employerSharingConsent: boolean;
  skillScore: string;
  practicalScore: string;
  aptitudeScore: string;
  skillGap: string;
  competencyGap: string;
  lmsActivity: string;
  progress: string;
  dropoutRisk: string;
  lowProgressRisk: string;
  projectCompletion: string;
  trainerEvaluation: string;
  certificates: string[];
  portfolioEvidence: string[];
  resumeScore: string;
  interviewReadiness: string;
  applications: string;
  interviewStatus: string;
  offerStatus: string;
  retention: string;
  promotion: string;
  alumniEngagement: string;
  semester: string;
  credits: string;
  cgpa: string;
  backlogs: string;
  naacMetrics: string;
  employeeGrade: string;
  kpiMapping: string;
  promotionReadiness: string;
  nsqfLevel: string;
  practicalGroup: string;

  desiredRole?: string;
  workHistory?: { company: string; role: string; from: string; to: string; description: string }[];

  preferredLocation?: string[];
  expectedSalary?: string;
  preferredContentType?: string;
  languagePreference?: string;

  ngo_firstGraduateInFamily?: boolean;
  ngo_womenHeadedHousehold?: boolean;
  ngo_economicallyDisadvantaged?: boolean;
  ngo_disabilitySupportNeeded?: boolean;
  ngo_transportationConstraint?: boolean;
  ngo_caregivingResponsibilities?: boolean;
  ngo_minorityOrMarginalisedGroup?: boolean;
  ngo_refugeeOrDisplacedPerson?: boolean;
  ngo_foodOrHousingInsecurity?: boolean;

  ngo_careerGoal?: string;
  ngo_preferredJobRole?: string;
  ngo_preferredWorkLocation?: string;
  ngo_relocationWillingness?: string;
  ngo_preferredSalaryRange?: string;
  ngo_workModePreference?: string;
  ngo_learningModePreference?: string;
  ngo_deviceAvailability?: string;
  ngo_internetAccess?: string;
  ngo_workDomain?: string;
  ngo_digitalLiteracyLevel?: string;
  ngo_targetRoleType?: string;
  ngo_roleDigitalCompetency?: string;
  ngo_mandatoryCertifications?: {
    name: string;
    status: string;
    issuingBody: string;
    expiryDate: string;
  }[];

  ngo_gender?: string;
  ngo_dateOfBirth?: string;
  ngo_nationality?: string;
  ngo_technicalSkills?: string[];
  ngo_softSkills?: string[];
  ngo_domainSkills?: string[];
  ngo_englishProficiency?: string;
  ngo_primaryLearningGoal?: string;
  ngo_skillsToAcquire?: string[];
  ngo_highestEducation?: string;
  ngo_country?: string;
  ngo_primaryEmail?: string;
  ngo_mobileNumber?: string; 
  ngo_preferredLanguage?: string;
  ngo_sector?: string;
  ngo_programmeName?: string;
  ngo_cohortBatch?: string;
  ngo_enrolmentDate?: string;
  ngo_assignedFacilitator?: string;

  profileVerificationStatus: string;
  documentVerificationStatus: string;
  verifiedBy: string;
  complianceStatus: string;
  placementSharingConsent: boolean;
  employerVisibilityConsent: boolean;
  alumniEngagementConsent: boolean;
  researchAnalyticsConsent: boolean;

  instagramId?: string;
  facebookId?: string;
  githubUrl?: string;
  twitterUrl?: string;
  personalWebsite?: string;

  skillInterests: string[];
  preferredToolStack: string;
  domainInterest: string;
  preferredRoles?: string[];
  preferredIndustries?: string[];

  educationHistory?: {
    level: string;
    qualification: string;
    institution: string;
    fieldOfStudy: string;
    gradingSystem: string;
    grade: string;
    startYear: string;
    endYear: string;
  }[];

  nationality?: string;
  digitalLiteracy?: string;
  englishProficiency?: string;
  id_proof_type: string;
  id_proof_number: string;
  identity_issuing_country: string;

  certifications?: {
    name: string;
    issuingOrg: string;
    issueDate: string;
    expiryDate: string;
    credentialId: string;
    credentialUrl: string;
  }[];

  selfSkills?: {
    name: string;
    category: string;
    domain: string;
    level: string;
  }[];

  academicPercentage?: string;
  tenthScore?: string;
  tenthPercentage?: string;
  diplomaScore?: string;
  diplomaPercentage?: string;
  twelveScore?: string;
  twelvePercentage?: string;

  employeeIdentity?: string;
  employmentStatus?: string;
  role?: string;
  technicalSkillScore?: string;
  functionalSkillScore?: string;
  trainingAttendance?: string;
  certificationTracking?: string;
  kpiPerformance?: string;
  careerGrowth?: string;
  mandatoryTrainingCompletion?: string;
  
  gov_primaryEmail?: string;
  gov_mobileNumber?: string;
  gov_preferredLanguage?: string;
  gov_timezone?: string;
  gov_secondaryLanguages?: string[];
  gov_communicationModes?: string[];

  gov_highestEducation?: string;
  gov_currentEducationStatus?: string;
  gov_areaOfStudy?: string;
  gov_priorCertifications?: string[];
  gov_digitalLiteracy?: string;
  gov_onlineLearningExperience?: string;

  gov_primaryResponsibilities?: string[];
  gov_workDomain?: string;
  gov_employmentStatus?: string;
  gov_preferredLearningPace?: string;
  gov_preferredContentFormats?: string[];
  gov_learningModePreference?: string;
  gov_deviceAvailability?: string[];

  gov_roleCompetency?: string;
  gov_digitalCompetency?: string;
  gov_leadershipCompetency?: string;
  gov_governanceCapability?: string;
  gov_erpProficiency?: string;
  gov_mandatoryCertifications?: string[];

  gov_jobTitle?: string;
  gov_jobGrade?: string;
  gov_serviceCategory?: string;
  gov_roleType?: string;
  gov_reportingLevel?: string;

  gov_ministry?: string;
  gov_department?: string;
  gov_division?: string;
  gov_costCenter?: string;

  gov_mandatedTrainings?: string[];
  gov_trainingComplianceStatus?: string;
  gov_lastTrainingDate?: string;
  gov_trainingDeadline?: string;
  gov_trainingNominator?: string;

  gov_yearsInCurrentRole?: string;
  gov_totalGovtService?: string;
  gov_totalWorkExperience?: string;
  gov_previousDepartments?: string[];
  gov_retirementYear?: string;

  gov_internetConnectivity?: string;
  gov_avgBandwidth?: string;
  gov_connectivityReliability?: string;
  gov_offlineAccessNeeded?: boolean;
  gov_primaryConnectivityDevice?: string;

  gov_postingLocationType?: string;
  gov_postingState?: string;
  gov_postingDistrict?: string;
  gov_ruralUrbanClassification?: string;
  gov_isRemotePosting?: boolean;

  gov_accessibilityFeatures?: string[];
}

export function useProfile(userId: string) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMyProfile(userId)
      .then(setProfile)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [userId]);

  return { profile, setProfile, loading, error };
}
