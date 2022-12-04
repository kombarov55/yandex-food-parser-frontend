import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Stack} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import FoodCompilationItem from "./FoodCompilationItem";
import {Bar, BarChart, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {Map} from "react-yandex-maps";
import RestaurantPlacemark from "./RestaurantPlacemark";
import HighlightedRestaurant from "./HighlightedRestaurant";

export default ({rs}) => {
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
            {/*<Typography component="p" variant="body1">*/}
            {/*    Найдено {rs["summary"]["items_found"]} результатов по Москве*/}
            {/*</Typography>*/}
        </Paper>

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
                    {rs["biggest_weight_food_list"]?.map(v => <FoodCompilationItem v={v}/>)}
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