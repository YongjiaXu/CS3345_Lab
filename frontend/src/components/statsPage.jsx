import {BrowserRouter as Router, Link , Switch} from 'react-router-dom'
import React from 'react'
import { RiVirusLine } from 'react-icons/ri';
import {Table , Button} from 'reactstrap' 
import {StatRepository} from '../api/statRepository'
import {Chart} from './chart'
import './statsPage.css'

export class StatsPage extends React.Component {

    statsRepository = new StatRepository();

    constructor (props) {
        super(props);

        this.state = {
            country: this.props.location.state.country,
            cities: [], 
            userName: this.props.location.state.username,
            data: null,
            speed: 15
        }
    }

    

    componentDidMount(){

        this.statsRepository.getCitiesOfCountry(this.state.country.Name)
        .then(content => {
            this.setState({cities: content.data})

            let labelValues = []
            let caseDataValues = []
            let deathDataValues = []

            for(let a = 0; a < this.state.cities.length; a++){
                labelValues.push(this.state.cities[a].City)
                caseDataValues.push(this.state.cities[a].CaseNum)
                deathDataValues.push(this.state.cities[a].DeathNum)
            }

            this.setState({
                data: {
                    
                    labels: labelValues,
                    datasets: [
                        {
                            label: 'Case #',
                            backgroundColor: 'rgba(55,99,132,0.2)',
                            borderColor: 'rgba(55,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(55,99,132,0.4)',
                            hoverBorderColor: 'rgba(55,99,132,1)',
                            data: caseDataValues
                        },
                        {
                            label: 'Death #',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: deathDataValues
                        }
                    ]
                }
            })

        })
        .catch(e => console.log(`Error in ComponeneDidMount in StatsPage: ${e}`))
    }

    render() {

        return (
            <>
                {/* <nav aria-label="breadcrumb" style={{ marginLeft: '8%', marginRight: '8%'}}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to={{pathname: `/dashboard/${this.state.userName}`}}> Dashboard </Link>
                        </li>

                        <li className="breadcrumb-item active"> Statistics Page</li>

                        <li style={{marginLeft: '80%', marginRight: '19%'}}>
                            <Link className="breadcrumb-item active" to="/">
                                <Button color="danger">Logout</Button>
                            </Link>
                        </li>
                    </ol>
                </nav> */}
                <div className="container pt-3">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={{pathname: `/dashboard/${this.state.userName}`}}>
                    <RiVirusLine id='virus' size={30}/>
                        <div className="navbar-brand .text-primary" id='dashboard'> Dashboard </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <div id='list-item'>Statistics Page</div>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <Link className="btn btn-secondary" to='/'>Logout</Link>
                        </div>
                    </div>
                </nav>
                <br/>
                <div className='float-right'>
                    <Link to={{pathname: `/dashboard/${this.state.userName}/comment` , state: {country: this.state.country, username: this.state.userName}}}>
                        <Button color="warning">View Reviews</Button>
                    </Link>
                </div>
                <div className="display-4" id='country-title'>&nbsp;&nbsp;{this.state.country.Name}</div>
                <div className='clearfix'></div>
                <div style={{marginTop: '2%'}}>
                    {
                        this.state.data ?

                        <div>
                            <Chart content={{data: this.state.data, country: this.state.country, title: 'Case & Death Stats', population: this.state.country.population}}/>
                        </div>
                        :

                        (null)
                    }
                </div>

                <div style={{textAlign: 'center', marginTop: '5%'}}>
                    <h2>Per City Statistics</h2>
                </div>

                <div className='container'>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.cities ?

                                this.state.cities.map((city,index) => {

                                    return(
                                        <tr key={index}>
                                            
                                            <td className='text-center'>
                                                {city.City}
                                            </td>
                                            <td className='text-center'>
                                                {city.CaseNum}
                                            </td>
                                            <td className='text-center'>
                                                {city.DeathNum}
                                            </td>
                                        </tr>
                                    );

                                })

                                :

                                (null)
                            }
                        </tbody>
                    </table>
                    {
                                this.state.cities.length === 0 ?
                                    
                                    <div style={{textAlign: 'center'}}>
                                        <h4>No Cities registered in {this.state.country.Name}...</h4>
                                    </div>
                                :
                                (null)
                            }
                </div>
                

                <br/>
                <div className="text-center">
                    <Link className="btn btn-secondary" to={{pathname: `/dashboard/${this.state.userName}`}}>Return</Link>
                </div>
                <br/>
                <br/>
                </div>
            </>
        );
    }
}