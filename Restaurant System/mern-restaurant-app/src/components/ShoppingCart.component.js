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

        this.onSubmit = this.onSubmit.bind(this);

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
                    if (response.data[i].username.localeCompare(this.state.username) === 0)
                    {
                        if(response.data[i].isCompleted)
                        {
                            break;
                        }
                        this.setState({dishList: response.data[i].dishList})
                        this.setState({orderID: response.data[i]._id})
                        this.setState({price: response.data[i].price})
                        this.setState({isCompleted: response.data[i].isCompleted})
                        this.setState({status: response.data[i].status})
                        console.log(this.state.price);
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
        e.preventDefault();

        const foodOrder = 
        {
            username: this.state.username,
            dishList: this.state.dishList,
            price: this.state.price,
            isCompleted: true,
            status: 'Order Recieved'
        }
        
        axios.post('http://localhost:5000/foodOrders/update/'+this.state.orderID, foodOrder)
            .then(res => {console.log(res.data)});

        //submit order to finished orders, should make a different model and route for those probably, could add tag to orders too?
        //second thought, just add a status tag, and an iscompleted tag, make a new component for employees
        //sort by iscompleted tag and display on employee side the first order, might be able to add more not sure how though
        //probably just 1 at a time for ease of use, then there are buttons on the bottom to mark status'
        //need another component for customer side to view submitted orders
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
                <h3>Shopping Cart</h3>
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
                <h4>Subtotal</h4>
                <ul>${this.state.price.toFixed(2)}</ul>
                <h4>Total</h4>
                <ul>${(this.state.price * 1.065).toFixed(2)}</ul>
                <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                        <input type = "submit" value = "Pay for Order" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}