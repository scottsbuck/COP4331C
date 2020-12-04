import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Dish = props => (
    <tr>
        <td>{props.dish.name}</td>
        <td>{props.dish.description}</td>
        <td>{props.dish.price}</td>
    </tr>
)

export default class ShoppingCart extends Component
{
    constructor(props)
    {
        super(props);

        this.state = 
        {
            orderID: '',
            dishes: [],
            username: '',
            dishList: [],
            price: 0,
            isCompleted: false,
            status: ''
        };
    }

    componentDidMount()
    {
        axios.get('http://localhost:5000/dishes/')
            .then(response => 
            {
                this.setState({dishes: response.data})
            })
            .catch((error) => 
            {
                console.log(error);
            })
        this.setState({username: localStorage.getItem("Username")})
        axios.get('http://localhost:5000/foodOrders')
            .then(response =>
            {
                for (var i = 0; i < response.data.length; i++)
                {
                    if (response.data[i].isCompleted)
                    {
                        this.setState({dishList: response.data[i].dishList})
                        this.setState({orderID: response.data[i]._id})
                        this.setState({price: response.data[i].price})
                        this.setState({status: response.data[i].status})
                        console.log(this.state.price);
                        break;
                    }
                }
            })
            .catch((error) =>
            {
                console.log(error);
            })
        
    }

    onSubmit(e)
    {

    }

    dishList()
    {
        return this.state.dishList.map(currentdish => 
            {
                return <Dish dish = {currentdish}/>;
            })
    }

    render()
    {
        return (
            <div>
                <h3>Orders</h3>
                <h4>Status: {this.state.status}</h4>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Dish Name</th>
                            <th>Dish Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.dishList()}
                    </tbody>
                </table>
            </div>
        );
    }
}