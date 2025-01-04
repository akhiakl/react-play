import React from 'react';
import { BadgeData } from './types';

type ReadonlyRequired = {
  readonly?: false;
  selectionChanged: () => void;
};

type ReadonlyOptional = {
  readonly: true;
  selectionChanged?: never;
};
type Props = {
  badge: BadgeData;
  readonly?: boolean;
  showtext?: boolean;
} & (ReadonlyRequired | ReadonlyOptional);

const Badge = ({ badge, selectionChanged, readonly, showtext = true }: Props) => {
  return (
    <div className="hover:group-hover">
      {readonly ? (
        <div className="py-8 flex justify-center items-center flex-column lg:flex-col">
          <div
            className="bg-cover bg-center h-32 w-32 lg:h-48 lg:w-48 group-hover:scale-125 ease-in duration-300"
            style={{
              backgroundImage: `url(${badge.image})`
            }}
          />
        </div>
      ) : (
        <div className="p-4 max-w-72">
          <div>
            <div className="relative group ">
              <div>
                <div className="absolute -inset-0.5 rounded-lg blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt" />
                <button
                  className="relative px-2 py-4 rounded-lg leading-none flex items-center divide-x divide-gray-600 w-full transition duration-1000  group-hover:shadow-md group-hover:drop-shadow-xl"
                  onClick={() => selectionChanged()}
                >
                  <div className="flex flex-row lg:flex-col items-center space-x-5  w-full justify-evenly">
                    <div className="w-2/5 py-8 flex justify-center items-center">
                      <div
                        className="bg-cover bg-center h-28 w-28 group-hover:scale-125 ease-in duration-300"
                        style={{
                          backgroundImage: `url(${badge.image})`
                        }}
                      />
                    </div>
                    <div className="w-3/5 flex justify-center flex-wrap">
                      {showtext && <div className="pr-6 text-gray-800 text-sm">{badge.level}</div>}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Badge;
