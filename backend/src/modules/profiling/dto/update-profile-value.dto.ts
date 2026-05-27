import { IsOptional, IsString, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class UpdateProfileValueDto {
  // Identity
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsString() preferredName?: string;
  @IsOptional() @IsString() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() alternateContact?: string;
  @IsOptional() @IsString() emergencyContact?: string;
  @IsOptional() @IsString() gender?: string;
  @IsOptional() @IsString() dateOfBirth?: string;
  @IsOptional() @IsString() country?: string;
  @IsOptional() @IsString() state?: string;
  @IsOptional() @IsString() city?: string;
  @IsOptional() @IsString() languagePreference?: string;
  @IsOptional() @IsString() accessibilityNeeds?: string;
  @IsOptional() @IsString() deviceAccess?: string;
  @IsOptional() @IsString() profilePhoto?: string;

  // Academic
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsString() programme?: string;
  @IsOptional() @IsString() batch?: string;
  @IsOptional() @IsString() cohort?: string;
  @IsOptional() @IsString() enrollmentDate?: string;
  @IsOptional() @IsString() highestQualification?: string;
  @IsOptional() @IsString() academicScore?: string;
  @IsOptional() @IsString() institution?: string;
  @IsOptional() @IsString() semester?: string;
  @IsOptional() @IsString() credits?: string;
  @IsOptional() @IsString() cgpa?: string;
  @IsOptional() @IsString() backlogs?: string;
  @IsOptional() @IsString() employeeGrade?: string;
  @IsOptional() @IsString() businessUnit?: string;
  @IsOptional() @IsString() joiningDate?: string;

  // Career
  @IsOptional() @IsString() careerGoal?: string;
  @IsOptional() @IsString() preferredRole?: string;
  @IsOptional() @IsString() preferredIndustry?: string;
  @IsOptional() @IsString() learningGoal?: string;
  @IsOptional() @IsString() preferredLearningMode?: string;
  @IsOptional() @IsArray() skills?: string[];
  @IsOptional() @IsArray() interests?: string[];

  // Portfolio
  @IsOptional() @IsString() resumeUrl?: string;
  @IsOptional() @IsString() portfolioUrl?: string;
  @IsOptional() @IsString() linkedinUrl?: string;
  @IsOptional() @IsString() githubUrl?: string;
  @IsOptional() @IsArray() certifications?: string[];
  @IsOptional() @IsArray() projects?: string[];

  // Placement
  @IsOptional() @IsString() resumeStatus?: string;
  @IsOptional() @IsBoolean() placementEligible?: boolean;
  @IsOptional() @IsString() placementOffers?: string;
  @IsOptional() @IsString() interviewStatus?: string;
  @IsOptional() @IsString() currentStatus?: string;

  // Consent
  @IsOptional() @IsBoolean() consentDataProcessing?: boolean;
  @IsOptional() @IsBoolean() consentEmployerSharing?: boolean;
  @IsOptional() @IsBoolean() consentMarketing?: boolean;
}
