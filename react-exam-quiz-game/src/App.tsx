import { useState } from "react";
import "./App.css";
import QuizList from "./components/QuizList";
import QuizType from "./components/QuizType";
import { QuizQuestion } from "./model/interface/response.model";

function App() {
    const [quizList, setQuizList] = useState<QuizQuestion[]>([]);

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <QuizType setQuizList={setQuizList} />
            {/* Pass the quizList to QuizList component */}
            <QuizList quizList={quizList} />
        </div>
    );
}

export default App;
