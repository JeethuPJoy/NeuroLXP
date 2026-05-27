"use client";

import "./schoolTab.css";
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
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h3 className="section-title">{title}</h3>
        </div>
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

export default function SchoolTab({ profile, onChange, errors = {} }: Props) {
  const MAX_FILE_SIZE = 10 * 1024; // 10 KB

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
        <SectionHeading title="Contact" />
        <div className="section-grid">
          <div className={fieldCls(errors.alternateContact)}>
            <label className="field-label">
              Contact Number <Req />
            </label>
            <input
              type="text"
              value={profile.alternateContact ?? ""}
              onChange={(e) => onChange("alternateContact", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
            <FieldError msg={errors.alternateContact} />
          </div>

          <div className={fieldCls(errors.alternateemailid)}>
            <label className="field-label">
              Email ID <Req />
            </label>
            <input
              type="email"
              value={profile.alternateemailid ?? ""}
              onChange={(e) => onChange("alternateemailid", e.target.value)}
              placeholder="e.g. student@school.edu"
            />
            <FieldError msg={errors.alternateemailid} />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Student Identity" />
        <div className="section-grid">
          <div className={fieldCls(errors.grade)}>
            <label className="field-label">
              Grade / Class <Req />
            </label>
            <select
              value={profile.grade ?? ""}
              onChange={(e) => onChange("grade", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Grade 1",
                "Grade 2",
                "Grade 3",
                "Grade 4",
                "Grade 5",
                "Grade 6",
                "Grade 7",
                "Grade 8",
                "Grade 9",
                "Grade 10",
                "Grade 11",
                "Grade 12",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <FieldError msg={errors.grade} />
          </div>

          <div className={fieldCls(errors.section)}>
            <label className="field-label">Section</label>
            <input
              type="text"
              value={profile.section ?? ""}
              onChange={(e) => onChange("section", e.target.value)}
              placeholder="e.g. A, B, C"
            />
            <FieldError msg={errors.section} />
          </div>

          <div className={fieldCls(errors.rollNumber)}>
            <label className="field-label">
              Roll Number <Req />
            </label>
            <input
              type="text"
              value={profile.rollNumber ?? ""}
              onChange={(e) => onChange("rollNumber", e.target.value)}
              placeholder="e.g. 24"
            />
            <FieldError msg={errors.rollNumber} />
          </div>

          <div className={fieldCls(errors.schoolName)}>
            <label className="field-label">
              School Name <Req />
            </label>
            <input
              type="text"
              value={profile.schoolName ?? ""}
              onChange={(e) => onChange("schoolName", e.target.value)}
              placeholder="e.g. St. Mary's Higher Secondary School"
            />
            <FieldError msg={errors.schoolName} />
          </div>

          <div className={fieldCls(errors.schoolBoard)}>
            <label className="field-label">
              Board <Req />
            </label>
            <select
              value={profile.schoolBoard ?? ""}
              onChange={(e) => onChange("schoolBoard", e.target.value)}
            >
              <option value="">Select…</option>
              {["CBSE", "ICSE", "State Board", "IB", "IGCSE", "Other"].map(
                (b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ),
              )}
            </select>
            <FieldError msg={errors.schoolBoard} />
          </div>

          <div className={fieldCls(errors.schoolMedium)}>
            <label className="field-label">Medium of Instruction</label>
            <select
              value={profile.schoolMedium ?? ""}
              onChange={(e) => onChange("schoolMedium", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "English",
                "Hindi",
                "Malayalam",
                "Tamil",
                "Telugu",
                "Kannada",
                "Other",
              ].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Academic Profile" />
        <div className="section-grid">
          <div className={fieldCls(errors.streamOrGroup)}>
            <label className="field-label">Stream / Group</label>
            <select
              value={profile.streamOrGroup ?? ""}
              onChange={(e) => onChange("streamOrGroup", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Science (PCM)",
                "Science (PCB)",
                "Science (PCMB)",
                "Commerce",
                "Arts / Humanities",
                "Vocational",
                "Not Applicable",
              ].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={fieldCls(errors.overallPercentage)}>
            <label className="field-label">Overall Percentage / CGPA</label>
            <input
              type="text"
              value={profile.overallPercentage ?? ""}
              onChange={(e) => onChange("overallPercentage", e.target.value)}
              placeholder="e.g. 87% or 8.5 CGPA"
            />
          </div>

          <div className={fieldCls(errors.favouriteSubject)}>
            <label className="field-label">Favourite Subject</label>
            <input
              type="text"
              value={profile.favouriteSubject ?? ""}
              onChange={(e) => onChange("favouriteSubject", e.target.value)}
              placeholder="e.g. Mathematics"
            />
          </div>

          <div className={fieldCls(errors.academicStrengths)}>
            <label className="field-label">Academic Strengths</label>
            <input
              type="text"
              value={profile.academicStrengths ?? ""}
              onChange={(e) => onChange("academicStrengths", e.target.value)}
              placeholder="e.g. Problem solving, Writing"
            />
          </div>

          <div className={fieldCls(errors.academicWeaknesses)}>
            <label className="field-label">Areas to Improve</label>
            <input
              type="text"
              value={profile.academicWeaknesses ?? ""}
              onChange={(e) => onChange("academicWeaknesses", e.target.value)}
              placeholder="e.g. Time management, Public speaking"
            />
          </div>

          <div className={`${fieldCls(errors.academicNote)} full-col`}>
            <label className="field-label">Academic Notes</label>
            <textarea
              value={profile.academicNote ?? ""}
              onChange={(e) => onChange("academicNote", e.target.value)}
              rows={3}
              placeholder="Any additional academic context…"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Extracurricular & Interests" />
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Sports / Games</label>
            <input
              type="text"
              value={profile.sportsActivities ?? ""}
              onChange={(e) => onChange("sportsActivities", e.target.value)}
              placeholder="e.g. Cricket, Chess, Badminton"
            />
          </div>

          <div className="field">
            <label className="field-label">Arts & Hobbies</label>
            <input
              type="text"
              value={profile.artsHobbies ?? ""}
              onChange={(e) => onChange("artsHobbies", e.target.value)}
              placeholder="e.g. Drawing, Music, Dance"
            />
          </div>

          <div className="field">
            <label className="field-label">Clubs / Committees</label>
            <input
              type="text"
              value={profile.schoolClubs ?? ""}
              onChange={(e) => onChange("schoolClubs", e.target.value)}
              placeholder="e.g. Science Club, Eco Committee"
            />
          </div>

          <div className="field">
            <label className="field-label">Leadership Roles</label>
            <input
              type="text"
              value={profile.leadershipRoles ?? ""}
              onChange={(e) => onChange("leadershipRoles", e.target.value)}
              placeholder="e.g. Class Monitor, House Captain"
            />
          </div>

          <div className="field">
            <label className="field-label">Awards & Achievements</label>
            <input
              type="text"
              value={profile.schoolAwards ?? ""}
              onChange={(e) => onChange("schoolAwards", e.target.value)}
              placeholder="e.g. 1st in District Science Olympiad"
            />
          </div>

          <div className="field">
            <label className="field-label">Volunteer / Social Work</label>
            <input
              type="text"
              value={profile.volunteerWork ?? ""}
              onChange={(e) => onChange("volunteerWork", e.target.value)}
              placeholder="e.g. NSS, Clean India Drive"
            />
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Career Aspirations" />
        <div className="section-grid">
          <div className={`${fieldCls(errors.careerGoal)} full-col`}>
            <label className="field-label">
              Career Goal <Req />
            </label>
            <textarea
              value={profile.careerGoal ?? ""}
              onChange={(e) => onChange("careerGoal", e.target.value)}
              rows={3}
              placeholder="What do you want to become? Describe your dream career…"
            />
            <FieldError msg={errors.careerGoal} />
          </div>

          <div className={fieldCls(errors.dreamProfession)}>
            <label className="field-label">Dream Profession</label>
            <input
              type="text"
              value={profile.dreamProfession ?? ""}
              onChange={(e) => onChange("dreamProfession", e.target.value)}
              placeholder="e.g. Doctor, Engineer, Artist"
            />
          </div>

          <div className={fieldCls(errors.interestedDomain)}>
            <label className="field-label">Interested Domain</label>
            <select
              value={profile.interestedDomain ?? ""}
              onChange={(e) => onChange("interestedDomain", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Science & Technology",
                "Medicine & Health",
                "Arts & Design",
                "Commerce & Finance",
                "Law & Governance",
                "Sports & Fitness",
                "Agriculture",
                "Education",
                "Media & Journalism",
                "Defence & Security",
                "Other",
              ].map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div className={fieldCls(errors.higherStudyPlan)}>
            <label className="field-label">Higher Study Plan</label>
            <select
              value={profile.higherStudyPlan ?? ""}
              onChange={(e) => onChange("higherStudyPlan", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Engineering (B.Tech / BE)",
                "Medicine (MBBS)",
                "Pure Science (BSc)",
                "Commerce (BCom / BBA)",
                "Arts / Humanities (BA)",
                "Law (LLB)",
                "Design (BDes)",
                "Diploma / Vocational",
                "Not yet decided",
              ].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Learning Preferences" />
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Preferred Learning Mode</label>
            <select
              value={profile.preferredLearningMode ?? ""}
              onChange={(e) =>
                onChange("preferredLearningMode", e.target.value)
              }
            >
              <option value="">Select…</option>
              {[
                "Self-paced",
                "Classroom / Instructor-led",
                "Blended",
                "Video-based",
                "Project-based",
              ].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Learning Style</label>
            <select
              value={profile.learningStyle ?? ""}
              onChange={(e) => onChange("learningStyle", e.target.value)}
            >
              <option value="">Select…</option>
              {["Visual", "Auditory", "Reading / Writing", "Kinesthetic"].map(
                (s) => (
                  <option key={s}>{s}</option>
                ),
              )}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Study Hours Per Day</label>
            <select
              value={profile.studyHoursPerDay ?? ""}
              onChange={(e) => onChange("studyHoursPerDay", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Less than 1 hr",
                "1–2 hrs",
                "2–3 hrs",
                "3–4 hrs",
                "4+ hrs",
              ].map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Skill Interests</label>
            <input
              type="text"
              value={(profile.skillInterests ?? []).join(", ")}
              onChange={(e) =>
                onChange(
                  "skillInterests",
                  e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                )
              }
              placeholder="e.g. Coding, Robotics, Creative Writing"
            />
          </div>

          <div className="field">
            <label className="field-label">Digital Literacy Level</label>
            <select
              value={profile.digitalLiteracyLevel ?? ""}
              onChange={(e) => onChange("digitalLiteracyLevel", e.target.value)}
            >
              <option value="">Select…</option>
              {["Beginner", "Basic", "Intermediate", "Advanced"].map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Parent / Guardian Info" />
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Guardian Name</label>
            <input
              type="text"
              value={profile.guardianName ?? ""}
              onChange={(e) => onChange("guardianName", e.target.value)}
              placeholder="e.g. Rajan P Joy"
            />
          </div>

          <div className="field">
            <label className="field-label">Relationship</label>
            <select
              value={profile.guardianRelation ?? ""}
              onChange={(e) => onChange("guardianRelation", e.target.value)}
            >
              <option value="">Select…</option>
              {["Father", "Mother", "Guardian", "Sibling", "Other"].map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="field-label">Guardian Contact</label>
            <input
              type="text"
              value={profile.guardianContact ?? ""}
              onChange={(e) => onChange("guardianContact", e.target.value)}
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div className="field">
            <label className="field-label">Guardian Occupation</label>
            <input
              type="text"
              value={profile.guardianOccupation ?? ""}
              onChange={(e) => onChange("guardianOccupation", e.target.value)}
              placeholder="e.g. Business, Government Service"
            />
          </div>

          <div className="field">
            <label className="field-label">Guardian Education</label>
            <select
              value={profile.guardianEducation ?? ""}
              onChange={(e) => onChange("guardianEducation", e.target.value)}
            >
              <option value="">Select…</option>
              {[
                "Below 10th",
                "10th Pass",
                "12th Pass",
                "Diploma",
                "Graduate",
                "Post Graduate",
                "PhD",
              ].map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Achievements & Certifications" />
        <div className={fieldCls(errors.certifications)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <label className="field-label">
              Certifications / Courses Completed
            </label>
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
            <div key={index} className="skill-record">
              <div className="section-grid">
                <div className="field">
                  <label className="field-label">Certification Name</label>
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
                    placeholder="e.g. Google Digital Garage"
                  />
                </div>

                <div className="field">
                  <label className="field-label">Issuing Organisation</label>
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
                    placeholder="e.g. Google, NASSCOM"
                  />
                </div>

                <div className="field">
                  <label className="field-label">Issue Date</label>
                  <input
                    type="text"
                    value={cert.issueDate}
                    onChange={(e) => {
                      const updated = [...(profile.certifications ?? [])];
                      updated[index] = {
                        ...updated[index],
                        issueDate: e.target.value,
                      };
                      onChange("certifications", updated);
                    }}
                    placeholder="e.g. 2024-06"
                  />
                </div>

                {index > 0 && (
                  <button
                    type="button"
                    className="remove-skill-btn"
                    onClick={() => {
                      const updated = [...(profile.certifications ?? [])];
                      updated.splice(index, 1);
                      onChange("certifications", updated);
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <FieldError msg={errors.certifications} />
        </div>
      </div>

      <div className="section">
        <SectionHeading title="Portfolio / Showcase" />
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Project / Work Sample</label>
            <input
              id="resume-upload-school"
              type="file"
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
              onChange={handleResumeUpload}
            />
            <label htmlFor="resume-upload-school" className="upload-btn">
              📎 Choose File
            </label>
            {profile.resumeFileName && (
              <span className="upload-file-name">✓ {profile.resumeFileName}</span>
            )}
          </div>

          <div className={fieldCls(errors.portfolioLink)}>
            <label className="field-label">Portfolio / Blog Link</label>
            <input
              type="url"
              value={profile.portfolioLink ?? ""}
              onChange={(e) => onChange("portfolioLink", e.target.value)}
              placeholder="https://yourproject.com"
            />
            <FieldError msg={errors.portfolioLink} />
          </div>

          <div className="field">
            <label className="field-label">GitHub / Code Link</label>
            <input
              type="url"
              value={profile.githubUrl ?? ""}
              onChange={(e) => onChange("githubUrl", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
