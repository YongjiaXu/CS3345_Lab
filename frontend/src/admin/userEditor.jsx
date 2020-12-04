import React from 'react';
import { UserRepository } from '../api/userRepository'
import { StatRepository } from '../api/statRepository'
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export class UserEditor extends React.Component {
    userRepository = new UserRepository();
    statRepository = new StatRepository();

    state = {
        user: {},
        username: this.props.match.params.username,
        usernameNew: '',
        password: '',
        homeCountry: '',
        permission: '',
        countryList: []
    }

    onSave () {
        let changed = false;
        let adminDirect = false;
        if(this.state.usernameNew != '' && this.state.usernameNew != this.state.user.Username){
            changed = true;
            if(this.state.username == this.state.user.Username){
                adminDirect = true;
                this.userRepository.updateUsername(this.state.usernameNew, this.state.user.Username, this.state.user.Password, 
                    this.state.user.UserPerms, this.state.user.HomeCountry)
                    .then(() => {changed = true;
                        alert('directing you back to login page!');
                        this.setState({ redirect : '/' });
                    });
            }
            else{
                this.userRepository.updateUsername(this.state.usernameNew, this.state.user.Username, this.state.user.Password, 
                    this.state.user.UserPerms, this.state.user.HomeCountry)
                    .then(() => changed = true);
            }
        }
        if(this.state.password != '' && this.state.password != this.state.user.Password){
            changed = true;
            this.userRepository.updatePwdByName(this.state.password, this.state.user.Username)
                .then(() => changed = true);
        }
        if(this.state.homeCountry != '' && this.state.user.HomeCountry != this.state.homeCountry){
            changed = true;
            console.log(this.state.homeCountry);
            this.userRepository.updateHomeCountry(this.state.homeCountry, this.state.user.Username)
                .then(() => changed = true);
        }
        if(this.state.permission !== '' && this.state.permission != this.state.user.UserPerms){
            changed = true;
            console.log(this.state.permission);
            if(this.state.username == this.state.user.Username) {
                adminDirect = true;
                this.userRepository.updateUserPerms(this.state.permission, this.state.user.Username) 
                    .then(() => {changed = true;
                        alert('directing you back to login page!');
                        this.setState({ redirect : '/' });
                    });
            }
            else {
                this.userRepository.updateUserPerms(this.state.permission, this.state.user.Username)
                    .then(() => changed = true);
            }
            
        }
        if(changed){
            alert("change updated!");
        }
    }

    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>;
        }
        return <>
         <div className="container pt-3">
             <NavBar username = {this.state.username}/>
            <h1>User Editor</h1> <br/>
            <br/>
            <div className="jumbotron" id="jumb">
                    <div className="clearfix"></div>
                    <h1 className="display-4">You can now edit user - {this.state.user.Username}!</h1>
                    <hr className="my-4"/>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-8">
                        <input type="text" 
                            className="form-control" 
                            id="username"
                            name="username"
                            defaultValue={this.state.user.Username}
                            onChange={e => {
                                this.setState({ usernameNew : e.target.value })}
                                }/>
                        {
                            this.state.username == this.state.user.Username && 
                            <small id="" className="form-text text-muted">Changing username will redirect you back to log in page</small>
                        }
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-8">
                        <input type="text" 
                            className="form-control" 
                            id="password"
                            name="password"
                            defaultValue={this.state.user.Password}
                            onChange={e => this.setState({ password : e.target.value })}/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="homeCountry" className="col-sm-2 col-form-label">Home Country</label>
                        <div className="col-sm-8">
                            <select id="homeCountry" 
                                    className="form-control"
                                    value = {this.state.homeCountry}
                                    onChange={ event => this.setState({homeCountry: event.target.value})}>
                                <option></option>
                                {
                                    this.state.countryList.map((country, i)=>
                                            <option key={country.Name} value={country.Name}>{country.Name}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="permission" className="col-sm-2 col-form-label">Admin Status</label>
                        <div className="col-sm-8">
                        <div className="text-center">
                            <input type="checkbox" 
                                id="permission"
                                name="permission"
                                defaultChecked={this.state.user.UserPerms}
                                onClick={e => this.setState({ permission : e.target.checked })}
                                />
                                {
                                    this.state.username == this.state.user.Username && 
                                    <small id="" className="form-text text-muted">Changing admin status will redirect you back to log in page</small>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="button"
                            className="btn btn-primary align-center"
                            id ="save"
                            onClick={() => this.onSave()}>
                            Save
                        </button>
                    </div>
                    <div className="text-center">
                        <Link className="btn btn-secondary align-center" 
                                id="return"
                                to={"/admin/"+this.state.username + "/users"}>
                                    Return
                        </Link>
                    </div>
                </div>
           
        
            <br/>
        </div>
        </>
    }

    componentDidMount() {
        let userId = this.props.match.params.user;
        if(userId) {
            this.userRepository.getUser(userId)
                .then( u =>{
                    this.setState({user: u.data[0]});
                    this.setState({homeCountry: u.data[0].HomeCountry});
                });
        }
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
    }
}