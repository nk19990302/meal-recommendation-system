import { styled } from "styled-components";
import HomePage from "./containers/HomePage";
import GlobalStyle from "./styles/globalStyles";
import Products from "./containers/Products";

function App() {
    return (
        <AppWrapper>
            {/* <GlobalStyle /> */}
            {/* <Products /> */}
            <HomePage />
        </AppWrapper>
    );
}

export default App;

const AppWrapper = styled.div`
    width: 100%;
    height: 100%;
`;
