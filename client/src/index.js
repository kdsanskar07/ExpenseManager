import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BiHomeHeart } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiFuelTank, GiShoppingBag } from "react-icons/gi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";

window.categoryData = {
  "home": [<BiHomeHeart />,],
  "fuel": [<GiFuelTank />,],
  "shopping": [<GiShoppingBag />,],
  "food": [<IoFastFoodOutline />,],
  "others": [<MdAirlineSeatReclineExtra />,]
}

window.URL = {
  "link": 'http://localhost:5000/graphql'
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
