import React, { FC } from 'react';
import BadgeCard from './BadgeCard';
import { UserBadgeData } from './types';

type ClaimedBadgesProps = {
  badges: UserBadgeData[];
};

const ClaimedBadges: FC<ClaimedBadgesProps> = ({ badges }) => {
  return (
    <>
      {badges.length === 0 ? (
        <p>No badges claimed yet</p>
      ) : (
        badges.map((badge) => {
          return (
            <BadgeCard
              coverImage={badge.badge_id_map.image}
              id={badge.badge_id_map.id}
              level={badge.badge_id_map.level}
              tag={badge.badge_id_map.tag}
            />
          );
        })
      )}
    </>
  );
};

export default ClaimedBadges;
