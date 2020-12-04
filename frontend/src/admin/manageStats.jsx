import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar } from './navBar';
import { UserRepository } from '../api/userRepository'
import { StatRepository } from '../api/statRepository'
import { CountriesList } from './countriesList';
import { ImEarth } from 'react-icons/im';
import { MdLocationCity } from 'react-icons/md';

export class ManageStats extends React.Component {
    userRepository = new UserRepository();
    statRepository = new StatRepository();
    state = {
        countries : [],
        username : this.props.match.params.username
    }
    render() {
        return <>
        
         <div className="container pt-3">
            <NavBar username = {this.state.username}/> <br/><br/>
            <div className="jumbotron" id="jumb">
                <Link className="btn btn-secondary float-right" to={"/admin/"+this.state.username}>Return</Link>
                <div className="clearfix"></div>
                <h1 className="display-4">Manage Statistics</h1>
                <hr className="my-4"/>
                <div className="card-deck">
                    <Link to={'/admin/'+this.state.username+'/stats/country'} style={{ textDecoration: 'none' }} className="card">
                        <div className="card-body btn" id="country">
                            <ImEarth className="card-img-top"size={70}/>
                            <br/><br/>
                            <h5 className="card-title text-center">
                                Edit countries
                            </h5>
                        </div>
                    </Link>
                    <Link to={'/admin/'+this.state.username+'/stats/city'} style={{ textDecoration: 'none' }} className="card">
                        <div className="card-body btn" id="city">
                            <MdLocationCity className="card-img-top"size={70}/>
                            <br/><br/>
                            <h5 className="card-title text-center">
                                Edit cities
                            </h5>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
        </>
    }

    componentDidMount() {
        this.statRepository.getCountries()
            .then(c => this.setState({countries : c.data}));
    }
}