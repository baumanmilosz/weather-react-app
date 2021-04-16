import React, {Component} from "react";
import styled from "styled-components";


const StyledFavoriteForecastItem = styled.li`
  list-style-type: none;
  margin: 10px;
  padding: 20px 10px; 
  border-radius: 5px;
  border: 2px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
`;

const RemoveForecastButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;


class FavoriteForecastItem extends Component {
  state = {
    temp: '-',
  };

  componentDidMount() {
    const unit = "metric";

    const weatherApi = `http://api.openweathermap.org/data/2.5/forecast?q=${this.props.item.cityName},pl&units=${unit}&appid=a29e93e6fc35e5f2aa725e1fa8603d2a`;

    fetch(weatherApi)
      .then((res) => {
        this.setState({
          status: res.status,
        });
        if (res.status !== 404) return res.json();
      })
      .then((data) => {
        this.setState({
          temp: Math.round(data.list[0].main.temp),
        });
      })
      .catch((err) => new Error(err));


  }

  render() {
    const {item, handleRemoveFavoriteForecast} = this.props;
    return (
      <StyledFavoriteForecastItem>
        <span>{item.cityName} - {this.state.temp}°C</span>
        <RemoveForecastButton onClick={handleRemoveFavoriteForecast}>X</RemoveForecastButton>
      </StyledFavoriteForecastItem>
    )
  }
}



export default FavoriteForecastItem;
