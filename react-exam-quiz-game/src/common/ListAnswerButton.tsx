import { useEffect, useState } from "react";
import { ButtonColors } from "../model/enum/buttonColors.enum";
import { QuizQuestion } from "../model/interface/response.model";
import AnswerButton from "./AnswerButton";

export default function ListAnswerButton({
    quiz,
    isSubmitted,
    selectedAnswer,
    correctAnswer,
    onAnswerClick,
}: {
    quiz: QuizQuestion;
    isSubmitted: boolean;
    selectedAnswer: string | null;
    correctAnswer: string;
    onAnswerClick: (answer: string) => void;
}) {
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    // Shuffle the answers when the component mounts
    useEffect(() => {
        const allAnswers = [
            quiz.correct_answer,
            ...quiz.incorrect_answers,
        ].sort(() => Math.random() - 0.5); // Shuffle answers randomly
        setShuffledAnswers(allAnswers);
    }, [quiz]);

    return (
        <div style={{ marginBottom: "20px" }}>
            <div dangerouslySetInnerHTML={{__html: quiz.question}}></div>
            <div className="flex justify-center items-center gap-4 p-4">
                {shuffledAnswers.map((answer, index) => {
                    // Determine button color and whether the button is disabled based on submission status
                    let buttonColor: ButtonColors | undefined = undefined;
                    let buttonDisabled = false; // Default state is not disabled

                    if (isSubmitted) {
                        // After submission, color answers based on correctness
                        if (answer === correctAnswer) {
                            buttonColor = ButtonColors.SUCCESS; // Green for the correct answer
                        } else if (answer === selectedAnswer && answer !== correctAnswer) {
                            // If selected answer is wrong, mark it red
                            buttonColor = ButtonColors.ERROR;
                        }

                        // Disable all non-selected, non-correct answers after submission
                        if (answer !== correctAnswer && answer !== selectedAnswer) {
                            buttonDisabled = true;
                        }
                    } else if (selectedAnswer === answer) {
                        buttonColor = ButtonColors.SUCCESS; // Highlight selected answer before submission
                    }

                    return (
                        <AnswerButton
                            key={index}
                            buttonText={answer}
                            buttonColor={buttonColor}
                            buttonDisabled={buttonDisabled} // Disable non-selected and non-correct answers
                            onAnswerClick={() => !isSubmitted && onAnswerClick(answer)} // Only clickable before submission
                        />
                    );
                })}
            </div>
        </div>
    );
}
