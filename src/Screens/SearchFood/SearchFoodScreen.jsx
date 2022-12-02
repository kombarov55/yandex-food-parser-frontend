import * as React from 'react';
import {useEffect, useState} from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
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
import {Stack, Tab, Tabs, TextField} from "@mui/material";
import axios from "axios";
import Links from "../../Links";
import FoodSearchResultsView from "./FoodSearchResultsView";

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

    const [currentTab, setCurrentTab] = useState(0)

    useEffect(() => {
        axios.get(Links.searchFood("томям")).then(rs => {
            setRsByRestaurant(rs.data["by_restaurant"])
            setRsByShop(rs.data["by_shop"])
        })
    }, [])

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
