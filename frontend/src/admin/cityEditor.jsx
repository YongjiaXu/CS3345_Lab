import React from 'react';
import { StatRepository } from '../api/statRepository'
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export class CityEditor extends React.Component {
    statRepository = new StatRepository();
    state = {
        city: {},
        country: '',
        caseNum: '',
        deathNum: '',
        username : this.props.match.params.username
    }

    onSave() {
        console.log(this.state.city.City+' '+this.state.caseNum+ " "+this.state.deathNum);
        var update = -1;
        // update case num
        if((parseInt(this.state.caseNum) < 0 || isNaN(this.state.caseNum)) && this.state.caseNum != ''){
            alert("please enter a non-negative number for Num of Cases!");
        }
        else if( this.state.caseNum != ''){
            //update the data
            update = 1
            this.statRepository.updateCiCaseNum(this.state.city.City, this.state.caseNum)
                .then(() => {});
        }

        // update death num
        if((parseInt(this.state.deathNum) < 0 || isNaN(this.state.deathNum)) && this.state.deathNum != ''){
            alert("please enter a positive number for Num of Death!");
        }
        else if( this.state.deathNum != ''){
            //update the data
            update = 1
            this.statRepository.updateCiDeathNum(this.state.city.City, this.state.deathNum)
                .then(() => {});
        }

        if(update === 1) {
            alert("Changes updated!");
            window.location.reload(false);
        }
    }

    render () {
        return <>
         <div className="container pt-3">
             <NavBar username = {this.state.username}/>
            <h1>City Editor</h1> <br/>
            <h3> You can now edit city - {this.state.city.City}</h3>
            <br/>
            <div className="card bg-light mb-3">
                <div className="card-body">
                    <div className="card-text text-secondary">
                        <h3> Country : { this.state.city.Country }</h3>
                        <div className="row">
                            <h3 className="col-sm-6"> Num of Cases : {this.state.city.CaseNum}</h3>
                            <h3 className="col-sm-6"> Num of Death : {this.state.city.DeathNum}</h3>
                        </div>
                        {/* <p className="float-right btn btn-sm btn-outline-danger"> delete </p> */}
                    </div>

                    <div className="clearfix"></div>
                </div>
            </div>
            <br/>
            <hr/>
            <h3> Please make your change below: </h3> <br/>
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
                <label htmlFor="deathNum" className="col-sm-2 col-form-label">Num of Death</label>
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
                <br/>
                <br/>
            </div>
        </div>
        </>
    }

    componentDidMount () {
        let cityName = this.props.match.params.city;
        if(cityName) {
            this.statRepository.getCity(cityName)
                .then(c => this.setState({city : c.data[0]}))
        }
    }
}