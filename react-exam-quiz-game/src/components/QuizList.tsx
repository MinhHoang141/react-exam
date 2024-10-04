import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ListAnswerButton from "../common/ListAnswerButton";
import { QuizQuestionWithId } from "../model/interface/response.model";
import { QuizListProps } from "../model/props/quizList.props.model";

export default function QuizList({ quizList }: QuizListProps) {
    const [updatedQuizList, setUpdatedQuizList] = useState<QuizQuestionWithId[]>([]);

    useEffect(() => {
        if (quizList.length === 0) {
            return;
        }

        const updatedQuizListFromResponse: QuizQuestionWithId[] = quizList.map(
            (quiz) => ({
                ...quiz,
                id: uuidv4() as string, // Assign unique id to each question
            })
        );

        setUpdatedQuizList(updatedQuizListFromResponse);
    }, [quizList]);

    const submitAnswer = () => {
        // Implement the logic to submit the answer
    };

    return (
        <div>
            {updatedQuizList.length === 0 ? (
                <p>No quiz questions available</p>
            ) : (
                <div>
                    {updatedQuizList.map((quiz) => (
                        <div key={quiz.id} style={{ marginBottom: "10px" }}>
                            <h3>{quiz.question}</h3>
                            {/* Pass individual quiz object to ListAnswerButton */}
                            <ListAnswerButton quiz={quiz} />
                        </div>
                    ))}

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={submitAnswer}
                    >
                        Submit Answers
                    </Button>
                </div>
            )}
        </div>
    );
}
