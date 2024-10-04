import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import ListAnswerButton from "../common/ListAnswerButton";
import { QuizQuestion } from "../model/interface/response.model";
import { AnswerButtonProps } from "../model/props/answerButton.props.model";
import quizService from "../service/quiz.service";

interface QuizListProps {
    /** The text to display inside the button */
    question: string;
    /** Whether the button can be interacted with */
    listAnswer: AnswerButtonProps;
}

export default function QuizList() {
    const [quizList, setQuizList] = useState<QuizQuestion[]>([]);

    useEffect(() => {
        const fetchButtonOptions = async () => {
            const response = await quizService.getQuizQuestions();

            const updatedQuiz = response.map((quiz) => ({
                ...quiz,
                all_answers: [...quiz.incorrect_answers, quiz.correct_answer],
                color: undefined,
                disabled: false,
            }));

            setQuizList(updatedQuiz);
        };

        fetchButtonOptions();
    }, []);

    const submitAnswer = () => {
        // Implement the logic to submit the answer
    };

    return (
        <div>
            {quizList.map((quiz, index) => (
                <div key={index} style={{ marginBottom: "10px" }}>
                    <h3>{quiz.question}</h3>
                    <ListAnswerButton quizList={quizList} />
                </div>
            ))}

            <Button
                variant="contained"
                color="primary"
                onClick={submitAnswer}
            ></Button>
        </div>
    );
}
