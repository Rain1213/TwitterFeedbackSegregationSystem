import React, { Component } from 'react';
import { MenuItems } from "./MenuItems";
import './Navbar.css';
 import logo from '../../assets/images/logo.svg';
export default class Navbar extends Component{
    
    constructor(props) {
        super(props);
        this.state = { clicked: false }
        
    };


    handleClick = () => {
        this.setState({ clicked: !this.state.clicked})
    }

    render() {
        return(


            <nav className="NavbarItems">
               
                <img className = "logo" src = {(logo)} alt="logo"></img>
                <p className="navbar-logo">Feedback Analysis</p>
                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item,index)=>{
                        return(
                            <li key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                
                </ul>
            </nav>
        )
    }
}