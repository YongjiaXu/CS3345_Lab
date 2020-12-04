import React from 'react';
import { StatRepository } from '../api/statRepository'
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import './countryEditor.css'
export class CountryEditor extends React.Component {
    statRepository = new StatRepository();
    state = {
        country: {},
        caseNum: '',
        deathNum: '',
        alertLevel: '',
        alertDesc: '',
        imageMap: '',
        disabled: '',
        cities: [],
        username : this.props.match.params.username,
        alertLevelOptions : [0,1,2,3,4,5,6,7,8,9],
        alertDescOptions : ["no risk", "Risk is Low", "Risk is med-low", "Risk is medium","Risk is med-high", "Risk is High"]
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

    onSave() {
        console.log(this.state.disabled);
        var update = -1;
        // update case num
        if((parseInt(this.state.caseNum) < 0 || isNaN(this.state.caseNum)) && this.state.caseNum != 'null'){
            alert("please enter a non-negative number for Num of Cases!");
        }
        else if(this.state.caseNum != ''){
            update = 1
            //update the data
            this.statRepository.updateCoCaseNum(this.state.country.Name, this.state.caseNum)
                .then(() => {});
        }

        // update death num
        if((parseInt(this.state.deathNum) < 0 || isNaN(this.state.deathNum)) && this.state.deathNum != 'null'){
            alert("please enter a positive number for Num of Death!");
        }
        else if(this.state.deathNum != ''){
            update = 1
            //update the data
            this.statRepository.updateCoDeathNum(this.state.country.Name, this.state.deathNum)
                .then(() => {});
        }

        // update alert level
        if(this.state.alertLevel != '') {
            update = 1
            var level = "Level " + this.state.alertLevel;
            this.statRepository.updateCoAlertLevel(this.state.country.Name, level)
                .then( () => {});
        }
        
        // update alert description
        if(this.state.alertDesc != '') {
            update = 1
            this.statRepository.updateCoAlertDesc(this.state.country.Name, this.state.alertDesc)
                .then(() => {});
        }


        // update image graph
        if(this.state.imageMap != ''){
            update = 1
            this.statRepository.updateCoImageMap(this.state.imageMap, this.state.country.Name)
                .then( () => {});
        }

        if(this.state.disabled !== ''){
            update = 1
            this.statRepository.updateCoDisable(this.state.disabled, this.state.country.Name)
                .then( () => {});
        }

        //
        if(update === 1) {
            alert("Changes updated!");
            window.location.reload(false);
        }
    }

    render () {
        return <>
         <div className="container pt-3">
             <NavBar username = {this.state.username}/>
            <h1>Country Editor</h1> <br/>
            <h3> You can now edit country - {this.state.country.Name}</h3>
            <br/>
            <div className="jumbotron" id="jumb">
                <h3> Population : {this.state.country.Population}</h3>
                <div className="row">
                    <h3 className="col-sm-6"> Num of Cases : {this.state.country.CaseNum}</h3>
                    <h3 className="col-sm-6"> Num of Death : {this.state.country.DeathNum}</h3>
                </div>
                <div className="row">
                    <h3 className="col-sm-6"> Alert Level : {this.state.country.AlertLevel}</h3>
                    <h3 className="col-sm-6"> Alert Descrption : {this.state.country.AlertDesc}</h3>
                </div>
                <hr className="my-4"/>
                <table className='table' >
                        <thead className='thead-dark'>
                            <tr>

                                <th className='text-center'>
                                    City
                                </th>
                                <th className='text-center'>
                                    Total Cases
                                </th>
                                <th className='text-center'>
                                    Total Deaths
                                </th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cities ?

                                this.state.cities.map((city,index) => {

                                    return(
                                        <tr key={index} >
                                            
                                            <td className='text-center table-light'>
                                                {city.City}
                                            </td>
                                            <td className='text-center table-light'>
                                                
                                                <input type="text"
                                                    id="caseNum"
                                                    name="caseNum"
                                                    className="form-control"
                                                    defaultValue={city.CaseNum}
                                                    onChange={event => {
                                                            let num = event.target.value;
                                                            if(parseInt(num) >=0 && !isNaN(num) && num != ''){
                                                                this.statRepository.updateCiCaseNum(city.City, num)
                                                                    .then(() => window.location.reload(false));
                                                            }
                                                        }} />
                                            </td>
                                            <td className='text-center table-light'>
                                                
                                                <input type="text"
                                                    id="deathNum"
                                                    name="deathNum"
                                                    className="form-control"
                                                    defaultValue={city.DeathNum}
                                                    onChange={event => {
                                                        let num = event.target.value;
                                                        if(parseInt(num) >=0 && !isNaN(num) && num != ''){
                                                            this.statRepository.updateCiDeathNum(city.City, num)
                                                                .then(() => window.location.reload(false));
                                                        }
                                                    }} />
                                            </td>
                                            <td className="text-center table-light">
                                                <button type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={ () => this.onCityDelete(city.City) }
                                                        >
                                                            delete
                                                </button>
                                            </td>
                                        </tr>
                                    );

                                })

                                :

                                (null)
                            }
                        </tbody>
                    </table>
                <hr className="my-4"/>
                {
                    this.state.country.imageMap && <figure >
                        <img className="mx-auto d-block img-fluid" src={this.state.country.imageMap}
                            title={this.state.country.Name+" heat map"} 
                            alt={this.state.country.Name+" heat map"}/>
                        <figcaption className="text-center">{this.state.country.Name+" heat map"} </figcaption>
                    </figure>
                }
                {
                    (!this.state.country.imageMap || this.state.country.imageMap == '') && <h6 className="text-center">This country does not have a heat map yet</h6>
                }
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
            <div className="form-group row">
            <label htmlFor="alertLevel" className="col-sm-2 col-form-label">Alert Level</label>
                <div className="col-sm-4">
                    <select
                            name="alertLevel"
                            id="alertLevel"
                            className="form-control"
                            defaultValue=''
                            onChange={event => this.setState({ alertLevel: event.target.value })}>
                            <option></option>
                            {
                                this.state.alertLevelOptions.map((x,i)=>
                                    <option key={i}>{x}</option>
                                )
                            }
                        </select>
                </div>
                <label htmlFor="alertDesc" className="col-sm-2 col-form-label">Alert Desc</label>
                <div className="col-sm-4">
                <select
                        name="alertDesc"
                        id="alertDesc"
                        className="form-control"
                        defaultValue=''
                        onChange={event => this.setState({ alertDesc: event.target.value })}>
                        <option></option>
                        {
                            this.state.alertDescOptions.map((x,i)=>
                                <option key={i}>{x}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="imageMap" className="col-sm-2 col-form-label">Image map</label>
                <div className="col-sm-10">
                    <input type="text"
                        id="imageMap"
                        name="imageMap"
                        className="form-control"
                        defaultValue=''
                        onChange={event => this.setState({ imageMap: event.target.value })} />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="disabled" className="col-sm-2 col-form-label">Disabled</label>
                <div className="col-sm-10">
                    <input type="checkbox" 
                                id="disabled"
                                name="disabled"
                                defaultChecked={this.state.country.disabledStatus}
                                onClick={e => this.setState({disabled: e.target.checked})}
                                />
                </div>
            </div>
            <br/>
            <div>
                <button type="button"
                    className="btn btn-primary btn-block"
                    onClick={() => this.onSave()}>
                    Save
                </button>
                <Link className="btn btn-secondary btn-block" to={"/admin/"+this.state.username+"/stats/country"}>Return</Link>
                <br/>
                <br/>
            </div>
        </div>
        </>
    }

    componentDidMount () {
        let countryName = this.props.match.params.country;
        if(countryName) {
            this.statRepository.getCountry(countryName)
                .then(c => this.setState({country : c.data[0]}))
        }
        this.statRepository.getCitiesOfCountry(countryName)
            .then(cities => this.setState({cities: cities.data}))
    }
}