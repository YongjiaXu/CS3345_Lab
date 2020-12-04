import React from 'react';

import { Link } from 'react-router-dom';
import { StatRepository } from '../../api/statRepository'
import { UserRepository } from '../../api/userRepository'
import { Redirect } from 'react-router-dom';

export class CommentSubmissionBox extends React.Component {
    userRepository = new UserRepository();
    statRepository = new StatRepository();

    constructor(props){
        super(props);

        this.state = {
            userName: this.props.content.username,
            rating: '',
            comment: '',
            country: this.props.content.country,
            refreshReviewList: this.props.content.refresh
        };
    }

    onReviewClick() {
        if(this.state.rating == '' || this.state.comment == ''){
            alert("Please fill out the blanks!");
        }
        else {
            console.log(`New Rating: ${this.state.rating}, New Comment: ${this.state.comment}, Posted in : ${this.state.country.Name}`)
            
            this.statRepository.addRating(this.state.rating, this.state.comment, this.state.userName,0,0, this.state.country.Name)
            .then((e) => { 
                console.log("Working")
                this.setState({rating: '', comment: ''})
                console.log("Posted")
                console.log(e)
                window.location.reload(false)
        
            })
            .catch(e => {
                console.log("Error Adding Review. Check CommentSubmission") 
                console.log(e)}
            );
            
            this.props.content.refresh()
        }
    }
    render () {

        return (
            <>
            <form action="" style={{alignContent: 'center'}}>
                <br/>
                <div className="form-row">
                    <div className="col-md-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" 
                                className="form-control"
                                defaultValue=''
                                onChange={ event => this.setState({rating: event.target.value})}>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>

                <br/>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea className="form-control" 
                            id="comment" 
                            rows= "5"
                            value = {this.state.comment}
                            onChange={ event => this.setState({comment: event.target.value})}></textarea>
                </div>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={()=>this.onReviewClick() } >
                        Submit
                </button>
            </form>
            </>
        );
    }
}

/*


<form action="">
                <div className="form-row">
                    
                <div className="col-md-4">
                        <label htmlFor="rating">Rating</label>
                        <select id="rating" 
                                className="form-control"
                                defaultValue=''
                                onChange={ event => this.setState({rating: event.target.value})}>
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                        </select>
                    </div>
                </div>
                <br/>


                <br/>
                <div className="form-group">
                    <label htmlFor="comment">Comment</label>
                    <textarea className="form-control" 
                            id="comment" 
                            rows= "5"
                            value = {this.state.comment}
                            onChange={ event => this.setState({comment: event.target.value})}></textarea>
                </div>

                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={()=>this.onReviewClick() } >
                        Submit
                </button>
                
                </form>



*/