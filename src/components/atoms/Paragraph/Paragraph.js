import styled, { css } from "styled-components";

const Paragraph = styled.p`
font-size: 1.4rem;
  ${({ temperature }) =>
    temperature &&
    css`
      font-size: 6.5rem;
    `}
    ${({ day }) =>
      day &&
      css`
        font-size: 2.5rem;
      `}
  ${({ latitiude }) =>
    latitiude &&
    css`
      &::after {
        content: "";
        width: 40%;
        height: 1px;
        position: absolute;
        top: 50%;
        transform: translateY(100%);
        background-color: #000;
        left: 0;
        margin-left: 10px;
      }
    `}
  ${({ longitiude }) =>
    longitiude &&
    css`
      &::after {
        content: "";
        width: 40%;
        height: 1px;
        position: absolute;
        top: 50%;
        transform: translateY(100%);
        background-color: #000;
        right: 0;
        margin-right: 10px;
      }
    `}
`;

export default Paragraph;
