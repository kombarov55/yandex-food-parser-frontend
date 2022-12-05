import React, {useEffect, useState} from "react";
import PageWrapper from "../PageWrapper";
import axios from "axios";
import Links from "../../Links";
import CookieUtil from "../../Util/CookieUtil";
import {Button, Dialog, DialogTitle, ListItem, ListItemAvatar, Snackbar, Stack, TextField} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import Paper from "@mui/material/Paper";
import FoodItemInCompilation from "./FoodItemInCompilation";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from "@mui/material/IconButton";
import {useFormik} from "formik";


export default ({}) => {
    const [payload, setPayload] = useState([])
    const [names, setNames] = useState([])
    const [showDialog, setShowDialog] = useState(false)

    const [addNew, setAddNew] = useState(false)

    const [foodId, setFoodId] = useState()
    const [prevName, setPrevName] = useState()
    const [newName, setNewName] = useState("")

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

    function openDialog(foodId, name) {
        setPrevName(name)
        setShowDialog(true)
        setFoodId(foodId)
    }

    function onCloseDialog(value) {
        axios.post(Links.moveCompilationItem(foodId, email, value, prevName)).then(rs => {
            setShowDialog(false)
            setShowSnackbar(true)
            setSnackbarText("Добавлено в подборку " + value)
            reload()
        })
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
                                                               onMove={() => openDialog(v.id, dto.name)}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                            { dto.name != "Избранное" &&
                                <Button onClick={() => {
                                    axios.delete(Links.deleteCompilation(email, dto.name)).then(rs => {
                                        setShowSnackbar(true)
                                        setSnackbarText("Удалено")
                                        reload()
                                    })
                                }}>
                                    Удалить
                                </Button>
                            }
                        </Stack>
                    </Paper>
                )}
            </Stack>
            <Snackbar open={showSnackbar}
                      message={snackbarText}
                      autoHideDuration={600}
                      onClose={() => setShowSnackbar(false)}
            />
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogTitle>В какой список переместить?</DialogTitle>
                {names.map(name =>
                    <ListItem button onClick={() => onCloseDialog(name)} key={name}>
                        <ListItemAvatar>
                            <Avatar>
                                {name.substring(0, 1)}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>{name}</ListItemText>
                    </ListItem>
                )}
                {addNew ?
                    <>
                        <ListItem>
                            <TextField label={"Название подборки"}
                                       autoFocus
                                       value={newName}
                                       onChange={(e) => setNewName(e.target.value)}
                            />
                            <Button onClick={() => onCloseDialog(newName)}>
                                Сохранить
                            </Button>
                        </ListItem>
                        <ListItem>

                        </ListItem>
                    </> :
                    <IconButton onClick={() => setAddNew(true)}>
                        <AddCircleIcon/>
                    </IconButton>
                }
            </Dialog>
        </PageWrapper>
    </>
}