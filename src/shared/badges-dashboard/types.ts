export interface BadgeData {
  id: string;
  level: string;
  image: string;
  tag: string;
  coverImage: string;
  description: string;
}

export interface BadgeUserProfile {
  displayName: string;
  email: string;
  count: number;
  avatarUrl: string;
  id: string;
  created_at: string;
}

export interface UserBadgeData {
  claimed: boolean;
  badge_id_map: BadgeData;
  user_id_map: {
    users_user_profile_map: BadgeUserProfile;
  };
}
