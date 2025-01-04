import { RiMedal2Fill } from 'react-icons/ri';
import { IoMdTrophy } from 'react-icons/io';
import { IoRibbon } from 'react-icons/io5';

const LevelBadge = ({ level }) => {
  switch (level) {
    case 'Intermediate':
      return (
        <span className="inline-flex items-center gap-[0.2rem] text-fs-xs font-fw-bold uppercase rounded-[0.2rem] bg-play-level-3/15 pt-[0.3rem] pb-[0.24rem] px-[0.4rem] text-play-level-3 tracking-[0.04rem] leading-none">
          <RiMedal2Fill size="16px" /> {level}
        </span>
      );

    case 'Advanced':
      return (
        <span className="inline-flex items-center gap-[0.2rem] text-fs-xs font-fw-bold uppercase rounded-[0.2rem] bg-play-level-2/15 pt-[0.3rem] pb-[0.24rem] px-[0.4rem] text-play-level-2 tracking-[0.04rem] leading-none">
          <IoMdTrophy size="16px" /> {level}
        </span>
      );
    case 'Beginner':
    default:
      return (
        <span className="inline-flex items-center gap-[0.2rem] text-fs-xs font-fw-bold uppercase rounded-[0.2rem] bg-play-level-1/15 pt-[0.3rem] pb-[0.24rem] px-[0.4rem] text-play-level-1 tracking-[0.04rem] leading-none">
          <IoRibbon size="16px" /> {level}
        </span>
      );
  }
};

export default LevelBadge;
