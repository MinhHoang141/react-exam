import { ButtonColor } from "../type/buttonColor.type";

export interface AnswerButtonProps {
    /** The text to display inside the button */
    buttonText: string;
    /** Whether the button can be interacted with */
    buttonColor: ButtonColor | null;
    /** Whether the button can be interacted with */
    buttonDisabled?: boolean;
    /** onClick handler for when the button is clicked */
    onAnswerClick?: () => void;
}
