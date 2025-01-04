import { SORT_COOKIE } from '@/constants';
import { cookies } from 'next/headers';

export const setSortByValueInCookie = async (value: string) => {
  'use server';
  const cookieStore = await cookies();
  cookieStore.set(SORT_COOKIE, value);
};
