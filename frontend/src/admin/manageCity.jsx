import React from 'react';
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { StatRepository } from '../api/statRepository'
import { CitiesList } from './citiesList';

export class ManageCity extends React.Component {
    statRepository = new StatRepository();

    state = {
        cities : [],
        username : this.props.match.params.username
    }

    onCityDelete(name){
        if(window.confirm("Are you sure you want to delete this city?")){
            this.statRepository.deleteCity(name)
                .then(() => {
                    this.setState({
                        cities: this.state.cities.filter(x => x.City !== name)
                    });
                    window.location.reload(false);
                });
            
        }
    }

    render () {

        return <>
            <div className="container pt-3">
                <NavBar username = {this.state.username}/> <br/>
                <Link className="btn btn-outline-success float-right" to={"/admin/"+this.state.username+"/stats/addCity"}>
                    Add City
                </Link>
                <h1>Manage Cities</h1>

                <div className="clearfix"></div>
                <CitiesList username = { this.state.username } cities= {this.state.cities} onDelete = {city => this.onCityDelete(city)}/>
                <div className="text-center">
                    <Link className="btn btn-secondary" to={"/admin/"+this.state.username+'/stats'}>Return</Link>
                </div>
                <br/>
                <br/>
            </div>
        </>
    }
    componentDidMount() {
        this.statRepository.getCities()
            .then(c => this.setState({cities : c.data}));
    }
}