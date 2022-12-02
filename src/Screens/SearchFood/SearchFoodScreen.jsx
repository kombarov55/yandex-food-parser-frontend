import React from "react";
import {Button} from "@mui/material";
import CookieUtil from "../../Util/CookieUtil";
import {useNavigate} from "react-router-dom";

export default ({}) => {
    const navigate = useNavigate()

    function logout() {
        CookieUtil.remove("auth")
        navigate("/login")
    }

    return <>
        <h1>Search food</h1>
        <Button onClick={logout}>
            Выйти
        </Button>
    </>
}