import { CategoryModel } from './categoryModel';

export interface ContentModel {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  is_premium: boolean;
  total_duration: number;
  total_klik: number;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
  total_content: number;
  detail_content: DetailContentModel[];
  categories: CategoryModel[];
}

export interface DetailContentModel {
  id: string;
  id_content: string;
  serial_number: number;
  title: string;
  description: string;
  is_premium: boolean;
  duration: number;
  video_url?: string;
  created_by: string;
  updated_by: string;
  created_at: Date;
  updated_at: Date;
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
