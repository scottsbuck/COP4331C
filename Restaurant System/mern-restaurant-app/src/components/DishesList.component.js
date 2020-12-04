import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Dish = props => (
    <tr>
        <td>{props.dish.name}</td>
        <td>{props.dish.description}</td>
        <td>{props.dish.price}</td>
        <td>
            <Link to = {"/edit/"+props.dish._id}>edit</Link> | <a href = "#" onClick = {() => {props.addDish(props.dish._id)}}>Add</a>
        </td>
    </tr>
)

export default class DishesList extends Component
{
    constructor(props)
    {
        super(props);
        
        this.addDish = this.addDish.bind(this);
        this.updateSearch = this.updateSearch.bind(this);

        this.state = 
        {
            orderID: '',
            dishes: [],
            username: '',
            dishList: [],
            price: 0,
            search: '',
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
                        this.setState({dishList: response.data[i].dishList})
                        this.setState({price: response.data[i].price})
                        this.setState({orderID: response.data[i]._id})
                    }
                }
                console.log(this.state.orderID)
                
            })
            .catch((error) =>
            {
                console.log(error);
            })
        
    }

    updateSearch(e)
    {
        this.setState({search: e.target.value});
    }

    addDish(id)
    {

        axios.get('http://localhost:5000/dishes/'+id)
            .then(response =>
            {
                this.state.dishList.push(response.data);
                this.setState({price: this.state.price + response.data.price})
            })

        //this.state.dishList.push(id);

        const foodOrder = 
        {
            username: this.state.username,
            dishList: this.state.dishList,
            price: this.state.price,
            isCompleted: this.state.isCompleted,
            status: this.state.status
        }
        
        axios.post('http://localhost:5000/foodOrders/update/'+this.state.orderID, foodOrder)
            .then(res => {console.log(res.data)});
    }

    dishList()
    {
        let filteredDishes = this.state.dishes.filter(
            (currentDish) => {
                return currentDish.name.indexOf(this.state.search) !== -1;
            }
        );
        return filteredDishes.map(currentdish => 
            {
                return <Dish dish = {currentdish} addDish = {this.addDish} key = {currentdish._id}/>;
            })
    }

    render()
    {
        return (
            <div>
                <input type = "text"
                    defaultValue = {this.state.search}
                    onChange = {this.updateSearch}/>
                <h3>Dish List, Select Add to Add Dishes to Your Cart</h3>
                <table className = "table">
                    <thead className = "thead-light">
                        <tr>
                            <th>Dish Name</th>
                            <th>Dish Description</th>
                            <th>Price</th>
                            <th>Add to Cart</th>
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