import React, {useEffect, useState} from "react";
import PageWrapper from "../PageWrapper";
import axios from "axios";
import Links from "../../Links";
import CookieUtil from "../../Util/CookieUtil";
import {Card, Stack} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import FoodCompilationItem from "../SearchFood/FoodCompilationItem";
import Paper from "@mui/material/Paper";
import FoodItemInCompilation from "./FoodItemInCompilation";
import Grid from "@mui/material/Grid";

export default ({}) => {
    const [rs, setRs] = useState({})

    useEffect(() => {
        axios.get(Links.getAllCompilations(CookieUtil.get("auth"))).then(rs => setRs(rs.data))
    }, [])

    return <>
        <PageWrapper title={"Подборки"}>
            <Stack spacing={2}>
                {rs?.payload?.map(dto =>
                    <Paper sx={{p: 2}}>
                        <Stack spacing={2} key={dto.id}>
                            <Title>{dto.name}</Title>
                            <Grid container spacing={2}>
                                {dto.food_list.map(v =>
                                    <Grid item>
                                        <FoodItemInCompilation v={v}/>
                                    </Grid>
                                )}
                            </Grid>

                        </Stack>
                    </Paper>
                )}
            </Stack>
        </PageWrapper>
    </>
}