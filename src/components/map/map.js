import React, { useEffect, useState ,useRef,useCallback} from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import Geocoder from 'react-map-gl-geocoder'
import { useMediaQuery } from '@material-ui/core'
import LocationOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Markers from '../Markers/Markers'
// import Geocoder from 'react-mapbox-gl-geocoder'
import './map.css'
const Map = ({ setBottom, setTop, places }) => {
    const isMobile = useMediaQuery('max-width:600px')
    const [latitude, setLatitude] = useState(40.7736)
    const [longitude, setLongitude] = useState(-73.9749)
    const [zoom, setZoom] = useState(12)
    const getNorthEast = (longitude, latitude) => {
        const ll = new mapboxgl.LngLat(longitude, latitude);
        let bounds = ll.toBounds(10000).toArray(); 
        const llb = new mapboxgl.LngLatBounds(bounds[0], bounds[1] );
        let g = llb.getNorthEast();
        setTop(g)
    }
   
    const getSouthWest = () => {
        const ll = new mapboxgl.LngLat(longitude, latitude);
        const lgg = new mapboxgl.LngLat(-73.9749, 40.7736);
        let bounds = ll.toBounds(10000).toArray(); 
        const llb = new mapboxgl.LngLatBounds(bounds[0], bounds[1] );
        let g = llb.getSouthWest();
        setBottom(g)
    }
    const mapRef = useRef();
    const handleViewportChange = useCallback(
        (result) =>{setLatitude(result.latitude);
            setLongitude(result.longitude);},
        []
      );
    
      
      const handleGeocoderViewportChange = useCallback(
        (newViewport) => {
          const geocoderDefaultOverrides = { transitionDuration: 1000 };
    
          return handleViewportChange({
            ...newViewport,
            ...geocoderDefaultOverrides
          });
        },
        []
      );
    
    useEffect(() => (getNorthEast(longitude, latitude), getSouthWest(longitude, latitude)), [latitude, longitude])
    return (
        <div>
            <ReactMapGL width='100%' height={600}
                className='map'
                ref={mapRef}
                latitude={latitude}
                longitude={longitude}
                zoom={zoom}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxApiAccessToken="pk.eyJ1IjoibWFyamFuMTk5MXNoIiwiYSI6ImNrc3R5YjBqMzFicHYybnRmbXN1dGkyd3MifQ.yldZfDJumwhiA05HZQVshg"
                onViewportChange={(viewState) => {
                    setLatitude(viewState.latitude);
                    setLongitude(viewState.longitude);
                    setZoom(viewState.zoom)
                    console.log(viewState)

                }}
            >
         <Geocoder
            mapRef={mapRef}
           onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={"pk.eyJ1IjoibWFyamFuMTk5MXNoIiwiYSI6ImNrc3R5YjBqMzFicHYybnRmbXN1dGkyd3MifQ.yldZfDJumwhiA05HZQVshg"}
                    position='top-right'
                    placeholder='Explore New Places'
                     clearOnBlur={false}
        />
                {
                    places?.map((place, i) => (
                        !isNaN(place.latitude) ?
                            (<Marker key={i} latitude={Number(place.latitude)} longitude={Number(place.longitude)}>

                                {
                                    !isMobile ? <Markers place={place} /> : <LocationOutlinedIcon size='large' color='primary' />
                                }

                            </Marker>) : (null)
                    ) )
                }

            </ReactMapGL>
        </div>
    )
}

export default Map
