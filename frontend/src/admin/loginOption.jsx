import React from 'react';
import { Link } from 'react-router-dom';
import { GrUserManager } from 'react-icons/gr';
import {RiDashboardLine} from 'react-icons/ri';

export class LoginOption extends React.Component {
    state = {
        username :  this.props.match.params.username
    }

    render () {
        return<>
        <br/>
        <br/>
         <div className="container pt-3">
            <div className="jumbotron" id="jumb">
                <Link className="btn btn-secondary float-right" to={'/'}>Return</Link>
                <div className="clearfix"></div>
                <h1 className="display-4">Login as ...</h1>
                <hr className="my-4"/>
                <div className="card-deck">

                    <Link to={'/admin/'+this.state.username} style={{ textDecoration: 'none' }} className="card">
                        <div className="card-body btn" id="country">
                            <GrUserManager className="card-img-top"size={70}/>
                            <br/><br/>
                            <h5 className="card-title text-center">
                                Admin
                            </h5>
                        </div>
                    </Link>
                    <Link to={'/dashboard/' + this.state.username} style={{ textDecoration: 'none' }} className="card">
                        <div className="card-body btn" id="city">
                            <RiDashboardLine className="card-img-top"size={70}/>
                            <br/><br/>
                            <h5 className="card-title text-center">
                                General user
                            </h5>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="clearfix"></div>
        </div>
        </>
    }
}