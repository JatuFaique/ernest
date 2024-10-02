import React from "react";
import styles from "./index.module.css";
import SearchBox from "../SearchBox/SearchBox";
import City from "../City/City";

function LeftPanel() {
    return (
        <div className={styles.leftPanel}>
            <SearchBox />
            <City />
        </div>
    );
}

export default LeftPanel;
