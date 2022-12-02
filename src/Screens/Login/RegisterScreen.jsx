import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useFormik} from "formik";
import SyncIcon from '@mui/icons-material/Sync';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Links from "../../Links";

const theme = createTheme();

export default ({}) => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            "email": "",
            "password": "",
            "password_repeat": ""
        }, onSubmit: (values, {setSubmitting}) => {
            axios.post(Links.register, values).then(rs => {
                setSubmitting(false)
                console.log(rs.data)
                navigate("/login")
            })

        }, validate: values => {
            const errors = {}

            if (!values.email) {
                errors.email = 'Обязательное поле';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Неправильный email адрес';
            }

            if (values.password != "" && values.password.length < 6) {
                errors.password = "Пароль слишком короткий"
            }

            if (values.password_repeat != values.password) {
                errors.password_repeat = "Пароли не совпадают"
            }

            return errors
        }
    })


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Регистрация
                        </Typography>
                        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={formik.errors["email"] || "Email"}
                                type={"email"}
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                error={formik.errors["email"]}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={formik.errors["password"] || "Пароль"}
                                type="password"
                                id="password"
                                error={formik.errors["password"]}
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password_repeat"
                                label={formik.errors["password_repeat"] || "Пароль ещё раз"}
                                type="password"
                                id="password_repeat"
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                                error={formik.errors["password_repeat"]}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                startIcon={formik.isSubmitting && <SyncIcon/>}
                            >
                                {!formik.isSubmitting && "Зарегистрироваться"}
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#/login" variant="body2">
                                        {"Вспомнили пароль?"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}