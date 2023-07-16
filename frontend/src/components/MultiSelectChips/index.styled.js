import { styled } from "styled-components";

export const ChipContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const Chip = styled.div`
    display: inline-flex;
    align-items: center;
    background-color: #e0e0e0;
    color: #333;
    padding: 4px 8px;
    margin: 4px;
    border-radius: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #bdbdbd;
    }
`;
