import { useEffect, useState } from "react";
import { QuizQuestion } from "../model/interface/response.model";
import { AnswerButtonProps } from "../model/props/answerButton.props.model";

export default function ListAnswerButton({
    quizList,
}: {
    quizList: QuizQuestion[];
}) {
    const [selectedOption, setSelectedOption] =
        useState<AnswerButtonProps | null>(null);

    useEffect(() => {
        console.log(quizList);
    }, []);

    const handleAnswerClick = (option: AnswerButtonProps) => {
        setSelectedOption(option);
    };

    return (
        <div className="flex justify-center items-center gap-4 p-4">
            {/* {quizList.map((quiz, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <AnswerButton
                        buttonText={quiz.}
                        buttonColor={
                            selectedOption?.buttonText === quiz.buttonText
                                ? ButtonColors.SUCCESS
                                : undefined
                        }
                        buttonDisabled={false} // Disable buttons after selection
                        onAnswerClick={() => handleAnswerClick(answer)}
                    />
                </div>
            ))} */}
        </div>
    );
}
