// Humidity Label based on the percentage
const getHumidityLabel = (humidity) => {
    if (humidity < 30) return "Low 😓";
    if (humidity >= 30 && humidity <= 60) return "Normal 🙂";
    if (humidity > 60 && humidity <= 80) return "High 😰";
    return "Very High 😨";
};

// Visibility Label based on visibility in km
const getVisibilityLabel = (visibility) => {
    if (visibility > 10) return "Excellent 👀";
    if (visibility > 5 && visibility <= 10) return "Good 😊";
    if (visibility > 1 && visibility <= 5) return "Average 😐";
    return "Poor 😶";
};

// Air Quality Label based on GB Defra Index
const getAirQualityLabel = (aqi) => {
    if (aqi <= 3) return "Good 🌿";
    if (aqi > 3 && aqi <= 6) return "Moderate 😕";
    if (aqi > 6 && aqi <= 9) return "Unhealthy 😷";
    return "Hazardous ☠️";
};

export { getHumidityLabel, getVisibilityLabel, getAirQualityLabel };
