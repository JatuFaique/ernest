import React from "react";
import styles from "./index.module.css";
import RightPanel from "../RightPanel/RightPanel";
import LeftPanel from "../LeftPanel/LeftPanel";

function Dashboard() {
    return (
        <div className={styles.dashboard}>
            <LeftPanel />
            <RightPanel />
        </div>
    );
}

export default Dashboard;
