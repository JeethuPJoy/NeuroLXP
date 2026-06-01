"use client";

import { useState } from "react";
import "./instituteAdminProfile.css";

interface QualificationEntry {
  id: number;
  highestQualification: string;
  leadershipExperience: string;
  totalExperience: string;
}

interface InstituteAdminProfile {
  adminId: string;
  employeeCode: string;
  fullName: string;
  email: string;
  mobile: string;
  gender: string;
  designation: string;
  adminRole: string;
  dateOfJoining: string;
  highestQualification: string;
  totalExperience: string;
  leadershipExperience: string;
  instituteName: string;
  campusName: string;
  departmentsManaged: string[];
  reportingAuthority: string;
  status: string;

  leadershipRoleHistory: string;
  administrativeExperience: string;
  academicLeadershipExperience: string;
  institutionalAffiliations: string[];
  professionalMemberships: string[];
  governanceResponsibilities: string;
  strategicPlanningResponsibilities: string;
  policyMakingParticipation: boolean;
  committeeMemberships: string[];
  boardParticipation: boolean;
  iqacLeadershipRole: boolean;
  naacNbaCoordinationRole: boolean;
  accreditationLeadershipExperience: string;
  institutionalVisionOwnership: boolean;
  multiCampusManagement: boolean;
  industryGovtLiaisonResponsibilities: boolean;
  leadershipResponsibilitiesSummary: string;
  majorGovernanceChallenges: string;
  institutionalVisionStatement: string;
  keyStrategicPriorities: string;
}

const defaultProfile: InstituteAdminProfile = {
  adminId: "",
  employeeCode: "",
  fullName: "",
  email: "",
  mobile: "",
  gender: "",
  designation: "",
  adminRole: "",
  dateOfJoining: "",
  highestQualification: "",
  totalExperience: "",
  leadershipExperience: "",
  instituteName: "",
  campusName: "",
  departmentsManaged: [],
  reportingAuthority: "",
  status: "",
  leadershipRoleHistory: "",
  administrativeExperience: "",
  academicLeadershipExperience: "",
  institutionalAffiliations: [],
  professionalMemberships: [],
  governanceResponsibilities: "",
  strategicPlanningResponsibilities: "",
  policyMakingParticipation: false,
  committeeMemberships: [],
  boardParticipation: false,
  iqacLeadershipRole: false,
  naacNbaCoordinationRole: false,
  accreditationLeadershipExperience: "",
  institutionalVisionOwnership: false,
  multiCampusManagement: false,
  industryGovtLiaisonResponsibilities: false,
  leadershipResponsibilitiesSummary: "",
  majorGovernanceChallenges: "",
  institutionalVisionStatement: "",
  keyStrategicPriorities: "",
};

function TagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [inp, setInp] = useState("");
  const add = () => {
    const t = inp.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setInp("");
  };
  return (
    <div className="tag-input-wrap">
      {value.map((tag) => (
        <span key={tag} className="tag-item">
          {tag}
          <button onClick={() => onChange(value.filter((x) => x !== tag))}>
            ×
          </button>
        </span>
      ))}
      <input
        className="tag-input-field"
        placeholder={placeholder ?? "Type and press Enter…"}
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
      />
    </div>
  );
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string;
  desc?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-info">
        <h4>{label}</h4>
        {desc && <p>{desc}</p>}
      </div>
      <label className="neu-toggle">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="toggle-slider" />
      </label>
    </div>
  );
}

export default function InstituteAdminProfilePage() {
  const [profile, setProfile] = useState<InstituteAdminProfile>(defaultProfile);
  const [saved, setSaved] = useState(false);

  const upd = (field: keyof InstituteAdminProfile, value: unknown) =>
    setProfile((prev) => ({ ...prev, [field]: value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const [qualifications, setQualifications] = useState<QualificationEntry[]>([
    {
      id: 1,
      highestQualification: "",
      leadershipExperience: "",
      totalExperience: "",
    },
  ]);

  const addQualification = () => {
    setQualifications((prev) => [
      ...prev,
      {
        id: Date.now(),
        highestQualification: "",
        leadershipExperience: "",
        totalExperience: "",
      },
    ]);
  };

  const removeQualification = (id: number) => {
    setQualifications((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQualification = (
    id: number,
    field: keyof QualificationEntry,
    value: string,
  ) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q)),
    );
  };

  return (
    <div className="inst-admin-profile-page">
      <div className="profile-section-card">
        <div className="sub-section">
          <div className="sub-section-label">Identity</div>
          <div className="form-grid">
            <div className="form-field">
              <label>
                Full Name <span className="required">*</span>
              </label>
              <input
                className="neu-input"
                placeholder="e.g. Dr. Anitha Menon"
                value={profile.fullName}
                onChange={(e) => upd("fullName", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                Employee Code <span className="required">*</span>
              </label>
              <input
                className="neu-input"
                placeholder="e.g. EMP-0042"
                value={profile.employeeCode}
                onChange={(e) => upd("employeeCode", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                Email <span className="required">*</span>
              </label>
              <div className="input-wrap">
                <input
                  className="neu-input"
                  type="email"
                  placeholder="admin@institution.edu"
                  value={profile.email}
                  onChange={(e) => upd("email", e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label>
                Mobile Number <span className="required">*</span>
              </label>
              <div className="input-wrap">
                <input
                  className="neu-input"
                  placeholder="+91 98765 43210"
                  value={profile.mobile}
                  onChange={(e) => upd("mobile", e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label>
                Gender <span className="required">*</span>
              </label>
              <select
                className="neu-select"
                value={profile.gender}
                onChange={(e) => upd("gender", e.target.value)}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
            <div className="form-field">
              <label>
                Status <span className="required">*</span>
              </label>
              <select
                className="neu-select"
                value={profile.status}
                onChange={(e) => upd("status", e.target.value)}
              >
                <option value="">Select</option>
                <option>Active</option>
                <option>Inactive</option>
                <option>On Leave</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-section-label">Role & Designation</div>
          <div className="form-grid">
            <div className="form-field">
              <label>
                Designation <span className="required">*</span>
              </label>
              <input
                className="neu-input"
                placeholder="e.g. Principal / Director / Dean"
                value={profile.designation}
                onChange={(e) => upd("designation", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>
                Admin Role <span className="required">*</span>
              </label>
              <select
                className="neu-select"
                value={profile.adminRole}
                onChange={(e) => upd("adminRole", e.target.value)}
              >
                <option value="">Select role</option>
                <option>Principal</option>
                <option>Director</option>
                <option>Dean</option>
                <option>Unit Head</option>
                <option>Campus Head</option>
                <option>Institutional Administrator</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-section-label">
            Qualifications & Experience
            <button className="btn-add" onClick={addQualification}>
              + Add
            </button>
          </div>

          {qualifications.map((q, index) => (
            <div key={q.id} className="repeatable-row">
              {qualifications.length > 1 && (
                <div className="repeatable-row-header">
                  <span className="row-index"></span>
                  <button
                    className="btn-remove"
                    onClick={() => removeQualification(q.id)}
                  >
                    Remove
                  </button>
                </div>
              )}
              <div className="form-grid col-3">
                <div className="form-field">
                  <label>Highest Qualification</label>
                  <select
                    className="neu-select"
                    value={q.highestQualification}
                    onChange={(e) =>
                      updateQualification(
                        q.id,
                        "highestQualification",
                        e.target.value,
                      )
                    }
                  >
                    <option value="">Select</option>
                    <option>PhD</option>
                    <option>M.Phil</option>
                    <option>Post Graduate</option>
                    <option>Graduate</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Leadership Experience (Years)</label>
                  <input
                    className="neu-input"
                    type="number"
                    placeholder="e.g. 10"
                    value={q.leadershipExperience}
                    onChange={(e) =>
                      updateQualification(
                        q.id,
                        "leadershipExperience",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="form-field">
                  <label>Total Experience (Years)</label>
                  <input
                    className="neu-input"
                    type="number"
                    placeholder="e.g. 20"
                    value={q.totalExperience}
                    onChange={(e) =>
                      updateQualification(
                        q.id,
                        "totalExperience",
                        e.target.value,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sub-section">
          <div className="sub-section-label">Institution</div>
          <div className="form-grid">
            <div className="form-field">
              <label>
                Institute Name <span className="required">*</span>
              </label>
              <input
                className="neu-input"
                placeholder="e.g. College of Engineering, Trivandrum"
                value={profile.instituteName}
                onChange={(e) => upd("instituteName", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Campus Name</label>
              <input
                className="neu-input"
                placeholder="e.g. Main Campus"
                value={profile.campusName}
                onChange={(e) => upd("campusName", e.target.value)}
              />
            </div>
            <div className="form-field span-2">
              <label>Departments Managed</label>
              <TagInput
                value={profile.departmentsManaged}
                onChange={(v) => upd("departmentsManaged", v)}
                placeholder="Type department and press Enter…"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="profile-section-card">
        <div className="sub-section">
          <div className="sub-section-label">Objective Fields</div>
          <div className="form-grid">
            <div className="form-field">
              <label>
                Leadership Role History <span className="required">*</span>
              </label>
              <input
                className="neu-input"
                placeholder="e.g. HOD → Vice Principal → Principal"
                value={profile.leadershipRoleHistory}
                onChange={(e) => upd("leadershipRoleHistory", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Administrative Experience</label>
              <input
                className="neu-input"
                placeholder="e.g. 12 years in admin roles"
                value={profile.administrativeExperience}
                onChange={(e) =>
                  upd("administrativeExperience", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>Academic Leadership Experience</label>
              <input
                className="neu-input"
                placeholder="e.g. 8 years as HOD"
                value={profile.academicLeadershipExperience}
                onChange={(e) =>
                  upd("academicLeadershipExperience", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>Accreditation Leadership Experience</label>
              <input
                className="neu-input"
                placeholder="e.g. Led 2 NAAC cycles"
                value={profile.accreditationLeadershipExperience}
                onChange={(e) =>
                  upd("accreditationLeadershipExperience", e.target.value)
                }
              />
            </div>
            <div className="form-field span-2">
              <label>Institutional Affiliations</label>
              <TagInput
                value={profile.institutionalAffiliations}
                onChange={(v) => upd("institutionalAffiliations", v)}
                placeholder="Add affiliation and press Enter…"
              />
            </div>
            <div className="form-field">
              <label>Strategic Planning Responsibilities</label>
              <input
                className="neu-input"
                placeholder="e.g. 5-year strategic plan ownership"
                value={profile.strategicPlanningResponsibilities}
                onChange={(e) =>
                  upd("strategicPlanningResponsibilities", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <div className="sub-section">
          <div className="sub-section-label">Qualitative Fields</div>
          <div className="form-grid col-1">
            <div className="form-field">
              <label>
                Leadership Responsibilities Summary{" "}
                <span className="required">*</span>
              </label>
              <textarea
                className="neu-textarea"
                placeholder="Summarise your key leadership responsibilities…"
                value={profile.leadershipResponsibilitiesSummary}
                onChange={(e) =>
                  upd("leadershipResponsibilitiesSummary", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>Major Governance Challenges Handled</label>
              <textarea
                className="neu-textarea"
                placeholder="Describe major challenges and how you handled them…"
                value={profile.majorGovernanceChallenges}
                onChange={(e) =>
                  upd("majorGovernanceChallenges", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>
                Institutional Vision Statement{" "}
                <span className="required">*</span>
              </label>
              <textarea
                className="neu-textarea"
                placeholder="State your vision for the institution…"
                value={profile.institutionalVisionStatement}
                onChange={(e) =>
                  upd("institutionalVisionStatement", e.target.value)
                }
              />
            </div>
            <div className="form-field">
              <label>Key Strategic Priorities</label>
              <textarea
                className="neu-textarea"
                placeholder="List your top strategic priorities for the institution…"
                value={profile.keyStrategicPriorities}
                onChange={(e) => upd("keyStrategicPriorities", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="page-actions">
        {saved && (
          <span className="save-status">✓ Profile saved successfully!</span>
        )}
        <button className="btn-primary" onClick={handleSave}>
          Save Profile
        </button>
      </div>
    </div>
  );
}
