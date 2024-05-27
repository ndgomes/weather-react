const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
const WEATHER_API_KEY = "API_KEY";

export async function fetchWeatherData(inputCity) {
  try {
    let [weatherPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?q=${inputCity}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const weatherResponse = await weatherPromise.json();

    let [forcastPromise] = await Promise.all([
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${weatherResponse.coord.lat}&lon=${weatherResponse.coord.lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ]);

    const forcastResponse = await forcastPromise.json();

    return [weatherResponse, forcastResponse];
  } catch (error) {
    console.log(error);
  }
}
