import { useEffect, useRef, useState } from "react";
import { fetchWeatherData } from "./util/apiService";
import { WeatherDetail, ForecastDetail } from "./components";

export default function App() {
  const inputRef = useRef();

  const [city, setCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [forecastInfo, setForecastInfo] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleOnClickSearch = async () => {
    try {
      const [cityWeatherInfo, cityForecastInfo] = await fetchWeatherData(city);

      let mainTemp = Math.round(cityWeatherInfo.main.temp);
      let feelsLikeTemp = Math.round(cityWeatherInfo.main.feels_like);

      const info = {
        location: cityWeatherInfo.name,
        country: cityWeatherInfo.sys.country,
        temperature: mainTemp,
        feelsLike: feelsLikeTemp,
        humidity: cityWeatherInfo.main.humidity,
        wind: cityWeatherInfo.wind.speed,
        condition: cityWeatherInfo.weather[0].description,
      };

      setWeatherInfo(info);
      setForecastInfo(cityForecastInfo.list);
    } catch (error) {
      console.log(error);
      setError(true);
      setWeatherInfoInfo(null);
      setForecastInfo(null);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          minWidth: "30vw",
          padding: "20px",
          border: "3px solid gray",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <h2>WEATHER INFO</h2>

        <input
          ref={inputRef}
          type="text"
          style={{ height: "30px", margin: "10px 0px" }}
          placeholder="ENTER CITY NAME"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError(false);
          }}
        />
        <button
          style={{
            backgroundColor: "Transparent",
            height: "35px",
            borderRadius: "2px",
            marginLeft: "10px",
            border: "1px solid orange",
            color: "orange",
            fontWeight: "bold",
          }}
          onClick={() => handleOnClickSearch()}
        >
          SEARCH
        </button>

        {error && (
          <h3 color="red">
            We couldn't find your search! <br />
            Try another city
          </h3>
        )}

        {/* Weather Info is displayed when the API has responsed */}
        {weatherInfo && forecastInfo && (
          <>
            <h3 style={{ fontWeight: "bold" }}>
              Right now in{" "}
              <span color="orange" style={{ fontWeight: "bold" }}>
                {weatherInfo.location}
              </span>
              , {weatherInfo.country}
            </h3>
            <WeatherDetail
              text={"Temperature"}
              value={weatherInfo.temperature}
              unit={"Cº"}
            />
            <WeatherDetail
              text={"Feels like"}
              value={weatherInfo.feelsLike}
              unit={"Cº"}
            />
            <WeatherDetail
              text={"Humidity"}
              value={weatherInfo.humidity}
              unit={"%"}
            />
            <WeatherDetail
              text={"Wind"}
              value={weatherInfo.wind}
              unit={"KM/h"}
            />
            <WeatherDetail
              text={"Condition"}
              value={weatherInfo.condition}
              unit={""}
            />

            {/* Separator */}
            <div
              style={{
                backgroundColor: "gray",
                height: "2px",
                width: "100%",
                margin: "20px 0px 10px",
              }}
            />

            {/* Forecast Info is displayed when the API has responsed */}
            <ForecastDetail list={forecastInfo} />
          </>
        )}
      </div>
    </div>
  );
}
