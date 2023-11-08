import React from 'react'
import { useState } from 'react';
import '@smastrom/react-rating/style.css'
import { Rating, RoundedStar } from '@smastrom/react-rating';

export default function Stars(props) {
    const [rating, setRating] = useState(props.rating || 0) // Initial value
    const itemStyles = { 
        itemShapes: RoundedStar, 
        activeFillColor: '#f59e0b', 
        inactiveFillColor: 'gray'
        
       };

    const floatValue = 1.44
     const width = props.w
    
    return <Rating style={{ maxWidth: width}} value={rating} onChange={setRating}   {...(props.readOnly ? { readOnly: true } : {})}   itemStyles={itemStyles}/>
}

//**Para que salga las estrellas a la mitad debe de ser readOnly */