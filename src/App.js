import React, { useEffect, useState } from "react";
import Map from "./components/map/map";
import Header from "./components/header/Header";
import List from './components/List/List'
import { CssBaseline, Grid } from '@material-ui/core'
import './App.css'
import { getPlacesData } from './api/data'
import { SelectedItemProvider } from "./context/context";

function App() {

  const [bottomLeft, setBottomLeft] = useState({ lng: -73.9397, lat: 40.8002 })
  const [topRight, setTopRight] = useState({ lng: -73.9397, lat: 40.8002 })
  const [places, setPlaces] = useState([])
  const [isloading, setIsloading] = useState()
  const [type, setType] = useState('restaurants')
  const [rate, setRate] = useState('0')
  const [filteredPlaces, setFilteredPlaces] = useState([])
 
  
  useEffect(
    () => {
      setIsloading(true)
      getPlacesData(type, bottomLeft, topRight)

        .then((data) => {
          
          setPlaces(data?.filter(place=>place.photo))
          setFilteredPlaces([])
          setIsloading(false)

        }

        )
    }, [type, bottomLeft])
    useEffect(() => { let filtered = places.filter(place => place.rating >= rate); setFilteredPlaces(filtered); console.log(filteredPlaces); }, [rate])
  return (
    <div className="App">
      <SelectedItemProvider>
        <CssBaseline />
        <Header />
       
        <Grid container spacing={3} style={{ width: '100%' }}>

          <Grid item xs={12} md={4}><List type={type} setType={setType} rate={rate} setRate={setRate} isloading={isloading} places={filteredPlaces.length ? filteredPlaces : places} /></Grid>
          <Grid item xs={12} md={8}><Map  places={filteredPlaces[1]  ? filteredPlaces : places} setTop={setTopRight} setBottom={setBottomLeft} /></Grid>

        </Grid>
      </SelectedItemProvider>
    </div>
  );
}

export default App;
