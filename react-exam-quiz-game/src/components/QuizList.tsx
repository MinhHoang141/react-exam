import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListAnswerButton from "../common/ListAnswerButton";
import { QuizQuestion, QuizQuestionWithId } from "../model/interface/response.model";

export default function QuizList({
    quizList,
}: {
    quizList: QuizQuestionWithId[];
}): JSX.Element {
    const [selectedAnswers, setSelectedAnswers] = useState<{
        [key: string]: string;
    }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [shuffledAnswers, setShuffledAnswers] = useState<{
        [key: string]: string[];
    }>({});

    const navigate = useNavigate();

    const shuffleAnswers = (quiz: QuizQuestion): string[] => {
        const allAnswers = [quiz.correct_answer, ...quiz.incorrect_answers];
        return allAnswers?.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        const shuffled = quizList?.reduce((acc, quiz) => {
            acc[quiz.id] = shuffleAnswers(quiz);
            return acc;
        }, {} as { [key: string]: string[] });
        setShuffledAnswers(shuffled);
    }, [quizList]);

    const handleAnswerClick = (quizId: string, answer: string): void => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [quizId]: answer,
        }));
    };

    const allAnswersSelected =
        quizList?.length === Object.keys(selectedAnswers).length;

    function decodeHtmlEntities(text: string): string {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }

    const submitAnswer = (): void => {
        setIsSubmitted(true);

        let count = 0;
        quizList?.forEach((quiz) => {
            const selected = decodeHtmlEntities(selectedAnswers[quiz.id] || "");
            const correct = decodeHtmlEntities(quiz.correct_answer);

            if (selected === correct) {
                count += 1;
            }
        });

        navigate("/results", {
            state: {
                selectedAnswers,
                correctCount: count,
                quizList,
                shuffledAnswers,
            },
        });
    };

    return (
        <div>
            {quizList?.length === 0 ? (
                <p>No quiz questions available</p>
            ) : (
                <div className="flex flex-col justify-center items-center">
                    {quizList?.map((quiz) => (
                        <div key={quiz.id} style={{ marginBottom: "10px" }}>
                            <ListAnswerButton
                                quiz={quiz}
                                isSubmitted={isSubmitted}
                                selectedAnswer={
                                    selectedAnswers[quiz.id] || null
                                }
                                correctAnswer={quiz.correct_answer}
                                shuffledAnswers={shuffledAnswers[quiz.id] as string[]}
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
                </div>
            )}
        </div>
    );
}
