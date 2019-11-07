import React from "react";
import styled from "styled-components";
import Heading from "components/atoms/Heading/Heading";
import Paragraph from "components/atoms/Paragraph/Paragraph";

const StyledWrapper = styled.header`
  font-family: "SegoeUI";
  text-align: center;
  color: #fff;
  @media (min-width: 640px) {
    margin-top: 20px;
  }

  @media (min-width: 1024px) {
    margin-top: 60px;
  }
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const Icon = styled.img`
  width: 150px;
  height: 150px;
  margin-right: 10px;
  @media (min-width: 360px) {
    margin-right: 0;
  }
`;

const CurrentForecast = ({ status, temp, city, day, info, icon }) => {
  return (
    <StyledWrapper>
      <Paragraph temperature>{temp ? temp : "-"}°C</Paragraph>
      <Paragraph day>{day}</Paragraph>
      <Heading>{city ? city : "-"}, PL</Heading>
      <InnerWrapper>
        <Icon
          src={`http://openweathermap.org/img/w/${icon ? icon : "01d"}.png`}
          alt=""
        />
        <Heading description>{info}</Heading>
      </InnerWrapper>
      {status === 404 && <h2>Not found city!</h2>}
    </StyledWrapper>
  );
};

export default CurrentForecast;
