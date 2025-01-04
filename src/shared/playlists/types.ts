export interface PlayLike {
  liked: boolean;
  play_id: string;
  user_id: string;
}

export interface PlayTag {
  tag_id: string;
}

export interface User {
  id: string;
  displayName: string;
  avatarUrl: string;
  email: string;
}

export interface PlayInfo {
  id: string;
  component: string;
  title_name: string;
  cover: string;
  description: string;
  featured: boolean;
  dev_mode: boolean;
  github: string;
  language: string;
  play_like: PlayLike[];
  name: string;
  slug: string;
  user: User;
  created_at: string;
  play_tags: PlayTag[];
  priority?: boolean;
}
