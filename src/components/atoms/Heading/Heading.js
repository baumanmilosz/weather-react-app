import styled, { css } from "styled-components";

const Heading = styled.h2`
  padding-left: 10px;
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 10px;

  ${({ city }) =>
    city &&
    css`
      font-size: 2rem;
    `}

  ${({ description }) =>
    description &&
    css`
      font-size: 4rem;
    `}
`;

export default Heading;
