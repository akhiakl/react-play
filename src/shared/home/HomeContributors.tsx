import React from 'react';
import Contributors from './Contributors';
import { getPlayGithubContributors } from '@/actions/github';

const HomeContributors = async () => {
  const { data, error } = await getPlayGithubContributors();

  return (
    <section className="home-contributors" data-testid="contributors-section">
      <Contributors contributors={data} error={error?.message} />
    </section>
  );
};

export default HomeContributors;
