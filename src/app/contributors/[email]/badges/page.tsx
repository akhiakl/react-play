import React from 'react';
import { getAllBadgesByUserId, getUserByEmail } from '@/services/badges';
import { Metadata } from 'next';
import BadgesDashboard from '@/shared/badges-dashboard/BadgesDashboard';
import { BadgeData, BadgeUserProfile } from '@/shared/badges-dashboard/types';
import { cookies } from 'next/headers';
import { notFound, permanentRedirect } from 'next/navigation';
import { NHOST } from '@/constants/nhost';

type Props = { params: Promise<{ email: string }> };

const getLoggedInUserInfo = async (email: string) => {
  const cookieStore = await cookies();
  const cookieVal = cookieStore.get('nhostSession')?.value;
  const nHostSession = cookieVal ? JSON.parse(cookieVal) : null;
  const loggedInUser: BadgeUserProfile = nHostSession?.user;

  return {
    itsMe: email === 'me' || loggedInUser?.email === email,
    loggedInUser
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const paramsEmail = (await params).email;
  const email = decodeURIComponent(paramsEmail);
  const { loggedInUser, itsMe } = await getLoggedInUserInfo(email);
  const userInfo: BadgeUserProfile =
    itsMe && loggedInUser
      ? loggedInUser
      : await getUserByEmail(decodeURIComponent(email)).then(([user]) => user);
  if (!userInfo) {
    return {};
  }

  return {
    title: 'ReactPlay - UserProfile',
    description: userInfo?.displayName,
    openGraph: {
      title: userInfo?.displayName,
      description: userInfo?.email
      // images: {
      //   url: userInfo?.avatarUrl,
      //   alt: userInfo?.email
      // }
    },
    twitter: {
      title: userInfo?.displayName,
      description: userInfo?.email,
      images: {
        url: userInfo?.avatarUrl,
        alt: userInfo?.email
      }
    }
  };
}

async function ContributorPage({ params }: Props) {
  const paramsEmail = (await params).email;
  const email = decodeURIComponent(paramsEmail);
  const { itsMe, loggedInUser } = await getLoggedInUserInfo(email);
  if (itsMe && !loggedInUser) {
    permanentRedirect(NHOST.AUTH_URL(`${process.env.NEXT_PUBLIC_DOMAIN}/contributors/me/badges`));
  }

  const userInfo: BadgeUserProfile =
    itsMe && loggedInUser
      ? loggedInUser
      : await getUserByEmail(decodeURIComponent(email)).then(([user]) => user);

  if (!userInfo) {
    notFound();
  }

  const badges: BadgeData[] = await getAllBadgesByUserId(userInfo?.id);

  return <BadgesDashboard badges={badges} itsMe={itsMe} userInfo={userInfo} />;
}

export default ContributorPage;
