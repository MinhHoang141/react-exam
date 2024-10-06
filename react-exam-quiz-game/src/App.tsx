import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import "./App.css";
import QuizList from "./components/QuizList";
import QuizType from "./components/QuizType";
import { QuizQuestionWithId } from "./model/interface/response.model";

function App() {
    const [quizList, setQuizList] = useState<QuizQuestionWithId[]>([]);
    const [resetTrigger, setResetTrigger] = useState<string>(uuidv4()); // Generate uuid for resetTrigger

    const resetQuiz = () => {
        setResetTrigger(uuidv4()); // Generate new uuid to trigger reset
        setQuizList([]); // Clear the quiz list
    };

    return (
        <div className="flex flex-col items-center gap-6 p-8">
            <QuizType setQuizList={setQuizList} resetTrigger={resetTrigger} />
            <QuizList quizList={quizList} resetQuiz={resetQuiz} />
        </div>
    );
}

export default App;
