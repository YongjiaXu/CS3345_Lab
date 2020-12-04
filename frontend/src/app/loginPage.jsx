
import React from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { StatRepository } from '../api/statRepository'
import { UserRepository } from '../api/userRepository'
import { RiVirusLine } from 'react-icons/ri';
import './loginPage.css'


export class LoginPage extends React.Component {
    statRepository = new StatRepository();
    userRepository = new UserRepository();

    state = {
        username: "",
        password: "",
        countryList: [],
        speed: 15
    }

    onSave() {
        if(this.state.createUsername == '' || this.state.password == '' || this.state.countr == ''){
            alert("Please fill in all the blanks!");
        }
        else if(!isNaN(this.state.country)){
            alert("Country should be a string!");
        }
        else {
            this.userRepository.addUser(this.state.createUsername, this.state.password, this.state.country, 0)
                .then(()=>{
                    alert("User added!");
                    window.location.reload(false);
                });
        }
    }

    onLogIn(username) {
        if (this.state.username == '') {
            alert('Please enter username! ');
        }
        else if ( this.state.password == '') {
            alert('Please enter password! ');
        }
        else {
            this.userRepository.getUser(username)
                .then((user) => {
                    this.setState({confirmusername: user.data[0].Username });
                    this.setState({correctKey: user.data[0].Password });
                    this.setState({perm: user.data[0].UserPerms });
                    if (user.data[0].Password == this.state.password) {
                        if(user.data[0].UserPerms == 1) {
                            this.setState({ redirect: '/loginOption/'+ username});
                        }
                        else {
                            this.setState({ redirect: `/dashboard/${this.state.username}` });
                        }
                    }
                    else {
                        alert("Wrong Password!");
                        window.location.reload(false);
                    }
                })
                .catch(()=>{
                    alert("User does not exist!");
                    window.location.reload(false);
                });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>;
        }
        return <>

            <div style={{textAlign: 'center', marginTop: '5%'}}>
            </div>
            <div className="container pt-3">
                <RiVirusLine id='virus-img' size={80} style={{animation: `spin ${this.state.speed}s linear infinite`}}/>
                <div className='text-center'>
                    <h2>CoronaVirus Tracker</h2>
                </div>
            <div className="dropdown ">
                    <button className="float-right btn btn-outline-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-toggle="dropdown" 
                            aria-haspopup="true" 
                            aria-expanded="false">
                        Create Account
                    </button>
                    <div className="dropdown-menu-right dropdown-menu w-50" id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form action="" >
                            <div className="form-group row">
                                <label htmlFor="createUsername" className="col-form-label">Username</label>
                                <input type="text"
                                    id="createUsername"
                                    name="createUsername"
                                    className="form-control"
                                    defaultValue=''
                                    onChange={event => {
                                        this.setState({ createUsername: event.target.value });
                                        }} />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="password" className="col-form-label">Password</label>
                                    <input type="text"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        defaultValue=''
                                        onChange={event => this.setState({ password: event.target.value })} />
                            </div>
                            <div className="form-group row">
                                <label htmlFor="country" className="col-form-label">Home Country</label>
                                <select id="homeCountry" 
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
                            <div>
                                <button type="button"
                                    className="btn btn-success btn-block"
                                    onClick={() => this.onSave()}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                </div>
                <div className="clearfix"></div>
                <form className="" >
                    
                    <div className="form-group">
                        <label htmlFor="username">User Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            value={this.state.username}
                            onChange={(e) => 
                                this.setState({ username: e.target.value })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={(e) => this.onLogIn(this.state.username)}>
                        Log In
                    </button>
                </form>

                    <br/>
                    
            </div>
        </>
    }
    componentDidMount() {
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
    }
}
