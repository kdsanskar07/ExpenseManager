import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar';
import styles from './Dashboard.module.css'
import { useHistory } from 'react-router';
import { getDashboardData } from '../../services'

// data requierd: total balance (income-expense)
//   total Income
//   total expense
//   list of last five transactions  
export default function Dashboard() {

    let history = useHistory();

    const [dashboardData, setdashboardData] = useState({ transactions: [], totalExpense: 0, totalIncome: 0, totalBalance: 0 });

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getDashboardData();
                console.log(data);
                setdashboardData({
                    transactions: data.data.dashboard.transaction,
                    totalBalance: parseInt(data.data.dashboard.userExpense.totalIncome) - parseInt(data.data.dashboard.userExpense.totalExpense),
                    totalExpense: data.data.dashboard.userExpense.totalExpense,
                    totalIncome: data.data.dashboard.userExpense.totalIncome
                });
            } catch (error) {
                console.log(error);
                history.push("/signin");
            }
        }
        getData();
    }, []);
    console.log(typeof dashboardData.totalBalance);
    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.Dashboard}>
                <div className={styles.TotalBalance}>
                    <div>Total Balance</div>
                    <div>&#8377;{dashboardData.totalBalance.toString()}</div>
                </div>
                <div className={styles.IncomeExpense}>
                    <div>
                        <div>Total Income</div>
                        <div>&#8377;{dashboardData.totalIncome.toString()}</div>
                    </div>
                    <div>
                        <div>Total Expense</div>
                        <div>&#8377;{dashboardData.totalExpense.toString()}</div>
                    </div>
                </div>
                <div className={styles.TransactionHistory}>
                    <div className={styles.TransactionHistoryLabel}>
                        Past transactions
                    </div>
                </div>
                <div className={styles.TransactionList}>
                    {
                        dashboardData.transactions.map(item => {
                            return (
                                <div className={styles.TransactionArea} key={item.title}>
                                    <div className={styles.CategoryIcon}>
                                        {window.categoryData[item.tag]}
                                    </div>
                                    <div className={styles.Details}>
                                        <div>{item.title}</div>
                                        <div style={{ color: 'teal', fontSize: 'small' }}>{item.tag}</div>
                                    </div>
                                    <div className={styles.Price} style={item.type === "expense" ? { color: 'red' } : null}>
                                        &nbsp;&#8377;{item.amount}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
