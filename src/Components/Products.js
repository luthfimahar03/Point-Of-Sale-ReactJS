import React, { Component } from 'react';
import '../Assets/css/Products.css'
import axios from 'axios'
import ProductList from './ListProduct';
import Cart from './Cart'
import Filter from "./Filter"
import { Link } from 'react-router-dom'
import CheckOut from "../Screens/CheckOut"
import jquery from 'jquery'

import Add from './Add'
// import store from '../store'
import { connect } from "react-redux"
import { getAll } from '../publics/actions/products'
// import {getAllProducts} from "../actions/productActions"


// import Navbar from './Navbar'

class Products extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      cartItems: [],
      filteredProducts: [],
      sort: [],
      // products: [], 
      totalData: [],
      totalPage: 0,
      clicks: 0,
      page: 1,
      categories: []
    };
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this)
    this.handleSortChange = this.handleSortChange.bind(this)

  }
  async componentDidMount() {
    this.getProducts()
    this.getCategories()
    console.log(this.props)
    // await getAll(this.state.clicks)
    // console.log(this.getProducts())
    // console.log(this.state.username)
    // console.log('ComponentDidMount', this.state.data)
  }

  async getProducts() {
    const fetch = await getAll(this.state.clicks)
    this.props.dispatch(fetch)
    console.log(this.props)
    this.setState({
      data: this.props.products.productList,
      totalPage: this.props.products.totalPage,
      totalData: this.props.products.totalData
    })
  }


  getCategories = async () => {
    await axios.get('http://localhost:5000/categories')
      .then(result => {
        this.setState({ categories: result.data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  nextPage = async () => {
    if (this.state.page >= this.state.totalPage) {
      this.state.page = this.state.totalPage
    } else {
      this.state.clicks = this.state.clicks + 3
      this.state.page = this.state.page + 1
    }
    await this.getProducts()
  }

  previousPage = async () => {
    console.log(this.state.totalPage)
    if (this.state.page <= 1) {
      this.state.page = 1
    } else {
      this.state.clicks = this.state.clicks - 3
      this.state.page = this.state.page - 1
    }
    await this.getProducts()
  }


  searchValue(event) {
    let value = event.target.value
    if (event.key === "Enter") {
      this.searchProducts(value)

    }
  }
  searchProducts = async (value) => {
    await axios.get('http://localhost:5000/products?search=' + value)
      .then(result => {
        this.setState({ data: result.data.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  showModalCheckout = () => {
    jquery("#modalCheckout").modal("toggle")
  }

  listProducts = () => {
    this.setState(state => {
      if (state.sort !== '') {
        state.data.sort((a, b) =>
          (state.sort === 'lowestprice'
            ? ((a.price > b.price) ? 1 : -1)
            : ((a.price < b.price) ? 1 : -1)));
      } else {
        state.data.sort((a, b) => (a.id > b.id) ? 1 : -1);
      }
    })
  }


  handleSortChange = (event) => {
    this.setState({ sort: event.target.value });
    this.listProducts();
  }

  handleRemoveFromCart = (event, product) => {
    this.setState(state => {
      const cartItems = state.cartItems.filter(a => a.id !== product.id);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    })
  }

  handleAddToCart(event, product) {
    this.setState(state => {
      const cartItems = state.cartItems;
      let productAlreadyInCart = false;

      cartItems.forEach(cp => {
        if (cp.id === product.id) {
          cp.count += 1;
          productAlreadyInCart = true;
        }
      });

      if (!productAlreadyInCart) {
        cartItems.push({ ...product, count: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { cartItems: cartItems };
    });
  }

  // console.log(product)

  // let productAlreadyInCart = this.state.cartItems.find(cart => cart.id == product.id)
  // console.log(product)

  // if(!productAlreadyInCart){
  //   this.setState({
  //     cartItems: [...this.state.cartItems, product]
  //   })
  // }else{
  //   alert("product already in cart")
  // }

  render() {
    return (

      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-9 border">
              <nav class="navbar">
                <h2 style={{ margin: "auto" }}>Electro App</h2>
                <form class="form-inline">
                  <b><Link to="/Login" style={{color: "black"}}>Sign In</Link></b>
                </form>
              </nav>
            </div>

            <div class="col-md-3 border">
              <nav class="navbar navbar-light bg-black">
                <h2 class="m-auto">Cart <i class="fa fa-cart-arrow-down"></i> </h2>
              </nav>
            </div>
          </div>
          <div class="row">
            <div class="col-md-1">
              <div class="sidebar">
                <div class="img_sidebar fa-3x">
                  <span><Link to="/products"><i class="fa fa-home m-3" style={{ color: "black" }}></i></Link></span>
                  <span ><Link to="/history"><i class="fa fa-list-alt m-3" style={{ color: "black" }}></i></Link></span>
                  <span data-toggle="modal" data-target="#addData"><i class="fa fa-plus-square m-3"></i></span>
                </div>
              </div>

            </div>
            <div class="col-md-8 bg-black" style={{color: "black"}} >
              <div style={{ float: "Right", margin: "20px" }}>
                <ul class="pagination" >
                  <li class="page-item"><a class="page-link" href="#" onClick={() => this.previousPage()}>Previous</a></li>

                  <li class="page-item"><a class="page-link" href="#">{this.state.page}</a></li>

                  <li class="page-item"><a class="page-link" href="#" onClick={() => this.nextPage()}>Next</a></li>
                </ul>
              </div>

              <div className="row">
                <Filter count={this.state.filteredProducts.length} handleSortChange={this.handleSortChange} />
                <input style={{ height: "37px", marginTop: "25px", paddingLeft: 10 }} placeholder="Search" onKeyPress={(e) => this.searchValue(e)}></input>
              </div>
              <div style={{ paddingTop: "30px" }}>
                <ProductList products={this.state.data} handleAddToCart={this.handleAddToCart} />
              </div>
            </div>

            <div class="col-md-3 mt-2 bg-white" >
              <div>
                <Cart cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
              </div>
              <button type="button" class="btn btn-success btn-block" onClick={() => this.showModalCheckout()}>Check Out</button>
            </div>
          </div>
        </div>
        <CheckOut product={this.state.cartItems} />

        <Add categories={this.state.categories} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}


export default connect(mapStateToProps)(Products);
