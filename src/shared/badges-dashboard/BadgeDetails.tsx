import React from 'react';
import Badge from './Badge';
import './badge.css';
import { BadgeData } from './types';

type Props = {
  badge: BadgeData;
  onClose: () => void;
};

const BadgeDetails = ({ badge, onClose }: Props) => {
  const makeClickableLinks = (badge: BadgeData) => {
    const linkPattern = /(\w+)\s?\((https?:\/\/[^)]+)\)/g;

    const descriptionWithLinks = badge.description.replace(
      linkPattern,
      (match: any, name: any, url: any) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${name}</a>`;
      }
    );

    return <span dangerouslySetInnerHTML={{ __html: descriptionWithLinks }} />;
  };

  return (
    <div
      aria-hidden="true"
      className="overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center transition duration-1000 backdrop-blur "
      id="defaultModal"
      tabIndex={-1}
      onClick={onClose}
    >
      <div
        className="relative p-0.5 w-full max-w-4xl h-full md:h-auto bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg drop-shadow-md"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-800">{badge.level}</h3>
            <button
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
              type="button"
              onClick={() => onClose()}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  fill-rule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col lg:flex-row">
              <div className="px-4">
                <Badge readonly badge={badge} showtext={false} />
              </div>
              <div className="flex-1 flex justify-center items-center">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-600">
                  {makeClickableLinks(badge)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              className="app-header-btn app-header-btn--primary"
              data-modal-toggle="defaultModal"
              type="button"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeDetails;
