import React from 'react'
import './CountryView.css'
import { ReviewForm } from './ReviewForm';
import { ReviewList } from './ReviewList';
import {review} from './review.js';

export class CountryView extends React.Component {

    state = {
        country: 'USA',
        map: '',
        precautions: ['Social Distancing', 'Masks', 'Lockdown'],
        stats: ['Current Case Count: 160,000', 'Total Case Count: 11.5M', 'Total Death Count: 250,000', 'Recovery Rate: 98.8%'],
        reviews: [new review('Henry','Birds arent real','Positive') ],
        cases: 0,
        deaths: 0,
        graph: ''
    };

    pushReview(review) {
        var reviews = this.state.reviews;
        reviews.push(review);
        this.setState({reviews});
    }

    render() {
        return <>
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page"><a target="_blank" rel="noreferrer" href="https://www.youtube.com/watch?v=iWG4BZP4dzM&ab_channel=YeahJohnlol">Nav</a></li>
                    <li className="breadcrumb-item">Bar</li>
                </ol>
            </nav>

            <div className="jumbotron">
            <h1>{this.state.country}</h1>
            <img className="main" src="https://raw.githubusercontent.com/KirubelMoges/CS3330_Project/main/frontend/countyHeatmaps/usa.png?token=ANATEEH52QHP7VSEQQ4WYZC7X3KJQ"></img>
                <div className="row mt-4 mb-4">
                <div className="col-4">
                    <h2>Country Precautions</h2>
                {this.state.precautions.map(x => 
                    <p>{x}</p>)
                }

                {/* <div className="description">{this.state.product.description}</div> */}
                </div>
                <div className="col-4">
                    <h2>Broad Statistics</h2>
                    {this.state.stats.map(x=>
                        <p>{x}</p>)
                    }
                </div>
                <div className="col-2">
                <button
                            type="button"
                            className="btn btn-danger" >
                            Advanced Stats
                        </button>
                </div>
            </div>
            </div>

            <ReviewList view ={this.state.reviews}></ReviewList>
            
            <ReviewForm onReviewAdded={review => this.pushReview(review)}/>

            
            {/* <h1 className="shadow-sm mb-2">Product Reviews ({this.state.product.views.length})</h1> */}
        </div>

        

        </>
    }
}