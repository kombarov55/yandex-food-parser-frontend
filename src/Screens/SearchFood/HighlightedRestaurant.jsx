import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardMedia} from "@mui/material";
import Paper from "@mui/material/Paper";
import Title from "../../ExampleProjects/Dashboard/Title";
import Link from "@mui/material/Link";

export default ({title, v}) => {
    return <Paper sx={{p: 2}}>
        <Title>{title}</Title>
        <Card sx={{maxWidth: 345}}>
            <CardMedia component={"img"}
                       height={140}
                       image={v.src}
            />
            <CardContent>
                <Link variant="button" color={"primary.main"} href={v.href}>
                    {v.name}
                </Link>
                <Typography gutterBottom variant="body2" component="div">
                    {v.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${v.rating}/5 (${v.rating_count} оценок)`}
                </Typography>
            </CardContent>
        </Card>
    </Paper>
}