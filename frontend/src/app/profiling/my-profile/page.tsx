'use client';

import { useState, useEffect } from 'react';
import './profile.css';
import SelfProfileTab    from './components/SudentProfileTab/SudentProfileTab';
import CorporateStageTab from './components/CorporateStageTab/CorporateStageTab';
import SkillAcademyTab   from './components/SkillAcademyTab/SkillAcademyTab';
import GovernmentTab     from './components/government/government';
import NGOTenantTab      from './components/NGOTenantTab/NGOTenantTab';

import { useProfile, ProfileData } from '@/hooks/profiling/useProfile';
import { saveMyProfile } from '@/lib/profiling/profiling.api';
import { validateSelfProfile, validateCorporateProfile, ValidationErrors, validateGovernmentProfile, validateNgoProfile
        } from '@/hooks/profiling/useProfileValidation';

type TabKey = 'self' | 'corporate' | 'skillacademy' | 'government' | 'ngo' | 'school';
const tabKeys: TabKey[] = ['self', 'corporate', 'skillacademy', 'government', 'ngo', 'school'];

const tabs: { key: TabKey; label: string }[] = [
  { key: 'self',         label: 'Colleges / Universities' },
  { key: 'corporate',    label: 'Corporate' },
  { key: 'skillacademy', label: 'Skill Academy' },
  { key: 'government',   label: 'Government' },
  { key: 'ngo',          label: 'NGO' },
  { key: 'school',       label: 'School' },
];

const CURRENT_USER_ID = 'current-user-id';

export default function LearnerProfilePage() {
  const { profile, loading, error } = useProfile(CURRENT_USER_ID);

  const [formData, setFormData]   = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('self');
  const [dark]                    = useState(false);
  const [saved, setSaved]         = useState(false);
  const [saving, setSaving]       = useState(false);
  const [selfErrors, setSelfErrors]           = useState<ValidationErrors>({});
  const [corporateErrors, setCorporateErrors] = useState<ValidationErrors>({});
  const [ngoErrors, setNgoErrors]             = useState<ValidationErrors>({});
  const [governmentErrors, setGovernmentErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false); // ← hamburger state

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  // Close drawer on tab select (mobile)
  const handleTabSelect = (key: TabKey) => {
    setActiveTab(key);
    setMenuOpen(false);
  };

  const handleChange = (field: keyof ProfileData, value: unknown) => {
    setFormData(prev => {
      if (!prev) return prev;
      const next = { ...prev, [field]: value };
      if (submitted) {
        setSelfErrors(validateSelfProfile(next));
        setCorporateErrors(validateCorporateProfile(next));
        setGovernmentErrors(validateGovernmentProfile(next));
        setNgoErrors(validateNgoProfile(next));
      }
      return next;
    });
  };

  const handleSave = async () => {
    if (!formData) return;

    const sErr    = validateSelfProfile(formData);
    const corpErr = validateCorporateProfile(formData);
    const govErr  = validateGovernmentProfile(formData);
    const ngoErr  = validateNgoProfile(formData);
    setSelfErrors(sErr);
    setCorporateErrors(corpErr);
    setGovernmentErrors(govErr);
    setNgoErrors(ngoErr);
    setSubmitted(true);

    const totalErrors =
      Object.keys(sErr).length +
      Object.keys(corpErr).length +
      Object.keys(govErr).length +
      Object.keys(ngoErr).length;

    if (totalErrors > 0) {
      if (Object.keys(sErr).length > 0)        setActiveTab('self');
      else if (Object.keys(corpErr).length > 0) setActiveTab('corporate');
      else if (Object.keys(govErr).length > 0)  setActiveTab('government');
      else if (Object.keys(ngoErr).length > 0)  setActiveTab('ngo');
      return;
    }

    setSaving(true);
    try {
      await saveMyProfile(CURRENT_USER_ID, formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    const i = tabKeys.indexOf(activeTab);
    if (i < tabKeys.length - 1) setActiveTab(tabKeys[i + 1]);
  };

  if (loading) return (
    <div className="profile-root">
      <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-sec)' }}>Loading profile…</p>
    </div>
  );

  if (error || !formData) return (
    <div className="profile-root">
      <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--danger)' }}>{error ?? 'Could not load profile.'}</p>
    </div>
  );

  const initials = formData.fullName
    ? formData.fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const activeTabMeta = tabs.find(t => t.key === activeTab) ?? tabs[0];

  const currentTabErrorCount =
    activeTab === 'self'       ? Object.keys(selfErrors).length       :
    activeTab === 'corporate'  ? Object.keys(corporateErrors).length  :
    activeTab === 'government' ? Object.keys(governmentErrors).length :
    activeTab === 'ngo'        ? Object.keys(ngoErrors).length        : 0;

  return (
    <div className={`profile-root${dark ? ' dark' : ''}`}>

      {/* ── Mobile top bar ── */}
      <div className="mobile-topbar">
        <div className="mobile-topbar-left">
          <div className="avatar mobile-avatar">{initials}</div>
          <span className="mobile-topbar-name">{formData.fullName || '—'}</span>
        </div>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          type="button"
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />
      )}

      {/* ── Mobile drawer ── */}
      <div className={`drawer${menuOpen ? ' drawer--open' : ''}`}>
        <div className="drawer-avatar-wrap">
          <div className="avatar">{initials}</div>
          <div className="avatar-name">{formData.fullName || '—'}</div>
          <div className="avatar-roll">{formData.userId || '—'}</div>
          <div className="avatar-dept">{formData.department || '—'}</div>
        </div>
        <nav className="drawer-nav">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`nav-btn${activeTab === t.key ? ' active' : ''}`}
              onClick={() => handleTabSelect(t.key)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="layout">
        {/* ── Desktop sidebar ── */}
        <aside className="sidebar">
          <div className="avatar-wrap">
            <div className="avatar">{initials}</div>
            <div className="avatar-name">{formData.fullName || '—'}</div>
            <div className="avatar-roll">{formData.userId || '—'}</div>
            <div className="avatar-dept">{formData.department || '—'}</div>
          </div>
          <nav className="nav">
            {tabs.map(t => (
              <button
                key={t.key}
                className={`nav-btn${activeTab === t.key ? ' active' : ''}`}
                onClick={() => setActiveTab(t.key)}
                type="button"
              >
                {t.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="main-content">
          <div className="tab-header">
            <h2 className="tab-title">{activeTabMeta.label}</h2>
          </div>

          {submitted && currentTabErrorCount > 0 && (
            <div className="validation-banner">
              ⚠ Please fix {currentTabErrorCount} error{currentTabErrorCount > 1 ? 's' : ''} before saving.
            </div>
          )}

          {activeTab === 'self'         && <SelfProfileTab    profile={formData} onChange={handleChange} errors={selfErrors} />}
          {activeTab === 'corporate'    && <CorporateStageTab profile={formData} onChange={handleChange} errors={corporateErrors} />}
          {activeTab === 'skillacademy' && <SkillAcademyTab   profile={formData} onChange={handleChange} />}
          {activeTab === 'government'   && <GovernmentTab     profile={formData} onChange={handleChange} errors={governmentErrors} />}
          {activeTab === 'ngo'          && <NGOTenantTab      profile={formData} onChange={handleChange} errors={ngoErrors} />}

          <div className="save-footer">
            <button
              className={`btn btn-primary${saved ? ' saved' : ''}`}
              onClick={handleSave}
              disabled={saving}
              type="button"
            >
              {saving ? 'Saving…' : saved ? '✓ Profile Saved!' : 'Save Profile'}
            </button>
            <button className="btn btn-danger-ghost" type="button" onClick={handleNext}>
              Next &gt;&gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}