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
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onSubmit3 = this.onSubmit3.bind(this);


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
                        this.setState({isCompleted: response.data[i].isCompleted})
                        this.setState({status: response.data[i].status})
                        this.setState({username: response.data[i].username})
                        console.log(this.state.price);
                        console.log(this.state.dishList);
                        console.log(this.state.orderID);
                        console.log(this.state.isCompleted);
                        console.log(this.state.status);
                        console.log(this.state.username);
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
        e.preventDefault();
            

        axios.get('http://localhost:5000/foodOrders')
            .then(response => 
            {
                console.log(response.data[0]);
                console.log(this.state.price);
                console.log(this.state.dishList);
                console.log(this.state.orderID);
                console.log(this.state.isCompleted);
                console.log(this.state.status);
                console.log(this.state.username);
            })

        const foodOrder = 
        {
            username: this.state.username,
            dishList: this.state.dishList,
            price: this.state.price,
            isCompleted: true,
            status: 'Preparing Order'
        }
        
        axios.post('http://localhost:5000/foodOrders/update/'+this.state.orderID, foodOrder)
            .then(res => {console.log(res.data)});
    }

    onSubmit2(e)
    {
        e.preventDefault();

        const foodOrder = 
        {
            username: this.state.username,
            dishList: this.state.dishList,
            price: this.state.price,
            isCompleted: true,
            status: "Order Done"
        }
        
        axios.post('http://localhost:5000/foodOrders/update/'+this.state.orderID, foodOrder)
            .then(res => {console.log(res.data)});
    }

    onSubmit3(e)
    {
        e.preventDefault();

        const foodOrder = 
        {
            username: this.state.username,
            dishList: this.state.dishList,
            price: this.state.price,
            isCompleted: true,
            status: "Picked Up"
        }
        
        axios.post('http://localhost:5000/foodOrders/update/'+this.state.orderID, foodOrder)
            .then(res => {console.log(res.data)});
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
                <h3>Completed Orders</h3>
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
                <form onSubmit = {this.onSubmit}>
                <div className = "form-group">
                        <input type = "submit" value = "Preparing Order" className = "btn btn-primary"/>
                    </div>
                </form>
                <form onSubmit = {this.onSubmit2}>
                <div className = "form-group">
                        <input type = "submit" value = "Order Done" className = "btn btn-primary"/>
                    </div>
                </form>
                <form onSubmit = {this.onSubmit3}>
                <div className = "form-group">
                        <input type = "submit" value = "Picked Up" className = "btn btn-primary"/>
                    </div>
                </form>
            </div>
        );
    }
}