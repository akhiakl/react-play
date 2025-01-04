'use client';
import React, { useState } from 'react';
import ImgOops from '@/images/ImgOops';
import Badge from './Badge';
import BadgeDetails from './BadgeDetails';
import { useAuthenticationStatus } from '@nhost/nextjs';
import Link from 'next/link';
import { NHOST } from '@/constants/nhost';

type Props = {
  badges: any[];
  itsMe?: boolean;
};

const BadgeListing = ({ badges, itsMe }: Props) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <>
      <div className="pt-4 pb-8">
        <p className="pt-2 text-sm  text-gray-900">Badges</p>
      </div>
      <div className="mx-auto">
        {!badges || !badges.length ? (
          <div className="flex flex-col justify-center items-center">
            <ImgOops className="h-32" />
            <h3 className=" text-xl">No badges yet</h3>
            <h4 className="text-xs text-grey-500 py-8">
              No worry, there are many more avenues to earn a bouquet of them
            </h4>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 justify-center items-center">
            {badges.map((badge, bi) => {
              return (
                <Badge
                  badge={badge.badge_id_map}
                  key={bi}
                  selectionChanged={() => setSelectedBadge(badge.badge_id_map)}
                />
              );
            })}
          </div>
        )}
      </div>

      {itsMe ? null : ( // Will use this space for badge claiming later
        <div className="pt-4 pb-4">
          <Link
            className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
            href={
              !isAuthenticated
                ? NHOST.AUTH_URL(`${process.env.NEXT_PUBLIC_DOMAIN}/contributors/me/badges`)
                : '/contributors/me/badges'
            }
          >
            Take Me to My Badges
          </Link>
        </div>
      )}
      {selectedBadge && (
        <BadgeDetails badge={selectedBadge} onClose={() => setSelectedBadge(null)} />
      )}
    </>
  );
};

export default BadgeListing;
