import React from 'react';
import TestimonialSection from '@/shared/testimonials/TestimonialSection';
import Link from 'next/link';
import { getTestimonials } from '@/actions/testimonials';

const HomeTestimonials = async () => {
  const testimonials = await getTestimonials();

  return (
    <section className="testimonials">
      <h2 className="title-primary">
        What Our{' '}
        <strong>
          <span>Community</span>
        </strong>{' '}
        Says!
      </h2>
      <TestimonialSection testimonials={testimonials} />
      <div className="mt-16 text-center">
        <Link className="home-anchor" href="/testimonials">
          <span className="text">View all Testimonials</span>
        </Link>
      </div>
    </section>
  );
};

export default HomeTestimonials;
