import { BadgeUserProfile } from '@/shared/badges-dashboard/types';
import TopPlayCreatorOfTheMonth from './TopPlayCreatorOfTheMonth';
import TopPlayCreators from './TopPlayCreators';

type Props = {
  top10Contributors: BadgeUserProfile[];
  topContributorOfTheMonth: BadgeUserProfile;
  publishedPlays: string[];
};

const LeaderBoard = ({ top10Contributors, topContributorOfTheMonth, publishedPlays }: Props) => {
  if (!publishedPlays.length || (!topContributorOfTheMonth && !top10Contributors)) {
    return null;
  }

  return (
    <div className=" overflow-auto lg:flex flex-row justify-center">
      {topContributorOfTheMonth && (
        <TopPlayCreatorOfTheMonth topPlayCreatorOfTheMonth={topContributorOfTheMonth} />
      )}
      <div className="flex flex-col m-4 items-center">
        {top10Contributors?.length && (
          <>
            <div className="leaderboard-heading">Top play creators of all time</div>
            <div>
              <TopPlayCreators topPlayCreators={top10Contributors} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
