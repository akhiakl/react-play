import React from 'react';
import FeaturedPlays from '@/shared/playlists/FeaturedPlays';
import Link from 'next/link';

const HomePlays = () => {
  return (
    <section className="home-plays">
      <FeaturedPlays />
      <div className="home-plays-footer">
        <Link className="home-anchor" href="/plays">
          <span className="text">View all Plays</span>
        </Link>
      </div>
    </section>
  );
};

export default HomePlays;
