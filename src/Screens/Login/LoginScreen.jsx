import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
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
import {Button} from "@mui/material";
import SyncIcon from '@mui/icons-material/Sync';
import axios from "axios";
import Links from "../../Links";
import {useNavigate} from "react-router-dom";
import TestEmail from "../../Util/TestEmail";

const theme = createTheme();

export default ({}) => {
    const navigate = useNavigate()

    const [isAuthFailed, setIsAuthFailed] = useState(false)

    const formik = useFormik({
        initialValues: {
            "email": null,
            "password": null
        }, onSubmit: (values, {setSubmitting}) => {
            axios.post(Links.login, values).then(rs => {
                setIsAuthFailed(false)
                setSubmitting(false)
                if (rs.data.success) {
                    const email = rs.data.email
                    document.cookie = `auth=${email}`
                    navigate("/search-food")
                } else {
                    setIsAuthFailed(true)
                }
            })
        }, validate: (values) => {
            const errors = {}

            if (values.email != null && TestEmail(values.email)) {
                errors["email"] = "Неправильный email"
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
                            Войти
                        </Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={formik.errors["email"] || "Электронная почта"}
                                error={formik.errors["email"]}
                                name="email"
                                autoComplete="email"
                                onChange={formik.handleChange}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={formik.handleChange}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                startIcon={formik.isSubmitting && <SyncIcon/>}
                            >
                                {!formik.isSubmitting && "Войти"}
                            </Button>
                            {isAuthFailed &&
                                <Typography align={"center"} sx={{color: "error.main"}} xs>
                                    Неправильный логин/пароль
                                </Typography>
                            }
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#/restore-pwd" variant="body2">
                                        Забыли пароль?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#/register" variant="body2">
                                        Нет аккаунта? Зарегистрироваться
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