import axios from "axios";
import { QuizCategory, QuizQuestion } from "../model/interface/response.model";

class QuizService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = "https://opentdb.com";
    }

    async getQuizQuestions(category: string, difficulty: string): Promise<QuizQuestion[]> {
        try {
            const response = await axios.get(this.apiUrl + `/api.php?amount=5&type=multiple&category=${category}&difficulty=${difficulty}`);
            return response.data.results;
        } catch (error) {
            console.error("Error fetching quiz questions:", error);
            throw error;
        }
    }

    async getQuizCategories(): Promise<QuizCategory[]> {
        try {
            const response = await axios.get(this.apiUrl + '/api_category.php');
            return response.data.trivia_categories;
        } catch (error) {
            console.error("Error fetching quiz categories:", error);
            throw error;
        }
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new QuizService();
