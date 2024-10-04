export interface DifficultySelectDropdownProps {
    /** The text to display inside the button */
    selectedDifficulty: string;
    /** onClick handler for when the button is clicked */
    onDifficultyChange?: (difficulty: string) => void;
}
