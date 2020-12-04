import React from 'react';
import { FaRegThumbsUp } from 'react-icons/fa'
import { FaRegThumbsDown } from 'react-icons/fa'
import './reviewsList.css'

export const ReviewsList = props =>  <ul className="list-group">
    <div>
        <h3 className="">Reviews <span className="review-count text-secondary">({props.reviews.length})</span></h3>
    </div>    
    {props.reviews.length==0 && (
        <div aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item">No review</li>
            </ol>
        </div>
    )}
    {
        props.reviews.slice(0).reverse().map((review, i) => 
            <div key={i}>
                <div className="card bg-light mb-3">
                    <div className="card-header" id="card-header">
                        Rating: { review.Rating }/10 
                        <div className="float-right" id="thumb">
                            <div className="btn " id="thumb-up" onClick = {()=>props.onClickUp(review.id)}>
                                <FaRegThumbsUp id="icon-up"/> 
                                {review.NumUp}
                            </div>
                            
                            <div className="btn " id="thumb-down" onClick = {()=>props.onClickDown(review.id)}>
                                <FaRegThumbsDown id="icon-down"/> 
                                {review.NumDown}
                            </div>
                            
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="card-text text-secondary">
                            <div className="row">
                            <p className="float-left col-sm-4"> 
                                Username : {review.User}
                            </p>
                            <p className="col-sm-4"> 
                                Country : {review.Country}
                            </p>
                            <p className="col-sm-3"></p>
                            <p className="btn btn-sm btn-outline-danger d-flex "
                                onClick={()=> props.onDelete(review.id)}> delete </p>
                            </div>
                        </div>

                        <div className="clearfix"></div>
                        <div className="card-text">
                            Comment : "{review.Comment}"
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        )
        
    }
</ul>