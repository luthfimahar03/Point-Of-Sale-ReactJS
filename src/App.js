import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'

import './Assets/fontawesome/css/fontawesome.min.css'
import Products from './Components/Products'
import Login from './Components/Login'
import History from './Screens/History'
// import Filter from './Components/Filter';
import Cart from './Components/Cart'
// import {Provider} from 'react-redux'
// import store from './store'


import "../node_modules/bootstrap/dist/js/bootstrap.min.js"



class App extends Component {
  constructor(props) {
    super();
    this.state = {
      name: 'Arkademy'
    }
  }
  render() {
    return (
     
        <div>  
          <Router>
            <Route path={'/products'} exact component={Products} />
            <Route path={'/login'} exact component={Login} />
            <Route path={'/history'} exact component={History} />
            {/* <Route path={'/products'} exact component={Modal} /> */}
            {/* <Route path={'/menu'} component={Menu} />
          <Route path={'/profile'} component={Profile}/> */}
          </Router>
        </div>
        
      

    )
  }
}
export default App
