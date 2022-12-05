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
import RestorePwdScreen from "./Screens/Login/RestorePwdScreen";
import RestorePwdEmailSentScreen from "./Screens/Login/RestorePwdEmailSentScreen";
import RegisterScreen from "./Screens/Login/RegisterScreen";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchFoodScreen from "./Screens/SearchFood/SearchFoodScreen";
import Dashboard from "./ExampleProjects/Dashboard/Dashboard";
import {YMaps} from "react-yandex-maps";
import CompilationScreen from "./Screens/Compilation/CompilationScreen";

const rootElement = document.getElementById("root");

render(
    <YMaps>
        <HashRouter>
            <Routes>
                <Route path={"/"} element={<App/>}/>
                <Route path={"/login"} element={<LoginScreen/>}/>
                <Route path={"/restore-pwd"} element={<RestorePwdScreen/>}/>
                <Route path={"/restore-pwd-email-sent"} element={<RestorePwdEmailSentScreen/>}/>
                <Route path={"/register"} element={<RegisterScreen/>}/>
                <Route path={"/xlsx"} element={<XlsxScreen/>}/>
                <Route path={"/search-food"} element={<SearchFoodScreen/>}/>
                <Route path={"/compilations"} element={<CompilationScreen/>}/>
                <Route path={"/example/dashboard"} element={<Dashboard/>}/>
            </Routes>
        </HashRouter>
    </YMaps>,
    rootElement
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
