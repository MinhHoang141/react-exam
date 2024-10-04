import { Button } from "@mui/material";
import { useState } from "react";
import { QuizTypeProps } from "../model/props/quizType.propss.model";
import quizService from "../service/quiz.service";
import CategoriesSelectDropdown from "./CategoriesSelectDropdown";
import DifficultySelectDropdown from "./DifficultySelectDropdown";

export default function QuizType({ setQuizList }: QuizTypeProps) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
    };

    const handleCallingGetQuiz = async () => {
        if (selectedCategory && selectedDifficulty) {
            try {
                const response = await quizService.getQuizQuestions(
                    selectedCategory,
                    selectedDifficulty
                );

                setQuizList(response);
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            }
        } else {
            console.error(
                "Please select category and difficulty to get the quiz"
            );
        }
        // Call the API to get the quiz
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
                disabled={!selectedCategory || !selectedDifficulty}
                onClick={handleCallingGetQuiz}
            >
                Submit
            </Button>
        </div>
    );
}
