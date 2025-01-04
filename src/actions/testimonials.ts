import { submit } from '@/services/request';
import { fetchTestimonialsHomePage } from '@/services/request/query/testimonials';

export const getTestimonials = async () => submit(fetchTestimonialsHomePage());
