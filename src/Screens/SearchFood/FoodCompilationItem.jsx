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
    </>
}