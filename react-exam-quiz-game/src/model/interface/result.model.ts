import { QuizQuestionWithId } from "./response.model";

export interface ResultsState {
    selectedAnswers: { [key: string]: string };
    correctCount: number;
    quizList: QuizQuestionWithId[];
    shuffledAnswers: { [key: string]: string[] };
}
