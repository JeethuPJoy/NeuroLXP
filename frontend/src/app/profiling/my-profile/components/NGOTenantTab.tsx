"use client";

// import "./page.css";

import ISO6391 from "iso-639-1";
import TagInput from "../components/TagInput";
import { ProfileData } from "@/hooks/profiling/useProfile";
import { ValidationErrors } from "@/hooks/profiling/useProfileValidation";

interface Props {
  profile: ProfileData;
  onChange: (field: keyof ProfileData, value: unknown) => void;
  errors?: ValidationErrors;
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-header">
      <div className="section-bar" />
      <h3 className="section-title">{title}</h3>
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

// ── Impact indicator cards ─────────────────────────────────────────────────
type ImpactField = {
  key: keyof ProfileData;
  label: string;
  help: string;
};

const impactFields: ImpactField[] = [
  {
    key: "ngo_firstGraduateInFamily",
    label: "First Graduate in Family",
    help: "Identifies learners who may need additional academic or family-context support.",
  },
  {
    key: "ngo_womenHeadedHousehold",
    label: "Women-headed Household",
    help: "Supports inclusion, mentoring, and impact reporting.",
  },
  {
    key: "ngo_economicallyDisadvantaged",
    label: "Economically Disadvantaged",
    help: "Helps prioritise scholarships, fee support, stipends, or subsidised services.",
  },
  {
    key: "ngo_disabilitySupportNeeded",
    label: "Disability Support Needed",
    help: "Flags accessibility and learner-support requirements.",
  },
  {
    key: "ngo_transportationConstraint",
    label: "Transportation Constraint",
    help: "Helps plan classroom access, attendance support, and hybrid alternatives.",
  },
  {
    key: "ngo_caregivingResponsibilities",
    label: "Caregiving Responsibilities",
    help: "Supports flexible scheduling and learner-retention planning.",
  },
  {
    key: "ngo_minorityOrMarginalisedGroup",
    label: "Minority / Marginalised Group",
    help: "Supports targeted inclusion policies and equity-based reporting.",
  },
  {
    key: "ngo_refugeeOrDisplacedPerson",
    label: "Refugee / Displaced Person",
    help: "Flags eligibility for refugee-specific programmes and funding streams.",
  },
  {
    key: "ngo_foodOrHousingInsecurity",
    label: "Food / Housing Insecurity",
    help: "Helps identify learners needing welfare referrals alongside training.",
  },
];

// ── Option lists ───────────────────────────────────────────────────────────
const workModeOptions = ["On-site", "Remote", "Hybrid", "Flexible", "No preference"];
const relocationOptions = ["Yes", "No", "Maybe", "Only within my region"];

const learningModeOptions = [
  "Online — Self-paced",
  "Online — Live / Instructor-led",
  "In-person / Classroom",
  "Blended (Online + Classroom)",
  "Mobile Learning",
  "On-the-job / Mentorship",
  "No preference",
];

const digitalLiteracyOptions = [
  "Beginner (basic browsing, email)",
  "Basic (MS Office, forms, video calls)",
  "Intermediate (LMS, collaboration platforms, data tools)",
  "Advanced (analytics, automation, system admin)",
  "Not sure",
];

const deviceOptions = [
  "Own smartphone",
  "Shared smartphone",
  "Own laptop / desktop",
  "Shared laptop / desktop",
  "Tablet",
  "No reliable device",
];

const internetAccessOptions = [
  "Reliable broadband / fibre",
  "4G / LTE mobile data",
  "3G mobile data",
  "2G / slow connection",
  "Shared / intermittent access",
  "No regular access",
];

const bandwidthOptions = [
  "Below 1 Mbps",
  "1 – 5 Mbps",
  "5 – 10 Mbps",
  "10 – 25 Mbps",
  "Above 25 Mbps",
];

const connectivityReliabilityOptions = [
  "Very unreliable (frequent outages)",
  "Unreliable (daily disruptions)",
  "Moderate (occasional drops)",
  "Reliable (minor issues only)",
  "Very reliable",
];

const learningTimeOptions = [
  "Early morning (before 9 am)",
  "Morning (9 am – 12 pm)",
  "Afternoon (12 pm – 5 pm)",
  "Evening (5 pm – 9 pm)",
  "Late night (after 9 pm)",
  "Weekends only",
  "Flexible / no preference",
];

const weeklyHoursOptions = [
  "Less than 2 hours",
  "2 – 5 hours",
  "5 – 10 hours",
  "10 – 20 hours",
  "More than 20 hours",
];

const sectorOptions = [
  "Agriculture & Rural Development",
  "Child Protection & Welfare",
  "Community Development",
  "Disability & Rehabilitation",
  "Disaster Relief & Humanitarian Aid",
  "Education & Literacy",
  "Environment & Climate",
  "Gender & Women Empowerment",
  "Healthcare & Public Health",
  "Human Rights & Advocacy",
  "Livelihoods & Skill Development",
  "Mental Health & Psychosocial Support",
  "Microfinance & Economic Inclusion",
  "Migration & Refugees",
  "Nutrition & Food Security",
  "Sanitation & WASH",
  "Technology for Development",
  "Youth Development",
  "Other",
];

const employmentStatusOptions = [
  "Unemployed — seeking work",
  "Unemployed — not seeking",
  "Employed (part-time)",
  "Employed (full-time)",
  "Self-employed / freelance",
  "Daily wage / informal labour",
  "Student",
  "Homemaker",
  "Volunteer",
  "Other",
];

const experienceYearOptions = [
  "No prior experience",
  "Less than 1 year",
  "1 – 2 years",
  "3 – 5 years",
  "6 – 10 years",
  "More than 10 years",
];

const targetRoleOptions = [
  "Community Mobiliser",
  "Field Worker / Outreach Officer",
  "Data Entry Operator",
  "Programme Coordinator",
  "Trainer / Facilitator",
  "Healthcare Worker",
  "Social Worker",
  "Accounts / Finance Officer",
  "Admin / Office Assistant",
  "IT / Digital Support",
  "Advocacy / Communications Officer",
  "Other",
];

const digitalCompetencyOptions = [
  "Email & basic communication",
  "MS Office / Google Workspace",
  "Video conferencing (Zoom, Meet)",
  "LMS / e-learning platforms",
  "Data entry & spreadsheets",
  "Social media management",
  "Basic data analysis",
  "Field data collection apps",
  "Not applicable",
];

const skillGapOptions = [
  "Communication & presentation",
  "Computer & digital skills",
  "Data collection & reporting",
  "Financial literacy",
  "Leadership & management",
  "Project management",
  "English language proficiency",
  "Technical / vocational skills",
  "Entrepreneurship",
  "Legal & rights awareness",
];

const educationLevels = [
  "No formal education",
  "Primary education",
  "Secondary education",
  "Higher Secondary / 12th",
  "Certificate / ITI",
  "Diploma",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate / PhD",
  "Other",
];

const educationStatusOptions = [
  "Completed",
  "Currently enrolled",
  "Pursuing / in progress",
  "Dropped out",
  "Deferred",
];

const certificationStatusOptions = [
  "Currently held",
  "Pending / in progress",
  "Expired",
  "Required but not yet obtained",
];

const accessibilityOptions = [
  "Captions / subtitles",
  "Audio narration",
  "High contrast mode",
  "Large text",
  "Screen reader support",
  "Simplified layout",
  "Reduced motion",
  "Sign language interpretation",
];

const contentFormatOptions = [
  "Video",
  "Text / PDF",
  "Audio / Podcast",
  "Interactive simulations",
  "Live sessions",
  "Assignments & quizzes",
  "Microlearning (short modules)",
];

const motivationOptions = [
  "Get a job / better employment",
  "Start my own business",
  "Improve existing skills",
  "Meet programme / NGO requirement",
  "Personal growth & learning",
  "Support my community",
  "Gain a certificate / credential",
  "Change career sector",
];

const programmeEnrolmentOptions = [
  "Livelihood & Skills Programme",
  "Women Empowerment Programme",
  "Youth Development Programme",
  "Digital Literacy Programme",
  "Health & Nutrition Programme",
  "Entrepreneurship Programme",
  "Community Mobilisation Programme",
  "Rehabilitation Programme",
  "Other",
];

const consentScopeOptions = [
  "Data shared only within programme",
  "Data shared with partner NGOs",
  "Data shared with government bodies",
  "Data shared with donors / funders",
  "Anonymised data for research",
];

const relationshipOptions = [
  "Parent",
  "Guardian",
  "Spouse",
  "Sibling",
  "Child (adult)",
  "Friend / Neighbour",
  "Social Worker",
  "Other",
];

const locationTypeOptions = [
  "Urban — Metro",
  "Urban — City",
  "Urban — Town",
  "Semi-urban / Peri-urban",
  "Rural",
  "Tribal / Forest Area",
  "Coastal",
  "Island / Remote Geography",
];

// ── Main component ─────────────────────────────────────────────────────────
export default function NGOTenantTab({ profile, onChange, errors = {} }: Props) {
  const set = (field: keyof ProfileData, value: unknown) => onChange(field, value);
  const p = profile as Record<string, unknown>;
  const get = (key: string): unknown => p[key];
  const str = (key: string) => (get(key) as string) ?? "";
  const arr = (key: string) => (get(key) as string[]) ?? [];

  const toggleMulti = (key: string, current: string[], val: string) => {
    const updated = current.includes(val)
      ? current.filter((v) => v !== val)
      : [...current, val];
    set(key as keyof ProfileData, updated);
  };

  // Certifications state
  const certifications = (profile.ngo_mandatoryCertifications as { name: string; status: string; issuingBody: string; expiryDate: string }[]) ?? [
    { name: "", status: "", issuingBody: "", expiryDate: "" },
  ];

  const updateCertification = (index: number, field: string, value: string) => {
    const updated = certifications.map((c, i) =>
      i === index ? { ...c, [field]: value } : c
    );
    set("ngo_mandatoryCertifications", updated);
  };

  const addCertification = () => {
    set("ngo_mandatoryCertifications", [
      ...certifications,
      { name: "", status: "", issuingBody: "", expiryDate: "" },
    ]);
  };

  const removeCertification = (index: number) => {
    const updated = certifications.filter((_, i) => i !== index);
    set("ngo_mandatoryCertifications", updated.length ? updated : [
      { name: "", status: "", issuingBody: "", expiryDate: "" },
    ]);
  };

  const languages = ISO6391.getAllNames();

  return (
    <div className="csv-sections ngo-tab">

      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — Communication & Language
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Communication & Language" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_primaryEmail as string)}>
            <label className="field-label">Email <Req /></label>
            <input
              type="email"
              value={str("ngo_primaryEmail")}
              onChange={(e) => set("ngo_primaryEmail" as keyof ProfileData, e.target.value)}
              placeholder="name@organisation.org"
            />
            <FieldError msg={errors.ngo_primaryEmail as string} />
          </div>

          <div className={fieldCls(errors.ngo_mobileNumber as string)}>
            <label className="field-label">Mobile Number <Req /></label>
            <input
              type="tel"
              value={str("ngo_mobileNumber")}
              onChange={(e) => set("ngo_mobileNumber" as keyof ProfileData, e.target.value)}
              placeholder="+91 98765 43210"
            />
            <FieldError msg={errors.ngo_mobileNumber as string} />
          </div>

          <div className={fieldCls(errors.ngo_preferredLanguage as string)}>
            <label className="field-label">Preferred Language <Req /></label>
            <select
              value={str("ngo_preferredLanguage")}
              onChange={(e) => set("ngo_preferredLanguage" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select Language —</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_preferredLanguage as string} />
          </div>

          {/* <div className="field">
            <label className="field-label">Timezone</label>
            <select
              value={str("ngo_timezone")}
              onChange={(e) => set("ngo_timezone" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select Timezone —</option>
              {["UTC-12:00","UTC-08:00 (PST)","UTC-05:00 (EST)","UTC+00:00 (GMT)","UTC+01:00 (CET)","UTC+03:00 (EAT)","UTC+05:30 (IST)","UTC+07:00 (ICT)","UTC+08:00 (CST)","UTC+09:00 (JST)","UTC+10:00 (AEST)"].map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </select>
          </div> */}

          {/* <div className="field full-col">
            <label className="field-label">
              Secondary Languages
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {["English","Hindi","Arabic","French","Spanish","Swahili","Bengali","Tamil","Portuguese","Other"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`govt-chip${arr("ngo_secondaryLanguages").includes(lang) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_secondaryLanguages", arr("ngo_secondaryLanguages"), lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div> */}

          <div className="field full-col">
            <label className="field-label">
              Preferred Communication Mode
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {["Email","SMS","WhatsApp","In-app Notifications","Voice Alerts","Phone Call"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  className={`govt-chip${arr("ngo_communicationModes").includes(mode) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_communicationModes", arr("ngo_communicationModes"), mode)}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — Geographic / Location Info
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Location & Geography" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_country as string)}>
            <label className="field-label">Country <Req /></label>
            <input
              type="text"
              value={str("ngo_country")}
              onChange={(e) => set("ngo_country" as keyof ProfileData, e.target.value)}
              placeholder="e.g. India, Kenya, Bangladesh"
            />
            <FieldError msg={errors.ngo_country as string} />
          </div>

          <div className="field">
            <label className="field-label">State / Province</label>
            <input
              type="text"
              value={str("ngo_state")}
              onChange={(e) => set("ngo_state" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Kerala, Nairobi County"
            />
          </div>

          <div className="field">
            <label className="field-label">District / City</label>
            <input
              type="text"
              value={str("ngo_district")}
              onChange={(e) => set("ngo_district" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Wayanad, Mombasa"
            />
          </div>

          <div className="field">
            <label className="field-label">Location Type</label>
            <select
              value={str("ngo_locationType")}
              onChange={(e) => set("ngo_locationType" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {locationTypeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — NGO Impact Indicators
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="NGO Impact Indicators" />
        <div className="ngo-impact-grid">
          {impactFields.map((field) => {
            const selected = Boolean(profile[field.key]);
            return (
              <button
                key={field.key}
                type="button"
                className={`ngo-impact-card${selected ? " ngo-impact-card--active" : ""}`}
                onClick={() => set(field.key, !selected)}
                aria-pressed={selected}
              >
                <span className="ngo-impact-toggle">{selected ? "Yes" : "No"}</span>
                <span className="ngo-impact-title">{field.label}</span>
                <span className="ngo-impact-help">{field.help}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — Educational Background
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Educational Background" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_highestEducation as string)}>
            <label className="field-label">Highest Education Level <Req /></label>
            <select
              value={str("ngo_highestEducation")}
              onChange={(e) => set("ngo_highestEducation" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {educationLevels.map((l) => (
                <option key={l} value={l}>{l}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_highestEducation as string} />
          </div>

          <div className="field">
            <label className="field-label">Current Education Status</label>
            <select
              value={str("ngo_currentEducationStatus")}
              onChange={(e) => set("ngo_currentEducationStatus" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {educationStatusOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Area of Study / Specialisation</label>
            <input
              type="text"
              value={str("ngo_areaOfStudy")}
              onChange={(e) => set("ngo_areaOfStudy" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Social Work, Nursing, Agriculture"
            />
          </div>

          <div className="field">
            <label className="field-label">Experience with Online Learning</label>
            <select
              value={str("ngo_onlineLearningExp")}
              onChange={(e) => set("ngo_onlineLearningExp" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {["No experience","First time","Occasional (1–2 courses)","Regular (3+ courses)","Advanced / Facilitator"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Prior Certifications / Trainings
              <span className="optional-tag"> (type and press Enter to add)</span>
            </label>
            <TagInput
              initialTags={arr("ngo_priorCertifications")}
              onChange={(tags) => set("ngo_priorCertifications" as keyof ProfileData, tags)}
              placeholder="e.g. First Aid, Safeguarding, Community Health…"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 5 — Access & Learning Readiness
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Access & Learning Readiness" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_learningModePreference as string)}>
            <label className="field-label">Learning Mode Preference <Req /></label>
            <select
              value={str("ngo_learningModePreference")}
              onChange={(e) => set("ngo_learningModePreference" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {learningModeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_learningModePreference as string} />
          </div>

          <div className="field">
            <label className="field-label">Device Availability</label>
            <select
              value={str("ngo_deviceAvailability")}
              onChange={(e) => set("ngo_deviceAvailability" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {deviceOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Internet Access Type</label>
            <select
              value={str("ngo_internetAccess")}
              onChange={(e) => set("ngo_internetAccess" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {internetAccessOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Average Available Bandwidth</label>
            <select
              value={str("ngo_avgBandwidth")}
              onChange={(e) => set("ngo_avgBandwidth" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {bandwidthOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Connectivity Reliability</label>
            <select
              value={str("ngo_connectivityReliability")}
              onChange={(e) => set("ngo_connectivityReliability" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {connectivityReliabilityOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Preferred Learning Time</label>
            <select
              value={str("ngo_preferredLearningTime")}
              onChange={(e) => set("ngo_preferredLearningTime" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {learningTimeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Hours Available per Week</label>
            <select
              value={str("ngo_weeklyLearningHours")}
              onChange={(e) => set("ngo_weeklyLearningHours" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {weeklyHoursOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field full-col">
            <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={Boolean(get("ngo_offlineAccessNeeded"))}
                onChange={(e) => set("ngo_offlineAccessNeeded" as keyof ProfileData, e.target.checked)}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              I need offline / downloadable content access
            </label>
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
                  className={`govt-chip${arr("ngo_preferredContentFormats").includes(fmt) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_preferredContentFormats", arr("ngo_preferredContentFormats"), fmt)}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="field full-col">
            <label className="field-label">
              Accessibility Requirements
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {accessibilityOptions.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`govt-chip${arr("ngo_accessibilityNeeds").includes(a) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_accessibilityNeeds", arr("ngo_accessibilityNeeds"), a)}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 6 — Work Domain & Digital Literacy
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Work Domain & Digital Literacy" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_sector as string)}>
            <label className="field-label">Sector / Industry <Req /></label>
            <select
              value={str("ngo_sector")}
              onChange={(e) => set("ngo_sector" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select Sector —</option>
              {sectorOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_sector as string} />
          </div>

          <div className="field">
            <label className="field-label">Preferred Work Domain</label>
            <input
              type="text"
              value={str("ngo_workDomain")}
              onChange={(e) => set("ngo_workDomain" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Community health, Rural education"
            />
          </div>

          <div className="field">
            <label className="field-label">Current Employment Status</label>
            <select
              value={str("ngo_employmentStatus")}
              onChange={(e) => set("ngo_employmentStatus" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {employmentStatusOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Prior Work Experience</label>
            <select
              value={str("ngo_priorWorkExperience")}
              onChange={(e) => set("ngo_priorWorkExperience" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {experienceYearOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Digital Literacy Level</label>
            <select
              value={str("ngo_digitalLiteracyLevel")}
              onChange={(e) => set("ngo_digitalLiteracyLevel" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {digitalLiteracyOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 7 — Role & Digital Competency
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Role & Digital Competency" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_targetRoleType as string)}>
            <label className="field-label">Target Role Type <Req /></label>
            <select
              value={str("ngo_targetRoleType")}
              onChange={(e) => set("ngo_targetRoleType" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select Role —</option>
              {targetRoleOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_targetRoleType as string} />
          </div>

          <div className="field full-col">
            <label className="field-label">
              Digital Competencies
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {digitalCompetencyOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`govt-chip${arr("ngo_roleDigitalCompetency").includes(c) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_roleDigitalCompetency", arr("ngo_roleDigitalCompetency"), c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="field full-col">
            <label className="field-label">
              Self-assessed Skill Gaps
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {skillGapOptions.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`govt-chip${arr("ngo_skillGaps").includes(s) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_skillGaps", arr("ngo_skillGaps"), s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="field full-col tag-input-wrap">
            <label className="field-label">
              Languages Spoken
              <span className="optional-tag"> (type and press Enter to add)</span>
            </label>
            <TagInput
              initialTags={arr("ngo_languagesSpoken")}
              onChange={(tags) => set("ngo_languagesSpoken" as keyof ProfileData, tags)}
              placeholder="e.g. Malayalam, Hindi, English…"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 8 — Mandatory Certifications
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Mandatory Certifications" />

        {certifications.map((cert, index) => (
          <div key={index} className="ngo-cert-block">
            <div className="ngo-cert-header">
              <span className="ngo-cert-index">Certification {index + 1}</span>
              {index > 0 && (
                <button
                  type="button"
                  className="remove-skill-btn"
                  onClick={() => removeCertification(index)}
                >
                  Remove
                </button>
              )}
            </div>
            <div className="section-grid">
              <div className="field">
                <label className="field-label">Certification Name</label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => updateCertification(index, "name", e.target.value)}
                  placeholder="e.g. First Aid, Safeguarding, Data Protection"
                />
              </div>
              <div className="field">
                <label className="field-label">Status</label>
                <select
                  value={cert.status}
                  onChange={(e) => updateCertification(index, "status", e.target.value)}
                >
                  <option value="">— Select Status —</option>
                  {certificationStatusOptions.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label className="field-label">Issuing Body</label>
                <input
                  type="text"
                  value={cert.issuingBody}
                  onChange={(e) => updateCertification(index, "issuingBody", e.target.value)}
                  placeholder="e.g. Red Cross, WHO, Ministry of Health"
                />
              </div>
              <div className="field">
                <label className="field-label">Expiry Date</label>
                <input
                  type="date"
                  value={cert.expiryDate}
                  onChange={(e) => updateCertification(index, "expiryDate", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}

        <button type="button" className="add-skill-btn" onClick={addCertification}>
          + Add Certification
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 9 — Programme / Cohort Enrolment
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Programme & Cohort Enrolment" />
        <div className="section-grid">
          <div className={fieldCls(errors.ngo_programmeName as string)}>
            <label className="field-label">Programme Enrolled In <Req /></label>
            <select
              value={str("ngo_programmeName")}
              onChange={(e) => set("ngo_programmeName" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select Programme —</option>
              {programmeEnrolmentOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_programmeName as string} />
          </div>

          <div className="field">
            <label className="field-label">Cohort / Batch</label>
            <input
              type="text"
              value={str("ngo_cohortBatch")}
              onChange={(e) => set("ngo_cohortBatch" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Batch 2024-A, Cohort 3"
            />
          </div>

          <div className="field">
            <label className="field-label">Enrolment Date</label>
            <input
              type="date"
              value={str("ngo_enrolmentDate")}
              onChange={(e) => set("ngo_enrolmentDate" as keyof ProfileData, e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Assigned Facilitator / Counsellor</label>
            <input
              type="text"
              value={str("ngo_assignedFacilitator")}
              onChange={(e) => set("ngo_assignedFacilitator" as keyof ProfileData, e.target.value)}
              placeholder="Facilitator name or ID"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 10 — Career & Placement Intent
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Career & Placement Intent" />
        <div className="section-grid">
          <div className={`${fieldCls(errors.ngo_careerGoal as string)} full-col`}>
            <label className="field-label">Long-term Career Goal <Req /></label>
            <textarea
              value={str("ngo_careerGoal")}
              onChange={(e) => set("ngo_careerGoal" as keyof ProfileData, e.target.value)}
              rows={3}
              placeholder="Describe the learner's career goal"
            />
            <FieldError msg={errors.ngo_careerGoal as string} />
          </div>

          <div className="field full-col">
            <label className="field-label">Immediate / Short-term Goal</label>
            <textarea
              value={str("ngo_shortTermGoal")}
              onChange={(e) => set("ngo_shortTermGoal" as keyof ProfileData, e.target.value)}
              rows={2}
              placeholder="e.g. Get a job within 3 months, complete this certification"
            />
          </div>

          <div className={fieldCls(errors.ngo_preferredJobRole as string)}>
            <label className="field-label">Preferred Job Role <Req /></label>
            <input
              type="text"
              value={str("ngo_preferredJobRole")}
              onChange={(e) => set("ngo_preferredJobRole" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Community Mobiliser"
            />
            <FieldError msg={errors.ngo_preferredJobRole as string} />
          </div>

          <div className="field">
            <label className="field-label">Preferred Work Location</label>
            <input
              type="text"
              value={str("ngo_preferredWorkLocation")}
              onChange={(e) => set("ngo_preferredWorkLocation" as keyof ProfileData, e.target.value)}
              placeholder="e.g. Local area, district, city, country"
            />
          </div>

          <div className="field">
            <label className="field-label">Relocation Willingness</label>
            <select
              value={str("ngo_relocationWillingness")}
              onChange={(e) => set("ngo_relocationWillingness" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {relocationOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Preferred Salary Range</label>
            <input
              type="text"
              value={str("ngo_preferredSalaryRange")}
              onChange={(e) => set("ngo_preferredSalaryRange" as keyof ProfileData, e.target.value)}
              placeholder="e.g. 15,000 – 25,000 per month"
            />
          </div>

          <div className={fieldCls(errors.ngo_workModePreference as string)}>
            <label className="field-label">Work Mode Preference <Req /></label>
            <select
              value={str("ngo_workModePreference")}
              onChange={(e) => set("ngo_workModePreference" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {workModeOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
            <FieldError msg={errors.ngo_workModePreference as string} />
          </div>

          <div className="field full-col">
            <label className="field-label">
              Motivation for Training
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {motivationOptions.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={`govt-chip${arr("ngo_motivationForTraining").includes(m) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_motivationForTraining", arr("ngo_motivationForTraining"), m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 11 — Emergency / Guardian Contact
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Emergency & Guardian Contact" />
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Contact Name</label>
            <input
              type="text"
              value={str("ngo_emergencyContactName")}
              onChange={(e) => set("ngo_emergencyContactName" as keyof ProfileData, e.target.value)}
              placeholder="Full name"
            />
          </div>

          <div className="field">
            <label className="field-label">Relationship</label>
            <select
              value={str("ngo_emergencyContactRelation")}
              onChange={(e) => set("ngo_emergencyContactRelation" as keyof ProfileData, e.target.value)}
            >
              <option value="">— Select —</option>
              {relationshipOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Contact Phone</label>
            <input
              type="tel"
              value={str("ngo_emergencyContactPhone")}
              onChange={(e) => set("ngo_emergencyContactPhone" as keyof ProfileData, e.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>

          <div className="field">
            <label className="field-label">Contact Email</label>
            <input
              type="email"
              value={str("ngo_emergencyContactEmail")}
              onChange={(e) => set("ngo_emergencyContactEmail" as keyof ProfileData, e.target.value)}
              placeholder="guardian@email.com"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 12 — Consent & Data Privacy
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Consent & Data Privacy" />
        <div className="section-grid">
          <div className="field full-col">
            <label className="field-label">
              Data Sharing Consent
              <span className="optional-tag"> (select all that apply)</span>
            </label>
            <div className="govt-chip-group">
              {consentScopeOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`govt-chip${arr("ngo_dataConsentScope").includes(c) ? " govt-chip--active" : ""}`}
                  onClick={() => toggleMulti("ngo_dataConsentScope", arr("ngo_dataConsentScope"), c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="field full-col">
            <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={Boolean(get("ngo_consentGiven"))}
                onChange={(e) => set("ngo_consentGiven" as keyof ProfileData, e.target.checked)}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              I consent to my data being used for programme monitoring and impact reporting
            </label>
          </div>

          <div className="field full-col">
            <label className="field-label" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <input
                type="checkbox"
                checked={Boolean(get("ngo_marketingConsentGiven"))}
                onChange={(e) => set("ngo_marketingConsentGiven" as keyof ProfileData, e.target.checked)}
                style={{ width: "1rem", height: "1rem", cursor: "pointer" }}
              />
              I consent to receive programme updates, opportunities, and communications
            </label>
          </div>

          <div className="field">
            <label className="field-label">Consent Given Date</label>
            <input
              type="date"
              value={str("ngo_consentDate")}
              onChange={(e) => set("ngo_consentDate" as keyof ProfileData, e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label">Consent Witnessed By</label>
            <input
              type="text"
              value={str("ngo_consentWitness")}
              onChange={(e) => set("ngo_consentWitness" as keyof ProfileData, e.target.value)}
              placeholder="Facilitator / social worker name"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          SECTION 13 — Portfolio
      ════════════════════════════════════════════════════════════ */}
      <div className="section">
        <SectionHeading title="Portfolio" />
        <div className="section-grid">
          <div className={fieldCls(errors.resumeFileName)}>
            <label className="field-label">Resume <Req /></label>
            <input
              type="text"
              value={profile.resumeFileName ?? ""}
              onChange={(e) => onChange("resumeFileName", e.target.value)}
              placeholder="Resume file name or URL"
            />
            <FieldError msg={errors.resumeFileName} />
          </div>

          <div className={fieldCls(errors.portfolioLink)}>
            <label className="field-label">Portfolio Link <Req /></label>
            <input
              type="url"
              value={profile.portfolioLink ?? ""}
              onChange={(e) => onChange("portfolioLink", e.target.value)}
              placeholder="https://yoursite.dev"
            />
            <FieldError msg={errors.portfolioLink} />
          </div>

          <div className={fieldCls(errors.linkedinUrl)}>
            <label className="field-label">LinkedIn URL <Req /></label>
            <input
              type="url"
              value={profile.linkedinUrl ?? ""}
              onChange={(e) => onChange("linkedinUrl", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
            <FieldError msg={errors.linkedinUrl} />
          </div>

          <div className={fieldCls(errors.instagramId)}>
            <label className="field-label">Instagram ID <Req /></label>
            <input
              type="text"
              value={profile.instagramId ?? ""}
              onChange={(e) => onChange("instagramId", e.target.value)}
              placeholder="@username"
            />
            <FieldError msg={errors.instagramId} />
          </div>

          <div className={fieldCls(errors.facebookId)}>
            <label className="field-label">Facebook ID / URL <Req /></label>
            <input
              type="text"
              value={profile.facebookId ?? ""}
              onChange={(e) => onChange("facebookId", e.target.value)}
              placeholder="facebook.com/username"
            />
            <FieldError msg={errors.facebookId} />
          </div>

          <div className={fieldCls(errors.githubUrl)}>
            <label className="field-label">GitHub URL <Req /></label>
            <input
              type="url"
              value={profile.githubUrl ?? ""}
              onChange={(e) => onChange("githubUrl", e.target.value)}
              placeholder="https://github.com/username"
            />
            <FieldError msg={errors.githubUrl} />
          </div>

          <div className={fieldCls(errors.twitterUrl)}>
            <label className="field-label">Twitter <Req /></label>
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
