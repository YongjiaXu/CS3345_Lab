import React from 'react';
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { StatRepository } from '../api/statRepository'

export class AddCity extends React.Component {
    statRepository = new StatRepository();

    state = {
        cityName: '',
        countryName: '',
        caseNum: '',
        deathNum: '',
        username : this.props.match.params.username,
        countryList: []
    }
    onSave() {
        if(this.state.countryName == '' || this.state.cityName == '' || this.state.caseNum == '' 
            || this.state.deathNum == ''){
                alert('Please fill out all the blanks!');
            }
        else if(parseInt(this.state.caseNum) < 0 || parseInt(this.state.deathNum) < 0){
            alert('Please enter non-negative numbers!');
        }
        else if(!isNaN(this.state.countryName)){
            alert('Country name should be a string!');
        }
        else if(isNaN(this.state.deathNum) || isNaN(this.state.caseNum)){
            alert('Num of Cases / Num of Death should be a number!');
        }
        else {
            // add the country
            console.log(this.state.countryName);
            this.statRepository.addCity(this.state.cityName, this.state.countryName, this.state.caseNum, this.state.deathNum)
                .then(()=> {
                    alert("City add to list!");
                    window.location.reload(false);
                });
        }
    }
    render () {
        return <>
            <div className="container pt-3">
                <NavBar username={this.state.username}/>
                <h1>Add a new city</h1> <br/>
                <div className="form-group row">
                    <label htmlFor="city" className="col-sm-2 col-form-label">City</label>
                    <div className="col-sm-4">
                    <input type="text"
                        id="city"
                        name="city"
                        className="form-control"
                        defaultValue=''
                        onChange={event => this.setState({ cityName: event.target.value })} />
                    </div>
                    <label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
                    <div className="col-sm-4">
                    <select id="country" 
                                className="form-control"
                                defaultValue=''
                                onChange={ event => this.setState({countryName: event.target.value})}>
                            <option></option>
                            {
                                this.state.countryList.map((country, i)=>
                                        <option key={i}>{country.Name}</option>
                                )
                            }
                        </select>
                    </div>

                </div>

                <div className="form-group row">
                    <label htmlFor="caseNum" className="col-sm-2 col-form-label">Num of Cases</label>
                    <div className="col-sm-4">
                    <input type="text"
                        id="caseNum"
                        name="caseNum"
                        className="form-control"
                        defaultValue=''
                        onChange={event => {
                            this.setState({ caseNum: event.target.value });
                            }} />
                    </div>
                    <label htmlFor="deathNum" className="col-sm-2 col-form-label">Num of Deaths</label>
                    <div className="col-sm-4">
                    <input type="text"
                        id="deathNum"
                        name="deathNum"
                        className="form-control"
                        defaultValue=''
                        onChange={event => this.setState({ deathNum: event.target.value })} />
                    </div>
                </div>
            
                <br/>
                <div>
                <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.onSave()}>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={"/admin/"+this.state.username+"/stats/city"}>Return</Link>
            </div>
            </div>
        </>
    }

    componentDidMount() {
        this.statRepository.getCountries()
            .then( countries => this.setState({countryList: countries.data}));
    }
}