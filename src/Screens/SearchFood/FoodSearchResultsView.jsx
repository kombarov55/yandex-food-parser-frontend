import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Snackbar, Stack} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import FoodCompilationItem from "./FoodCompilationItem";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Map} from "react-yandex-maps";
import RestaurantPlacemark from "./RestaurantPlacemark";
import HighlightedRestaurant from "./HighlightedRestaurant";
import {useState} from "react";
import axios from "axios";
import CookieUtil from "../../Util/CookieUtil";
import Links from "../../Links";

export default ({rs}) => {
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackbarText, setSnackbarText] = useState("")

    const email = CookieUtil.get("auth")

    function onAddFavorite(v) {
        axios.post(Links.addCompilationItem(v.id, email)).then(rs => {
            setShowSnackbar(true)
            setSnackbarText("Добавлено в избранное")
        })
    }

    function onRemoveFavorite(v) {
        axios.delete(Links.removeCompilationItem(v.id, email)).then(rs => {
            setShowSnackbar(true)
            setSnackbarText("Удалено из избранного")
        })
    }

    return <>
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                maxWidth: 360
            }}
        >
            <Typography component="p" variant="h6">
                Средняя цена: {Math.trunc(rs["summary"]["avg_price"] || 0.0)}Р.
            </Typography>
        </Paper>

        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая низкая цена</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["lowest_price_food_list"]?.map(v =>
                        <FoodCompilationItem v={v}
                                             key={v.id}
                                             isFav={rs.favorite_food_item_ids.find(id => v.id == id)}
                                             onAdd={() => onAddFavorite(v)}
                                             onRemove={() => onRemoveFavorite(v)}
                        />)}
                </Stack>
            </Stack>
        </Paper>

        <Paper
            sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая высокая цена</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["highest_price_food_list"]?.map(v =>
                        <FoodCompilationItem v={v}
                                             key={v.id}
                                             isFav={rs.favorite_food_item_ids.find(id => v.id == id)}
                                             onAdd={() => onAddFavorite(v)}
                                             onRemove={() => onRemoveFavorite(v)}
                        />)}
                </Stack>
            </Stack>
        </Paper>

        <Paper
            sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Stack>
                <Title>Самая большая порция</Title>
                <Stack spacing={2} direction={"row"}>
                    {rs["biggest_weight_food_list"]?.map(v =>
                        <FoodCompilationItem v={v}
                                             key={v.id}
                                             isFav={rs.favorite_food_item_ids.find(id => v.id == id)}
                                             onAdd={() => onAddFavorite(v)}
                                             onRemove={() => onRemoveFavorite(v)}
                        />)}
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
                {rs["best_choice_food_list"]?.map(v =>
                    <FoodCompilationItem v={v}
                                         key={v.id}
                                         isFav={rs.favorite_food_item_ids.find(id => v.id == id)}
                                         onAdd={() => onAddFavorite(v)}
                                         onRemove={() => onRemoveFavorite(v)}
                    />)}
            </Stack>
        </Paper>
        <Snackbar open={showSnackbar}
                  message={snackbarText}
                  autoHideDuration={600}
                  onClose={() => setShowSnackbar(false)}
        />
    </>
}