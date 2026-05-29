"use client";

import { useState } from "react";
import "./profile.css";

export default function SkillAcademyCoordinatorProfilePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function handleTenantClick(tenantName: string) {
    console.log("Selected tenant profile:", tenantName);
    closeSidebar();
  }

  return (
    <div className="profilePage">
      <button
        type="button"
        className="menuButton"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {sidebarOpen && (
        <button
          type="button"
          className="sidebarOverlay"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebarOpen" : ""}`}>
        <button
          type="button"
          className="closeSidebar"
          onClick={closeSidebar}
          aria-label="Close sidebar"
        >
          ×
        </button>

        <div className="profileCard">
          <div className="avatar">SC</div>
          <h3>Skill Coordinator</h3>
          <p>current-user-id</p>
        </div>

        <div className="tenantMenu">
          <button type="button" onClick={() => handleTenantClick("Colleges / Universities")}>
            Colleges / Universities
          </button>

          <button type="button" onClick={() => handleTenantClick("Corporate")}>
            Corporate
          </button>

          <button
            type="button"
            className="active"
            onClick={() => handleTenantClick("Skill Academy")}
          >
            Skill Academy
          </button>

          <button type="button" onClick={() => handleTenantClick("Government")}>
            Government
          </button>

          <button type="button" onClick={() => handleTenantClick("NGO")}>
            NGO
          </button>

          <button type="button" onClick={() => handleTenantClick("School")}>
            School
          </button>
        </div>
      </aside>

      <main className="contentArea">
        <h1>Skill Academy Coordinator Self Profiling</h1>

        <section className="sectionCard">
          <h2>BATCH OPERATIONS</h2>

          <div className="formGrid">
            <div className="field">
              <label>ACTIVE BATCHES MANAGED *</label>
              <input type="number" placeholder="e.g. 8" />
            </div>

            <div className="field">
              <label>ACTIVE TRAINEES MANAGED *</label>
              <input type="number" placeholder="e.g. 240" />
            </div>

            <div className="field">
              <label>BATCH COMPLETION TRACKING *</label>
              <select>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
            </div>
          </div>

          <div className="formGrid">
            <div className="field">
              <label>ATTENDANCE MONITORING RESPONSIBILITY *</label>
              <select>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
            </div>

            <div className="field">
              <label>BATCH SCHEDULING RESPONSIBILITY *</label>
              <select>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
            </div>

            <div className="field">
              <label>TIMETABLE COORDINATION *</label>
              <select>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
            </div>
          </div>
        </section>

        <section className="sectionCard">
          <h2>TRAINING & ASSESSMENT COORDINATION</h2>

          <div className="formGrid">
            <div className="field">
              <label>ASSESSMENT SCHEDULING INVOLVEMENT *</label>
              <select>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>TRAINER COORDINATION INVOLVEMENT *</label>
              <select>
                <option>Select...</option>
                <option>Daily Coordination</option>
                <option>Weekly Coordination</option>
                <option>Need-based Coordination</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>TRAINING MATERIAL DISTRIBUTION TRACKING *</label>
              <select>
                <option>Select...</option>
                <option>Fully Tracked</option>
                <option>Partially Tracked</option>
                <option>Manual Tracking</option>
                <option>Not Tracked</option>
              </select>
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>CERTIFICATION COORDINATION *</label>
              <select>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Supporting Role</option>
                <option>Not Applicable</option>
              </select>
            </div>

            <div className="field">
              <label>UPLOAD CERTIFICATION COORDINATION PROOF</label>
              <input type="file" multiple />
            </div>
          </div>
        </section>

        <section className="sectionCard">
          <h2>SDMS & DOCUMENTATION</h2>

          <div className="inlineGroup">
            <div className="field">
              <label>SDMS DATA ENTRY RESPONSIBILITY *</label>
              <select>
                <option>Select...</option>
                <option>Full Responsibility</option>
                <option>Partial Responsibility</option>
                <option>Verification Only</option>
                <option>Not Applicable</option>
              </select>
            </div>

            <div className="field">
              <label>UPLOAD SDMS RECORD SAMPLE</label>
              <input type="file" />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>CANDIDATE DOCUMENTATION VERIFICATION *</label>
              <select>
                <option>Select...</option>
                <option>Fully Verified</option>
                <option>Partially Verified</option>
                <option>Pending Verification</option>
                <option>Not Applicable</option>
              </select>
            </div>

            <div className="field">
              <label>UPLOAD DOCUMENT VERIFICATION PROOF</label>
              <input type="file" multiple />
            </div>
          </div>
        </section>

        <section className="sectionCard">
          <h2>COMMUNICATION & ISSUE HANDLING</h2>

          <div className="formGrid">
            <div className="field">
              <label>PARENT / STUDENT COMMUNICATION FREQUENCY *</label>
              <select>
                <option>Select...</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Need-based</option>
              </select>
            </div>

            <div className="field">
              <label>GRIEVANCE HANDLING COUNT *</label>
              <input type="number" placeholder="e.g. 18" />
            </div>

            <div className="field">
              <label>ESCALATION HANDLING COUNT *</label>
              <input type="number" placeholder="e.g. 7" />
            </div>
          </div>

          <div className="formGrid">
            <div className="field">
              <label>DROPOUT MONITORING PARTICIPATION *</label>
              <select>
                <option>Select...</option>
                <option>Regular Monitoring</option>
                <option>Periodic Monitoring</option>
                <option>Need-based Monitoring</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>PLACEMENT FOLLOW-UP PARTICIPATION *</label>
              <select>
                <option>Select...</option>
                <option>Regular Follow-up</option>
                <option>Periodic Follow-up</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>PLACEMENT COORDINATION INVOLVEMENT *</label>
              <select>
                <option>Select...</option>
                <option>Full Involvement</option>
                <option>Partial Involvement</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
            </div>
          </div>
        </section>

        <section className="sectionCard">
          <h2>MOBILIZATION & INDUSTRY COORDINATION</h2>

          <div className="inlineGroup">
            <div className="field">
              <label>MOBILIZATION ACTIVITY PARTICIPATION *</label>
              <select>
                <option>Select...</option>
                <option>Regular Participation</option>
                <option>Occasional Participation</option>
                <option>Supporting Role</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>UPLOAD MOBILIZATION PROOF</label>
              <input type="file" />
            </div>
          </div>

          <div className="inlineGroup">
            <div className="field">
              <label>INDUSTRY VISIT COORDINATION *</label>
              <select>
                <option>Select...</option>
                <option>Coordinated</option>
                <option>Supported</option>
                <option>Planned but Not Completed</option>
                <option>Not Involved</option>
              </select>
            </div>

            <div className="field">
              <label>UPLOAD INDUSTRY VISIT PROOF</label>
              <input type="file" />
            </div>
          </div>
        </section>

        <section className="sectionCard">
          <h2>ESSENTIAL QUALITATIVE FIELDS</h2>

          <div className="field fullWidth">
            <label>BATCH-LEVEL OPERATIONAL ISSUES *</label>
            <textarea placeholder="Mention batch scheduling issues, attendance gaps, trainer availability, documentation delays, SDMS issues, or learner follow-up problems..." />
          </div>

          <div className="field fullWidth">
            <label>CANDIDATE ENGAGEMENT OBSERVATIONS *</label>
            <textarea placeholder="Mention candidate participation patterns, engagement level, dropout risks, motivation gaps, parent/student communication issues, or support needs..." />
          </div>
        </section>

        <section className="sectionCard">
          <h2>CONFIRMATION</h2>

          <div className="inlineGroup">
            <div className="field">
              <label>COORDINATOR CONFIRMATION *</label>
              <select>
                <option>Select...</option>
                <option>I confirm that the entered data is accurate</option>
                <option>I need to review before submission</option>
              </select>
            </div>

            <div className="field">
              <label>SUPPORTING DOCUMENTS</label>
              <input type="file" multiple />
            </div>
          </div>
        </section>

        <div className="footerButtons">
          <button type="button" className="saveBtn">
            Save Profile
          </button>

          <button type="button" className="nextBtn">
            Next
          </button>
        </div>
      </main>
    </div>
  );
}