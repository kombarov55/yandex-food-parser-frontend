import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Card, CardContent, CardMedia} from "@mui/material";
import Link from "@mui/material/Link";

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
                <Link variant="button" color={"primary.main"} href={v.link}>
                    {v.name}
                </Link>
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