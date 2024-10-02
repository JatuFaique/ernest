import React from "react";
import "./index.css";
import useLocationSearch from "@/hooks/useLocationSearch";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

function Weekforecast() {
    const { isLoading } = useLocationSearch();
    const isCelsius = useSelector(
        (state: RootState) => state.temperature.isCelsius
    );
    const locData = useSelector((state: RootState) => state.weather.data);

    return (
        <div className="week-forecast">
            {isLoading && <div style={{ height: "110px" }}></div>}
            {!isLoading &&
                locData?.forecast.map((day, index) => (
                    <div key={index} className="day">
                        <div className="day-name">{day.date.slice(0, 3)}</div>

                        <img
                            src={day.imgUrl}
                            alt={day.condition}
                            className="day-icon custom-icon"
                        />
                        <div className="day-temp">
                            {isCelsius ? day.temperatureC : day.temperatureF}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default Weekforecast;
