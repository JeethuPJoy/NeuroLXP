import { UserProfile } from '../entities/user-profile.entity';

const WEIGHTED_FIELDS: { field: keyof UserProfile; weight: number }[] = [
  // Identity (30%)
  { field: 'fullName', weight: 5 },
  { field: 'email', weight: 5 },
  { field: 'phone', weight: 5 },
  { field: 'gender', weight: 3 },
  { field: 'dateOfBirth', weight: 3 },
  { field: 'country', weight: 3 },
  { field: 'city', weight: 3 },
  { field: 'profilePhoto', weight: 3 },
  // Academic (20%)
  { field: 'department', weight: 5 },
  { field: 'programme', weight: 5 },
  { field: 'highestQualification', weight: 5 },
  { field: 'institution', weight: 5 },
  // Career (20%)
  { field: 'careerGoal', weight: 5 },
  { field: 'preferredRole', weight: 5 },
  { field: 'skills', weight: 5 },
  { field: 'interests', weight: 5 },
  // Portfolio (15%)
  { field: 'resumeUrl', weight: 5 },
  { field: 'linkedinUrl', weight: 5 },
  { field: 'portfolioUrl', weight: 5 },
  // Placement (10%)
  { field: 'resumeStatus', weight: 5 },
  { field: 'currentStatus', weight: 5 },
  // Consent (5%)
  { field: 'consentDataProcessing', weight: 3 },
  { field: 'consentEmployerSharing', weight: 2 },
];

export function calculateCompletion(profile: Partial<UserProfile>): number {
  const totalWeight = WEIGHTED_FIELDS.reduce((sum, f) => sum + f.weight, 0);
  let earned = 0;

  for (const { field, weight } of WEIGHTED_FIELDS) {
    const val = profile[field];
    if (val === null || val === undefined || val === '') continue;
    if (Array.isArray(val) && val.length === 0) continue;
    if (typeof val === 'boolean' && val === false) continue;
    earned += weight;
  }

  return Math.round((earned / totalWeight) * 100);
}
