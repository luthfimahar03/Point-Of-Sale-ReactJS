import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css'

import './Assets/fontawesome/css/fontawesome.min.css'
import Products from './Components/Products'
import Login from './Components/Login'
import History from './Screens/History'





import "../node_modules/bootstrap/dist/js/bootstrap.min.js"



class App extends Component {
  render() {
    return (
        <div>  
          <Router>
            <Route path={'/'} component={() => (<Redirect to='/products' />)}/>
            <Route path={'/products'} exact component={Products}/>
            <Route path={'/login'} exact component={Login} />
            <Route path={'/history'} exact component={History} />
          </Router>
        </div>
        
      

    )
  }
}
export default App
