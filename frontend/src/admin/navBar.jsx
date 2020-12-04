import React from "react";
import { GrHome } from 'react-icons/gr';
import { MdRateReview } from 'react-icons/md';
import { GrUserManager } from 'react-icons/gr';
import { FaUserEdit } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Link } from 'react-router-dom';
import './navBar.css';

export const NavBar =props => {
        return<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to={'/admin/'+props.username}>
                <GrHome id='icon-home' size={30} className="d-inline-block align-top"/>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="navbar-brand" to={'/admin/'+props.username+'/account'}>
                        <GrUserManager id='icon' className="d-inline-block align-top"/>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="navbar-brand" to={'/admin/'+props.username+'/users'}>
                        <FaUserEdit id='icon' className="d-inline-block align-top"/>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="navbar-brand" to={'/admin/'+props.username+'/stats'}>
                        <GoGraph id='icon' className="d-inline-block align-top"/>
                    </Link>
                </li>
                <li className="nav-item active">
                    <Link className="navbar-brand" to={'/admin/'+props.username+'/reviews'}>
                        <MdRateReview id='icon' className="d-inline-block align-top"/>
                    </Link>
                </li>
                </ul>
            </div>
            </nav>
        </>
}