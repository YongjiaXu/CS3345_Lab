import React from 'react';
import { NavBar } from './navBar';
import { Link } from 'react-router-dom';
import { StatRepository } from '../api/statRepository'

export class AddCountry extends React.Component {
    statRepository = new StatRepository();

    state = {
        countryName: '',
        population: '',
        caseNum: '',
        deathNum: '',
        alertLevel: '',
        alertDesc: '',
        imageMap: '',
        disabled: '',
        username : this.props.match.params.username,
        alertLevelOptions : [0,1,2,3,4,5,6,7,8,9],
        alertDescOptions : ["no risk", "Risk is Low", "Risk is med-low", "Risk is medium","Risk is med-high", "Risk is High"]
    }
    onSave() {
        console.log(typeof(typeof(this.state.countryName)));
        console.log(typeof(this.state.alertLevel));
        if(this.state.countryName == '' || this.state.population == '' || this.state.caseNum == '' || this.state.deathNum == '' 
            || this.state.alertLevel == '' || this.state.alertLevel == '' || this.state.alertDesc == '' || this.state.alertDesc == '' 
            || this.state.imageMap == ''){
                alert('Please fill out all the blanks!');
            }
        else if(parseInt(this.state.population) < 0 || parseInt(this.state.caseNum) < 0 || parseInt(this.state.deathNum) < 0){
            alert('Please enter non-negative numbers!');
        }
        else if(!isNaN(this.state.countryName)){
            alert('Country name should be a string!');
        }
        else if(isNaN(this.state.population) || isNaN(this.state.caseNum) || isNaN(this.state.deathNum)){
            alert('Population / Num of Cases / Num of Death should be a number!');
        }
        else {
            // add the country
            var level = 'Level '+ this.state.alertLevel;
            var disable = this.state.disabled;
            if(disable == ''){
                disable = false;
            }
            console.log(this.state.countryName+'\n'+ this.state.population+'\n'+ this.state.caseNum+'\n'+ this.state.deathNum+'\n'+ 
              level+'\n'+ this.state.alertDesc+'\n'+ disable+'\n'+ this.state.imageMap);
            this.statRepository.addCountry(this.state.countryName, this.state.population, this.state.caseNum, this.state.deathNum, 
                level, this.state.alertDesc, disable, this.state.imageMap)
                .then(()=> {
                    alert("Country add to list!");
                    window.location.reload(false);
                });

        }
    }
    render () {
        return <>
            <div className="container pt-3">
                <NavBar username={this.state.username}/>
                <h1>Add a new country</h1> <br/>
                <div className="form-group row">
                    <label htmlFor="country" className="col-sm-2 col-form-label">Country</label>
                    <div className="col-sm-4">
                    <input type="text"
                        id="country"
                        name="country"
                        className="form-control"
                        defaultValue=''
                        onChange={event => {
                            this.setState({ countryName: event.target.value });
                            }} />
                    </div>
                    <label htmlFor="population" className="col-sm-2 col-form-label">Population</label>
                    <div className="col-sm-4">
                    <input type="text"
                        id="population"
                        name="population"
                        className="form-control"
                        defaultValue=''
                        onChange={event => this.setState({ population: event.target.value })} />
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
                    <label htmlFor="alertDesc" className="col-sm-2 col-form-label">Alert Description</label>
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
                                    defaultValue=''
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
            </div>
            </div>
        </>
    }
}