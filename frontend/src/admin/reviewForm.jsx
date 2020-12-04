import React from 'react';
import { UserRepository } from '../api/userRepository'
import { Link } from 'react-router-dom';
import { StatRepository } from '../api/statRepository'
import { Redirect } from 'react-router-dom';

export class ReviewForm extends React.Component {
    userRepository = new UserRepository();
    statRepository = new StatRepository();

    state = {
        userName: '',
        rating: '',
        comment: '',
        numUp: '',
        numDown: '',
        country: '',
        countryList: [],
        users: []
    };

    onReviewClick() {
        // check if the user exist
        if(this.state.userName == '' || this.state.rating == '' || this.state.comment == '' 
            || this.state.numDown == '' || this.state.numUp == '' || this.state.country == ''){
            alert("Please fill out the blanks!");
        }
        else if( isNaN(this.state.numUp) || isNaN(this.state.numDown)){
            alert("Please enter a number for Thumbs up / Thumbs down!");
        }
        else if(parseInt(this.state.numDown) < 0 || parseInt(this.state.numUp) < 0){
            alert("Please enter a positive number");
        }
        else {
            this.userRepository.getUser(this.state.userName)
                .then((user) => {
                    //add review
                    if(user.data[0] === undefined) {
                        alert("User does not exist!");
                    }
                    else {
                        this.statRepository.addRating(this.state.rating, this.state.comment, this.state.userName, this.state.numUp,
                                this.state.numDown, this.state.country)
                                    .then(() => {
                                        alert("Review added!");
                                        window.location.reload(false);
                                    });
                        
                    }
                })
                .catch(()=>{
                    alert("User does not exist!");
                });
        }
    }
    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>
        }
        return<>
                <form action="">
                <div className="form-row">
                    <div className="col-md-6">
                        <label htmlFor="inputName">Your Name</label>
                        <select id="inputName" 
                                className="form-control"
                                defaultValue=''
                                onChange={ event => this.setState({userName: event.target.value})}>
                            <option></option>
                            {
                                this.state.users.map((user, i)=>
                                        <option key={i}>{user.Username}</option>
                                )
                            }
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="country">Country</label>
                        <select id="country" 
                                className="form-control"
                                defaultValue=''
                                onChange={ event => this.setState({country: event.target.value})}>
                            <option></option>
                            {
                                this.state.countryList.map((country, i)=>
                                        <option key={i}>{country.Name}</option>
                                )
                            }
                        </select>
                    </div>
                    
                </div>
                <br/>
                <div className="form-row">
                    <div className="col-md-4">
                        <label htmlFor="numUp">Thumbs up</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                id="numUp"
                                defaultValue=''
                                onChange={ event => this.setState({numUp: event.target.value})} />
                    </div>
                    <div className="col-md-4">
                    <label htmlFor="numDown">Thumbs down</label>
                        <input 
                                type="text" 
                                className="form-control" 
                                id="numDown"
                                defaultValue=''
                                onChange={ event => this.setState({numDown: event.target.value})} />
                    </div>
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

        <br/>

        </>;
    }

    componentDidMount() {
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
        this.userRepository.getUsers()
            .then( users => this.setState({users: users.data}))
    }
}