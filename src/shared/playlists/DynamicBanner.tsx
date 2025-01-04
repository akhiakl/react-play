import React, { Fragment } from 'react';
import Link from 'next/link';
import { MdArrowRightAlt } from 'react-icons/md';
import { PlayInfo } from './types';
import Image from 'next/image';

type Props = {
  play: PlayInfo;
};

const DynamicBanner = ({ play }: Props) => {
  return (
    <Fragment>
      <div className="dynamic-banner-container min-h-[50vh] relative">
        <div className="absolute w-full h-full z-10 bg-[linear-gradient(rgba(0,0,0,0.5),_#020808)]" />
        <Image
          fill
          priority
          alt="Cover image background"
          className="object-cover object-center"
          quality={70}
          sizes="100vw"
          src={play.cover}
        />
        <div className="dynamic-banner-body md:pl-14 px-4 py-2 md:py-3 z-20">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl">{play.name}</h1>
          <p className="text-gray-400 mt-2 text-xs md:text-base ">{play.description}</p>
          <Link href={`/plays/${encodeURI(play?.github?.toLowerCase())}/${play.slug}`}>
            <button className="banner-button rounded-full font-extrabold uppercase px-8 md:px-12 md:py-1">
              Let's Play <MdArrowRightAlt className="right-arrow-icon" size={40} />
            </button>
          </Link>

          {/* <Link href={``}><button className='banner-button'>See Creator's profile</button></Link> */}
        </div>
      </div>
    </Fragment>
  );
};

export default DynamicBanner;
