export interface ContentModel {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isPremium: boolean;
  total_duration: number;
  categories: string[];
  contents?: DetailContentModel[];
  total_kliks: number;
  updated_at: string;
  created_at: string;
}

export interface DetailContentModel {
  id: string;
  title: string;
  description: string;
  isPremium: boolean;
  duration: number;
  video_url: string;
  discussion?: DiscussionModel[];
  updated_at: string;
  created_at: string;
}

export interface DiscussionModel {
  id: string;
  message: string;
  like: {
    count: number;
    is_liked: boolean;
  };
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  replies?: DiscussionModel[];
}
