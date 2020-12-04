import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./components/navbar.component";
import DishesList from "./components/DishesList.component";
import ShoppingCart from "./components/ShoppingCart.component";
import CreateUser from "./components/CreateUser.component";
import CreateDish from "./components/CreateDish.component";
import LogIn from "./components/LogIn.component";
import EmployeeOrders from "./components/EmployeeOrders.component";
import CustomerOrders from "./components/CustomerOrders.component";

function App() {
  return (
    <Router>
        <div className = "container">
          <Navbar />
          <br/>
          <Route path = "/" exact component = {LogIn}/>
          <Route path = "/dish" exact component = {DishesList}/>
          <Route path = "/cart" exact component = {ShoppingCart}/>
          <Route path = "/user" exact component = {CreateUser}/>
          <Route path = "/create" exact component = {CreateDish}/>
          <Route path = "/employeeOrders" exact component = {EmployeeOrders}/>
          <Route path = "/customerOrders" exact component = {CustomerOrders}/>
        </div>
    </Router>
  );
}



export default App;
