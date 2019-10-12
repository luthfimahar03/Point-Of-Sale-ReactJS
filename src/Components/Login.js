import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/css/Login.css'
import { Link } from 'react-router-dom'
import LocalStorage from 'local-storage'
import Axios from 'axios';



class Login extends Component {
  constructor(){
    super()

  }

  handleLogin = async (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    console.log(data)
    Axios.post("http://localhost:5000/users/login", data)
    

    .then(res => {
      if(res.status === 200){
        LocalStorage.set('token', (res.data.token))
        LocalStorage.get('token')
        window.location.href = "http://localhost:3000/products"
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  

  render() {
    return (
      <div>
          <div class="container-fluid bg">
            <div class="row justify-content-center">
                <div class="col-12 col-sm-6 col-md-3">
                  <div class="form-container modal-container">
                    <form method="POST" onSubmit={this.handleLogin}>
                        <div class="imgcontainer text-center">
                          <img src={require('../Assets/img/user.png')} />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputUsername1"></label>
                            <input type="text" name="username" class="form-control" id="exampleInputusername" placeholder="Enter Username"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"></label>
                            <input type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Enter Password"/>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Submit</button>
                    </form>
                  </div>
                </div>
            </div>
            
          </div>
      </div>
    )
  }
}

export default Login
