import './App.css';
import {useEffect} from "react";
import CookieUtil from "./Util/CookieUtil";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        if (CookieUtil.exists("auth")) {
            navigate("/search-food")
        } else {
            navigate("/login")
        }
    }, [])

    return <div>
    </div>
}

export default App;
