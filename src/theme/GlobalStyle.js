import { createGlobalStyle } from "styled-components";
import bg from "assets/img/bg.png";
import segoeui from "assets/fonts/segoeui.ttf";
import dubai from "assets/fonts/dubai.ttf";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "SegoeUI";
  src: url(${segoeui}), url(${dubai});
}

*,*::before,*::after {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}

html {
  position: relative;
  min-height: 100%;
  font: 10px 'Dubai';
}

body {
  min-height: 100%;
  background: url(${bg}) no-repeat fixed;
  background-size: cover;
}

@media (min-width: 320px) {
  html {
    font: 11px 'Dubai';
  }
}

@media screen and (min-height: 812px) and (max-width: 812px) and (orientation: landscape) {
  html {
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vh;
    height: 100vh;
    overflow-x: hidden;
  }

}

`;

export default GlobalStyle;
