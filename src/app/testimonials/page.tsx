import React from 'react';
import Testimonials from '@/shared/testimonials/Testimonials';
import { getTestimonials } from '@/actions/testimonials';

const HomePage = async () => {
  const testimonials = await getTestimonials();

  return (
    <main className="app-body">
      <Testimonials testimonials={testimonials} />
    </main>
  );
};

export default HomePage;
