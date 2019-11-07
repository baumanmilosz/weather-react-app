import styled from "styled-components";

const Input = styled.input`
  position: relative;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.6);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  &::placeholder {
    font: 1.3rem "Dubai";
    color: #fff;
    opacity: 0.6;
  }
  @media (orientation: portrait) and (min-width: 360px) {
  }

  @media (orientation: landscape) and (min-width: 640px) {
  }
`;

export default Input;
