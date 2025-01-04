import { submit } from '@/services/request';
import groupBy from 'lodash/groupBy';
import { format, lastDayOfMonth } from 'date-fns';
import { FetchPlayCountByUser } from '@/services/request/query/fetch-leaderboard-data';
import { BadgeUserProfile } from '@/shared/badges-dashboard/types';

const formatData = (
  data: {
    slug: string;
    created_at: string;
    user: BadgeUserProfile;
  }[],
  publishedPlays: string[],
  monthlyContribution = false
) => {
  const formattedData: BadgeUserProfile[] = [];
  const finalData: BadgeUserProfile[] = [];
  const filteredData = data.filter((d) => publishedPlays.includes(d.slug));
  filteredData.map((d) => {
    formattedData.push({
      created_at: d.created_at,
      displayName: d.user.displayName,
      avatarUrl: d.user.avatarUrl,
      id: d.user.id
    } as BadgeUserProfile);
  });
  const groupByUser = groupBy(formattedData, 'displayName');
  Object.values(groupByUser).map((v) =>
    finalData.push({
      displayName: v[0].displayName,
      avatarUrl: v.map((t) => t.avatarUrl)[0],
      count: v.length,
      created_at: v[0].created_at,
      id: v[0].id
    } as BadgeUserProfile)
  );
  const sortByCount = finalData.sort((a, b) => b.count - a.count);
  if (monthlyContribution) {
    // once the data being sorted based on created date, will pick the first one.
    return sortByCount.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  return sortByCount.slice(0, 10);
};

async function fetchData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_PLAY_WEB_SVC}/api/plays/published`);
  const data = await res.json();

  return data;
}

async function fetchTopContributors() {
  return submit(FetchPlayCountByUser.getAllPlaysByUser());
}

async function fetchTopContributorOfTheMonth() {
  const firstDateOfMonth = format(new Date(), 'yyyy-MM-01');
  const lastDateOfMonth = format(lastDayOfMonth(new Date()), 'yyyy-MM-dd');

  return submit(FetchPlayCountByUser.getAllPlaysByUserByMonth(firstDateOfMonth, lastDateOfMonth));
}

export const fetchLeaderBoardData = async () => {
  const publishedPlays = await fetchData();
  const [top10ContributorsResponse, topContributorOfTheMonthResponse] = await Promise.all([
    fetchTopContributors(),
    fetchTopContributorOfTheMonth()
  ]);
  const top10Contributors = formatData(top10ContributorsResponse, publishedPlays);
  const topContributorsOfTheMonth = formatData(
    topContributorOfTheMonthResponse,
    publishedPlays,
    true
  );

  return {
    publishedPlays,
    top10Contributors,
    topContributorsOfTheMonth
  };
};
