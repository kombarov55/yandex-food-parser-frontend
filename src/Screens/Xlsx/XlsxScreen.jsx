import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Container,
    CssBaseline,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {useFormik} from "formik";
import axios from "axios";
import Links from "../../Links";

export default ({}) => {
    const theme = createTheme()

    const formik = useFormik({
        initialValues: {
            search: ""
        },
        onSubmit: values => {
            axios.get(Links.foodRequest(values.search), values).then(rs => {
                alert("Запрос принят в обработку")
                refreshList()
                values.search = ""
            })
        }
    })

    const [xlsxRequests, setXlsxRequests] = useState([])

    function refreshList() {
        axios.get(Links.xlsxRequests).then(rs => setXlsxRequests(rs.data))
    }

    useEffect(() => refreshList(), [])

    return <ThemeProvider theme={theme}>
        <Container component={"main"} maxWidth={"xs"}>
            <CssBaseline/>
            <Box xs={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography component={"h1"} variant={"h5"} align={"center"}>
                    Выгрузка
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField label={"Что ввести в поисковую строку"}
                               required
                               margin={"normal"}
                               fullWidth
                               id={"search"}
                               name={"search"}
                               onChange={formik.handleChange}
                               value={formik.values.search}
                               autoFocus
                    />
                    <Button variant={"contained"} type={"submit"} fullWidth>
                        Поиск
                    </Button>
                </form>
            </Box>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Запросы
            </Typography>
            <Button variant={"contained"} fullWidth onClick={() => refreshList()}>
                Обновить
            </Button>
            <Table size={"small"}>
                <TableHead>
                    <TableRow>
                        <TableCell>id</TableCell>
                        <TableCell>Поисковое слово</TableCell>
                        <TableCell>Статус запроса</TableCell>
                        <TableCell>Статус работы</TableCell>
                        <TableCell>Дата начала</TableCell>
                        <TableCell>Дата окончания</TableCell>
                        <TableCell>Ссылка на скачивание</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {xlsxRequests.map(vo =>
                        <TableRow key={vo.id}>
                            <TableCell>{vo.id}</TableCell>
                            <TableCell>{vo.food_name}</TableCell>
                            <TableCell>{vo.status}</TableCell>
                            <TableCell>{vo.what_is_doing}</TableCell>
                            <TableCell>{vo.start_date}</TableCell>
                            <TableCell>{vo.end_date}</TableCell>
                            <TableCell><a href={Links.downloadLink(vo.filename)}>{vo.filename}</a></TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Container>
    </ThemeProvider>
}