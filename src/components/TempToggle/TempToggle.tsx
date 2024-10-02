import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTemperatureUnit } from "@/store/temperatureSlice";
import "./TempToggle.css";
import { RootState } from "@/store";

const TempToggle = () => {
    const isCelsius = useSelector(
        (state: RootState) => state.temperature.isCelsius
    );
    const dispatch = useDispatch();

    const handleCelsiusClick = () => {
        if (!isCelsius) {
            dispatch(toggleTemperatureUnit());
        }
    };

    const handleFahrenheitClick = () => {
        if (isCelsius) {
            dispatch(toggleTemperatureUnit());
        }
    };

    return (
        <div className="unit-toggle ">
            <button
                onClick={handleCelsiusClick}
                className={`${isCelsius ? "active" : ""} unit-circle`}
            >
                °C
            </button>
            <button
                onClick={handleFahrenheitClick}
                className={`${!isCelsius ? "active" : ""} unit-circle`}
            >
                °F
            </button>
        </div>
    );
};

export default TempToggle;
