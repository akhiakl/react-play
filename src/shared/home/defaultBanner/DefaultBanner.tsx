import React from 'react';
import { BsGithub } from 'react-icons/bs';
import { FiStar } from 'react-icons/fi';
import { MdManageSearch } from 'react-icons/md';
import { UMAMI_EVENTS } from '@/constants';
import Link from 'next/link';
import { GitHubRepository } from '@/actions/github/types';

type Props = {
  githubRepo: GitHubRepository;
};

const DefaultBanner = ({ githubRepo }: Props) => {
  const formatter = Intl.NumberFormat('en', { notation: 'compact' });

  return (
    <div>
      <h1 className="body-title">
        Start <strong>React Code</strong> Arena <br />
        with ReactPlay
      </h1>
      <p className="body-desc">
        ReactPlay is an open-source platform to learn, create and share ReactJS projects with the
        developer community. Start by browsing the plays or exploring the source code.
      </p>

      <div className="body-c2a">
        <Link className="body-c2a-btn body-c2a-btn--primary" href="/plays">
          <MdManageSearch className="icon" />
          <span className="btn-label">Browse</span>
        </Link>
        <a
          className="body-c2a-btn"
          data-umami-event={UMAMI_EVENTS.GITHUB_BUTTON_CLICK}
          href="https://github.com/reactplay/react-play"
          rel="noopener noreferrer"
          target="_blank"
        >
          <BsGithub className="icon" />
          <span className="btn-label">
            GitHub{' '}
            <div className="label-info-more">
              <FiStar />{' '}
              <div className="more-label">{formatter.format(githubRepo?.stargazers_count)}</div>
            </div>{' '}
          </span>
        </a>
      </div>
      <div className="body-desc">
        Check out our bouquet of{' '}
        <a
          className="home-anchor"
          href="https://www.meetup.com/reactplay-bengaluru/events/"
          target="_blank"
        >
          <span className="text text-secondary">events</span>
        </a>
      </div>
    </div>
  );
};

export default DefaultBanner;
