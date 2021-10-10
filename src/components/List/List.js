import React, { createRef, useContext, useEffect, useState } from 'react'
import { FormControl, CircularProgress, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import useStyles from './style.js'
import Cards from "../Card/card"
import { SelectedItemContext } from '../../context/context.js'
const List = ({ places, isloading, type, setType, rate, setRate }) => {
    const classes = useStyles()

    const [selecteditem, setSelecteditem] = useContext(SelectedItemContext)
    const [elRefs, setElRefs] = useState([])


    useEffect(() => {
        const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
        setElRefs(refs)

    }, [places])

    return (
        <div className={classes.container}>
            <Typography variant='h5'>Resturants Hotels & Attractions around you</Typography>
            {isloading ? <div className={classes.loading}><CircularProgress size='5rem' /></div> :
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel>type</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            <MenuItem value="restaurants">Resturants</MenuItem>
                            <MenuItem value="hotels">Hotels</MenuItem>
                            <MenuItem value="attractions">Attractins</MenuItem>
                        </Select>

                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel>Rating</InputLabel>
                        <Select value={rate} onChange={(e) => setRate(e.target.value)}>
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                        </Select>
                    </FormControl>
                    <Grid container spacing={3} className={classes.list}>
                        { 
                            (places?.map((place, i) => (

                                <Grid ref={elRefs[i]} key={i} item xs={12} >
                                    <Cards place={place} selecteditem={selecteditem} refProp={elRefs[i]} />
                                </Grid>
                            )))
                        }
                    </Grid>
                </div>}


        </div>
    )
}

export default List
