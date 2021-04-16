import React, { Component } from "react";
import styled from "styled-components";
import MainTemplate from "templates/MainTemplate";
import FormCity from "components/molecules/FormCity";
import CurrentForecast from "components/organisms/CurrentForecast";
import DailyForecast from "components/organisms/DailyForecast";
import { db } from "../index";
import { v4 as uuidv4 } from "uuid";
import FavoriteForecastItem from "components/atoms/FavoriteForecastItem/FavoriteForecastItem";
import { getFavoriteForecastsList } from "../helpers/getFavoriteForecastList";

const StyledWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 375px;
  max-height: 736px;
  margin: 0 auto;
  background: linear-gradient(-90deg, #f68987, #f7b5b5) no-repeat;
  @media screen and (min-height: 812px) and (max-width: 812px) and (orientation: landscape) {
    height: 100vw;
  }
`;

const FavoriteButton = styled.button`
  position: absolute;
  left: 0;
  bottom: 22%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: left top;
  padding: 10px;
  background-color: #fff;
  border: none;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  width: 100px;
  outline: none;
  cursor: pointer;
`;

const FavoritesHeading = styled.h1`
  margin-top: 30px;
  text-align: center;
  color: #fff;
`;

const FavoriteForecastsList = styled.ul`
  margin-top: 50px;
  max-height: 300px;
  overflow-y: auto;
`;

const WEATHER_APP_USER_ID = "WEATHER_APP_USER_ID";
const USERS_COLLECTION = "users";
const USER_ID = window.localStorage.getItem(WEATHER_APP_USER_ID);

class App extends Component {
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
    forecastsList: [],
  };

  getDay = () => {
    let day = new Date().getDay();
    switch (day) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      default:
        day = "-";
    }
    return day;
  };

  handleInputValue = (e) => {
    let value = e.target.value;
    if (value) value = value[0].toUpperCase() + value.slice(1);
    this.setState({
      city: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    document.querySelector(".input-city").blur();

    const { city } = this.state;
    const unit = "metric";

    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${city},pl&units=${unit}&appid=a29e93e6fc35e5f2aa725e1fa8603d2a`;

    fetch(weatherApi)
      .then((res) => {
        this.setState({
          status: res.status,
        });
        if (res.status !== 404) return res.json();
      })
      .then((data) => {
        const daily = this.state.dailyForecast.map((el, key) => ({
          time: data.list[key].dt_txt.slice(11, 16),
          temp: data.list[key].main.temp,
          icon: data.list[key].weather[0].icon,
        }));
        const coords = this.state.coords.map((el, key) => ({
          value: data.city.coord[Object.keys(data.city.coord)[key]],
        }));
        this.setState({
          temp: Math.round(data.list[0].main.temp),
          info: data.list[0].weather[0].main,
          dailyForecast: daily,
          coords: coords,
        });
      })
      .catch((err) => new Error(err));
  };

  toggleFavoriteList = () => {
    this.setState((prevState) => ({
      isDailyForecast: !prevState.isDailyForecast,
    }));
  };

  addUser = () => {
    db.collection(USERS_COLLECTION)
      .doc(window.localStorage.getItem(WEATHER_APP_USER_ID))
      .set({ favorites: [] })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  componentDidMount() {
    if (!USER_ID) {
      window.localStorage.setItem(WEATHER_APP_USER_ID, uuidv4());
      this.addUser()
    } else {
      db.collection(USERS_COLLECTION)
        .doc(window.localStorage.getItem(WEATHER_APP_USER_ID))
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            this.setState({ forecastsList: await getFavoriteForecastsList() });
          }
        });
    }
  }
  
  handleGetForecastsList = (forecastsList) => {
    return this.setState({ forecastsList });
  };

  handleRemoveFavoriteForecast = async (deletedItem) => {
    const forecastList = await getFavoriteForecastsList();
    const filteredForecastList =
      forecastList &&
      forecastList.filter((item) => {
        if (item && item.cityName) {
          return item.cityName !== deletedItem.cityName;
        }
      });

    const forecast = db.collection(USERS_COLLECTION).doc(window.localStorage.getItem(WEATHER_APP_USER_ID));

    return forecast
      .update({ favorites: filteredForecastList })
      .then(async () => {
        console.log("Document successfully updated!");
        this.setState({ forecastsList: await getFavoriteForecastsList() });
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  };

  render() {
    const {
      status,
      city,
      temp,
      info,
      dailyForecast,
      coords,
      isDailyForecast,
    } = this.state;

    return (
      <MainTemplate>
        <StyledWrapper>
          <FavoriteButton type="button" onClick={this.toggleFavoriteList}>
            {isDailyForecast ? "Favorite" : "Daily"}
          </FavoriteButton>
          {isDailyForecast ? (
            <>
              <FormCity
                city={city}
                change={this.handleInputValue}
                submit={this.handleSubmit}
              />
              <CurrentForecast
                temp={temp}
                city={city}
                info={info}
                day={this.getDay()}
                icon={dailyForecast[0].icon}
                status={status}
                callback={this.handleGetForecastsList}
                forecastsList={this.state.forecastsList}
              />
            </>
          ) : (
            <div>
              <FavoritesHeading>Favorite forecasts</FavoritesHeading>
              <FavoriteForecastsList>
                {this.state.forecastsList.map((item) => (
                  <FavoriteForecastItem
                    key={item}
                    item={item}
                    handleRemoveFavoriteForecast={() =>
                      this.handleRemoveFavoriteForecast(item)
                    }
                  />
                ))}
              </FavoriteForecastsList>
            </div>
          )}

          <DailyForecast daily={dailyForecast} coords={coords} />
        </StyledWrapper>
      </MainTemplate>
    );
  }
}

export default App;
