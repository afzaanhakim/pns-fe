import React, { useEffect } from "react";
import Home from "./components/Home";
import styled from "styled-components";

const AppContainer = styled.div`
  height: 100%;
  background: linear-gradient(90deg, rgba(95,84,162,1) 20%, rgba(75,81,183,1) 45%, rgba(72,80,179,1) 70%, rgba(95,84,162,1) 100%);
  text-align: center;
  color: white;
`


const App = () => {
  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
};

export default App;
