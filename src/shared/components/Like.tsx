import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

type Props = {
  onLikeClick: () => void;
  likeObj: {
    liked: boolean;
    number: number;
  };
};

const Like = ({ onLikeClick = null, likeObj }: Props) => {
  const { liked, number } = likeObj;

  const likeClickHandler = () => {
    if (onLikeClick) return onLikeClick();
  };

  return (
    <button className="action counted -mr-0.5" onClick={likeClickHandler}>
      <AiOutlineLike className={liked ? 'hidden' : 'icon'} size="24px" />
      <AiFillLike className={liked ? 'icon' : 'hidden'} size="24px" />
      {number > 0 ? <div className="count-value">{number}</div> : <div />}
    </button>
  );
};

export default Like;
