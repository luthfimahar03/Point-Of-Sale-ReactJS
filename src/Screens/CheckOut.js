import React, { Component } from 'react';
import { isTemplateElement } from '@babel/types';
import Rupiah from '../Components/Rupiah'
import { createConfigItem } from '@babel/core';
import axios from "axios"
import jquery from 'jquery'
import { Link } from 'react-router-dom'
import LocalStorage from 'local-storage'


export default class CheckOut extends Component {
    constructor() {
        super()
        this.state = {
            cart: []
        }
    }

    // handleCout = async (event) => {
    //     event.preventDefault()
    //     const data = new FormData(event.target)
    //     console.log(data)
    //     await axios.post("http://localhost:5000/products/reduce", data)
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })



    handleCout = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        console.log(data.price)
        console.log(data.id)
        console.log(data)
        await axios.post("http://localhost:5000/products/reduce" , data)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
        // this.state.cart.map((item) => {
        //     axios.post("http://localhost:5000/products/reduce", data{
        //         orders: item.name,
        //         amount: (item.price * item.count)

        //     })
        // })
        // jquery("#modalCheckout").modal("toggle")
    }

    render() {

        const buyer = LocalStorage.get('username')
        return (
            <div id="modalCheckout" class="modal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Check Out</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <ul>
                                {
                                    this.props.product.map((val, key) => {
                                        const val_result = val.count * val.price
                                        return (
                                            <div>
                                                <div class="row">
                                                    <div class="col-md-5" style={{ marginLeft: "-15px" }}>
                                                        <b>{val.name}</b>
                                                    </div>
                                                    <div class="col-md-3">
                                                        <b>{val.count}x</b>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <b>{Rupiah.formatCurrency(val_result)}</b>
                                                    </div>
                                                </div>
                                            </div>

                                        )

                                    }
                                    )

                                }
                            </ul>
                            <div class="row">
                                <div class="col-md-5" style={{ paddingLeft: "40px" }}>
                                    <b>Total: </b>
                                </div>
                                <div class="col-md-3">
                                </div>
                                <div class="col-md-4">
                                    <b>{Rupiah.formatCurrency(this.props.product.reduce((a, c) => (a + c.price * c.count), 0))}</b>
                                </div>
                            </div>

                            <div class="modal-footer">
                                <form onSubmit={this.handleCout}>
                                <input type="text" name="total" hidden value={this.props.product.reduce((a, c) => (a + c.price * c.count), 0)} />
                                    {this.props.product.map(item => (
                                        <div>
                                            <div>
                                                <input type="text" name="quantity" hidden value={item.count} />
                                                <input type="text" name="id" hidden value={item.id} />
                                                <input type="text" name="price" hidden value={item.price} />
                                                <input type="text" name="username" hidden value={item.name} />
                                                
                                            </div>


                                        </div>


                                    ))}


                                    <button class="btn btn-primary">Save changes</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                </form>
                            </div>
                        </div>



                    </div>
                </div>
            </div>


            // const ulangItems = this.props.product.map(item =>)
            // // <h5 class="card-title">{item.name}</h5>

        )
    }
}
