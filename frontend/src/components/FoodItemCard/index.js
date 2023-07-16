import React from "react";
import { CardContainer, CardDescription, CardTitle, Image } from "./index.styled";

const FoodItemCard = ({ title, description, imageUrl }) => {
    return (
        <CardContainer>
            <Image src={imageUrl} alt={title} />
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardContainer>
    );
};

export default FoodItemCard;
