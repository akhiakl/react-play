import React from 'react';
import { BsPlayCircleFill } from 'react-icons/bs';
import { BiLogoTypescript, BiLogoJavascript } from 'react-icons/bi';
import PlayShare from './PlayShare';
import Like from '@/shared/components/Like';
import userImage from '@/images/user.png';
import Link from 'next/link';
import Image from 'next/image';
import { PlayInfo } from './types';

type Props = {
  likeObject: () => {
    liked: boolean;
    number: number;
  };
  play: PlayInfo;
  cover: string;
};

function PlayCard({ play, cover, likeObject }: Props) {
  return (
    <Link href={`/plays/${encodeURI(play.github.toLowerCase())}/${play.slug}`}>
      <div className="play-card-container">
        <div className="play-thumb-container">
          {cover && (
            <Image
              fill
              alt="Play cover image"
              className="play-card-thumb-img"
              priority={play.priority}
              src={cover}
            />
          )}
          <BsPlayCircleFill className="play-icon" color="white" size={80} />
        </div>

        {/* <div className="border" /> */}
        <div className="card-header">{play.name}</div>
        {play.user && (
          <div className="author">
            <Image
              alt="avatar"
              className="rounded-full border border-zink"
              height={25}
              loading="lazy"
              src={
                play?.user.avatarUrl
                  ? play?.user.avatarUrl.length
                    ? play?.user.avatarUrl
                    : userImage
                  : userImage
              }
              width={25}
            />
            <div className="author-name">{play?.user.displayName}</div>
          </div>
        )}
        <div className="play-actions mt-4">
          <div className="like-container">
            <Like likeObj={likeObject()} onLikeClick={null} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PlayShare
                cover={cover}
                link={`/plays/${encodeURI(play.github.toLowerCase())}/${play.slug}`}
              />
              {play.language === 'ts' ? (
                <BiLogoTypescript className="lang-icon" color="#007acc" size={25} />
              ) : (
                <BiLogoJavascript className="lang-icon" color="#F0DB4F" size={25} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlayCard;
