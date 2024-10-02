import { useState } from "react";
import useSWR from "swr";
import useGeolocation from "./useGeoLocation";

const API_KEY = process.env.NEXT_PUBLIC_API_WEATHER;

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "An error occurred while fetching the data."
    );
  }
  return res.json();
};



// Helper function to calculate Monday to Sunday of the current week
const getWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Adjust offset if today is Sunday
  const monday = new Date(today);
  monday.setDate(today.getDate() + mondayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    start: monday.toISOString().split("T")[0], // Format YYYY-MM-DD
    end: sunday.toISOString().split("T")[0],
  };
};

const useLocationSearch = (initialLocation = "") => {
  const { location: geoLocation, error: geoError } = useGeolocation();
  const [searchLocation, setSearchLocation] = useState(initialLocation);

  const getLocationString = () => {
    if (searchLocation) return searchLocation;
    if (geoLocation) return `${geoLocation.latitude},${geoLocation.longitude}`;
    return null;
  };

  const locationString = getLocationString();
  const { start, end } = getWeekDates();

  // Fetch current weather data
  const { data: currentData, error: currentError } = useSWR(
    locationString
      ? `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${locationString}&aqi=yes`
      : null,
    fetcher
  );

  // Fetch historical weather data (for the first part of the week, if today > Monday)
  const { data: historyData, error: historyError } = useSWR(
    locationString && new Date().getDay() > 1 // Fetch history only if today is later than Monday
      ? `https://api.weatherapi.com/v1/history.json?key=${API_KEY}&q=${locationString}&dt=${start}&end_dt=${end}`
      : null,
    fetcher
  );

  // Fetch weather forecast (from today onwards)
  const { data: forecastData, error: forecastError } = useSWR(
    locationString
      ? `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${locationString}&days=7`
      : null,
    fetcher
  );

  const isLoading =
    !currentData &&
    !currentError &&
    !historyData &&
    !historyError &&
    !forecastData &&
    !forecastError;
  const error = currentError || historyError || forecastError || geoError;

  // Combine historical and forecast data
  const filteredData =
    currentData && (historyData || forecastData)
      ? filterResponse(currentData, historyData, forecastData)
      : null;

  
      
  return {
    data: filteredData,
    isLoading,
    error,
    setSearchLocation,
  };
};

// Combines current weather, history, and forecast data
const filterResponse = (currentData, historyData, forecastData) => {
  const historyForecast = historyData
    ? historyData.forecast.forecastday.map((day) => ({
        date: new Date(day.date).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        }),
        condition: day.day.condition.text,
        temperatureC: `${day.day.avgtemp_c}°C`,
        temperatureF: `${day.day.avgtemp_f}°F`,
        imgUrl: day.day.condition.icon,
      }))
    : [];

  const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format
  let todayAstro = null;

const futureForecast = forecastData
  ? forecastData.forecast.forecastday.slice(2).map((day) => ({
      date: new Date(day.date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
      condition: day.day.condition.text,
      temperatureC: `${day.day.avgtemp_c}°C`,
      temperatureF: `${day.day.avgtemp_f}°F`,
      imgUrl: day.day.condition.icon,
    }))
  : [];

// Find the astro data for today if it exists
if (forecastData && forecastData.forecast.forecastday[0].date === today) {
  const todayData = forecastData.forecast.forecastday[0];
  console.log("awdaw", forecastData)
  todayAstro = {
    sunrise: todayData.astro.sunrise,
    sunset: todayData.astro.sunset,
  };
}

  const combinedForecast = [...historyForecast, ...futureForecast];

  return {
    location: `${currentData.location.country}, ${currentData.location.name}`,
    temperatureC: `${currentData.current.feelslike_c}°C`,
    temperatureF: `${currentData.current.feelslike_f}°F`,
    condition: currentData.current.condition.text,
    imgUrl: currentData.current.condition.icon,
    current: currentData.current,
    todayAstro:todayAstro,
    forecast: combinedForecast,
  };
};

export default useLocationSearch;
