import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class CreateDish extends Component
{
    constructor(props)
    {
        super(props);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = 
        {
            name: '',
            description: '',
            price: 0,  
        }
    }

    onChangeName(e)
    {
        this.setState({name: e.target.value});
    }
    onChangeDescription(e)
    {
        this.setState({description: e.target.value});
    }
    onChangePrice(e)
    {
        this.setState({price: e.target.value});
    }

    onSubmit(e)
    {
        e.preventDefault();

        const dish = 
        {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price
        }

        console.log(dish);

        axios.post('http://localhost:5000/dishes/add', dish)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render()
    {
        return (
            <div>
                <h3>Create new Dish</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className = "form-group">
                        <label>Name: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.name}
                            onChange = {this.onChangeName}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Description: </label>
                        <input type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.description}
                            onChange = {this.onChangeDescription}
                        />
                    </div>
                    <div className = "form-group">
                        <label>Price: </label>
                        <input
                            type = "text"
                            required
                            className = "form-control"
                            defaultValue = {this.state.price}
                            onChange = {this.onChangePrice}
                        />
                    </div>

                    <div className = "form-group">
                        <input type = "submit" value = "Create New Dish" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}