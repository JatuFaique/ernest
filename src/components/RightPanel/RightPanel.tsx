import React from "react";
import styles from "./index.module.css";
import Header from "../Header/Header";
import Weekforecast from "../Weekforecast/Weekforecast";
import Highlights from "../Highlights/Highlights";

function RightPanel() {
    return (
        <div className={styles.right_panel}>
            <Header />
            <Weekforecast />
            <Highlights />
        </div>
    );
}

export default RightPanel;
