import React from "react";
import { Chip, ChipContainer } from "./index.styled";

const MultiselectChip = ({ options, selectedOptions, onChange }) => {
    const handleChipClick = (option) => {
        const isSelected = selectedOptions.includes(option);
        if (isSelected) {
            onChange(selectedOptions.filter((item) => item !== option));
        } else {
            onChange([...selectedOptions, option]);
        }
    };

    return (
        <ChipContainer>
            {options.map((option) => (
                <Chip
                    key={option}
                    onClick={() => handleChipClick(option)}
                    style={{
                        backgroundColor: selectedOptions.includes(option)
                            ? "#333"
                            : "#e0e0e0",
                        color: selectedOptions.includes(option)
                            ? "#fff"
                            : "#333",
                    }}
                >
                    {option}
                </Chip>
            ))}
        </ChipContainer>
    );
};

export default MultiselectChip;
