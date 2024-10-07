import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizQuestionWithId } from "../model/interface/response.model";
import { ResultsState } from "../model/interface/result.model";

export default function ResultsScreen(): JSX.Element {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedAnswers, correctCount, quizList, shuffledAnswers }: ResultsState = location.state || {};

    if (!selectedAnswers || !quizList || !shuffledAnswers) {
        return <p>No results to display. Please complete a quiz first.</p>;
    }

    const createNewQuiz = (): void => {
        navigate("/quiz");
    };

    const getBackgroundColor = (): string => {
        if (correctCount <= 1) {
            return "red";
        } else if (correctCount <= 3) {
            return "yellow";
        } else {
            return "green";
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="mb-4" style={{ fontSize: "36px" }}>Quiz Results</h1>

            <div className="flex flex-col justify-center text-center items-center">
                {quizList?.map((quiz: QuizQuestionWithId) => (
                    <div key={quiz.id} style={{ marginBottom: "10px" }}>
                        <p dangerouslySetInnerHTML={{ __html: quiz.question }}></p>
                        <div className="flex justify-center items-center gap-4 p-4">
                            {shuffledAnswers[quiz.id]?.map((answer: string, index: number) => {
                                let buttonColor = "";

                                if (answer === quiz.correct_answer) {
                                    buttonColor = "green";
                                } else if (selectedAnswers[quiz.id] === answer) {
                                    buttonColor = "red";
                                } else {
                                    buttonColor = "gray";
                                }

                                return (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: buttonColor,
                                            color: "white",
                                            border: `1px solid ${buttonColor}`,
                                            borderRadius: "8px",
                                            padding: "10px",
                                            marginBottom: "5px",
                                            minWidth: "150px",
                                            textAlign: "center",
                                        }}
                                        dangerouslySetInnerHTML={{ __html: answer }}
                                    >
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <p style={{ backgroundColor: getBackgroundColor() }}>
                You scored {correctCount} out of {quizList.length}
            </p>

            <Button
                id="createBtn"
                variant="contained"
                color="secondary"
                onClick={createNewQuiz}
                style={{ marginTop: "20px" }}
            >
                Create a New Quiz
            </Button>
        </div>
    );
}
