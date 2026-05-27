import Toggle from './Toggle';
import { ProfileData } from '@/hooks/profiling/useProfile';

interface Props {
  profile: ProfileData;
  onChange: (field: keyof ProfileData, value: string | boolean) => void;
}

export default function ConsentTab({ profile, onChange }: Props) {
  return (
    <>
      <div className="section">
        <div className="section-header"><div className="section-bar" /><h3 className="section-title">Data &amp; Privacy Consents</h3></div>
        <div className="section-grid">
          <div className="consent-list">
            <Toggle
              label="Data Processing Consent"
              defaultOn={profile.dataProcessingConsent ?? false}
              onChange={val => onChange('dataProcessingConsent', val)}
            />
            <Toggle
              label="Employer Sharing Consent"
              defaultOn={profile.employerSharingConsent ?? false}
              onChange={val => onChange('employerSharingConsent', val)}
            />
            <Toggle
              label="Placement Profile Sharing Consent"
              defaultOn={profile.placementSharingConsent ?? false}
              onChange={val => onChange('placementSharingConsent', val)}
            />
            <Toggle
              label="Employer Visibility Consent"
              defaultOn={profile.employerVisibilityConsent ?? false}
              onChange={val => onChange('employerVisibilityConsent', val)}
            />
            <Toggle
              label="Alumni Engagement Consent"
              defaultOn={profile.alumniEngagementConsent ?? false}
              onChange={val => onChange('alumniEngagementConsent', val)}
            />
            <Toggle
              label="Research &amp; Analytics Usage"
              defaultOn={profile.researchAnalyticsConsent ?? false}
              onChange={val => onChange('researchAnalyticsConsent', val)}
            />
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-header"><div className="section-bar" /><h3 className="section-title">Verification Status</h3></div>
        <div className="section-grid">
          <div className="field">
            <label className="field-label">Profile Verification Status</label>
            <select value={profile.profileVerificationStatus ?? ''} onChange={e => onChange('profileVerificationStatus', e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">Document Verification Status</label>
            <select value={profile.documentVerificationStatus ?? ''} onChange={e => onChange('documentVerificationStatus', e.target.value)}>
              <option value="Not Submitted">Not Submitted</option>
              <option value="Under Review">Under Review</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">Verified By</label>
            <input
              type="text"
              value={profile.verifiedBy ?? ''}
              onChange={e => onChange('verifiedBy', e.target.value)}
              placeholder="Faculty / Admin name"
            />
          </div>
          <div className="field">
            <label className="field-label">Compliance Status</label>
            <select value={profile.complianceStatus ?? ''} onChange={e => onChange('complianceStatus', e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
            </select>
          </div>
        </div>
      </div>

      <div className="verification-badge">
        <div className="badge-check">✓</div>
        <div>
          <div className="badge-verified">
            {profile.profileVerificationStatus === 'Verified' ? 'Profile Verified' : profile.profileVerificationStatus || 'Pending'}
          </div>
          <div className="badge-by">
            {profile.verifiedBy ? `by ${profile.verifiedBy}` : '—'}
          </div>
        </div>
      </div>
    </>
  );
}
