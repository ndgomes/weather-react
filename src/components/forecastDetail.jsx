export const ForecastDetail = ({ list }) => {
  const convertUnixTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleString("nl-NL", options);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {list.slice(0, 5).map((el, id) => (
        <div
          key={id}
          style={{
            padding: "0px 20px",
          }}
        >
          <img
            src={`https://openweathermap.org/img/wn/${el.weather[0].icon}.png`}
            height={"70px"}
            width={"70px"}
          />
          <p>{convertUnixTimestamp(el.dt)}h</p>
          <p>
            <span color="orange">Temperature:</span> {Math.round(el.main.temp)}{" "}
            Cº
          </p>
          <p>
            <span color="orange">Feels like:</span>{" "}
            {Math.round(el.main.feels_like)} Cº
          </p>
          <p>
            <span color="orange">Humidity:</span> {el.main.humidity} %
          </p>
          <p>
            <span color="orange">Wind:</span> {el.wind.speed} KM/h
          </p>
          <p>
            <span color="orange">Condition:</span> {el.weather[0].description}
          </p>
        </div>
      ))}
    </div>
  );
};
