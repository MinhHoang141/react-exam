import { QuizQuestion } from "../interface/response.model";

export interface QuizTypeProps {
    setQuizList: (quizList: QuizQuestion[]) => void;
}
