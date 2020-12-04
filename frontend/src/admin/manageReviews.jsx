import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './navBar';
import { ReviewsList } from './reviewsList';
import { UserRepository } from '../api/userRepository'
import { ReviewForm } from './reviewForm';
import { StatRepository } from '../api/statRepository'

export class ManageReviews extends React.Component {
    statRepository = new StatRepository();

    userRepository = new UserRepository();
    state = {
        reviews: [],
        username : this.props.match.params.username
    }

    onRatingDelete(id) {
        if(window.confirm("Are you sure you want to delete this rating?")){
            this.statRepository.deleteRating(id)
                .then(() => {
                    this.setState({
                        users: this.state.reviews.filter(x => x.id !== id)
                    });
                    window.location.reload(false);
                });
            // 
        }
    }

    onThumbUp(id){
        this.statRepository.numUpIncrement(id)
            .then(()=> window.location.reload(false));
    }

    onThumbDown(id){
        this.statRepository.numDownIncrement(id)
            .then(()=> window.location.reload(false));
        
    }

    render() {
        return <>
            <div className="container pt-3">
                <NavBar username = {this.state.username}/> <br/>
                <h1>Manage Reviews</h1>
                <div className="dropdown ">
                    <button className="float-right btn btn-outline-success dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                        Add Review
                    </button>
                    <div className="clearfix"></div>
                    <div className="dropdown-menu-right w-100 dropdown-menu" id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <ReviewForm/>
                    </div>
                </div>
                <ReviewsList reviews = {this.state.reviews} onDelete={ id => this.onRatingDelete(id) }  
                                onClickUp={ id => this.onThumbUp(id) }
                                onClickDown = { id => this.onThumbDown(id) }/>
                <div className="text-center">
                    <Link className="btn btn-secondary" to={"/admin/"+this.state.username}>Return</Link>
                </div>
                <br/>
                <br/>
            </div>
        </>
    }
    componentDidMount() {
        this.userRepository.getRatings()
            .then( reviews => this.setState({reviews: reviews.data}));
    }
}