import styled from "styled-components";

export const ProductsWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .heading {
        margin: 24px;
    }

    .hr {
        background-color: gray;
        height: 1px;
        border: 1px solid black;
        margin: 16px 0px;
        width: 100%;
    }

    .keywords {
        width: 70%;
        text-align: center;
    }

    .content {
        width: 70%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        justify-content: center;
        align-items: center;
    }

    .food-card {
        padding: 16px;
        width: 240px;
        height: 200px;
        border: 1px solid grey;

        .btns {
            margin-top: 8px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .btn {
            padding: 2px 4px;
        }
    }
`;
