import styled from "styled-components";

export const OverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
`;

export const ContentContainer = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;

    .heading {
        font-size: 18px;
        margin: 8px 0px;
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Input = styled.input`
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    padding: 10px 16px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

export const ErrorText = styled.p`
    color: red;
    text-align: center;
    margin: 4px 0 12px 0;
`;
