'use client';
import React from 'react';
import ImgOops from '@/images/ImgOops';
import { useSearchParams } from 'next/navigation';

const PlaysNotFound = () => {
  const searchParams = useSearchParams();
  const searchString = searchParams.toString();

  return (
    <div className="play-not-found">
      <ImgOops className="play-not-found-image" />
      <p className="page-404-lead">Play not found</p>
      {searchString ? (
        <p className="page-404-desc">
          You migh want to adjust the search criteria or{' '}
          <a className="underline" href="/plays">
            clear
          </a>{' '}
          it.
        </p>
      ) : (
        <p className="page-404-desc">Something went wrong</p>
      )}
    </div>
  );
};

export default PlaysNotFound;
