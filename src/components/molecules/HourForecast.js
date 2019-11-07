import React from "react";
import styled from "styled-components";
import Paragraph from "components/atoms/Paragraph/Paragraph";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 1.4rem;
`;
const Icon = styled.img`
  width: 30px;
  height: 30px;
`;

const HourForecast = ({ dailyTemp, dailyTime, dailyIcon }) => {
  return (
    <StyledWrapper>
      <Paragraph>{dailyTime}</Paragraph>
      <Icon
        src={`http://openweathermap.org/img/w/${
          dailyIcon ? dailyIcon : "01d"
        }.png`}
        alt="Weather icon"
      />
      <Paragraph>{`${Math.round(dailyTemp)}°C`}</Paragraph>
    </StyledWrapper>
  );
};

export default HourForecast;
