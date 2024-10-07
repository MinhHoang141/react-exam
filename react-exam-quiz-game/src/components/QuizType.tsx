import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { QuizQuestion, QuizQuestionWithId } from "../model/interface/response.model";
import { QuizTypeProps } from "../model/props/quizType.props.model";
import quizService from "../service/quiz.service";
import CategoriesSelectDropdown from "./CategoriesSelectDropdown";
import DifficultySelectDropdown from "./DifficultySelectDropdown";

export default function QuizType({ setQuizList }: QuizTypeProps): JSX.Element {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
    const [isQuizFetched, setIsQuizFetched] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect((): void => {
        setSelectedCategory("");
        setSelectedDifficulty("");
        setIsQuizFetched(false);
        setIsLoading(false);
        setQuizList([]);
    }, [setQuizList]);

    const handleCategoryChange = (category: string): void => {
        setSelectedCategory(category);
    };

    const handleDifficultyChange = (difficulty: string): void => {
        setSelectedDifficulty(difficulty);
    };

    const shuffleArray = (array: QuizQuestion[]): QuizQuestion[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i]!, array[j]!] = [array[j]!, array[i]!];
        }
        return array;
    };

    const handleCallingGetQuiz = async (): Promise<void> => {
        if (selectedCategory && selectedDifficulty) {
            try {
                setIsLoading(true);

                const response = await quizService.getQuizQuestions(
                    selectedCategory,
                    selectedDifficulty
                );

                const shuffledQuestions = shuffleArray(response);

                const quizWithIds: QuizQuestionWithId[] = shuffledQuestions.map(
                    (quiz) => ({
                        ...quiz,
                        id: uuidv4(),
                    })
                );

                if (quizWithIds) {
                    setIsLoading(false);
                    setIsQuizFetched(true);
                    setQuizList(quizWithIds);
                }
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        } else {
            console.error(
                "Please select category and difficulty to get the quiz"
            );
        }
    };

    return (
        <div className="flex items-center gap-4">
            <CategoriesSelectDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
            />
            <DifficultySelectDropdown
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
            />
            <Button
                id="createBtn"
                variant="contained"
                color="primary"
                disabled={
                    !selectedCategory ||
                    !selectedDifficulty ||
                    isLoading ||
                    isQuizFetched
                }
                onClick={handleCallingGetQuiz}
            >
                Submit
            </Button>
        </div>
    );
}
