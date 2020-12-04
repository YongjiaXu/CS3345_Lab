import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './navBar';
import { StatRepository } from '../api/statRepository'
import { UserRepository } from '../api/userRepository'
import { Redirect } from 'react-router-dom';
import './viewAccount.css'


export class ViewAccount extends React.Component {

    userRepository = new UserRepository();
    statRepository = new StatRepository();

    state = {
        usernameOld : this.props.match.params.username,
        username: '',
        password : '',
        homeCountry: '',
        permission: '',
        user : {},
        countryList: []
    }
    
    onSave() {
        let changed = false;
        if(this.state.username != '' && this.state.username != this.state.usernameOld){
            changed = true;
            this.userRepository.updateUsername(this.state.username, this.state.user.Username, this.state.user.Password, this.state.user.UserPerms,
                    this.state.user.HomeCountry)
                .then(() => {changed = true;
                    alert('directing you back to login page!');
                    this.setState({ redirect : '/' });
                });
        }
        if(this.state.password != '' && this.state.password != this.state.user.Password){
            changed = true;
            this.userRepository.updatePwdByName(this.state.password, this.state.user.Username)
                .then(() => {changed = true});
        }
        if(this.state.homeCountry != '' && this.state.user.HomeCountry != this.state.homeCountry){
            changed = true;
            this.userRepository.updateHomeCountry(this.state.homeCountry, this.state.user.Username)
                .then(() => changed = true);
        }
        if(this.state.permission !== '' && this.state.permission != this.state.user.UserPerms){
            changed = true;
            console.log(this.state.permission);
            this.userRepository.updateUserPerms(this.state.permission, this.state.user.Username)
                .then(() => {changed = true;
                    alert('directing you back to login page!');
                    this.setState({ redirect : '/' });
                });
        }
        if(changed){
            alert("change updated!");
        }
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}></Redirect>;
        }
        return <>
            <div className="container pt-3">
                <NavBar username = {this.state.usernameOld}/> <br/>
                <h1>View account</h1>
                <div className="jumbotron" id="jumb">
                    <div className="clearfix"></div>
                    <h1 className="display-4">Welcome, {this.state.usernameOld}!</h1>
                    <p className="lead"> You could make changes to your account </p>
                    <hr className="my-4"/>
                    <div className="form-group row">
                        <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                        <div className="col-sm-8">
                        <input type="text" 
                            className="form-control" 
                            id="username"
                            name="username"
                            defaultValue={this.state.user.Username}
                            onChange={e => this.setState({ username : e.target.value })}/>
                        <small id="" className="form-text text-muted">Changing username will redirect you back to log in page</small>
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
                                <small id="" className="form-text text-muted">Changing admin status will redirect you back to log in page</small>
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
                                to={"/admin/"+this.state.usernameOld}>
                                    Return
                        </Link>
                    </div>
                </div>
                
            </div>
        </>
    }
    componentDidMount() {
        if(this.state.usernameOld) {
            this.userRepository.getUser(this.state.usernameOld)
                .then(user => {
                    this.setState({user: user.data[0]});
                    this.setState({homeCountry: user.data[0].HomeCountry});
                });
        }
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
    }
}