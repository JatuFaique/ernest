import React from "react";
import GaugeCard from "./GaugeCard";
import "./Highlights.css";

import { RootState } from "@/store"; // Import the RootState type from the store
import {
    getVisibilityLabel,
    getAirQualityLabel,
    getHumidityLabel,
} from "@/utils/index";
import { useSelector } from "react-redux";

function Highlights() {
    const locData = useSelector((state: RootState) => state.weather.data);
    console.log(locData);
    return (
        <>
            <h3>Todays Highlights</h3>
            <div className="highlights">
                <GaugeCard value={locData && locData.current.uv} />

                <div className="highlight-card">
                    <h4>Wind Status</h4>
                    <div className="highlight-value">
                        {(locData && locData.current.wind_kph) || "--"} km/h
                    </div>
                    <p>{(locData && locData.current.wind_dir) ?? "--"}</p>
                </div>
                <div className="highlight-card">
                    <h4>Sunrise & Sunset</h4>
                    <p className="time sunrise">
                        {"\u00A0"}
                        {locData && locData?.todayAstro?.sunrise}
                    </p>
                    <p className="time sunset">
                        {"\u00A0"}
                        {locData && locData?.todayAstro?.sunset}
                    </p>
                </div>
                <div className="highlight-card">
                    <h4>Humidity</h4>
                    <div className="highlight-value">
                        {(locData && locData.current.humidity) ?? "--"}%
                    </div>
                    <p>
                        {locData && getHumidityLabel(locData.current.humidity)}
                    </p>
                </div>

                <div className="highlight-card">
                    <h4>Visibility</h4>
                    <div className="highlight-value">
                        {(locData && locData.current.vis_km) ?? "--"} km
                    </div>
                    <p>
                        {locData && getVisibilityLabel(locData.current.vis_km)}
                    </p>
                </div>

                <div className="highlight-card">
                    <h4>Air Quality</h4>
                    <div className="highlight-value">
                        {locData &&
                            locData.current.air_quality["gb-defra-index"]}
                    </div>
                    <p>
                        {locData &&
                            getAirQualityLabel(
                                locData.current.air_quality["gb-defra-index"]
                            )}
                    </p>
                </div>
            </div>
        </>
    );
}

export default Highlights;
