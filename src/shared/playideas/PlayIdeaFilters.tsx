'use client';
import React, { ChangeEventHandler } from 'react';
import { PlayIdeaFilter } from './types';
import useQueryParams from '@/shared/hooks/useQueryParams';

type Props = {
  filters: PlayIdeaFilter[];
};

const PlayIdeaFilters = ({ filters }: Props) => {
  const queryParams = useQueryParams();

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    queryParams.set('level', event.target.value);
  };

  return (
    <div className="playideas-levels-pills">
      {filters.map((filter) => (
        <div className="level-pill" key={filter.id}>
          <input
            className="level-pill-control"
            defaultChecked={filter.value === ''}
            id={filter.id}
            name="level"
            title={filter.label}
            type="radio"
            value={filter.value}
            onChange={onValueChange}
          />
          <label className="level-pill-label" htmlFor={filter.id}>
            {filter.label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PlayIdeaFilters;
