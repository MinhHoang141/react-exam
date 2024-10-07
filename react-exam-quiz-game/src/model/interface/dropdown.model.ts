export interface QuizType {
    label: string;
    listOptions: { id: string; name: string }[];
    selectedValue: string;
    onValueChange: (value: string) => void;
}

export interface QuizCategory {
    id: number;
    name: string;
}
