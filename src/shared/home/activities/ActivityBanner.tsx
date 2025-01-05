import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';
import { IoIosRocket } from 'react-icons/io';
import { activities } from './activitiesConfig';
import Image from 'next/image';
import { UMAMI_EVENTS } from '@/constants';
import { GitHubRepository } from '@/actions/github/types';

type Props = {
  currentActivity: string;
  githubRepo: GitHubRepository;
};

function ActivityBanner({ currentActivity, githubRepo }: Props) {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });
  const activity = activities.find((a) => a.id === currentActivity);
  const { name, subtitle, description, logo, heroImage } = activity;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 justify-between w-[98%]  max-w-[600px]  md:max-w-[992px] lg:max-w-[1200px] mt-16 m-auto text-white">
      <div className="w-[100%] lg:w-[60%] text-center lg:text-left md:order-1">
        <span className="text-lg md:text-xl lg:text-2xl">ReactPlay Presents</span>
        <h1 className=" uppercase text-5xl md:text-6xl lg:text-8xl font-bold text-cyan-300 text-center lg:text-left">
          <span className="sr-only">{name}</span>
          <Image
            priority
            alt="HRP Logo"
            className="w-10/12 md:w-64 lg:w-auto ml-auto mr-auto lg:ml-0 lg:mr-0 lg:inline-block"
            height={60}
            src={logo}
            width={490}
          />
        </h1>
        <div className="my-2 md:my-4 md:text-xl">
          <p className="text-2xl font-bold mt-8 mb-4 text-center lg:text-left">{subtitle}</p>
          <p className="text-base opacity-50 mt-4 mb-8 text-center lg:text-left">{description}</p>
        </div>
      </div>
      <div className="body-c2a md:order-3 md:col-span-3">
        <a
          className="body-c2a-btn body-c2a-btn--primary"
          href="https://hustles.reactplay.io/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <IoIosRocket className="icon" />
          <span className="btn-label">Get started</span>
        </a>
        <a
          className="body-c2a-btn "
          data-umami-event={UMAMI_EVENTS.GITHUB_BUTTON_CLICK}
          href="https://github.com/reactplay/react-play"
          rel="noopener noreferrer"
          target="_blank"
        >
          <BsGithub className="icon" />
          {githubRepo?.stargazers_count && (
            <span className="btn-label">
              GitHub
              <div className="label-info-more">
                <FiStar />
                <div className="more-label">{formatter.format(githubRepo?.stargazers_count)}</div>
              </div>
            </span>
          )}
        </a>
      </div>
      <div className="relative h-80 md:h-96 w-full my-0 mx-auto md:order-2">
        <Image
          fill
          priority
          alt="Hero image"
          className="object-[100%_center] lg:object-[90%_center] object-contain"
          sizes="(max-width: 768px) 100vw, 40vw"
          src={heroImage}
        />
      </div>
    </div>
  );
}

export default ActivityBanner;
