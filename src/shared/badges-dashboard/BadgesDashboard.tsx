import React from 'react';
import BadgeListing from './BadgeListing';
import { BadgeData, BadgeUserProfile } from './types';
import Image from 'next/image';

type Props = {
  userInfo: BadgeUserProfile;
  badges: BadgeData[];
  itsMe?: boolean;
};

const BadgesDashboard = async ({ userInfo, badges, itsMe }: Props) => {
  return (
    <div className="font-sans antialiased leading-normal tracking-wider bg-cover h-full p-8 bg-[#F6F6F9]">
      <div className="flex items-center h-auto  flex-wrap mx-auto my-16">
        <div className="w-full rounded-lg shadow-2xl bg-white mx-6" id="profile">
          <div className="p-1 md:p-12 text-center">
            <Image
              priority
              alt="User avatar"
              className="block border-4 border-white rounded-full mx-auto -mt-16 h-24 w-24 object-cover object-center md:h-32 md:w-32 md:-mt-32"
              height={110}
              src={userInfo.avatarUrl}
              width={110}
            />

            <h1 className="text-3xl font-bold pt-8 text-gray-900">{userInfo.displayName}</h1>
            <p className="pt-4 flex items-center justify-center text-xs text-grey-500">
              {userInfo.email}
            </p>
            <div className="mx-auto w-4/5 pt-3 border-b-2 border-grey-100 opacity-25" />
            <BadgeListing badges={badges} itsMe={itsMe} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesDashboard;
