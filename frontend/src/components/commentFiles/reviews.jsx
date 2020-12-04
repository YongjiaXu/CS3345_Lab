import React from 'react'
import {Button, Select} from 'reactstrap'

import {FaThumbsUp , FaThumbsDown, FaRegThumbsUp, FaRegThumbsDown } from 'react-icons/fa'
import Rating from './rating'

export class Reviews extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            reviews: this.props.reviews
        }
    }

    render()
    {
    return (
        <div className="container">
            {
                (this.props.reviews.length === 0) && 
                <>
                    <h2>Country Reviews ({this.props.reviews.length})</h2>
                    <p className="list-group-item text-dark bg-light">Sorry! No reviews yet!</p>
                </>
            }
            { (this.props.reviews.length > 0) &&
                <>
                    <h2>Country Reviews ({this.props.reviews.length})</h2>
                </>
            }
            <div>
                {
                    this.props.reviews.map((review, i) => 
                    <div key={i}>
                        <div className="card bg-light mb-3">
                            <div className="card-header" id="card-header">
                                Rating: { review.Rating }/10 
                                <div className="float-right" id="thumb">
                                    <div className="btn " id="thumb-up" onClick={()=>this.props.onClickUp(review.id)} style={{cursor: 'pointer'}}>
                                        <FaRegThumbsUp id="icon-up"/> 
                                        {review.NumUp}
                                    </div>
                                    
                                    <div className="btn " id="thumb-down" onClick={()=>this.props.onClickDown(review.id)} style={{cursor: 'pointer'}}>
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
            </div>
        </div>
    )
            }
}

export default Reviews;

/*

<table style={{display: 'block'}}>
                        <tbody>
                            <tr>
                            {
                                props.reviews.map((singleReview, i) => {
                                return (
                                <td key={i} style={{display: 'inline-block'}}>
                                    <li className="card">
                                        <span className="card-header">
                                        
                                            <span className="float-left text-secondary">{singleReview.User}</span>
                                            <div style={{marginLeft: '70%'}}>
                                                    &nbsp;&nbsp;
                                                {singleReview.NumUp}
                                                &nbsp;&nbsp;<FaThumbsUp size={15} />
                                                &nbsp;&nbsp;
                                                {singleReview.NumDown}
                                                &nbsp; <FaThumbsDown size={15} />&nbsp;
                                            </div>
                                        </span>
                                        <div className="card-body">
                                            <span className="">{singleReview.Comment}</span>
                                        </div>
                                    </li>
                                </td>
                                );
                                })
                            }
                            </tr>
                        </tbody>
                    </table>

                    {
                    props.reviews.map((singleReview, i) => {
                    return (
                    <div className="card" key={i}>
                        <div className="card-header">
                            <div>
                                <span className="float-left text-secondary">{singleReview.User}</span>
                                
                                <div style={{marginLeft: '90%'}}>
                                <Rating value = {singleReview.Rating%5}/>
                                &nbsp;{singleReview.NumUp%100} <FaThumbsUp size={15} onClick={e => props.content.handleThumbUp(singleReview.id)} style={{cursor: 'pointer'}}/>&nbsp;
                                &nbsp;{singleReview.NumDown%1000} <FaThumbsDown size={15} onClick={e => props.content.handleThumbDown(singleReview.id)} style={{cursor: 'pointer'}}/>&nbsp;
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <span className="">{singleReview.Comment}</span>
                        </div>
                    </div>
                    );
                    })
                }

*/