import type { ProfileData } from '@/app/profiling/hooks/profiling/useProfile';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function getToken(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('access_token') || '';
}

export async function fetchMyProfile(userId: string): Promise<ProfileData> {
  const res = await fetch(`${BASE_URL}/profiling/profile/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

  if (!res.ok) throw new Error('Failed to fetch profile');

  return res.json();
}

export async function saveMyProfile(
  userId: string,
  data: ProfileData
): Promise<ProfileData> {
  const res = await fetch(`${BASE_URL}/profiling/profile/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Failed to save profile');

  return res.json();
}