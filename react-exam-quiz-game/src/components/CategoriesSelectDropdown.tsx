import { useEffect, useState } from "react";
import SelectDropdown from "../common/SelectDropdown";
import { QuizCategory } from "../model/interface/response.model";
import { CategorySelectDropdownProps } from "../model/props/categorySelectDropdown.props.model";
import quizService from "../service/quiz.service";

export default function CategoriesSelectDropdown({
    selectedCategory,
    onCategoryChange,
}: CategorySelectDropdownProps) {
    const [quizCategories, setQuizCategories] = useState<QuizCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await quizService.getQuizCategories();

            setQuizCategories(response);
        };

        fetchCategories();
    }, []);

    const label = "Categories";

    return (
        <div>
            <SelectDropdown
                label={label}
                listOptions={quizCategories}
                selectedValue={selectedCategory}
                onValueChange={onCategoryChange}
            />
        </div>
    );
}
