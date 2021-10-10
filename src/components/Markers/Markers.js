import { Typography, Paper } from '@material-ui/core'
import React, { useContext } from 'react'
import resturant from '../../assets/resturant.jpg'
import Rating from '@material-ui/lab/Rating'
import './style.css'
import useStyles from './style'
import { SelectedItemContext } from '../../context/context'
const Markers = ({ place }) => {
    const classes = useStyles()
    const [selected, setSelected] = useContext(SelectedItemContext)
    return (
        <div onClick={() => { setSelected(place) }}>
            <Paper elevation={3} className={classes.paper} >
                <Typography gutterBottom variant={'subtitle2'}>
                    {place.name}
                </Typography>
                <img className={classes.pointer} src={place.photo ? place.photo.images.small.url : resturant} alt={place.name} />
                <Rating value={Number(place.rating)} size='small' readOnly />
            </Paper>

        </div>
    )
}

export default Markers
