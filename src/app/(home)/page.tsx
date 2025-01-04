import ExtendedFooter from '@/shared/footer/ExtendedFooter';
import React from 'react';
import HomeBanner from '@/shared/home/HomeBanner';
import HomeContent from '@/shared/home/HomeContent';
import HomeContributors from '@/shared/home/HomeContributors';
import HomeFeatures from '@/shared/home/HomeFeatures';
import HomePlays from '@/shared/home/HomePlays';
import HomeIdeas from '@/shared/home/HomeIdeas';
import HomeSponsors from '@/shared/home/HomeSponsors';
import HomeTestimonials from '@/shared/home/HomeTestimonials';
import './home.css';

const HomePage = () => {
  return (
    <main>
      <section className="app-home-body">
        <HomeBanner />
        <HomeContent />
      </section>
      <section className="home-features">
        <HomeFeatures />
        <HomeIdeas />
      </section>
      <HomePlays />
      <HomeTestimonials />
      <HomeContributors />
      <HomeSponsors />
      <ExtendedFooter />
    </main>
  );
};

export default HomePage;
