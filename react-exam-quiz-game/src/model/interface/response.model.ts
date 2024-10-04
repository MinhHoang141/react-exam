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

export interface QuizCategory {
    id: number;
    name: string;
}
