import './App.css';
import {useEffect} from "react";
import Cookies from "js-cookie"
import CookieUtil from "./Util/CookieUtil";

function App() {
    useEffect(() => {


    }, [])

    return <div>
        <h1>App</h1>
        <p>{CookieUtil.get("auth")}</p>
    </div>
}

export default App;
