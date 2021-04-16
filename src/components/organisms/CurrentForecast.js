import React, { Component } from "react";
import styled from "styled-components";
import Heading from "components/atoms/Heading/Heading";
import Paragraph from "components/atoms/Paragraph/Paragraph";
import { getFavoriteForecastsList } from "../../helpers/getFavoriteForecastList";
import { db } from "../../index";
import {v4 as uuidv4} from "uuid";

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

const AddForecastButton = styled.button`
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

const WEATHER_APP_USER_ID = "WEATHER_APP_USER_ID";
const USERS_COLLECTION = "users";
const USER_ID = window.localStorage.getItem(WEATHER_APP_USER_ID);

class CurrentForecast extends Component {
  state = {
    status: null,
    city: "",
    temp: null,
    info: "",
    dailyForecast: [
      { id: 0, time: null, temp: null, icon: null },
      { id: 1, time: null, temp: null, icon: null },
      { id: 2, time: null, temp: null, icon: null },
      { id: 3, time: null, temp: null, icon: null },
      { id: 4, time: null, temp: null, icon: null },
      { id: 5, time: null, temp: null, icon: null },
    ],
    coords: [
      {
        name: "lat",
        value: null,
      },
      {
        name: "lon",
        value: null,
      },
    ],
    isDailyForecast: true,
  };

  addFavoriteForecast = async () => {
      const forecastList = await getFavoriteForecastsList(window.localStorage.getItem(WEATHER_APP_USER_ID));
      const isCityExists =
        forecastList &&
        forecastList.find((item) => {
          if (item && item.cityName) {
            return item.cityName === this.props.city;
          }
        });
      const filteredForecastList =
        forecastList &&
        forecastList.filter((item) => {
          if (item && item.cityName) {
            return item.cityName !== this.props.city;
          }
        });

      const forecast = db.collection(USERS_COLLECTION).doc(window.localStorage.getItem(WEATHER_APP_USER_ID));

      const renderPayload = () => {
        if (!forecastList) {
          return {favorites: []};
        } else if (isCityExists && isCityExists.cityName) {
          return {favorites: filteredForecastList};
        } else {
          return {favorites: [...forecastList, {cityName: this.props.city}]};
        }
      };

      return forecast
        .update(renderPayload())
        .then(async () => {
          console.log("Document successfully updated!");
          const res = await getFavoriteForecastsList();
          this.props.callback(res);
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
  };

  render() {
    const { status, temp, city, day, info, icon, forecastsList } = this.props;
    return (
      <StyledWrapper>
        <Paragraph temperature>{temp ? temp : "-"}°C</Paragraph>
        <Paragraph day>{day}</Paragraph>
        <Heading>{city ? city : "-"}</Heading>
        <InnerWrapper>
          <Icon
            src={`http://openweathermap.org/img/w/${icon ? icon : "01d"}.png`}
            alt=""
          />
          <Heading description>{info}</Heading>
        </InnerWrapper>
        {status === 404 && <h2>Not found city!</h2>}
        {status === 200 && (
          <AddForecastButton type="button" onClick={this.addFavoriteForecast}>
            {forecastsList && forecastsList.find(item => item.cityName === city) ? 'Remove': 'Add'}
          </AddForecastButton>
        )}
      </StyledWrapper>
    );
  }
}

export default CurrentForecast;
