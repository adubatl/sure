import { createGlobalStyle } from "styled-components";

import { Main } from "./Main";

const GlobalStyle = createGlobalStyle`
html, body {
  margin: 0px;
  padding: 0px;
  height: 100vh;
  width: 100vw;
  & * {
    font-family: 'Roboto'
  }
}

`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
}

export default App;
