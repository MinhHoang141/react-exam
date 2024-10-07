import { ButtonColorType } from "../type/buttonColor.type";

export interface AnswerButtonProps {
    buttonText: string;
    buttonColor: ButtonColorType | undefined;
    buttonDisabled?: boolean;
    onAnswerClick?: () => void;
}
