import styled from "styled-components";

export const HomePageWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .header {
        width: 100%;
        padding: 24px;
        text-align: center;
    }

    .set-preferences {
        width: 64%;
    }

    .hide-show {
        padding: 8px;
        border-radius: 24px;
        background-color: gray;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 12px 0px;
    }

    .category {
        font-size: 18px;
        margin: 8px 0px;
    }

    .selected-pref {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .recommended-items {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 8px;
        columns: 3;
        flex-wrap: wrap;
    }

    .hr {
        margin: 12px 0px;
    }
`;
