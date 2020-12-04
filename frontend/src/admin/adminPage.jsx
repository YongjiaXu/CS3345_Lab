import React from 'react';
import { Link } from 'react-router-dom';
import { MdRateReview } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { FaUserEdit } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { UserRepository } from '../api/userRepository'

import './adminPage.css'

export class AdminPage extends React.Component {
    userRepository = new UserRepository();

    state = {
        username :  this.props.match.params.username
    }
    render () {
        return<>
            <br/>
            <br/>
            <div className="container pt-3">
                <div className="jumbotron" id="jumb">
                    <h1 className="display-4" id="admin-hearder">Administration Page</h1>
                    <p className="lead"> Manage your website </p>
                    <hr className="my-4"/>
                    <div className="card-deck">
                        <Link to={'/admin/'+this.state.username+'/account'} style={{ textDecoration: 'none' }} className="card">
                            <div className="card-body btn">
                                <GrUserManager className="card-img-top"size={70}/>
                                <br/><br/>
                                <h5 className="card-title text-center">
                                    View my account
                                </h5>
                            </div>
                        </Link>
                        <Link to={'/admin/'+this.state.username+'/users'} style={{ textDecoration: 'none' }} className="card">
                            <div className="card-body btn">
                                <FaUserEdit className="card-img-top"size={70}/>
                                <br/><br/>
                                <h5 className="card-title text-center">
                                    Manage user accounts
                                </h5>
                            </div>
                        </Link>
                        <Link to={'/admin/'+this.state.username+'/stats'} style={{ textDecoration: 'none' }} className="card">
                            <div className="card-body btn">
                                <GoGraph className="card-img-top"size={70}/>
                                <br/><br/>
                                <h5 className="card-title text-center">
                                    Manage statistics
                                </h5>
                            </div>
                        </Link>
                        <Link to={'/admin/'+this.state.username+'/reviews'} style={{ textDecoration: 'none' }} className="card">
                            <div className="card-body btn">
                                <MdRateReview className="card-img-top"size={70}/>
                                <br/><br/>
                                <h5 className="card-title text-center">
                                    Manage reviews
                                </h5>
                            </div>
                        </Link>
                    </div>
                    <br/>
                    <Link to = '/' className="btn btn-secondary float-right"
                            onClick ={() => window.history.replaceState(null, null, "/")} // still having problem
                            >
                            Log out</Link>
                    <div className="clearfix"></div>
                </div>
            </div>
        </>

    }

}
