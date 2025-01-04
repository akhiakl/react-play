import { IoAddSharp } from 'react-icons/io5';
import { RiChatNewLine } from 'react-icons/ri';
import LevelBadge from '../components/LevelBadge';
import './playIdeas.css';
import { PLAY_DOC_LINK } from '@/constants';
import { PlayIdeaFilter, PlayIdeaInfo } from './types';
import PlayIdeaFilters from './PlayIdeaFilters';
import { Suspense } from 'react';
import Link from 'next/link';

type Props = {
  ideas: PlayIdeaInfo[];
  filters: PlayIdeaFilter[];
  isError?: boolean;
};

const PlayIdeas = ({ ideas, isError, filters }: Props) => {
  if (isError) {
    return <div>Something went wrong ...</div>;
  }

  return (
    <main className="app-body app-body-overflow-hidden">
      <div className="playideas-container">
        <div className="playideas-header">
          <div>
            <h1 className="header-title">
              Play Ideas
              <span className="header-title-badge">{ideas.length}</span>
            </h1>
            <p className="header-desc">
              Looking for project ideas to practice React? Great, you have landed on the right
              place. Here are some ideas to get you started.
            </p>
          </div>
          <Suspense>
            <PlayIdeaFilters filters={filters} />
          </Suspense>
        </div>
        <div className="playideas-body">
          <ul className="list-playideas">
            {ideas.map((idea) => (
              <li className="list-playideas-item" key={idea.id}>
                <h2 className="idea-title">{idea.title}</h2>
                <p className="idea-desc">{idea.description}</p>
                <p className="idea-level">
                  <LevelBadge level={idea.level} />
                </p>
                <div className="idea-actions">
                  {process.env.NODE_ENV === 'development' ? (
                    <Link className="btn-primary action-btn" href="/plays/create">
                      <IoAddSharp className="icon" />
                      <span className="btn-label">Create</span>
                    </Link>
                  ) : (
                    <a
                      className="btn-primary action-btn"
                      href={PLAY_DOC_LINK}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IoAddSharp className="icon" />
                      <span className="btn-label">Create</span>
                    </a>
                  )}
                  <a
                    className="btn-default action-btn"
                    href={`https://github.com/reactplay/react-play/discussions/new?category=ideas&title=${idea.title}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <RiChatNewLine className="icon" />
                    <span className="btn-label">Start discussion</span>
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default PlayIdeas;
