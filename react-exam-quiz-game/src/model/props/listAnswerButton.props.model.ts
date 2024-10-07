import { QuizQuestion } from "../interface/response.model";

export interface ListAnswersButtonProps{
    quiz: QuizQuestion;
    isSubmitted: boolean;
    selectedAnswer: string | null;
    correctAnswer: string;
    shuffledAnswers: string[];
    onAnswerClick: (answer: string) => void;
}
