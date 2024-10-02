"use client";

import styles from "./page.module.css";
import { Provider } from "react-redux";
import store from "../store/index";
import Dashboard from "@/components/Dashboard/Dashboard";

export default function Home() {
    return (
        <Provider store={store}>
            <div className={styles.page}>
                <Dashboard />
            </div>
        </Provider>
    );
}
