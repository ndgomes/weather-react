export const WeatherDetail = ({ text, value, unit }) => {
  return (
    <p>
      <span style={{ color: "orange" }}>{text}: </span>
      {value} {unit}
    </p>
  );
};
