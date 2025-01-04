import Image from 'next/image';
import { BadgeData } from './types';

type Props = Pick<BadgeData, 'id' | 'coverImage' | 'tag' | 'level'>;

const BadgeCard = ({ id, coverImage, tag, level }: Props) => {
  return (
    <div className=" py-4 flex bg-white flex-col items-center shadow w-36 h-36 " key={id}>
      <Image alt={`${tag} badge`} className="h-16 w-16" height={64} src={coverImage} width={64} />
      <span className=" text-xs">{tag}</span>
      <span className=" text-center text-sm ">{level}</span>
    </div>
  );
};

export default BadgeCard;
