import React from 'react'
import Comment from './comment'
import Rating from './commentFiles/rating'
import { Link, Redirect } from 'react-router-dom'
import { Button ,  CardBody,  Col,  Collapse} from 'reactstrap'
import './card.css'
class Card extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            userName: this.props.content.username,
            rating: '',
            comment: '',
            country: this.props.content.country,
            isOpen: false,
            level: this.props.content.country.AlertLevel.slice(this.props.content.country.AlertLevel.length -1),
            redirect: '', 
        }
    }

    handleClick(){
        this.setState({redirect: `/dashboard/${this.state.userName}/stats`});
    }

    getColor(){
        var num = parseInt(this.state.level)
        if(num > 8) return `#cc3300`
        if(num > 6) return '#ff8f00'
        if(num > 4) return '#ffcc00'
        if(num > 2) return '#558b2f'
        if(num > 0) return '#9ccc65'
    }
    render() {
        if(this.state.redirect){
            return(
                <Redirect to={{pathname: this.state.redirect, state:{country: this.state.country, username: this.state.userName}}}></Redirect>
            )
        }
        return (
            <>

            <div className="col mb-4">
                <div className="card make-shadow" onClick={e => this.handleClick()}>
                    <img src={this.state.country.imageMap} className="card-img-top mx-auto" id="country-image" alt="countryImage" style={{width: '300px', height: '200px'}}/>
                        <div className="card-body">

                            <div className="" style={{textAlign: 'center'}}>
                                <h5 className="card-title">{this.state.country.Name}</h5>
                            </div>

                            <hr></hr>
                            <div className="list-group-item " style={{backgroundColor: `${this.getColor()}`, color: 'white'}}>
                                <h6 className='align-middle text-center' id="alert-level" >Alert : {this.state.country.AlertLevel}</h6>
                            </div>

                            <hr></hr>

                            <div style={{textAlign: 'center'}}>
                                <Link className="btn btn-block btn-outline-primary" to={{pathname: `/dashboard/${this.state.userName}/comment` , state: {country: this.state.country, username: this.state.userName}}}>
                                   View Country Reviews
                                </Link><hr></hr>
                            </div>
                    </div>
                </div>
            </div>
            </>
        );
    }

}

export default Card;
