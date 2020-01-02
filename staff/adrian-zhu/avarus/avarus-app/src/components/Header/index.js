import React from 'react'
import './index.sass'
import { Link } from 'react-router-dom';
import {  withRouter } from 'react-router-dom'

export default withRouter(function ({ name, budget, onLogout}) {
    return <header className="header">
        <input id="show-menu" name="modal" type="checkbox" />

        <label className="header-hamburger hamburger" htmlFor="show-menu"><span className="hamburger__icon"></span></label>

        <p className="logo">Avarus</p>

        <button className="button" onClick = {event => {
            event.preventDefault()
            onLogout()
        }}>Logout</button>

        <nav className="header-nav nav">
            <ul className="nav-menu menu">
                <li className="menu-item">Hi! {name}</li>
                <li className="menu-item">your buying power is {budget}</li>
                <li className="menu-item"><Link to="/main">Main</Link></li>
                <li className="menu-item"><Link to="/transactions">Transactions</Link></li>
                <li className="menu-item"><Link to="/favorites">Favorite</Link></li>
                <li className="menu-item"><Link to="/userpage">Profile</Link></li> 
                <li className="menu-item">
                    <label className="hamburger-close" htmlFor="show-menu">Close</label>
                </li>
            </ul>
        </nav> 

     </header>  
})