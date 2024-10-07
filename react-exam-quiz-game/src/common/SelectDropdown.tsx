import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { QuizType } from "../model/interface/dropdown.model";

export default function SelectDropdown({
    label,
    listOptions,
    selectedValue,
    onValueChange,
}: QuizType): JSX.Element {
    const handleChange = (event: SelectChangeEvent): void => {
        if (onValueChange) {
            onValueChange(event.target?.value as string);
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel>{label}</InputLabel>
                <Select
                    value={selectedValue}
                    label={label}
                    onChange={handleChange}
                >
                    {listOptions?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
