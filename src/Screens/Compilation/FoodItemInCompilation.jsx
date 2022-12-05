import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Card, CardActions, CardContent, CardMedia, MenuItem, Select, TextField} from "@mui/material";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {useState} from "react";

export default ({v, isFav, onAdd, onRemove, showFav = true}) => {
    const [fav, setFav] = useState(isFav)

    function handleFavClick() {
        const newValue = !fav

        setFav(newValue)

        if (newValue) {
            onAdd()
        } else {
            onRemove()
        }
    }

    return <>
        <Card sx={{width: 200, height: 500}}>
            {showFav &&
                <CardActions disableSpacing>
                    <IconButton onClick={() => handleFavClick()}>
                        {fav ? <BookmarkIcon/> : <BookmarkBorderOutlinedIcon/>}
                    </IconButton>
                </CardActions>
            }

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