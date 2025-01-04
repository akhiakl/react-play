import React from 'react';
import ActivityBanner from './activities/ActivityBanner';
import DefaultBanner from './defaultBanner/DefaultBanner';
import { getPlayGithubRepo } from '@/actions/github';

const HomeContent = async () => {
  const { data: githubRepo } = await getPlayGithubRepo();

  if (!githubRepo) return null;

  return (
    <div className="app-home-body-content">
      {process.env.NEXT_PUBLIC_ACTIVITIES_ON && process.env.NEXT_PUBLIC_ACTIVITIES_ON === 'true' ? (
        <ActivityBanner
          currentActivity={process.env.NEXT_PUBLIC_ACTIVITY_ID}
          githubRepo={githubRepo}
        />
      ) : (
        <DefaultBanner githubRepo={githubRepo} />
      )}
    </div>
  );
};

export default HomeContent;
