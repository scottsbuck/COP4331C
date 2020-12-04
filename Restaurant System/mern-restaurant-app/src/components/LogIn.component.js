import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class LogIn extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUserType = this.onChangeUserType.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = 
        {
            username: '',
            password: '',
            userType: 'customer'
        }
    }

    onChangeUsername(e)
    {
        this.setState({username: e.target.value});
    }

    onChangePassword(e)
    {
        this.setState({password: e.target.value});
    }

    onChangeUserType(e)
    {
        this.setState({userType: e.target.value});
    }

    componentDidMount(e)
    {
        this.setState({userType: this.state.userType});
        localStorage.setItem("isLoggedOut", "yes");
    }


    onSubmit(e)
    {
        e.preventDefault();

        const user = 
        {
            username: this.state.username,
            password: this.state.password,
            userType: this.state.userType
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        const foodOrder = 
        {
            username: this.state.username,
            dishList: [],
            price: 0,
            isCompleted: false,
            status: ''
        }

        axios.post('http://localhost:5000/foodOrders/add', foodOrder)
            .then(res => console.log(res.data));

        localStorage.setItem("Username", user.username);
        localStorage.setItem("UserType", user.userType);
        localStorage.setItem("isLoggedOut", "no");

        if (user.userType == "employee")
        {
            window.location = '/employeeOrders';
        }
        else
        {
            window.location = '/dish';
        }

    }

    render()
    {
        return (
            <div>
                <h3>Create New User or Log In</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Username: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.username}
                            onChange = {this.onChangeUsername}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Password: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.password}
                            onChange = {this.onChangePassword}
                        />
                    </div>
                    <label>
                        Select if you are a customer or employee.
                        <select defaultValue = {this.state.userType} onChange = {this.onChangeUserType}>
                            <option value = "customer">Customer</option>
                            <option value = "employee">Employee</option>
                        </select>
                    </label>
                    <div className = "form-group">
                        <input type = "submit" value = "Create New User or Log In" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
            
        );
    }
}