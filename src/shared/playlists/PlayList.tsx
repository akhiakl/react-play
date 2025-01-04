import React, { Fragment, Suspense } from 'react';
import './playlist.css';
import DynamicBanner from './DynamicBanner';
import { PlayInfo } from './types';
import PlayListSortBy from './PlayListSortBy';
import PlaysNotFound from './PlaysNotFound';
import { setSortByValueInCookie } from '@/actions/sortby';
import PlayCard from './PlayCard';

type Props = {
  plays: PlayInfo[];
  randomPlay: PlayInfo;
  sortBy: string;
};

const PlayList = ({ plays, randomPlay, sortBy: savedSortBy }: Props) => {
  if (plays?.length === 0) {
    return (
      <Suspense>
        <PlaysNotFound />
      </Suspense>
    );
  }

  return (
    <Fragment>
      {randomPlay && <DynamicBanner play={randomPlay} />}
      <Suspense>
        <PlayListSortBy
          defaultSortBy={savedSortBy}
          totalResults={plays?.length}
          onSortBy={setSortByValueInCookie}
        />
      </Suspense>
      <ol className="list-plays">
        {plays?.map((play, index) => (
          <Fragment key={index}>
            <PlayCard
              key={play.id}
              play={{
                ...play,
                priority: index <= 4
              }}
            />
          </Fragment>
        ))}
      </ol>
    </Fragment>
  );
};

export default PlayList;
