import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {Stack} from "@mui/material";
import Title from "../../ExampleProjects/Dashboard/Title";
import Avatar from "@mui/material/Avatar";

export default ({v}) => {
    return <>
        <Paper sx={{p: 2}}>
            <Stack spacing={0.5}>
                <Avatar src={v["src"]}
                        sx={{width: "8vmax", height: "8vmax"}}
                        variant={"rounded"}
                />
                <Typography component={"h5"} variant={"h4"}>
                    {v["price"]}
                </Typography>
                <Title>{v["restaurant_name"]}</Title>
                <Typography component={"h5"} variant={"body2"}>
                    {v["name"]}
                </Typography>
                <Typography component={"p"} variant={"body2"}>
                    {v["weight"]}
                </Typography>
            </Stack>
        </Paper>
    </>
}