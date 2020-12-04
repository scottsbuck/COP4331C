import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        if (localStorage.getItem("isLoggedOut").localeCompare("yes") === 0)
        {
            return (
                <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to = "/" className = "navbar-brand">Restaurant System</Link>
                    <div className = "collapse navbar-collapse">
                    </div>
                </nav>
            )
            
        }
        else if (localStorage.getItem("UserType").localeCompare("customer") === 0)
        {
            return (
                <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to = "/" className = "navbar-brand">Restaurant System</Link>
                    <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                        <Link to = "/dish" className = "nav-link">Dishes</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/create" className = "nav-link">Create New Dish</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/cart" className = "nav-link">Shopping Cart</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/customerOrders" className = "nav-link">Orders</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/" className = "nav-link">Log Out</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            )
        }
        else
        {
            return (
                <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to = "/" className = "navbar-brand">Restaurant System</Link>
                    <div className = "collapse navbar-collapse">
                    <ul className = "navbar-nav mr-auto">
                        <li className = "navbar-item">
                        <Link to = "/employeeOrders" className = "nav-link">Orders</Link>
                        </li>
                        <li className = "navbar-item">
                        <Link to = "/" className = "nav-link">Log Out</Link>
                        </li>
                    </ul>
                    </div>
                </nav>
            );
        }   
    }
}

//<li className = "navbar-item">
                    //<Link to = "/user" className = "nav-link">Create User</Link>
                   // </li>