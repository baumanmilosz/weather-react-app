import styled, { css } from "styled-components";
import magnifierIcon from "assets/img/magnifierIcon.svg";
import sunIcon from "assets/img/sunIcon.svg";

const Icon = styled.div`
  ${({ magnifier }) =>
    magnifier &&
    css`
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
      background-image: url(${magnifierIcon});
      background-position: 50%;
      background-size: 15px;
      background-repeat: no-repeat;
    `};
  ${({ sun }) =>
    sun &&
    css`
      width: 30px;
      height: 30px;
      background-image: url(${sunIcon});
      background-position: 50%;
      background-size: 25px;
      background-repeat: no-repeat;
    `}
`;

export default Icon;
