import React from 'react';
import './ReviewForm.css'

export class ReviewForm extends React.Component {
    state = {
        userName: '',
        rating: '',
        comment: ''
    }

    addReview() {
        this.props.onReviewAdded({name: this.state.userName, rating: this.state.rating, comment: this.state.comment, date: new Date()});
        this.setState({userName: '', rating: 0, comment: ''});
        
    }
   

    render() {
        return (
            <form className="container">
                <h1 className="p-4 bg-dark text-white">Add Review</h1>
                <div className="row mb-4">
                    <div className="col-7">
                        <div className="form-group">
                            <label className="nametext" htmlFor="name">Name</label>
                            <input type="text" 
                                id="name"
                                className="form-control"
                                value={this.state.userName}
                                onChange={event => this.setState({userName: event.target.value})}/>
                        </div>
                    </div>

                    <div className="col-3">
                        <div className="form-group">
                            <label className="ratingtext" htmlFor="rating">Rating</label>
                            <select id="rating"
                                name="rating"
                                className="form-control"
                                value={this.state.rating}
                                onChange={event => this.setState({rating: event.target.value})}
                            >
                                <option></option>
                                <option value ="Positive">Positive</option>
                                <option value="Negative">Negative</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label className="commenttext" htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        id="comment"
                        className="form-control"
                        value={this.state.comment}
                        onChange={event => this.setState({comment: event.target.value})}>   
                    </textarea>
                </div>

                <div className="form-group">
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={ () => this.addReview() } >
                            Submit
                        </button>
                    </div>


            </form>
        )
    }


}