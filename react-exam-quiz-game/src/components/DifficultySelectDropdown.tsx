import SelectDropdown from "../common/SelectDropdown";
import { QuizCategory } from "../model/interface/response.model";
import { DifficultySelectDropdownProps } from "../model/props/difficultySelectDropdown.props.model";

export default function DifficultySelectDropdown({
    selectedDifficulty,
    onDifficultyChange,
}: DifficultySelectDropdownProps): JSX.Element {
    const difficultyOptions: QuizCategory[] = [
        { id: 'easy', name: "Easy" },
        { id: 'medium', name: "Medium" },
        { id: 'hard', name: "Hard" },
    ];

    const label = "Difficulty";

    return (
        <div id="difficultySelect">
            <SelectDropdown
                label={label}
                listOptions={difficultyOptions}
                selectedValue={selectedDifficulty}
                onValueChange={onDifficultyChange}
            />
        </div>
    );
}
