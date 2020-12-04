import React from 'react'
import './dashboard.css'
import Card from './card'
import { Link } from 'react-router-dom'
import {Button, CardBody, CardSubtitle, CardText, CardTitle, Collapse, Table } from 'reactstrap'
import Comment from './comment'
import {StatRepository} from '../api/statRepository'
import {Redirect} from 'react-router-dom'
import {Chart} from './chart'
import { RiVirusLine } from 'react-icons/ri';

export class Dashboard extends React.Component {

    statRepository = new StatRepository();

    constructor(props){
        super(props);

        this.state = {
            searchContent: null,
            countries: [],
            countryCount: 0,
            username: this.props.match.params.username,
            getNews: false,
            news: [], 
            redirect: '',
            country: null,
            initial: 0,
            end: 2,
            resultCountry: null, 
            totalDeath: null,
            totalCases: null,
            totalCountries: null,
            totalPopulation: null,
            speed: 15
        }

        console.log(`Checking username: ${this.state.username}`)
    }

    handleNews(){
        this.setState({getNews: !this.state.getNews})
    }

    handleSearch(){

        if(this.state.searchContent === null){
            alert("Empty Search Content! Please Enter Search Value!")
        }
        else{
            this.statRepository.getCountry(this.state.searchContent)
            .then(country => {
                
                if(country.data.length !== 0 && country.data[0].disabledStatus !== 1){
                    this.setState({country: country.data[0]})
                }else
                {
                    alert(`No Search Result for ${this.state.searchContent}`)
                }
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

    componentDidMount(){

        this.statRepository.getCountries()
        .then(countries => {

            var notDisabledCountries = countries.data.filter( singleCountry => {
                if(singleCountry.disabledStatus === 0)
                {
                    return singleCountry
                }
            })

            this.setState({countries: notDisabledCountries});

            this.setState({totalCountries: this.state.countries.length})

            let sumPop = 0;
            let sumCase = 0;
            let sumDeath = 0;

            this.state.countries.forEach(item => {
                sumPop += item.Population
                sumCase += item.CaseNum
                sumDeath += item.DeathNum
            })

            this.setState({totalPopulation: sumPop, totalCases: sumCase, totalDeath: sumDeath})
        })
        .catch(e => {
            console.log("Error in Dashboard get Countries")
            console.log(e);
        })

        let date = new Date().toISOString().slice(0,10);
    }

    render() {

        if(this.state.countries === null){
            return <div style={{alignContent: 'center'}}>
                <h2 style={{fontFamily: 'cursive'}}> Loading Contents...</h2>
            </div>
        }

        if(this.state.country){
            return <Redirect to={{pathname: `/dashboard/${this.state.username}/stats`, state: {country: this.state.country, username: this.state.username}}} />
        }

        return <>
            <div className="container pt-3" >
                {/* <nav aria-label="breadcrumb" >
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item active">Dashboard</li>

                        <li>
                            <Link className="breadcrumb-item active" to="/">
                                <Button color="danger">Logout</Button>
                            </Link>
                        </li>
                    </ol>
                </nav> */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand"> 
                        <RiVirusLine id='virus' size={30}/>
                        Dashboard 
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        
                        </ul>
                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" onChange={event => this.setState({searchContent: event.target.value})} placeholder="Search Country"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" onClick={e => this.handleSearch()}>Search</button>
                        </form> */}
                        <div>
                            <span className="form-inline my-2 my-lg-0">
                                    <label htmlFor="sort"></label>
                                    <input className="form-control mr-sm-2" type="text" onChange={event => this.setState({searchContent: event.target.value})} placeholder="Search Country" />
                                    <span>&nbsp;</span>
                                    <Button style={{verticalAlign: 'middle'}} color='success' onClick={e => this.handleSearch()}>Search</Button>
                            </span>
                        </div> 
                        <span>&nbsp;</span>
                        <span>&nbsp;</span>
                        <div className="form-inline my-2 my-lg-0">
                            <Link className="btn btn-secondary" to='/'>Logout</Link>
                        </div>
                    </div>
                </nav>
                <br/>
                {/* <div>
                    <span>
                            <label htmlFor="sort"></label>
                            <input type="text" onChange={event => this.setState({searchContent: event.target.value})} placeholder="Search Country" />
                            <span>&nbsp;</span>
                            <Button style={{verticalAlign: 'middle'}} color='success' onClick={e => this.handleSearch()}>Search</Button>
                    </span>
                </div>  */}

                <div >
                    <h2 className="text-center">Tracker Dashboard</h2> <br/>
                </div>

                <div className="row row-cols-1 row-cols-md-3">
                    {
                        this.state.countries ?

                        this.state.countries.map((country,key) => {
                            this.state.countryCount++;
                            return(
                                <div key={key}>
                                    <Card content={{country: country, username: this.state.username}}/>
                                </div>
                            )
                        })
                        :
                        (null)
                    }
                    {
                        this.state.countries === null ?

                        <div>
                            <h4>No Countries Registered...</h4>
                        </div>

                        : 

                        (null)
                    }
                </div>
                <br/>
                <br/>
            </div>
        </>
    }

}