import React from 'react';
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { CountriesList } from './countriesList';
import { StatRepository } from '../api/statRepository'

export class ManageCountry extends React.Component {
    statRepository = new StatRepository();

    state = {
        countries : [],
        username : this.props.match.params.username
    }

    onCountryDelete(countryName) {
        if(window.confirm("Are you sure you want to delete this country?")){
            this.statRepository.deleteCountry(countryName)
                .then(() => {
                    this.setState({
                        users: this.state.countries.filter(x => x.Name !== countryName)
                    });
                    window.location.reload(false);
                });
            
        }
    }

    onCountryDisable(disabled, countryName){
        console.log(disabled+' '+countryName);
        this.statRepository.updateCoDisable(disabled, countryName)
            .then( () => window.location.reload(false));
    }

    render () {

        return <>
            <div className="container pt-3">
                <NavBar username = {this.state.username}/> <br/>
                <Link className="btn btn-outline-success float-right" to={"/admin/"+this.state.username+"/stats/addCountry"}>
                    Add Country
                </Link>
                <h1>Manage Countries</h1>

                <div className="clearfix"></div>
                <CountriesList username = { this.state.username } 
                                countries= {this.state.countries} 
                                onDisable = {(disabled,countryName) => this.onCountryDisable(disabled, countryName)}
                                onDelete = {countryName => this.onCountryDelete(countryName)}/>
                <div className="text-center">
                    <Link className="btn btn-secondary" to={"/admin/"+this.state.username+'/stats'}>Return</Link>
                </div>
                <br/>
                <br/>
            </div>
        </>
    }
    componentDidMount() {
        this.statRepository.getCountries()
            .then(c => this.setState({countries : c.data}));
    }
}