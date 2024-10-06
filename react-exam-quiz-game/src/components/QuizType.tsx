import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // For generating unique IDs
import { QuizQuestionWithId } from "../model/interface/response.model"; // Import the correct type
import { QuizTypeProps } from "../model/props/quizType.propss.model";
import quizService from "../service/quiz.service";
import CategoriesSelectDropdown from "./CategoriesSelectDropdown";
import DifficultySelectDropdown from "./DifficultySelectDropdown";

export default function QuizType({ setQuizList, resetTrigger }: QuizTypeProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
    const [isQuizFetched, setIsQuizFetched] = useState<boolean>(false); // New state to track whether the quiz is fetched
    const [isLoading, setIsLoading] = useState<boolean>(false); // New state to track whether the quiz is fetched

    // Reset category and difficulty when resetTrigger changes
    useEffect(() => {
        setSelectedCategory("");
        setSelectedDifficulty("");
        setIsQuizFetched(false); // Reset the state when the reset trigger changes
        setIsLoading(false);
        setQuizList([]); // Clear quiz list
    }, [resetTrigger]);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
    };

    const shuffleArray = (array: any[]) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleCallingGetQuiz = async () => {
        if (selectedCategory && selectedDifficulty) {
            try {
                setIsLoading(true);

                // Fetch the quiz questions from the service
                const response = await quizService.getQuizQuestions(
                    selectedCategory,
                    selectedDifficulty
                );

                const shuffledQuestions = shuffleArray(response);

                // Add a unique ID to each quiz question
                const quizWithIds: QuizQuestionWithId[] = shuffledQuestions.map(
                    (quiz) => ({
                        ...quiz,
                        id: uuidv4(), // Assign a unique id to each question
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
