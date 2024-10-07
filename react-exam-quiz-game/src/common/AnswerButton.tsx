import { Button } from "@mui/material";
import { AnswerButtonProps } from "../model/props/answerButton.props.model";

export default function AnswerButton({
    buttonText,
    buttonColor,
    buttonDisabled,
    onAnswerClick,
}: AnswerButtonProps): JSX.Element {
    return (
        <Button
            variant="contained"
            color={buttonColor || undefined}
            disabled={buttonDisabled}
            onClick={onAnswerClick}
        >
            <span dangerouslySetInnerHTML={{__html: buttonText}}></span>
        </Button>
    );
}
