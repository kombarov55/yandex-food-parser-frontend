import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import DeleteIcon from '@mui/icons-material/Delete';

export default ({v, onRemove, onMove}) => {
    return <>
        <Card sx={{width: 200, height: 500}}>
            <CardActions disableSpacing>
                <IconButton onClick={() => onRemove()}>
                    <DeleteIcon/>
                </IconButton>
                <IconButton onClick={() => onMove()}>
                    <DriveFileMoveIcon/>
                </IconButton>
            </CardActions>

            <CardMedia component={"img"}
                       maxHeight={140}
                       image={v.src}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {v.price}Р
                </Typography>
                <Link variant="button" color={"primary.main"} href={v.link}>
                    {v.name}
                </Link>
                <Typography variant="body2" color="text.secondary">
                    {v.restaurant_name}
                </Typography>
                {v.rating &&
                    <Typography variant="body2" color="text.secondary">
                        {v.rating}/5
                    </Typography>
                }
                <Typography variant="body2" color="text.secondary">
                    {v.weight}г.
                </Typography>
            </CardContent>
        </Card>
    </>
}