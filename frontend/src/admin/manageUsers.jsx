import React from 'react';
import { Link } from 'react-router-dom';
import { UserRepository } from '../api/userRepository'
import { NavBar } from './navBar';
import { UsersList } from './usersList';
import { StatRepository } from '../api/statRepository'
import './manageUsers.css'

export class ManageUsers extends React.Component {

    userRepository = new UserRepository();
    statRepository = new StatRepository();

    state = {
        users: [],
        createUsername: '',
        password: '',
        country: '',
        admin: false,
        username : this.props.match.params.username,
        countryList: []
    }

    onUserDelete(username) {
        if(window.confirm("Are you sure you want to delete this user?")){
            this.userRepository.deleteUser(username)
                .then(() => {
                    this.setState({
                        users: this.state.users.filter(x => x.Username !== username)
                    });
                    window.location.reload(false);
                });
            
        }
    }

    onSave() {
        if(this.state.createUsername == '' || this.state.password == '' || this.state.country == ''){
            alert("Please fill in all the blanks!");
        }
        else {
            this.userRepository.addUser(this.state.createUsername, this.state.password, this.state.country, this.state.admin)
                .then(()=>{
                    alert("User added!");
                    window.location.reload(false);
                });
            

        }
    }

    render() {
        return <>
            <div className="container pt-3">
                <NavBar username = {this.state.username}/> <br/>
                <h1>Manage user accounts</h1>

                <div className="dropdown">
                    <button className="btn btn-block btn-outline-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Add User
                    </button>
                    <div className="dropdown-menu w-100" id="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <form action="" >
                            <div className="form-group row">
                                <label htmlFor="createUsername" className="col-sm-2 col-form-label">Username</label>
                                <div className="col-sm-4">
                                <input type="text"
                                    id="createUsername"
                                    name="createUsername"
                                    className="form-control"
                                    defaultValue=''
                                    onChange={event => {
                                        this.setState({ createUsername: event.target.value });
                                        }} />
                                </div>
                                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-4">
                                <input type="text"
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    defaultValue=''
                                    onChange={event => this.setState({ password: event.target.value })} />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label htmlFor="country" className="col-sm-2 col-form-label">Home Country</label>
                                <div className="col-sm-4">
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
                                <label htmlFor="permission" className="col-sm-2 col-form-label">Permission</label>
                                    <div className="col-sm-4">
                                        <label id="admin-label">
                                            <input type = "checkbox" name = "perm" id = "admin"
                                                defaultValue=''
                                                onChange={e => {
                                                    this.setState({ admin: !this.state.admin });
                                                    }}/>
                                            Admin
                                        </label>
                                    </div>
                            </div>
                            <div>
                                <button type="button"
                                    className="btn btn-outline-success btn-block"
                                    onClick={() => this.onSave()}>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                    <br/>
                </div>
                
            <UsersList username = {this.state.username }users = { this.state.users } onDelete={ username => this.onUserDelete(username) }/>
            <div className="text-center">
                <Link className="btn btn-secondary" to={"/admin/"+this.state.username}>Return</Link>
            </div>
            <br/>
            <br/>
            </div>
        </>
    }

    componentDidMount() {
        this.userRepository.getUsers()
            .then(u => this.setState({users: u.data}));
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
    }
}