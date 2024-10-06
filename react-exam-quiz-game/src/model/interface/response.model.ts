export interface QuizQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    all_answers: string[];
    color?: string;
    disabled?: boolean;
}

export interface QuizQuestionWithId extends QuizQuestion {
    id: string; // Add the id field
}


export interface QuizCategory {
    id: string;
    name: string;
}

export interface QuizCategoryResponse {
    trivia_categories: QuizCategory[];
}
