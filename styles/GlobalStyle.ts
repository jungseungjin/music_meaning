import reset from "styled-reset";
import { createGlobalStyle, css } from "styled-components";
import palette from "./palette";

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: Noto Sans, Noto Sans KR;
    color: ${palette.black};
    line-height: 1.2;
    max-width:720px;
    margin:0 auto;
  }
  a {
    text-decoration: none;
    color: ${palette.black};
  }
  input {
    outline: none;
  }
  input::-ms-clear,
  input::-ms-reveal{
    display:none;width:0;height:0;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration{
    display:none;
  }

`;

const GlobalStyle = createGlobalStyle`
    ${globalStyle};
`;

export default GlobalStyle;
