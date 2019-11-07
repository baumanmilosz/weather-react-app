import React from "react";
import GlobalStyle from "../theme/GlobalStyle";

const MainTemplate = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default MainTemplate;
