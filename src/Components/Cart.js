import React, { Component } from 'react';
import Rupiah from './Rupiah'
import "../Assets/css/Cart.css"
import Logo from "../Assets/img/not-found.png"


export default class Cart extends Component {
    render() {
        const { cartItems } = this.props;
        
        return (
            <div  className="alert alert-info">
                {cartItems.length === 0
                    ?
                    <div className="text-center"> 
                        <img src={Logo} style={{width: "100px"}}/>
                        <b><h2>Your cart is empty</h2></b>
                    </div> :
                    <b style={{textAlign: 'center'}}>You have {cartItems.length} items in cart. <hr /></b>
                }
                {cartItems.length > 0 &&
                    <div>
                        <ul style={{ marginLeft: -30 }}>
                            {cartItems.map(item => (
                                <li key={item.id}>
                                    <div class="row pb-2">
                                        <div class="col-md-6">
                                            <img src={"http://localhost:5000/" + item.image}  alt={item.title} style={{width: '100px'}}/>  
                                        </div>
                                        <div class="col-md-6">
                                            <div class="row">
                                               <b> {item.name} <br /> {Rupiah.formatCurrency(item.price * item.count)} </b>
                                               <nav aria-label="Page navigation example">
                                                    <ul class="pagination">
                                                        <li class="page-item"><a class="page-link" href="#" onClick={() => item.count <= 0 ? this.false : item.count -= 1 }>-</a></li>
                                                        <li class="page-item"><a class="page-link" href="#">{item.count}</a></li>
                                                        <li class="page-item"><a class="page-link" href="#" onClick={() => item.count += 1}>+</a></li>
                                                    </ul>   
                                                </nav> 
                                            </div>
                                        </div>
                                        <button style={{ marginLeft: '25px', marginBottom: '25px' }} className="btn btn-danger btn-sm"
                                                onClick={(event) => this.props.handleRemoveFromCart(event, item)}>Remove</button>
                                    </div>
                                </li>))
                            }
                        </ul>

                        <b> Total Price: {Rupiah.formatCurrency(cartItems.reduce((a, c) => (a + c.price * c.count), 0))} </b>
                        {/* <button style={{ float: 'right' }} className="btn btn-danger btn-xs"
                                            onClick={(e) => this.props.handleRemoveFromCart(e, item)}>X</button> */}
                    </div>
                }
            </div>
        )
    }
}