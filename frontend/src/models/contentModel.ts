import { CategoryModel } from './categoryModel';
import { HistoryQuestionModel, QuestionModel } from './questionModel';
import { UserModel } from './userModel';

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
  questions: QuestionModel[];
  historyQuestion?: HistoryQuestionModel;
  discussions?: DiscussionModel[];
}

export interface DiscussionModel {
  id: string;
  message: string;
  id_detail_content: string;
  id_user: string;
  created_at: Date;
  updated_at: Date;
  replies: DiscussionModel[];
  user: UserModel;
}

export interface SendDiscussionModel {
  message: string;
  id_detail_content: string;
  id_replies_discussion?: string;
}