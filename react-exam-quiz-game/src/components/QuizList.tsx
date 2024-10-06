import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import ListAnswerButton from "../common/ListAnswerButton";
import { QuizQuestionWithId } from "../model/interface/response.model";

export default function QuizList({
    quizList,
    resetQuiz,
}: {
    quizList: QuizQuestionWithId[];
    resetQuiz: () => void;
}) {
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [resultColor, setResultColor] = useState("");

    // Handle answer selection for each quiz
    const handleAnswerClick = (quizId: string, answer: string) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [quizId]: answer,
        }));
    };

    // Check if all answers have been selected
    const allAnswersSelected =
        quizList.length === Object.keys(selectedAnswers).length;

    // Handle submission
    const submitAnswer = () => {
        setIsSubmitted(true);

        let count = 0;
        quizList.forEach((quiz) => {
            if (selectedAnswers[quiz.id] === quiz.correct_answer) {
                count += 1;
            }
        });
        if (count <= 1) {
            setResultColor("red");
        }
        if (count > 1 && count <= 3) {
            setResultColor("yellow");
        }
        if (count > 3) {
            setResultColor("green");
        }

        setCorrectCount(count);
    };

    // Handle resetting the quiz and resetting the dropdown values
    const createNewQuiz = () => {
        setSelectedAnswers({});
        setIsSubmitted(false);
        setCorrectCount(0);
        resetQuiz(); // Call the resetQuiz prop to handle the reset in parent component
    };

    return (
        <div>
            {quizList.length === 0 ? (
                <p>No quiz questions available</p>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    {quizList.map((quiz) => (
                        <div key={quiz.id} style={{ marginBottom: "10px" }}>
                            <ListAnswerButton
                                quiz={quiz}
                                isSubmitted={isSubmitted}
                                selectedAnswer={
                                    selectedAnswers[quiz.id] || null
                                }
                                correctAnswer={quiz.correct_answer}
                                onAnswerClick={(answer) =>
                                    handleAnswerClick(quiz.id, answer)
                                }
                            />
                        </div>
                    ))}

                    {allAnswersSelected && !isSubmitted && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitAnswer}
                        >
                            Submit Answers
                        </Button>
                    )}

                    {isSubmitted && (
                        <div style={{ marginTop: "20px", textAlign: "center" }}>
                            <p style={{ backgroundColor: resultColor }}>
                                You scored {correctCount} out of{" "}
                                {quizList.length}
                            </p>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={createNewQuiz}
                                style={{ marginTop: "10px" }}
                            >
                                Create a new quiz
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
