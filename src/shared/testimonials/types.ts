export interface User {
  avatarUrl: string;
  id: string;
  displayName: string;
  email: string;
}

export interface TestimonialsEvent {
  id: string;
  name: string;
  description: string;
}

export interface TestimonialInfo {
  id: string;
  quote: string;
  created_at: string; // You can use Date if you want to work with Date objects directly
  user_id_map: User;
  testimonials_event: TestimonialsEvent;
  title: string;
}
