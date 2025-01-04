import React from 'react';
import Flower from '@/images/Flower';

const HomeBanner = () => {
  return (
    <div className="home-bg-graphics">
      <Flower className="home-bg-graphics-sm" />
      <Flower className="home-bg-graphics-rg" />
      <Flower className="home-bg-graphics-lg" />
    </div>
  );
};

export default HomeBanner;
