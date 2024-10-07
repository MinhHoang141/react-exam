import { ButtonColors } from "../model/enum/buttonColors.enum";
import { ListAnswersButtonProps } from "../model/props/listAnswerButton.props.model";
import AnswerButton from "./AnswerButton";

export default function ListAnswerButton({
    quiz,
    isSubmitted,
    selectedAnswer,
    correctAnswer,
    shuffledAnswers,
    onAnswerClick,
}: ListAnswersButtonProps): JSX.Element {
    return (
        <div
            className="flex flex-col justify-center items-center"
            style={{ marginBottom: "20px" }}
        >
            <div dangerouslySetInnerHTML={{ __html: quiz.question }}></div>
            <div className="flex justify-center items-center gap-4 p-4">
                {shuffledAnswers?.map((answer, index) => {
                    let buttonColor: ButtonColors | undefined = undefined;
                    let buttonDisabled = false;

                    if (isSubmitted) {
                        if (answer === correctAnswer) {
                            buttonColor = ButtonColors.SUCCESS;
                        } else if (
                            answer === selectedAnswer &&
                            answer !== correctAnswer
                        ) {
                            buttonColor = ButtonColors.ERROR;
                        }
                        if (
                            answer !== correctAnswer &&
                            answer !== selectedAnswer
                        ) {
                            buttonDisabled = true;
                        }
                    } else if (selectedAnswer === answer) {
                        buttonColor = ButtonColors.SUCCESS;
                    }

                    return (
                        <AnswerButton
                            key={index}
                            buttonText={answer}
                            buttonColor={buttonColor}
                            buttonDisabled={buttonDisabled}
                            onAnswerClick={() =>
                                !isSubmitted && onAnswerClick(answer)
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
