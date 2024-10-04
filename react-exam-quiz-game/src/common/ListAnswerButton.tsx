import { useEffect, useState } from "react";
import { ButtonColors } from "../model/enum/buttonColors.enum";
import { QuizQuestionWithId } from "../model/interface/response.model";
import AnswerButton from "./AnswerButton";

export default function ListAnswerButton({
    quiz,
}: {
    quiz: QuizQuestionWithId;
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    // Shuffle answers when component mounts
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    useEffect(() => {
        if (quiz) {
            const allAnswers = [
                quiz.correct_answer,
                ...quiz.incorrect_answers,
            ].sort(() => Math.random() - 0.5);
            setShuffledAnswers(allAnswers);
        }
    }, [quiz]);

    const handleAnswerClick = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div style={{ marginBottom: "20px" }}>
            <div className="flex justify-center items-center gap-4 p-4">
                {shuffledAnswers.map((answer, index) => (
                    <AnswerButton
                        key={index}
                        buttonText={answer}
                        buttonColor={
                            selectedOption === answer
                                ? ButtonColors.SUCCESS
                                : null
                        }
                        buttonDisabled={false}
                        onAnswerClick={() => handleAnswerClick(answer)}
                    />
                ))}
            </div>
        </div>
    );
}
