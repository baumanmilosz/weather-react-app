import React from "react";
import styled from "styled-components";
import Heading from "components/atoms/Heading/Heading";
import HourForecast from "components/molecules/HourForecast";
import FooterForecast from "components/organisms/FooterForecast";
import wave1 from "assets/img/wave1.png";
import wave2 from "assets/img/wave2.png";

const StyledWrapper = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding-top: 50px;
  background-image: url(${wave1}), url(${wave2});
  background-repeat: no-repeat;
  overflow: hidden;
  @media (orientation: portrait) and (min-width: 360px) {
    background-size: 100%;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 60px;
  margin-bottom: 10px;
`;

const DailyForecast = ({ daily, coords }) => {
  return (
    <StyledWrapper>
      <Heading>Daily forecast</Heading>
      <InnerWrapper>
        {daily.map((el, key) => (
          <HourForecast
            key={key}
            dailyTime={daily[key].time}
            dailyTemp={daily[key].temp}
            dailyIcon={daily[key].icon}
          />
        ))}
      </InnerWrapper>
      <FooterForecast coords={coords} />
    </StyledWrapper>
  );
};

export default DailyForecast;
