import React, { useState, useEffect } from 'react'
import styles from './Report.module.css'
import "@progress/kendo-theme-material/dist/all.css";
import "hammerjs";
import Chart from "./charts/Chart"
import Navbar from '../Navbar/Navbar';
import { getReports } from '../../services';

export default function Report() {

    const [reportData, setReportData] = useState({ categorically: { food: 0, home: 0, shopping: 0, fuel: 0, others: 0 }, weekly: { week1: 0, week2: 0, week3: 0, week4: 0 } })

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getReports();
                console.log(data);
                setReportData(data.data.report)
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.Report}>
                <div className={styles.GraphLabel}>
                    Monthly analysis
                </div>
                <Chart for="category" type="donut" width={350} margin={0} data={reportData} />
                <div className={styles.GraphLabel}>
                    Weekly analysis
                </div>
                <Chart for="week" type="bar" width={350} margin={35} data={reportData} />
            </div>
        </React.Fragment>
    )
}
