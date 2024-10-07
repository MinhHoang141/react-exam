import { useState } from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import QuizList from "./components/QuizList";
import QuizType from "./components/QuizType";
import ResultsScreen from "./components/ResultScreen";
import { QuizQuestionWithId } from "./model/interface/response.model";

function App(): JSX.Element {
    const [quizList, setQuizList] = useState<QuizQuestionWithId[]>([]);

    return (
        <Router>
            <div className="flex flex-col items-center gap-6 p-8">
                <Routes>
                    <Route path="/" element={<Navigate to="/quiz" />} />

                    <Route
                        path="/quiz"
                        element={
                            <>
                                <QuizType setQuizList={setQuizList} />
                                <QuizList quizList={quizList} />
                            </>
                        }
                    />
                    <Route path="/results" element={<ResultsScreen />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
