import React from 'react';
import './ReviewList.css';

export const ReviewList = props => {

       if(!props.view.length) {
        return <div className ="jumbotron">There are currently no reviews</div>
    }
    else {
        
        return props.view.map((x, i) => <>

        <div className = "container" key={ i }>
            
            
          

        <div className="row mt-4 mb-4">
            <div className="col-8">
                <div className="username">{ x.name }</div>
                <div className="comment">"{ x.comment }"</div>
                
            </div>
            <div>{x.rating}</div>
       
                 
        </div>   

        </div> 
            <hr/>
            </>
    )
    
    }
}