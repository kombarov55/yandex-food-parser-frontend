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

export default ({rs}) => {
    return <>
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая низкая цена</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["lowest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                </Stack>
            </Stack>
        </Paper>

        <Paper
            sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая высокая цена</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["highest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                </Stack>
            </Stack>
        </Paper>

        <Paper
            sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая большая порция</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["lowest_price_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
                </Stack>
            </Stack>
        </Paper>

        <Title>
            График стоимости блюд
        </Title>
        <BarChart width={1000}
                  height={500}
                  data={rs["chart_data"]}>
            <XAxis dataKey="shop_name"/>
            <YAxis dataKey={"price"}/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey="price" fill="#8884d8" name={"Стоимость блюда"}/>
        </BarChart>

        <Title>Рестораны на карте</Title>
        <Map defaultState={{center: [55.75, 37.57], zoom: 11}} width={1000} height={500}>
            {rs["restaurants"]?.map(v => <RestaurantPlacemark v={v}/>)}
        </Map>

        <Stack direction={"row"} spacing={2}>
            <HighlightedRestaurant title={"Лучший ресторан"} v={rs["best_highlighted_restaurant"] || {}}/>
            <HighlightedRestaurant title={"Худший ресторан"} v={rs["worst_highlighted_restaurant"] || {}}/>
        </Stack>

        <Paper sx={{p: 2}}>
            <Title>ЛУЧШИЙ ВЫБОР</Title>
            <Typography variant="h7">Самая низкая цена + самая большая граммовка + самый выский рейтинг с самым большим
                количеством отзывов</Typography>
            <Stack spacing={2} direction={"row"}>
                {rs["best_choice_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
            </Stack>
        </Paper>
    </>
}