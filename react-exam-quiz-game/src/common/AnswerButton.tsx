import { Button } from "@mui/material";
import { AnswerButtonProps } from "../model/props/answerButton.props.model";

export default function AnswerButton({
    buttonText,
    buttonColor,
    buttonDisabled,
    onAnswerClick,
}: AnswerButtonProps) {
    return (
        <Button
            variant="contained"
            color={buttonColor ? buttonColor : "inherit"}
            disabled={buttonDisabled}
            onClick={onAnswerClick}
        >
            {buttonText}
        </Button>
    );
}
