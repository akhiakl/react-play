import PlayCard from './PlayCard';
import { PlayInfo } from './types';
import './playlist.css';

type Props = {
  plays: PlayInfo[];
};

const FeaturedPlays = ({ plays }: Props) => {
  return (
    <>
      <h2 className="plays-title-primary">
        Trending <strong>Plays</strong>
      </h2>
      <ul className="list-plays">
        {plays?.map((play, index) => <PlayCard key={index} play={play} />)}
      </ul>
    </>
  );
};

export default FeaturedPlays;
