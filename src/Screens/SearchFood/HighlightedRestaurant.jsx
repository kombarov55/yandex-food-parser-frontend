import * as React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Title from "../../ExampleProjects/Dashboard/Title";
import Avatar from "@mui/material/Avatar";

export default ({title, v}) => {
    return <Paper sx={{p: 2}}>
        <Title>{title}</Title>
        <Avatar src={v?.src}
                sx={{width: "8vmax", height: "8vmax"}}
                variant={"rounded"}
        />
        <Title>{v?.name}</Title>
        <Typography variant={"h7"}>{v?.address}</Typography>
        <Typography variant={"body2"}>{`${v?.rating} (${v?.rating_count} оценок)`}</Typography>
    </Paper>
}