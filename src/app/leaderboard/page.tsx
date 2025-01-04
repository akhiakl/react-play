import React from 'react';
import { Metadata } from 'next';
import LeaderBoard from '@/shared/playleaderboard/LeaderBoard';
import { fetchLeaderBoardData } from '@/actions/leaderboard';

export const metadata: Metadata = {
  title: 'ReactPlay - Leader Board'
};

const LeaderBoardPage = async () => {
  const { publishedPlays, top10Contributors, topContributorsOfTheMonth } =
    await fetchLeaderBoardData();

  return (
    <main className="app-body app-body-overflow-hidden">
      <LeaderBoard
        publishedPlays={publishedPlays}
        top10Contributors={top10Contributors}
        topContributorOfTheMonth={topContributorsOfTheMonth[0]}
      />
    </main>
  );
};

export default LeaderBoardPage;
