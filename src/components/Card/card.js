import React from 'react'
import { Box, CardMedia, Card, CardContent, Typography, Chip, CardActions, Button } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import PhoneIcon from '@material-ui/icons/Phone'
import Rating from '@material-ui/lab/Rating'
import resturant from '../../assets/resturant.jpg'
import useStyles from './style'
const Cards = ({ place, selecteditem, refProp }) => {

    const classes = useStyles()

    if (selecteditem.name === place.name) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })


    return (
        <div>

            <Card elevation={6}>
                <CardMedia style={{ height: 350 }} image={place.photo ? place.photo.images.large.url : resturant} title={place.name} />
                <CardContent>
                    <Typography gutterBottom variant='h5'>{place.name}</Typography>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='subtitle1'>Price</Typography>
                        <Typography gutterBottom variant='subtitle1'>{place.price_level}</Typography>

                    </Box>
                    <Box display='flex' justifyContent='space-between'>
                        <Rating value={place.rating} size='large' readOnly />
                        <Typography gutterBottom variant='subtitle1'>out of{place.num_reviews}reviews</Typography>
                    </Box>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography variant='subtitle1'>Ranking</Typography>
                        <Typography gutterBottom variant='subtitle2'>{place.ranking}</Typography>
                    </Box>
                    {place?.awards?.map((award, i) => (
                        <Box key={i} my={1} display='flex' justifyContent="space-between" alignItems='center'>
                            <img src={award.images.small} alt={award.display_name} />
                            <Typography color='textSecondary' variant='subtitle2'>{award.display_name}</Typography>
                        </Box>
                    ))}
                    {
                        place?.cuisine?.map(({ name }) => (
                            <Chip className={classes.chip} key={name} label={name} size='small' />
                        ))
                    }
                    {
                        place?.address && (
                            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                                <LocationOnIcon />{place.address}
                            </Typography>
                        )
                    }
                    {
                        place?.phone && (
                            <Typography gutterBottom variant='subtitle2' color='textSecondary' className={classes.subtitle}>
                                <PhoneIcon />{place.phone}
                            </Typography>
                        )
                    }
                    <CardActions>
                        <Button color='primary' size='small' onClick={() => { window.open(place.weburl, '_blank') }}>
                            Trip Advisor

                        </Button>
                        <Button color='primary' size='small' onClick={() => { window.open(place.website, '_blank') }}>
                            Website

                        </Button>
                    </CardActions>
                </CardContent>

            </Card>
        </div>
    )
}

export default Cards
