"use client";

import "./SudentProfileTab.css";

import ISO6391 from "iso-639-1";
import TagInput from "../TagInput";
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

export default function SelfProfileTab({
  profile,
  onChange,
  errors = {},
}: Props) {
  const languages = ISO6391.getAllNames();

  const educationLevels = [
    "Secondary School",
    "High School / Higher Secondary",
    "Certificate",
    "Diploma",
    "Associate Degree",
    "Bachelor’s Degree",
    "Master’s Degree",
    "Doctorate / PhD",
    "Other",
  ];

  const gradingSystems = [
    "Percentage",
    "GPA",
    "CGPA",
    "Letter Grade",
    "Pass / Fail",
    "Class / Division",
    "Other",
  ];

  const educationHistory = profile.educationHistory ?? [
    {
      level: "",
      qualification: "",
      institution: "",
      fieldOfStudy: "",
      gradingSystem: "",
      grade: "",
      startYear: "",
      endYear: "",
    },
  ];

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...educationHistory];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange("educationHistory", updated);
  };

  const addEducation = () => {
    onChange("educationHistory", [
      ...educationHistory,
      {
        level: "",
        qualification: "",
        institution: "",
        fieldOfStudy: "",
        gradingSystem: "",
        grade: "",
        startYear: "",
        endYear: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    const updated = educationHistory.filter((_, i) => i !== index);
    onChange("educationHistory", updated);
  };

  return (
    <div className="csv-sections">
      <div className="section">
        <SectionHeading title="Personal Preferences" />
        <div className="section-grid">
          <div className={fieldCls(errors.preferredName)}>
            <label className="field-label">Preferred Name</label>
            <input
              type="text"
              value={profile.preferredName ?? ""}
              onChange={(e) => onChange("preferredName", e.target.value)}
              placeholder="e.g. Goutham"
            />
            <FieldError msg={errors.preferredName} />
          </div>
          <div className={fieldCls(errors.nationality)}>
            <label className="field-label">Nationality <Req /></label>
            <input
              type="text"
              value={profile.nationality ?? ""}
              onChange={(e) => onChange("nationality", e.target.value)}
              placeholder="e.g. Indian"
            />
            <FieldError msg={errors.nationality} />
          </div>

          <div className={fieldCls(errors.id_proof_type)}>
            <label className="field-label">Identity Document Type <Req /></label>
            <select
              value={profile.id_proof_type ?? ""}
              onChange={(e) => onChange("id_proof_type", e.target.value)}
            >
              <option value="">Select…</option>
              <option value="passport">Passport</option>
              <option value="national_id">National ID</option>
              <option value="residence_permit">Residence Permit</option>
              <option value="driving_licence">Driving Licence</option>
              <option value="voter_id">Voter ID</option>
              <option value="aadhaar">Aadhaar</option>
              <option value="other">Other</option>
            </select>
            <FieldError msg={errors.id_proof_type} />
          </div>

          <div className={fieldCls(errors.id_proof_number)}>
            <label className="field-label">Identity Document Number <Req /></label>
            <input
              type="text"
              value={profile.id_proof_number ?? ""}
              onChange={(e) => onChange("id_proof_number", e.target.value)}
              placeholder="Enter document number"
            />
            <FieldError msg={errors.id_proof_number} />
          </div>

          <div className={fieldCls(errors.identity_issuing_country)}>
            <label className="field-label">Issuing Country <Req /></label>
            <input
              type="text"
              value={profile.identity_issuing_country ?? ""}
              onChange={(e) =>
                onChange("identity_issuing_country", e.target.value)
              }
              placeholder="e.g. India"
            />
            <FieldError msg={errors.identity_issuing_country} />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Contact" />
        <div className="section-grid">
          <div className={fieldCls(errors.alternateContact)}>
            <label className="field-label">
              Alternate Contact <Req />
            </label>
            <input
              type="text"
              value={profile.alternateContact ?? ""}
              onChange={(e) => onChange("alternateContact", e.target.value)}
              placeholder="91 XXXXX XXXXX"
            />
            <FieldError msg={errors.alternateContact} />
          </div>

          <div className={fieldCls(errors.alternateemailid)}>
            <label className="field-label">
              Alternate Email-id <Req />
            </label>
            <input
              type="text"
              value={profile.alternateemailid ?? ""}
              onChange={(e) => onChange("alternateemailid", e.target.value)}
              placeholder="e.g. name@example.com"
            />
            <FieldError msg={errors.alternateemailid} />
          </div>
        </div>
      </div>

      {/* ── Education & Background ── */}
      <div className="section">
        <div className="section-header">
          <div className="section-bar" />
          <h3 className="section-title">Education & Background</h3>

          <button
            type="button"
            className="add-skill-btn"
            onClick={addEducation}
          >
            + Add Education
          </button>
        </div>

        {educationHistory.map((education, index) => (
          <div key={index} className="education-record">
            <div className="section-grid">
              <div className="field">
                <label className="field-label">
                  Education Level <Req />
                </label>
                <select
                  value={education.level}
                  onChange={(e) =>
                    updateEducation(index, "level", e.target.value)
                  }
                >
                  <option value="">Select…</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field-label">
                  Qualification / Programme <Req />
                </label>
                <input
                  type="text"
                  value={education.qualification}
                  onChange={(e) =>
                    updateEducation(index, "qualification", e.target.value)
                  }
                  placeholder="e.g. Bachelor of Science, High School Diploma"
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Institution Name <Req />
                </label>
                <input
                  type="text"
                  value={education.institution}
                  onChange={(e) =>
                    updateEducation(index, "institution", e.target.value)
                  }
                  placeholder="e.g. University of Oxford"
                />
              </div>

              <div className="field">
                <label className="field-label">Field of Study <Req /></label>
                <input
                  type="text"
                  value={education.fieldOfStudy}
                  onChange={(e) =>
                    updateEducation(index, "fieldOfStudy", e.target.value)
                  }
                  placeholder="e.g. Computer Science"
                />
              </div>

              <div className="field">
                <label className="field-label">Grading System</label>
                <select
                  value={education.gradingSystem}
                  onChange={(e) =>
                    updateEducation(index, "gradingSystem", e.target.value)
                  }
                >
                  <option value="">Select…</option>
                  {gradingSystems.map((system) => (
                    <option key={system} value={system}>
                      {system}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label className="field-label">Grade / Score</label>
                <input
                  type="text"
                  value={education.grade}
                  onChange={(e) =>
                    updateEducation(index, "grade", e.target.value)
                  }
                  placeholder="e.g. 3.8 GPA, 85%, A"
                />
              </div>

              <div className="field">
                <label className="field-label">Start Year <Req /></label>
                <input
                  type="text"
                  value={education.startYear}
                  onChange={(e) =>
                    updateEducation(index, "startYear", e.target.value)
                  }
                  placeholder="e.g. 2020"
                />
              </div>

              <div className="field">
                <label className="field-label">End Year <Req /></label>
                <input
                  type="text"
                  value={education.endYear}
                  onChange={(e) =>
                    updateEducation(index, "endYear", e.target.value)
                  }
                  placeholder="e.g. 2024 or Present"
                />
              </div>
            </div>

            {educationHistory.length > 1 && (
              <button
                type="button"
                className="remove-skill-btn"
                onClick={() => removeEducation(index)}
              >
                Remove Education
              </button>
            )}
          </div>
        ))}
        <FieldError msg={errors.educationHistory} />
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-bar" />
          <h3 className="section-title">Certifications</h3>
          <button
            type="button"
            className="add-skill-btn"
            onClick={() =>
              onChange("certifications", [
                ...(profile.certifications ?? []),
                {
                  name: "",
                  issuingOrg: "",
                  issueDate: "",
                  expiryDate: "",
                  credentialId: "",
                  credentialUrl: "",
                },
              ])
            }
          >
            + Add Certification
          </button>
        </div>

        {(
          profile.certifications ?? [
            {
              name: "",
              issuingOrg: "",
              issueDate: "",
              expiryDate: "",
              credentialId: "",
              credentialUrl: "",
            },
          ]
        ).map((cert, index) => (
          <div key={index} className="education-record">
            <div className="section-grid">
              <div className="field">
                <label className="field-label">
                  Certification Name <Req />
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      name: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                  placeholder="e.g. AWS Certified Developer"
                />
              </div>

              <div className="field">
                <label className="field-label">Issuing Organisation <Req /></label>
                <input
                  type="text"
                  value={cert.issuingOrg}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      issuingOrg: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              <div className="field">
                <label className="field-label">Issue Date <Req /></label>
                <input
                  type="date"
                  value={cert.issueDate}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      issueDate: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                />
              </div>

              <div className="field">
                <label className="field-label">Expiry Date</label>
                <input
                  type="date"
                  value={cert.expiryDate}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      expiryDate: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                />
              </div>

              <div className="field">
                <label className="field-label">Credential ID</label>
                <input
                  type="text"
                  value={cert.credentialId}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      credentialId: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                  placeholder="e.g. ABC123XYZ"
                />
              </div>

              <div className="field">
                <label className="field-label">Credential URL</label>
                <input
                  type="url"
                  value={cert.credentialUrl}
                  onChange={(e) => {
                    const updated = [...(profile.certifications ?? [])];
                    updated[index] = {
                      ...updated[index],
                      credentialUrl: e.target.value,
                    };
                    onChange("certifications", updated);
                  }}
                  placeholder="https://verify.example.com/cert/123"
                />
              </div>
            </div>

            {(profile.certifications ?? []).length > 1 && (
              <button
                type="button"
                className="remove-skill-btn"
                onClick={() => {
                  const updated = [...(profile.certifications ?? [])];
                  updated.splice(index, 1);
                  onChange("certifications", updated);
                }}
              >
                Remove Certification
              </button>
            )}
          </div>
        ))}
        <FieldError msg={errors.certifications} />
      </div>

      <div className="section">
        <SectionHeading title="Career Intent" />
        <div className="section-grid">
          <div className={`${fieldCls(errors.careerGoal)} full-col`}>
            <label className="field-label">
              Career Goal <Req />
            </label>
            <textarea
              value={profile.careerGoal ?? ""}
              onChange={(e) => onChange("careerGoal", e.target.value)}
              rows={3}
              placeholder="Describe your career goal…"
            />
            <FieldError msg={errors.careerGoal} />
          </div>

          <div className={fieldCls(errors.preferredRole)}>
            <label className="field-label">
              Preferred Role <Req />
              <button
                type="button"
                className="add-skill-btn"
                onClick={() =>
                  onChange("preferredRoles", [
                    ...(profile.preferredRoles ?? [""]),
                    "",
                  ])
                }
              >
                + Add Role
              </button>
            </label>

            {(profile.preferredRoles ?? [""]).map((role, index) => (
              <div key={index} className="skill-name-row">
                <input
                  type="text"
                  value={role}
                  onChange={(e) => {
                    const updated = [...(profile.preferredRoles ?? [""])];
                    updated[index] = e.target.value;
                    onChange("preferredRoles", updated);
                  }}
                  placeholder="e.g. Frontend Developer"
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => {
                      const updated = [...(profile.preferredRoles ?? [""])];
                      updated.splice(index, 1);
                      onChange("preferredRoles", updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <FieldError msg={errors.preferredRole} />
          </div>

          <div className={fieldCls(errors.preferredIndustry)}>
            <label className="field-label">
              Preferred Industry <Req />
              <button
                type="button"
                className="add-skill-btn"
                onClick={() =>
                  onChange("preferredIndustries", [
                    ...(profile.preferredIndustries ?? [""]),
                    "",
                  ])
                }
              >
                + Add Industry
              </button>
            </label>

            {(profile.preferredIndustries ?? [""]).map((industry, index) => (
              <div key={index} className="skill-name-row">
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => {
                    const updated = [...(profile.preferredIndustries ?? [""])];
                    updated[index] = e.target.value;
                    onChange("preferredIndustries", updated);
                  }}
                  placeholder="e.g. Technology"
                />

                {index > 0 && (
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => {
                      const updated = [
                        ...(profile.preferredIndustries ?? [""]),
                      ];
                      updated.splice(index, 1);
                      onChange("preferredIndustries", updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <FieldError msg={errors.preferredIndustry} />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Learning Intent" />
        <div className="section-grid">
          <div className={`${fieldCls(errors.learningGoal)} full-col`}>
            <label className="field-label">
              Learning Goal <Req />
            </label>
            <textarea
              value={profile.learningGoal ?? ""}
              onChange={(e) => onChange("learningGoal", e.target.value)}
              rows={3}
              placeholder="Describe your learning goal…"
            />
            <FieldError msg={errors.learningGoal} />
          </div>
          <div className={fieldCls(errors.preferredLearningMode)}>
            <label className="field-label">
              Preferred Learning Mode <Req />
            </label>
            <select
              value={profile.preferredLearningMode ?? ""}
              onChange={(e) =>
                onChange("preferredLearningMode", e.target.value)
              }
            >
              <option value="">Select…</option>
              {["Online", "Offline", "Hybrid", "Self-paced"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
            <FieldError msg={errors.preferredLearningMode} />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <div className="section-bar" />
          <h3 className="section-title">Self Skills</h3>

          <button
            type="button"
            className="add-skill-btn"
            onClick={() =>
              onChange("selfSkills", [
                ...(profile.selfSkills ?? [
                  {
                    name: "",
                    category: "",
                    domain: "",
                    level: "",
                  },
                ]),
                {
                  name: "",
                  category: "",
                  domain: "",
                  level: "",
                },
              ])
            }
          >
            + Add Skill
          </button>
        </div>

        {(
          profile.selfSkills ?? [
            {
              name: "",
              category: "",
              domain: "",
              level: "",
            },
          ]
        ).map((skill, index) => (
          <div key={index} className="skill-record">
            <div className="section-grid">
              <div className="field">
                <label className="field-label">
                  Skill Name <Req />
                </label>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => {
                    const updated = [...(profile.selfSkills ?? [])];
                    updated[index] = {
                      ...updated[index],
                      name: e.target.value,
                    };
                    onChange("selfSkills", updated);
                  }}
                  placeholder="e.g. React"
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Category <Req />
                </label>
                <input
                  type="text"
                  value={skill.category}
                  onChange={(e) => {
                    const updated = [...(profile.selfSkills ?? [])];
                    updated[index] = {
                      ...updated[index],
                      category: e.target.value,
                    };
                    onChange("selfSkills", updated);
                  }}
                  placeholder="e.g. Frontend"
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Domain <Req />
                </label>
                <input
                  type="text"
                  value={skill.domain}
                  onChange={(e) => {
                    const updated = [...(profile.selfSkills ?? [])];
                    updated[index] = {
                      ...updated[index],
                      domain: e.target.value,
                    };
                    onChange("selfSkills", updated);
                  }}
                  placeholder="e.g. Web Development"
                />
              </div>

              <div className="field">
                <label className="field-label">
                  Self-rated Level <Req />
                </label>
                <select
                  value={skill.level}
                  onChange={(e) => {
                    const updated = [...(profile.selfSkills ?? [])];
                    updated[index] = {
                      ...updated[index],
                      level: e.target.value,
                    };
                    onChange("selfSkills", updated);
                  }}
                >
                  <option value="">Select…</option>
                  {["Beginner", "Intermediate", "Advanced", "Expert"].map(
                    (level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ),
                  )}
                </select>
              </div>
              {index > 0 && (
                <button
                  type="button"
                  className="remove-skill-btn"
                  onClick={() => {
                    const updated = [...(profile.selfSkills ?? [])];
                    updated.splice(index, 1);
                    onChange("selfSkills", updated);
                  }}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <FieldError msg={errors.selfSkills} />
      </div>

      <div className="section">
        <SectionHeading title="Portfolio" />
        <div className="section-grid">
          <div className={fieldCls(errors.resumeFileName)}>
            <label className="field-label">
              Resume <Req />
            </label>
            <input
              type="text"
              value={profile.resumeFileName ?? ""}
              onChange={(e) => onChange("resumeFileName", e.target.value)}
              placeholder="Resume file name or URL"
            />
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
              label="Portfolio Evidence"
              initialTags={profile.portfolioEvidence ?? []}
              placeholder="Project / work sample name"
              onChange={(tags) => onChange("portfolioEvidence", tags)}
            />
            <FieldError msg={errors.portfolioEvidence} />
          </div>
        </div>
      </div>

      <div className={fieldCls(errors.personalWebsite)}>
        <label className="field-label">Personal Website</label>
        <input
          type="url"
          value={profile.personalWebsite ?? ""}
          onChange={(e) => onChange("personalWebsite", e.target.value)}
          placeholder="https://yourportfolio.com"
        />
        <FieldError msg={errors.personalWebsite} />
      </div>
    </div>
  );
}
