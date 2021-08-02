import React, { useState, useEffect } from 'react'
import styles from "./MyTransaction.module.css"
import { BiFilter } from 'react-icons/bi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import Navbar from '../Navbar/Navbar';
import { getMyTransactions } from '../../services';

export default function MyTransaction() {

    const [myTransactionData, setmyTransactionData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await getMyTransactions();
                setmyTransactionData(
                    data.data.transaction
                );
            } catch (error) {
            }
        }
        getData();
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.MyTransaction}>
                <div className={styles.TransactionHistory}>
                    <div className={styles.TransactionHistoryLabel}>
                        Past transactions
                    </div>
                    <div className={styles.Filter}>
                        <Menu direction="left" menuButton={<MenuButton styles={{ backgroundColor: "#282c3c", color: "white", border: "none", fontSize: "28px", }}><BiFilter /></MenuButton>}>
                            <MenuItem style={{ fontSize: 'small' }}>Sort using date</MenuItem>
                            <MenuItem style={{ fontSize: 'small' }}>Sort using category</MenuItem>
                            <MenuItem style={{ fontSize: 'small' }}>Sort in acending order</MenuItem>
                            <MenuItem style={{ fontSize: 'small' }}>Sort in acending order</MenuItem>
                        </Menu>
                    </div>
                </div>
                <div className={styles.TransactionList}>
                    {
                        myTransactionData.map(item => {
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
