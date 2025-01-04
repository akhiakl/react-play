'use client';
import React from 'react';
import ImgOops from '@/images/ImgOops';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

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
          <Link className="underline" href="/plays">
            clear
          </Link>{' '}
          it.
        </p>
      ) : (
        <p className="page-404-desc">Something went wrong</p>
      )}
    </div>
  );
};

export default PlaysNotFound;
