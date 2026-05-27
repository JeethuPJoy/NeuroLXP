"use client";

import "./skillAcademyTab.css";

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

export default function SkillAcademyTab({
  profile,
  onChange,
  errors = {},
}: Props) {
  return (
    <div className="csv-sections">
      <div className="section">
        <SectionHeading title="Contact" />
        <div className="section-grid">
          <div className={fieldCls(errors.alternateContact)}>
            <label className="field-label">
              Alternate Contact Number <Req />
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

      <div className="section">
        <SectionHeading title="Accessibility & Device" />
        <div className="section-grid">
          <div className={fieldCls(errors.accessibilityNeeds)}>
            <label className="field-label">Accessibility Needs</label>
            <select
              value={profile.accessibilityNeeds ?? ""}
              onChange={(e) => onChange("accessibilityNeeds", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "None",
                "Visual Impairment",
                "Hearing Impairment",
                "Motor Disability",
                "Cognitive Disability",
                "Other",
              ].map((n) => (
                <option key={n}>{n}</option>
              ))}
            </select>
            <FieldError msg={errors.accessibilityNeeds} />
          </div>

          <div className={fieldCls(errors.deviceAccess)}>
            <label className="field-label">
              Device Access <Req />
            </label>
            <select
              value={profile.deviceAccess ?? ""}
              onChange={(e) => onChange("deviceAccess", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Smartphone only",
                "Laptop / PC",
                "Tablet",
                "Shared device",
                "No personal device",
              ].map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <FieldError msg={errors.deviceAccess} />
          </div>
        </div>
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
              label={
                <>
                  Portfolio Evidence <Req />
                </>
              }
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
