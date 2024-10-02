import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./City.css";
import useUnsplashPhotos from "@/hooks/useUnspashPhoto";
import { RootState } from "@/store";
import useLocationSearch from "@/hooks/useLocationSearch";

function City() {
    const locData = useSelector((state: RootState) => state.weather.data);
    const [query, setQuery] = useState("city");
    const { photos } = useUnsplashPhotos(query);
    const { isLoading } = useLocationSearch();

    const isCelsius = useSelector(
        (state: RootState) => state.temperature.isCelsius
    );
    useEffect(() => {
        if (locData && locData.location) {
            setQuery(locData.location);
        }
    }, [locData]);
    return (
        <>
            {isLoading && <div style={{ height: "110px" }}></div>}
            <img
                src={locData && locData.current.condition.icon}
                alt="Weather Icon"
                className="weather-icon"
            />
            <div className="temperature">
                {isCelsius ? locData?.temperatureC : locData?.temperatureF}
            </div>
            <div className="date">
                {new Date().toLocaleDateString("en-US", { weekday: "long" })},{" "}
                {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}
            </div>
            <div className="horizontal-line"></div>
            <div className="rain-chance">
                <img
                    alt="Cloud"
                    src={locData && locData.current.condition.icon}
                    className="cloud-icon"
                />
                {locData && locData.current.condition.text}
            </div>
            {isLoading && <div style={{ height: "45px" }}></div>}
            {!isLoading && (
                <div className="location-container">
                    {photos && photos.length > 0 && (
                        <img
                            src={photos[0].urls.regular}
                            alt="Location Image"
                            className="location-image"
                        />
                    )}
                    <div className="location-text">
                        {locData && locData.location}
                    </div>
                </div>
            )}
        </>
    );
}

export default City;
