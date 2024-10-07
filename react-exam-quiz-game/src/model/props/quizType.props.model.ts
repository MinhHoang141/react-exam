import { QuizQuestionWithId } from "../interface/response.model";

export interface QuizTypeProps {
    setQuizList: (quizList: QuizQuestionWithId[]) => void;
}
