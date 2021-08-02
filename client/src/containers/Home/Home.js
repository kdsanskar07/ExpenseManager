import React from 'react';
import styles from './Home.module.css';
import { Route } from 'react-router-dom';
import Dashboard from '../../components/Dashboard/Dashboard';
import Report from '../../components/Report/Report';
import AddTransaction from '../../components/AddTransaction/AddTransaction';
import MyTransaction from '../../components/MyTransaction/MyTransaction';
import SignIn from '../../components/Auth/SignIn';
import SignUp from '../../components/Auth/SignUp';


function Home() {
    return (
        <div className={styles.Home} >
            <Route exact path="/report">
                <Report />
            </Route>
            <Route exact path="/mytransactions">
                <MyTransaction />
            </Route>
            <Route exact path="/addtransaction">
                <AddTransaction />
            </Route>
            <Route exact path="/signin">
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>
            <Route exact path="/">
                <Dashboard />
            </Route>
        </div>
    )
}

export default Home;

