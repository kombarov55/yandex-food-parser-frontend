import React from 'react';
import {render} from "react-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {HashRouter, Route, Routes} from "react-router-dom";
import LoginScreen from "./Screens/Login/LoginScreen";
import XlsxScreen from "./Screens/Xlsx/XlsxScreen";

const rootElement = document.getElementById("root");

render(
    <HashRouter>
        <Routes>
            <Route path={"/"} element={<App/>}/>
            <Route path={"/login"} element={<LoginScreen/>}/>
            <Route path={"/xlsx"} element={<XlsxScreen/>}/>
        </Routes>
    </HashRouter>,
    rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
