import React, {useEffect, useState} from "react";
import PageWrapper from "../PageWrapper";
import axios from "axios";
import Links from "../../Links";
import CookieUtil from "../../Util/CookieUtil";
import {Snackbar, Stack} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import Paper from "@mui/material/Paper";
import FoodItemInCompilation from "./FoodItemInCompilation";
import Grid from "@mui/material/Grid";

export default ({}) => {
    const [payload, setPayload] = useState([])
    const [names, setNames] = useState([])
    const [showDialog, setShowDialog] = useState(false)

    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarText, setSnackbarText] = useState("")

    const email = CookieUtil.get("auth")

    function reload() {
        axios.get(Links.getAllCompilations(CookieUtil.get("auth"))).then(rs => {
            setPayload(rs.data.payload)
            setNames(rs.data.payload.map(v => v.name))
        })
    }

    function deleteItem(v, name) {
        axios.delete(Links.removeCompilationItem(v.id, email, name)).then(rs => {
            setShowSnackbar(true)
            setSnackbarText("Удалено из избранного")
            reload()
        })
    }

    function openDialog() {

    }

    useEffect(() => reload(), [])

    return <>
        <PageWrapper title={"Подборки"}>
            <Stack spacing={2}>
                {payload?.map(dto =>
                    <Paper sx={{p: 2}}>
                        <Stack spacing={2} key={dto.id}>
                            <Title>{dto.name}</Title>
                            <Grid container spacing={2}>
                                {dto.food_list.map(v =>
                                    <Grid item>
                                        <FoodItemInCompilation v={v}
                                                               onRemove={() => deleteItem(v, dto.name)}
                                                               onMove={() => openDialog()}
                                        />
                                    </Grid>
                                )}
                            </Grid>

                        </Stack>
                    </Paper>
                )}
            </Stack>
            <Snackbar open={showSnackbar}
                      message={snackbarText}
                      autoHideDuration={600}
                      onClose={() => setShowSnackbar(false)}
            />
        </PageWrapper>
    </>
}