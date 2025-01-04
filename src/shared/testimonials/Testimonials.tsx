import React from 'react';
import TestimonialCard from './TestimonialCard';
import TestimonialModal from './TestimonialModal';
import './Testimonial.css';
import { TestimonialInfo } from './types';

type Props = {
  testimonials: TestimonialInfo[];
};

const Testimonials = ({ testimonials }: Props) => {
  return (
    <section className="mt-24">
      <h2 className="testimonial-title-primary">
        What Our{' '}
        <strong>
          <span className="underline decoration-[#00f2fe]">Community</span>
        </strong>{' '}
        Says!
      </h2>

      <TestimonialModal />

      <div className="mx-auto max-w-[1600px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
          {testimonials &&
            testimonials.map((testimonial) => (
              <div className="border rounded-lg" key={testimonial.id}>
                <TestimonialCard
                  avatarUrl={testimonial.user_id_map.avatarUrl}
                  category={testimonial.testimonials_event.name}
                  created_at={testimonial.created_at}
                  email={testimonial.user_id_map.email}
                  name={testimonial.user_id_map.displayName}
                  quote={testimonial.quote}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
