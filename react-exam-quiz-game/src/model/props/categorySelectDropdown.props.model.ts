export interface CategorySelectDropdownProps {
    /** The text to display inside the button */
    selectedCategory: string;
    /** onClick handler for when the button is clicked */
    onCategoryChange?: (category: string) => void;
}
