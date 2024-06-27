export interface QuestionModel {
  id: string;
  question: string;
  created_at: Date;
  updated_at: Date;
  options: OptionModel[];
}

export interface OptionModel {
  id?: string;
  option: string;
  is_answer: boolean;
}

export interface QuizQuestionModel {
  id_question: string;
  question: string;
  score: number;
  created_at: Date;
  updated_at: Date;
  options: OptionModel[];
}
