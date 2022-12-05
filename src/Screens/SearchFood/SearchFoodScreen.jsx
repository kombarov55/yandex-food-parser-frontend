import * as React from 'react';
import {useEffect, useState} from 'react';
import {Button, CircularProgress, Stack, Tab, Tabs, TextField} from "@mui/material";
import axios from "axios";
import Links from "../../Links";
import FoodSearchResultsView from "./FoodSearchResultsView";
import {useFormik} from "formik";
import PageWrapper from "../PageWrapper";
import {useNavigate} from "react-router-dom";
import CookieUtil from "../../Util/CookieUtil";

export default ({}) => {
    const navigate = useNavigate()

    const [rsByRestaurant, setRsByRestaurant] = useState({})
    const [rsByShop, setRsByShop] = useState({})

    const [didRequestSomething, setDidRequestSomething] = useState(false)

    const [currentTab, setCurrentTab] = useState(0)

    function TabPanel(props) {
        const {children, value, index} = props;

        if (value == index) {
            return <>
                {children}
            </>
        } else {
            return <></>
        }
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {
        const email = CookieUtil.get("auth")
        if (email == null) {
            navigate("/login")
        }
    }, [])

    const formik = useFormik({
        initialValues: {
            search: null,
            amount: 10
        }, onSubmit: (values, {setSubmitting}) => {
            axios.get(Links.searchFood(values.search, values.amount)).then(rs => {
                setSubmitting(false)
                setRsByRestaurant(rs.data["by_restaurant"])
                setRsByShop(rs.data["by_shop"])
                setDidRequestSomething(true)
            })
        }
    })

    return <PageWrapper title={"Поиск Яндекс Еды"}>
        <Stack spacing={2}>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={1}>
                    <TextField autoFocus label={"Поиск"} name={"search"} onChange={formik.handleChange}/>
                    <Button type={"submit"} variant={"outlined"}>
                        {formik.isSubmitting ?
                            <CircularProgress/> : "Поиск"
                        }
                    </Button>

                </Stack>
            </form>
            {didRequestSomething &&
                <>
                    <Tabs value={currentTab} onChange={(e, i) => setCurrentTab(i)}>
                        <Tab label={"Результаты по ресторанам"} {...a11yProps(0)}/>
                        <Tab label={"Результаты по магазинам"} {...a11yProps(1)}/>
                    </Tabs>
                    <TabPanel value={currentTab} index={0}>
                        <FoodSearchResultsView rs={rsByRestaurant}/>
                    </TabPanel>
                    <TabPanel value={currentTab} index={1}>
                        <FoodSearchResultsView rs={rsByShop}/>
                    </TabPanel>
                </>
            }
        </Stack>
    </PageWrapper>
}