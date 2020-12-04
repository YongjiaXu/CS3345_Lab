import React from 'react'

import Reviews from './commentFiles/reviews'
import {CommentSubmissionBox} from './commentFiles/commentSubmissionBox'
import CountryReview from './models/countryReview'
import Country from './models/country'
import {Link} from 'react-router-dom'
import {Button} from 'reactstrap'
import {StatRepository} from '../api/statRepository'
import {UserRepository} from '../api/userRepository'
import {FaSkullCrossbones, FaNotesMedical} from 'react-icons/fa'
import {Pie, Doughnut, Bar} from 'react-chartjs-2';
import { RiVirusLine } from 'react-icons/ri';


export class Comment extends React.Component {

    userRepository = new UserRepository();
    statRepository = new StatRepository();

    constructor(props){
        super(props);

        this.state = {
            country: this.props.location.state.country,
            reviews: [], 
            username: this.props.location.state.username,
            data: null,
            speed: 15
        };
    }

    onThumbDown(ID){

        this.statRepository.numDownIncrement(ID)
            .then(()=> window.location.reload(false));
    }

    onThumbUp(ID){

        this.statRepository.numUpIncrement(ID)
            .then(()=> window.location.reload(false));
        
    }
    

   oneReviewAdded = () => {
       
    this.statRepository.getCountryReviews(this.state.country.Name)
        .then(reviews => {
            this.setState({reviews: reviews.data})
            console.log(reviews.data)
        })
   }
   
    componentDidMount(){

        this.statRepository.getCountryReviews(this.state.country.Name)
        .then(reviews => {
            this.setState({reviews: reviews.data})

            const val = {
                labels: ['Total Death', 'Total Cases'],
                datasets: [
                  {
                    label: 'Cases',
                    backgroundColor: [
                      '#ffa000',
                      '#4caf50',
                    ],
                    hoverBackgroundColor: [
                    '#e65100',
                    '#175000',
                    ],
                    data: [this.state.country.DeathNum, this.state.country.CaseNum]
                  }
                ]
              }
              this.setState({val})
              console.log("Checking Val...")
              console.log(val)
        })
    }

    render() {
        return (
        <div className="container pt-3">

                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={{pathname: `/dashboard/${this.state.username}`}}>
                        <RiVirusLine id='virus' size={30}/>
                        <div className="navbar-brand .text-primary" id='dashboard'> Dashboard </div>
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <div id='list-item'>Reviews</div>
                            </li>
                        </ul>
                        <div className="form-inline my-2 my-lg-0">
                            <Link className="btn btn-secondary" to='/'>Logout</Link>
                        </div>
                    </div>
                </nav>
                <br/>
                <div className='float-right'>
                    <Link to={{pathname: `/dashboard/${this.state.username}/stats` , state:{country: this.state.country, username: this.state.username }}}>
                        <Button color="warning">View Stats</Button>
                    </Link>
                </div>
                <div className="display-4" id='country-title'>&nbsp;&nbsp;{this.state.country.Name}</div>
                <div className='clearfix'></div>
                <div style={{marginTop: '2%'}}>
                {
                    this.state.country ?

                    <div>
                        {/* <div className="jumbotron container">
                            <div className="jumbotron"> */}
                                <div style={{}}>
                                    {
                                        this.state.val ?
                                        
                                        <Pie
                                            data={this.state.val}
                                            
                                            id='pie-chart'
                                            width={250}
                                            height={150}
                                            options={{ maintainAspectRatio: false }}
                                            options={{
                                                title:{
                                                display:true,
                                                // text:`${this.state.country.Name}`,
                                                fontSize:20
                                                },
                                                legend:{
                                                display:true,
                                                position:'left'
                                                },
                                            }}
                                        />

                                        :

                                        (null)
                                    }
                                </div>
                            {/* </div>
                        </div> */}

                    

                        <div className="jumbotron container" style={{marginTop: '5%'}}>       

                            <div>
                                <CommentSubmissionBox content={{username: this.props.location.state.username, country: this.state.country, refresh: this.oneReviewAdded }}/>
                            </div>

                            <Reviews reviews ={ this.state.reviews } onClickUp={ id => this.onThumbUp(id) }
                                onClickDown = { id => this.onThumbDown(id) } /> <br></br>
                        </div>
                    </div>

                    :

                    (null)
                }
                {
                    this.state.country === null ?

                    <div style={{textAlign: 'center'}}>
                        <h3>Loading Reviews...</h3>
                    </div>
                    :
                    (null)
                }
            </div>
            <br/>
            <div className="text-center">
                <Link className="btn btn-secondary" to={{pathname: `/dashboard/${this.state.username}`}}>Return</Link>
            </div>
            <br/>
            <br/>
        </div>);

    }
}