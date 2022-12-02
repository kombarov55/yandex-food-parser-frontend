import './App.css';
import {useEffect} from "react";

function App() {
    useEffect(() => {

    }, [])

    return <div>
        <h1>App</h1>
        <p>{document.cookie}</p>
    </div>
}

export default App;
