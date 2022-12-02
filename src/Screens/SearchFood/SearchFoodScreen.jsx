import * as React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Deposits from "../../ExampleProjects/Dashboard/Deposits";
import LogoutIcon from '@mui/icons-material/Logout';
import CookieUtil from "../../Util/CookieUtil";
import {useNavigate} from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import CalculateIcon from '@mui/icons-material/Calculate';
import AssessmentIcon from '@mui/icons-material/Assessment';
import {Stack, TextField} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import {useEffect, useState} from "react";
import axios from "axios";
import Links from "../../Links";
import Avatar from "@mui/material/Avatar";
import FoodCompilationItem from "./FoodCompilationItem";
import {BarChart, Bar, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Map, Placemark} from "react-yandex-maps";
import RestaurantPlacemark from "./RestaurantPlacemark";
import HighlightedRestaurant from "./HighlightedRestaurant";

const drawerWidth = 240;



const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate()


    const [rsByRestaurant, setRsByRestaurant] = useState({})
    const [rsByShop, setRsByShop] = useState({})

    useEffect(() => {
        axios.get(Links.searchFood("томям")).then(rs => {
            setRsByRestaurant(rs.data["by_restaurant"])
            setRsByShop(rs.data["by_shop"])
        })
    }, [])


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && {display: 'none'}),
                            }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{flexGrow: 1}}
                        >
                            Поиск Яндекс Еды
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit" onClick={() => {
                            CookieUtil.remove("auth")
                            navigate("/login")
                        }}>
                            <LogoutIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon/>
                        </IconButton>
                    </Toolbar>
                    <Divider/>
                    <List component="nav">
                        <>
                            <ListItemButton>
                                <ListItemIcon><FastfoodIcon/></ListItemIcon>
                                <ListItemText primary="Поиск"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><BookmarksIcon/></ListItemIcon>
                                <ListItemText primary="Свои подборки"/>
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon><CalculateIcon/></ListItemIcon>
                                <ListItemText primary="Счетчик калорий"/>
                            </ListItemButton>
                        </>
                        <Divider sx={{my: 1}}/>
                        <ListItemButton>
                            <ListItemIcon><AssessmentIcon/></ListItemIcon>
                            <ListItemText primary="Выгрузка xlsx"/>
                        </ListItemButton>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar/>
                    <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                        <Stack spacing={2}>
                            <TextField label={"Поиск"} variant={"standard"}/>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                <Stack>
                                    <Title>Самая низкая цена</Title>
                                    <Stack spacing={2} direction={"row"}>
                                        {rsByRestaurant["lowest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                                    </Stack>
                                </Stack>
                            </Paper>

                            <Paper
                                sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                <Stack>
                                    <Title>Самая высокая цена</Title>
                                    <Stack spacing={2} direction={"row"}>
                                        {rsByRestaurant["highest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                                    </Stack>
                                </Stack>
                            </Paper>

                            <Paper
                                sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                                <Stack>
                                    <Title>Самая большая порция</Title>
                                    <Stack spacing={2} direction={"row"}>
                                        {rsByRestaurant["lowest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                                    </Stack>
                                </Stack>
                            </Paper>

                            <Title>
                                График стоимости блюд
                            </Title>
                            <BarChart width={1000}
                                      height={500}
                                      data={rsByRestaurant["chart_data"]}>
                                <XAxis dataKey="shop_name" />
                                <YAxis dataKey={"price"} />
                                <Tooltip />
                                <Legend/>
                                <Bar dataKey="price" fill="#8884d8" name={"Стоимость блюда"} />
                            </BarChart>

                            <Title>Рестораны на карте</Title>
                            <Map defaultState={{ center: [55.75, 37.57], zoom: 11 }} width={1000} height={500}>
                                {rsByRestaurant["restaurants"]?.map(v => <RestaurantPlacemark v={v}/>)}
                            </Map>

                            <Stack direction={"row"} spacing={2}>
                                <HighlightedRestaurant title={"Лучший ресторан"} v={rsByRestaurant["best_highlighted_restaurant"] || {}}/>
                                <HighlightedRestaurant title={"Худший ресторан"} v={rsByRestaurant["worst_highlighted_restaurant"] || {}}/>
                            </Stack>

                            <Paper sx={{p: 2}}>
                                <Title>ЛУЧШИЙ ВЫБОР</Title>
                                <Typography variant="h7">Самая низкая цена + самая большая граммовка + самый выский рейтинг с самым большим количеством отзывов</Typography>
                                <Stack spacing={2} direction={"row"}>
                                    {rsByRestaurant["best_choice_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                                </Stack>
                            </Paper>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent/>;
}
