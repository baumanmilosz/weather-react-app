import React from "react";
import styled from "styled-components";
import Paragraph from "components/atoms/Paragraph/Paragraph";
import Icon from "components/atoms/Icon/Icon";

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0rem 1rem;
  margin-bottom: 1rem;
`;

const LatitiudeWrapper = styled.div`
  flex-basis: 50%;
`;

const LongitiudeWrapper = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FooterForecast = ({ coords }) => {
  return (
    <StyledWrapper>
      <LatitiudeWrapper>
        <Paragraph latitiude>latitiude</Paragraph>
        <Paragraph>{coords[0].value ? coords[0].value : "-"}</Paragraph>
      </LatitiudeWrapper>
      <Icon sun />
      <LongitiudeWrapper>
        <Paragraph longitiude>longitiude</Paragraph>
        <Paragraph>{coords[1].value ? coords[1].value : "-"}</Paragraph>
      </LongitiudeWrapper>
    </StyledWrapper>
  );
};
export default FooterForecast;
