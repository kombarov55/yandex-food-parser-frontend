import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardMedia} from "@mui/material";

export default ({v}) => {
    return <>
        <Card sx={{maxWidth: 345}}>
            <CardMedia component={"img"}
                       height={140}
                       image={v.src}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {v.price}
                </Typography>
                <Typography variant="button" color={"primary.main"} onClick={() => alert("click")}>
                    {v.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {v.restaurant_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {v.weight}
                </Typography>
            </CardContent>
        </Card>
        {/*
        <Card variant={"outlined"} sx={{p: 2}}>
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
        </Card>
        */}
    </>
}