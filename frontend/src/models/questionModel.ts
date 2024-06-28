export interface QuestionModel {
  id: string;
  question: string;
  created_at: Date;
  updated_at: Date;
  score: number;
  options: OptionModel[];
}

export interface OptionModel {
  id: string;
  option: string;
  is_answer: boolean;
}

export interface QuizQuestionModel {
  id_question: string;
  question: string;
  score: number;
  options: OptionModel[];
}

export interface HistoryQuestionModel {
  id: string;
  id_detail_content: string;
  result_score: number;
  target_score: number;
}