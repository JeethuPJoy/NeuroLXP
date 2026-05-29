"use client";

import ISO6391 from "iso-639-1";
import TagInput from "../TagInput";
import { ProfileData } from "@/app/profiling/hooks/profiling/useProfile";
import { ValidationErrors } from "@/app/profiling/hooks/profiling/useProfileValidation";

interface Props {
  profile: ProfileData;
  onChange: (field: keyof ProfileData, value: unknown) => void;
  errors?: ValidationErrors;
}

function SectionHeading({
  title,
}: {
  title: string;
}) {
  return (
    <div className="section-header">
      <div className="section-bar" />
      <div>
        <h3 className="section-title">{title}</h3>
      </div>
    </div>
  );
}

function Req() {
  return <span className="req">*</span>;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <span className="field-error">{msg}</span>;
}

function fieldCls(err?: string) {
  return `field${err ? " field--error" : ""}`;
}

export default function GovernmentTab({
  profile,
  onChange,
  errors = {},
}: Props) {
  const p = profile as unknown as Record<string, unknown>;

  const get = (key: string): unknown => p[key];
  const set = (key: string, val: unknown) =>
    onChange(key as keyof ProfileData, val);

  const mobileNumber = (get("gov_mobileNumber") as string) ?? "";
  const primaryEmail = (get("gov_primaryEmail") as string) ?? "";
  const preferredLanguage = (get("gov_preferredLanguage") as string) ?? "";
  const commModes = (get("gov_communicationModes") as string[]) ?? [];

  const highestEducation = (get("gov_highestEducation") as string) ?? "";
  const currentEducationStatus =
    (get("gov_currentEducationStatus") as string) ?? "";
  const areaOfStudy = (get("gov_areaOfStudy") as string) ?? "";
  const priorCertifications =
    (get("gov_priorCertifications") as string[]) ?? [];
  const digitalLiteracy = (get("gov_digitalLiteracy") as string) ?? "";
  const onlineLearningExp =
    (get("gov_onlineLearningExperience") as string) ?? "";

  const primaryResponsibilities =
    (get("gov_primaryResponsibilities") as string[]) ?? [];
  const workDomain = (get("gov_workDomain") as string) ?? "";
  const employmentStatus = (get("gov_employmentStatus") as string) ?? "";
  const preferredLearningPace =
    (get("gov_preferredLearningPace") as string) ?? "";
  const preferredContentFormats =
    (get("gov_preferredContentFormats") as string[]) ?? [];
  const learningModePreference =
    (get("gov_learningModePreference") as string) ?? "";
  const deviceAvailability = (get("gov_deviceAvailability") as string[]) ?? [];

  const roleCompetency = (get("gov_roleCompetency") as string) ?? "";
  const digitalCompetency = (get("gov_digitalCompetency") as string) ?? "";
  const leadershipCompetency =
    (get("gov_leadershipCompetency") as string) ?? "";
  const governanceCapability =
    (get("gov_governanceCapability") as string) ?? "";
  const erpProficiency = (get("gov_erpProficiency") as string) ?? "";
  const mandatoryCertifications =
    (get("gov_mandatoryCertifications") as string[]) ?? [];

  const jobTitle = (get("gov_jobTitle") as string) ?? "";
  const jobGrade = (get("gov_jobGrade") as string) ?? "";
  const serviceCategory = (get("gov_serviceCategory") as string) ?? "";
  const roleType = (get("gov_roleType") as string) ?? "";
  const reportingLevel = (get("gov_reportingLevel") as string) ?? "";

  const ministry = (get("gov_ministry") as string) ?? "";
  const department = (get("gov_department") as string) ?? "";
  const division = (get("gov_division") as string) ?? "";
  const costCenter = (get("gov_costCenter") as string) ?? "";

  const mandatedTrainings = (get("gov_mandatedTrainings") as string[]) ?? [];
  const trainingComplianceStatus =
    (get("gov_trainingComplianceStatus") as string) ?? "";
  const lastTrainingDate = (get("gov_lastTrainingDate") as string) ?? "";
  const trainingDeadline = (get("gov_trainingDeadline") as string) ?? "";
  const trainingNominator = (get("gov_trainingNominator") as string) ?? "";

  const yearsInCurrentRole =
    (get("gov_yearsInCurrentRole") as string) ?? "";
  const totalGovtService = (get("gov_totalGovtService") as string) ?? "";
  const totalWorkExperience = (get("gov_totalWorkExperience") as string) ?? "";
  const previousDepartments =
    (get("gov_previousDepartments") as string[]) ?? [];
  const retirementYear = (get("gov_retirementYear") as string) ?? "";

  const internetConnectivity =
    (get("gov_internetConnectivity") as string) ?? "";
  const avgBandwidth = (get("gov_avgBandwidth") as string) ?? "";
  const connectivityReliability =
    (get("gov_connectivityReliability") as string) ?? "";
  const offlineAccessNeeded =
    (get("gov_offlineAccessNeeded") as boolean) ?? false;
  const primaryConnectivityDevice =
    (get("gov_primaryConnectivityDevice") as string) ?? "";

  const postingLocationType =
    (get("gov_postingLocationType") as string) ?? "";
  const postingState = (get("gov_postingState") as string) ?? "";
  const postingDistrict = (get("gov_postingDistrict") as string) ?? "";
  const ruralUrbanClassification =
    (get("gov_ruralUrbanClassification") as string) ?? "";
  const isRemotePosting =
    (get("gov_isRemotePosting") as boolean) ?? false;

  const languages = ISO6391.getAllNames();

  const commModeOptions = [
    "Email",
    "SMS",
    "In-app Notifications",
    "WhatsApp",
    "Voice Alerts",
  ];

  const educationLevels = [
    "No Formal Education",
    "Primary / Elementary",
    "Secondary School",
    "High School / Higher Secondary",
    "Certificate",
    "Diploma",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate / PhD",
    "Other",
  ];

  const educationStatusOptions = [
    "Completed",
    "Currently Enrolled",
    "Pursuing / In Progress",
    "Deferred",
    "Dropped Out",
  ];

  const onlineLearningOptions = [
    "No Experience",
    "First Time",
    "Occasional (1–2 courses)",
    "Regular (3+ courses)",
    "Advanced / Facilitator",
  ];

  const digitalLiteracyOptions = [
    "Beginner (basic browsing, email)",
    "Basic (MS Office, forms, video calls)",
    "Intermediate (ERP, data tools, collaboration platforms)",
    "Advanced (analytics, automation, system admin)",
    "Expert (programming, AI/ML, cybersecurity)",
  ];

  const workDomainOptions = [
    "Public Administration & Government",
    "Education & Research",
    "Healthcare & Life Sciences",
    "Finance & Banking",
    "Technology & IT",
    "Manufacturing & Engineering",
    "Retail & Commerce",
    "Media & Communications",
    "Legal & Compliance",
    "Non-Profit & Social Services",
    "Agriculture & Environment",
    "Defence & Security",
    "Energy & Utilities",
    "Transportation & Logistics",
    "Other",
  ];

  const employmentStatusOptions = [
    "Full-time Employee",
    "Part-time Employee",
    "Contract / Consultant",
    "Intern / Trainee",
    "Self-Employed",
    "Unemployed — Seeking",
    "Unemployed — Not Seeking",
    "Retired",
    "Student",
    "Other",
  ];

  const learningPaceOptions = [
    "Self-paced",
    "Instructor-guided",
    "Fast-track",
    "Flexible",
  ];

  const contentFormatOptions = [
    "Video",
    "Text",
    "Audio",
    "Interactive Simulations",
    "Live Sessions",
    "Assignments",
    "Microlearning",
  ];

  const deviceOptions = [
    "Desktop / PC",
    "Laptop",
    "Tablet",
    "Smartphone",
    "Shared Workstation",
    "No Personal Device",
  ];

  const learningModeOptions = [
    "Self-paced Online",
    "Instructor-led Online (Live)",
    "In-person / Classroom",
    "Blended (Online + Classroom)",
    "On-the-job / Mentorship",
    "Mobile Learning",
  ];

  const competencyLevels = [
    "Not Applicable",
    "Awareness (Level 1)",
    "Foundation (Level 2)",
    "Practitioner (Level 3)",
    "Expert (Level 4)",
    "Master (Level 5)",
  ];

  const governanceOptions = [
    "Policy Formulation",
    "Budget & Financial Management",
    "Stakeholder Coordination",
    "Programme Monitoring & Evaluation",
    "Public Grievance Redressal",
    "Regulatory & Legal Compliance",
    "Procurement & Contracts",
    "Records & Information Management",
    "Not Applicable",
  ];

  const erpOptions = [
    "SAP",
    "Oracle ERP",
    "Microsoft Dynamics",
    "Workday",
    "Custom / In-house ERP",
    "HRMS",
    "Financial Management System",
    "e-Procurement Platform",
    "None / Not Used",
  ];

  const jobGradeOptions = [
    "Grade 1 — Entry Level",
    "Grade 2 — Junior Officer",
    "Grade 3 — Officer",
    "Grade 4 — Senior Officer",
    "Grade 5 — Principal Officer",
    "Grade 6 — Deputy Director",
    "Grade 7 — Director",
    "Grade 8 — Senior Director",
    "Grade 9 — Deputy Secretary",
    "Grade 10 — Secretary",
    "Grade 11 — Additional Secretary",
    "Grade 12 — Chief Secretary / Equivalent",
    "Other",
  ];

  const serviceCategoryOptions = [
    "IAS — Indian Administrative Service",
    "IPS — Indian Police Service",
    "IFS — Indian Foreign Service",
    "IRS — Indian Revenue Service",
    "State Civil Service",
    "Central Secretariat Service",
    "Technical / Engineering Service",
    "Medical & Health Service",
    "Defence Service",
    "Judicial Service",
    "Audit & Accounts Service",
    "Other Central Service",
    "Other State Service",
    "Not Applicable",
  ];

  const roleTypeOptions = [
    "Administrative",
    "Technical / Engineering",
    "Policy & Planning",
    "Legal & Compliance",
    "Finance & Accounts",
    "Medical & Health",
    "Education & Training",
    "Defence & Security",
    "ICT / Digital",
    "Field / Operational",
    "Regulatory",
    "Other",
  ];

  const reportingLevelOptions = [
    "Individual Contributor",
    "Team Lead (2–5 reports)",
    "Manager (6–15 reports)",
    "Senior Manager (16–30 reports)",
    "Director / Head of Unit",
    "Department Head",
    "Secretary / Ministry Head",
    "Not Applicable",
  ];

  const ministryOptions = [
    "Ministry of Home Affairs",
    "Ministry of Finance",
    "Ministry of Defence",
    "Ministry of External Affairs",
    "Ministry of Health & Family Welfare",
    "Ministry of Education",
    "Ministry of Agriculture & Farmers Welfare",
    "Ministry of Commerce & Industry",
    "Ministry of Law & Justice",
    "Ministry of Railways",
    "Ministry of Road Transport & Highways",
    "Ministry of Science & Technology",
    "Ministry of Electronics & Information Technology",
    "Ministry of Environment, Forest & Climate Change",
    "Ministry of Labour & Employment",
    "Ministry of Women & Child Development",
    "Ministry of Social Justice & Empowerment",
    "Ministry of Tribal Affairs",
    "Ministry of Rural Development",
    "Ministry of Urban Development",
    "Ministry of Power",
    "Ministry of Petroleum & Natural Gas",
    "Ministry of Water Resources",
    "Ministry of Tourism",
    "Ministry of Culture",
    "Ministry of Skill Development & Entrepreneurship",
    "State Government Department",
    "Other / Central Public Sector Undertaking",
  ];

  const mandatedTrainingOptions = [
    "Foundation / Induction Course",
    "Leadership & Management Programme",
    "Digital Governance & e-Services",
    "Cybersecurity Awareness",
    "Financial Management & Procurement",
    "Anti-corruption & Ethics",
    "Public Policy & Governance",
    "Disaster Management",
    "Human Rights & Gender Sensitivity",
    "RTI & Transparency",
    "Data Protection & Privacy",
    "Service Delivery Excellence",
    "Other Mandated Programme",
  ];

  const trainingComplianceOptions = [
    "Compliant — All mandated trainings completed",
    "Partially Compliant — Some trainings pending",
    "Non-compliant — Overdue",
    "Exempted",
    "Not Applicable",
  ];

  const trainingNominatorOptions = [
    "Self-nominated",
    "Department Head",
    "HR / Training Division",
    "Ministry Directive",
    "Court / Tribunal Order",
    "External Authority",
  ];

  const serviceYearOptions = [
    "Less than 1 year",
    "1 – 2 years",
    "3 – 5 years",
    "6 – 10 years",
    "11 – 15 years",
    "16 – 20 years",
    "21 – 25 years",
    "26 – 30 years",
    "More than 30 years",
  ];

  const retirementYearOptions = Array.from({ length: 40 }, (_, i) =>
    String(new Date().getFullYear() + i)
  );

  const internetConnectivityOptions = [
    "No Internet Access",
    "Occasional (shared / cyber café)",
    "Mobile Data — 2G",
    "Mobile Data — 3G",
    "Mobile Data — 4G / LTE",
    "Mobile Data — 5G",
    "Broadband (Home / Office)",
    "Fibre / High-speed",
    "Government SWAN / NIC Network",
  ];

  const avgBandwidthOptions = [
    "Below 1 Mbps",
    "1 – 5 Mbps",
    "5 – 10 Mbps",
    "10 – 25 Mbps",
    "25 – 50 Mbps",
    "50 – 100 Mbps",
    "Above 100 Mbps",
  ];

  const connectivityReliabilityOptions = [
    "Very Unreliable (frequent outages)",
    "Unreliable (daily disruptions)",
    "Moderate (occasional drops)",
    "Reliable (minor issues only)",
    "Very Reliable (consistent uptime)",
  ];

  const primaryConnectivityDeviceOptions = [
    "Personal Smartphone",
    "Government-issued Smartphone",
    "Personal Laptop / Desktop",
    "Government-issued Laptop / Desktop",
    "Tablet",
    "Shared Office Computer",
    "Kiosk / Common Service Centre",
  ];

  const postingLocationTypeOptions = [
    "Capital City / Headquarters",
    "State Capital",
    "Divisional Headquarters",
    "District Headquarters",
    "Sub-district / Taluk",
    "Block / Mandal Level",
    "Village / Gram Panchayat",
    "Border / Remote Area",
    "Tribal Area",
    "Embassy / Consulate (Abroad)",
    "Defence / Cantonment",
    "Other",
  ];

  const ruralUrbanOptions = [
    "Urban — Metro (10 lakh+ population)",
    "Urban — City (1–10 lakh)",
    "Urban — Town (<1 lakh)",
    "Semi-urban / Peri-urban",
    "Rural",
    "Tribal / Forest Area",
    "Island / Remote Geography",
  ];
  

  const toggleMulti = (key: string, current: string[], val: string) => {
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    set(key, updated);
  };

  const MAX_FILE_SIZE = 10 * 1024;

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_SIZE) {
      alert("File size must not exceed 10 KB.");
      e.target.value = "";
      return;
    }
    onChange("resumeFileName", file.name);
  };

  return (
    <div className="csv-sections">
      <div className="section">
        <SectionHeading
          title="Communication & Language"
        />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_primaryEmail as string)}>
            <label className="field-label">
              Primary Email <Req />
            </label>
            <input
              type="email"
              value={primaryEmail}
              onChange={(e) => set("gov_primaryEmail", e.target.value)}
              placeholder="name@organisation.gov"
            />
            <FieldError msg={errors.gov_primaryEmail as string} />
          </div>

          <div className={fieldCls(errors.gov_mobileNumber as string)}>
            <label className="field-label">
              Mobile Number <Req />
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => set("gov_mobileNumber", e.target.value)}
              placeholder="+91 98765 43210"
            />
            <FieldError msg={errors.gov_mobileNumber as string} />
          </div>

          <div className={fieldCls(errors.gov_preferredLanguage as string)}>
            <label className="field-label">
              Preferred Language <Req />
            </label>
            <select
              value={preferredLanguage}
              onChange={(e) => set("gov_preferredLanguage", e.target.value)}
            >
              <option value="">— Select Language —</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_preferredLanguage as string} />
          </div>

          <div className="field full-col">
            <label className="field-label">
              Preferred Communication Mode
              <span className="optional-tag"> (select all that apply)</span> <Req />
            </label>
            <div className="govt-chip-group">
              {commModeOptions.map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`govt-chip${commModes.includes(mode) ? " govt-chip--active" : ""}`}
                  onClick={() =>
                    toggleMulti("gov_communicationModes", commModes, mode)
                  }
                >
                  {mode}
                </button>
              ))}
            </div>
            <FieldError msg={errors.gov_communicationModes as string} />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading
          title="Learning Background"
        />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_highestEducation as string)}>
            <label className="field-label">
              Highest Education Level <Req />
            </label>
            <select
              value={highestEducation}
              onChange={(e) => set("gov_highestEducation", e.target.value)}
            >
              <option value="">— Select —</option>
              {educationLevels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_highestEducation as string} />
          </div>

          <div className="field">
            <label className="field-label">Current Education Status</label>
            <select
              value={currentEducationStatus}
              onChange={(e) =>
                set("gov_currentEducationStatus", e.target.value)
              }
            >
              <option value="">— Select —</option>
              {educationStatusOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Area of Study</label>
            <input
              type="text"
              value={areaOfStudy}
              onChange={(e) => set("gov_areaOfStudy", e.target.value)}
              placeholder="e.g. Public Policy, Engineering, Medicine"
            />
          </div>

          <div className={fieldCls(errors.gov_digitalLiteracy as string)}>
            <label className="field-label">
              Digital Literacy Level <Req />
            </label>
            <select
              value={digitalLiteracy}
              onChange={(e) => set("gov_digitalLiteracy", e.target.value)}
            >
              <option value="">— Select Level —</option>
              {digitalLiteracyOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_digitalLiteracy as string} />
          </div>

          <div className="field">
            <label className="field-label">
              Experience with Online Learning
            </label>
            <select
              value={onlineLearningExp}
              onChange={(e) =>
                set("gov_onlineLearningExperience", e.target.value)
              }
            >
              <option value="">— Select —</option>
              {onlineLearningOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Prior Certifications
              <span className="optional-tag">
                {" "}
                (type and press Enter to add)
              </span>
            </label>
            <TagInput
              initialTags={priorCertifications}
              onChange={(tags) => set("gov_priorCertifications", tags)}
              placeholder="e.g. PMP, ISO 9001, CISA…"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading
          title="Skills, Career Goals & Learning Preferences"
        />
        <div className="section-grid">
          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Primary Responsibilities <Req />
              <span className="optional-tag">
                {" "}
                (type and press Enter to add)
              </span>
            </label>
            <TagInput
              initialTags={primaryResponsibilities}
              onChange={(tags) => set("gov_primaryResponsibilities", tags)}
              placeholder="e.g. Budget Planning, Team Management…"
            />
            <FieldError msg={errors.gov_primaryResponsibilities as string} />
          </div>

          <div className={fieldCls(errors.gov_workDomain as string)}>
            <label className="field-label">
              Work Domain <Req />
            </label>
            <select
              value={workDomain}
              onChange={(e) => set("gov_workDomain", e.target.value)}
            >
              <option value="">— Select Domain —</option>
              {workDomainOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_workDomain as string} />
          </div>

          <div className="field">
            <label className="field-label">Employment Status</label>
            <select
              value={employmentStatus}
              onChange={(e) => set("gov_employmentStatus", e.target.value)}
            >
              <option value="">— Select —</option>
              {employmentStatusOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Preferred Learning Pace</label>
            <select
              value={preferredLearningPace}
              onChange={(e) => set("gov_preferredLearningPace", e.target.value)}
            >
              <option value="">— Select —</option>
              {learningPaceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div
            className={fieldCls(errors.gov_learningModePreference as string)}
          >
            <label className="field-label">
              Preferred Learning Mode <Req />
            </label>
            <select
              value={learningModePreference}
              onChange={(e) =>
                set("gov_learningModePreference", e.target.value)
              }
            >
              <option value="">— Select Mode —</option>
              {learningModeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_learningModePreference as string} />
          </div>

          <div className="field full-col">
            <label className="field-label">
              Preferred Content Formats
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {contentFormatOptions.map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  className={`govt-chip${preferredContentFormats.includes(fmt) ? " govt-chip--active" : ""}`}
                  onClick={() =>
                    toggleMulti(
                      "gov_preferredContentFormats",
                      preferredContentFormats,
                      fmt,
                    )
                  }
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="field full-col">
            <label className="field-label">
              Available Devices <Req />
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {deviceOptions.map((device) => (
                <button
                  key={device}
                  type="button"
                  className={`govt-chip${deviceAvailability.includes(device) ? " govt-chip--active" : ""}`}
                  onClick={() =>
                    toggleMulti(
                      "gov_deviceAvailability",
                      deviceAvailability,
                      device,
                    )
                  }
                >
                  {device}
                </button>
              ))}
            </div>
            <FieldError msg={errors.gov_deviceAvailability as string} />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Competency & Role Profiling" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_roleCompetency as string)}>
            <label className="field-label">
              Role Competency Level <Req />
            </label>
            <select
              value={roleCompetency}
              onChange={(e) => set("gov_roleCompetency", e.target.value)}
            >
              <option value="">— Select Level —</option>
              {competencyLevels.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_roleCompetency as string} />
          </div>

          <div className={fieldCls(errors.gov_digitalCompetency as string)}>
            <label className="field-label">
              Digital Competency Level <Req />
            </label>
            <select
              value={digitalCompetency}
              onChange={(e) => set("gov_digitalCompetency", e.target.value)}
            >
              <option value="">— Select Level —</option>
              {competencyLevels.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_digitalCompetency as string} />
          </div>

          <div className="field">
            <label className="field-label">Leadership Competency Level</label>
            <select
              value={leadershipCompetency}
              onChange={(e) => set("gov_leadershipCompetency", e.target.value)}
            >
              <option value="">— Select Level —</option>
              {competencyLevels.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>

          <div className={fieldCls(errors.gov_governanceCapability as string)}>
            <label className="field-label">
              Governance Capability Area <Req />
            </label>
            <select
              value={governanceCapability}
              onChange={(e) => set("gov_governanceCapability", e.target.value)}
            >
              <option value="">— Select Area —</option>
              {governanceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_governanceCapability as string} />
          </div>

          <div className={fieldCls(errors.gov_erpProficiency as string)}>
            <label className="field-label">
              ERP / System Proficiency <Req />
            </label>
            <select
              value={erpProficiency}
              onChange={(e) => set("gov_erpProficiency", e.target.value)}
            >
              <option value="">— Select System —</option>
              {erpOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <FieldError msg={errors.gov_erpProficiency as string} />
          </div>

          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Mandatory Certifications Held
              <span className="optional-tag">
                {" "}
                (type and press Enter to add)
              </span>
            </label>
            <TagInput
              initialTags={mandatoryCertifications}
              onChange={(tags) => set("gov_mandatoryCertifications", tags)}
              placeholder="e.g. PMP, ISO 9001, Data Privacy Certification…"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Job / Role Identity" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_jobTitle as string)}>
            <label className="field-label">
              Job Title / Designation <Req />
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => set("gov_jobTitle", e.target.value)}
              placeholder="e.g. Deputy Collector, Section Officer"
            />
            <FieldError msg={errors.gov_jobTitle as string} />
          </div>

          <div className={fieldCls(errors.gov_jobGrade as string)}>
            <label className="field-label">
              Pay Grade / Band <Req />
            </label>
            <select
              value={jobGrade}
              onChange={(e) => set("gov_jobGrade", e.target.value)}
            >
              <option value="">— Select Grade —</option>
              {jobGradeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_jobGrade as string} />
          </div>

          <div className={fieldCls(errors.gov_serviceCategory as string)}>
            <label className="field-label">
              Service Category <Req />
            </label>
            <select
              value={serviceCategory}
              onChange={(e) => set("gov_serviceCategory", e.target.value)}
            >
              <option value="">— Select Service —</option>
              {serviceCategoryOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_serviceCategory as string} />
          </div>

          <div className={fieldCls(errors.gov_roleType as string)}>
            <label className="field-label">
              Role Type <Req />
            </label>
            <select
              value={roleType}
              onChange={(e) => set("gov_roleType", e.target.value)}
            >
              <option value="">— Select Role Type —</option>
              {roleTypeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_roleType as string} />
          </div>

          <div className="field">
            <label className="field-label">Reporting / Supervisory Level</label>
            <select
              value={reportingLevel}
              onChange={(e) => set("gov_reportingLevel", e.target.value)}
            >
              <option value="">— Select Level —</option>
              {reportingLevelOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Department & Ministry" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_ministry as string)}>
            <label className="field-label">
              Ministry <Req />
            </label>
            <select
              value={ministry}
              onChange={(e) => set("gov_ministry", e.target.value)}
            >
              <option value="">— Select Ministry —</option>
              {ministryOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_ministry as string} />
          </div>

          <div className={fieldCls(errors.gov_department as string)}>
            <label className="field-label">
              Department / Agency <Req />
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => set("gov_department", e.target.value)}
              placeholder="e.g. Revenue Department, DPIIT"
            />
            <FieldError msg={errors.gov_department as string} />
          </div>

          <div className="field">
            <label className="field-label">Division / Wing</label>
            <input
              type="text"
              value={division}
              onChange={(e) => set("gov_division", e.target.value)}
              placeholder="e.g. Enforcement Wing, Accounts Division"
            />
          </div>

          <div className="field">
            <label className="field-label">Cost Centre / Budget Head</label>
            <input
              type="text"
              value={costCenter}
              onChange={(e) => set("gov_costCenter", e.target.value)}
              placeholder="e.g. CC-2047"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Training Mandate Tracking" />
        <div className="section-grid">
          <div className="field full-col">
            <label className="field-label">
              Mandated Trainings
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {mandatedTrainingOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`govt-chip${mandatedTrainings.includes(t) ? " govt-chip--active" : ""}`}
                  onClick={() =>
                    toggleMulti("gov_mandatedTrainings", mandatedTrainings, t)
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className={fieldCls(errors.gov_trainingComplianceStatus as string)}>
            <label className="field-label">
              Training Compliance Status <Req />
            </label>
            <select
              value={trainingComplianceStatus}
              onChange={(e) => set("gov_trainingComplianceStatus", e.target.value)}
            >
              <option value="">— Select Status —</option>
              {trainingComplianceOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_trainingComplianceStatus as string} />
          </div>

          <div className="field">
            <label className="field-label">Last Training Completed Date</label>
            <input
              type="date"
              value={lastTrainingDate}
              onChange={(e) => set("gov_lastTrainingDate", e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Next Training Deadline</label>
            <input
              type="date"
              value={trainingDeadline}
              onChange={(e) => set("gov_trainingDeadline", e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Training Nominator</label>
            <select
              value={trainingNominator}
              onChange={(e) => set("gov_trainingNominator", e.target.value)}
            >
              <option value="">— Select —</option>
              {trainingNominatorOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Years of Service & Work Experience" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_yearsInCurrentRole as string)}>
            <label className="field-label">
              Years in Current Role <Req />
            </label>
            <select
              value={yearsInCurrentRole}
              onChange={(e) => set("gov_yearsInCurrentRole", e.target.value)}
            >
              <option value="">— Select —</option>
              {serviceYearOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_yearsInCurrentRole as string} />
          </div>

          <div className={fieldCls(errors.gov_totalGovtService as string)}>
            <label className="field-label">
              Total Government Service <Req />
            </label>
            <select
              value={totalGovtService}
              onChange={(e) => set("gov_totalGovtService", e.target.value)}
            >
              <option value="">— Select —</option>
              {serviceYearOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_totalGovtService as string} />
          </div>

          <div className="field">
            <label className="field-label">Total Work Experience (all sectors)</label>
            <select
              value={totalWorkExperience}
              onChange={(e) => set("gov_totalWorkExperience", e.target.value)}
            >
              <option value="">— Select —</option>
              {serviceYearOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Expected Retirement Year</label>
            <select
              value={retirementYear}
              onChange={(e) => set("gov_retirementYear", e.target.value)}
            >
              <option value="">— Select Year —</option>
              {retirementYearOptions.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Previous Departments / Postings
              <span className="optional-tag"> (type and press Enter to add)</span>
            </label>
            <TagInput
              initialTags={previousDepartments}
              onChange={(tags) => set("gov_previousDepartments", tags)}
              placeholder="e.g. Ministry of Finance, District Collector Office…"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Connectivity & Bandwidth" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_internetConnectivity as string)}>
            <label className="field-label">
              Internet Connectivity Type <Req />
            </label>
            <select
              value={internetConnectivity}
              onChange={(e) => set("gov_internetConnectivity", e.target.value)}
            >
              <option value="">— Select Type —</option>
              {internetConnectivityOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_internetConnectivity as string} />
          </div>

          <div className="field">
            <label className="field-label">Average Available Bandwidth</label>
            <select
              value={avgBandwidth}
              onChange={(e) => set("gov_avgBandwidth", e.target.value)}
            >
              <option value="">— Select Bandwidth —</option>
              {avgBandwidthOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Connectivity Reliability</label>
            <select
              value={connectivityReliability}
              onChange={(e) => set("gov_connectivityReliability", e.target.value)}
            >
              <option value="">— Select —</option>
              {connectivityReliabilityOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Primary Device for Connectivity</label>
            <select
              value={primaryConnectivityDevice}
              onChange={(e) => set("gov_primaryConnectivityDevice", e.target.value)}
            >
              <option value="">— Select Device —</option>
              {primaryConnectivityDeviceOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field full-col">
            <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={offlineAccessNeeded}
                onChange={(e) => set("gov_offlineAccessNeeded", e.target.checked)}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              I need offline / downloadable content access
            </label>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Posting Location" />
        <div className="section-grid">
          <div className={fieldCls(errors.gov_postingLocationType as string)}>
            <label className="field-label">
              Posting Location Type <Req />
            </label>
            <select
              value={postingLocationType}
              onChange={(e) => set("gov_postingLocationType", e.target.value)}
            >
              <option value="">— Select Type —</option>
              {postingLocationTypeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.gov_postingLocationType as string} />
          </div>

          <div className="field">
            <label className="field-label">State / Province</label>
            <input
              type="text"
              value={postingState}
              onChange={(e) => set("gov_postingState", e.target.value)}
              placeholder="e.g. Kerala, Maharashtra"
            />
          </div>

          <div className="field">
            <label className="field-label">District / City</label>
            <input
              type="text"
              value={postingDistrict}
              onChange={(e) => set("gov_postingDistrict", e.target.value)}
              placeholder="e.g. Wayanad, Pune"
            />
          </div>

          <div className="field">
            <label className="field-label">Rural / Urban Classification</label>
            <select
              value={ruralUrbanClassification}
              onChange={(e) => set("gov_ruralUrbanClassification", e.target.value)}
            >
              <option value="">— Select Classification —</option>
              {ruralUrbanOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field full-col">
            <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={isRemotePosting}
                onChange={(e) => set("gov_isRemotePosting", e.target.checked)}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              This is a remote / hard-to-reach posting area
            </label>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Portfolio" />
        <div className="section-grid">
          <div className={fieldCls(errors.resumeFileName)}>
            <label className="field-label">
              Resume <Req />
            </label>
            <input
              id="resume-upload-government"
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleResumeUpload}
            />
            <label htmlFor="resume-upload-government" className="upload-btn">
              📎 Choose File
            </label>
            {profile.resumeFileName && (
              <span className="upload-file-name">✓ {profile.resumeFileName}</span>
            )}
            <FieldError msg={errors.resumeFileName} />
          </div>

          <div className={fieldCls(errors.portfolioLink)}>
            <label className="field-label">
              Portfolio Link <Req />
            </label>
            <input
              type="url"
              value={profile.portfolioLink ?? ""}
              onChange={(e) => onChange("portfolioLink", e.target.value)}
              placeholder="https://yoursite.dev"
            />
            <FieldError msg={errors.portfolioLink} />
          </div>

          <div className={fieldCls(errors.linkedinUrl)}>
            <label className="field-label">
              LinkedIn URL <Req />
            </label>
            <input
              type="url"
              value={profile.linkedinUrl ?? ""}
              onChange={(e) => onChange("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
            <FieldError msg={errors.linkedinUrl} />
          </div>

          <div className={fieldCls(errors.instagramId)}>
            <label className="field-label">
              Instagram ID <Req />
            </label>
            <input
              type="text"
              value={profile.instagramId ?? ""}
              onChange={(e) => onChange("instagramId", e.target.value)}
              placeholder="@username"
            />
            <FieldError msg={errors.instagramId} />
          </div>

          <div className={fieldCls(errors.facebookId)}>
            <label className="field-label">
              Facebook ID / URL <Req />
            </label>
            <input
              type="text"
              value={profile.facebookId ?? ""}
              onChange={(e) => onChange("facebookId", e.target.value)}
              placeholder="facebook.com/username"
            />
            <FieldError msg={errors.facebookId} />
          </div>

          <div className={fieldCls(errors.githubUrl)}>
            <label className="field-label">
              GitHub URL <Req />
            </label>
            <input
              type="url"
              value={profile.githubUrl ?? ""}
              onChange={(e) => onChange("githubUrl", e.target.value)}
              placeholder="https://github.com/username"
            />
            <FieldError msg={errors.githubUrl} />
          </div>

          <div className={fieldCls(errors.twitterUrl)}>
            <label className="field-label">
              Twitter <Req />
            </label>
            <input
              type="url"
              value={profile.twitterUrl ?? ""}
              onChange={(e) => onChange("twitterUrl", e.target.value)}
              placeholder="https://x.com/username"
            />
            <FieldError msg={errors.twitterUrl} />
          </div>
        </div>
        <div className="portfolio-main">
          <div className={fieldCls(errors.portfolioEvidence)}>
            <TagInput
              label="Portfolio Evidence *"
              initialTags={profile.portfolioEvidence ?? []}
              placeholder="Project / work sample name"
              onChange={(tags) => onChange("portfolioEvidence", tags)}
            />
            <FieldError msg={errors.portfolioEvidence} />
          </div>
        </div>
      </div>
    </div>
  );
}