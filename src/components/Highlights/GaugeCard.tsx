import React from "react";

function GaugeCard({ value }) {
    let valueR = Number(100 - (value / 15) * 100);
    return (
        <div className="highlight-card">
            <h4 className="index-label">UV Index</h4>
            <div className="gauge-container">
                <svg
                    style={{ transform: "rotate(145deg)" }}
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 48 48"
                    fill="none"
                    className="fds-spinner progress fds-spinner-static"
                >
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke="#E0E0E0"
                        stroke-width="4"
                    ></circle>
                    <circle
                        cx="24"
                        cy="24"
                        r="20"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke="#25AB21"
                        stroke-width="4"
                        stroke-dasharray="125.66370614359172"
                        stroke-0="0"
                        stroke-dashoffset={valueR}
                    ></circle>
                </svg>
                <div className="gauge-value">{value}</div>
            </div>
        </div>
    );
}

export default GaugeCard;
