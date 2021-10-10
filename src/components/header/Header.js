import React, { useState } from 'react'
import './style.css'
const Header = () => {
    const [city, setCity] = useState('')
   
    return (
        <div className='header'>
            <h3 className='header--h3'>Travel Advisor</h3>
       
        </div>
    )
}

export default Header
