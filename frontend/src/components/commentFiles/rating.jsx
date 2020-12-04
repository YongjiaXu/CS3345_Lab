import React from 'react';
import './rating.css'

const Rating = props => {

    return (<>
        <span className="stars">
        {
            [1,2,3,4,5].map(x => (<i key={x} className={(x > +props.value ? 'empty-star' : 'full-star')}></i>))
        }
        </span>
    </>);
}

export default Rating;