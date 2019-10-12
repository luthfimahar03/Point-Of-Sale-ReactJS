import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import "../Assets/css/History.css"
import Add from '../Components/Add'
import Chart from './Chart'
import Axios from 'axios'
import Rupiah from '../Components/Rupiah'
const convertRupiah = require('rupiah-format')

class Revenue extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            table: [],
            yesterday: [],
            daynow: [],
            yearlast: [],
            yearnow: [],
            lastweek: [],
            weeknow: []
           

        }
    }

    async componentDidMount() {
        await this.handleTable()
        await this.handleIncome()
        
    // this.handleRevenue()
    }
    
        
    

    handleTable = async () => {
        await Axios.get("http://localhost:5000/order")
            .then(result => {
                this.setState({
                    table: result.data.data
                })
            })
    }

    handleTableBy = async (event) => {
        let by = event.target.value
        await Axios.get("http://localhost:5000/order/orderBy?by="+ by)
        .then(result => {
            this.setState({
                table: result.data.data
            })
        })
    }

    handleIncome = async () => {
        await Axios.get("http://localhost:5000/order/getIncome")
        .then(result => {
            console.log(result)
            this.setState({
                yesterday: result.data.data[0].yesterday,
                daynow: result.data.data[0].daynow,
                yearlast: result.data.data[0].yearlast,
                yearnow: result.data.data[0].yearnow,
                lastweek: result.data.data[0].lastweek,
                weeknow: result.data.data[0].weeknow

            })

        })
    }






    render() {
       
        return (
            <div>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 border">
                            <nav class="navbar">
                                <h2 style={{ margin: "auto" }}>History</h2>
                            </nav>
                        </div>

                        <div class="row">
                            <div class="col-md-1" style={{ paddingLeft: "35px" }}>
                                <div class="sidebar">
                                    <div class="img_sidebar fa-3x">
                                        <span><Link to="/history"><i class="fa fa-list-alt m-3"></i></Link></span>
                                        <span data-toggle="modal" data-target="#addData"><i class="fa fa-plus-square m-3"></i></span>
                                    </div>
                                </div>
                            </div>

                            <div class="container" style={{ marginTop: "20px" }}>
                                <div class="row">
                                    <div class="alert alert-danger" style={{ width: "300px", marginLeft: "80px" }} role="alert">
                                        <p>Today's Income</p>
                                        <h3>{convertRupiah.convert(this.state.daynow)}</h3>
                                        <p>{Math.round(((this.state.daynow-this.state.yesterday)/this.state.yesterday)*100)}% Yesterday</p>
                                    </div>

                                    <div class="alert alert-primary" style={{ width: "300px", marginLeft: "50px" }} role="alert">
                                        <p>Orders</p>
                                        <h3>{this.state.weeknow}</h3>
                                        <p>{((this.state.weeknow-this.state.lastweek)/this.state.lastweek)*100}% Last Week</p>
                                    </div>

                                    <div class="alert alert-success" style={{ width: "300px", marginLeft: "50px" }} role="alert">
                                        <p>This Year's Income</p>
                                        <h3>{convertRupiah.convert(this.state.yearnow)}</h3>
                                        <p>>{Math.round(((this.state.yearnow-this.state.yearlast)/this.state.yearlast)*100)}% Last Year</p>
                                    </div>

                                </div>

                                <Chart />
                                <div style={{ marginTop: "80px" }}>


                                    <select class="form-control" id="exampleFormControlSelect1"  onChange ={this.handleTableBy} style={{ float: "right", width: "100px", height: "40px", marginRight: "13px", marginBottom: "10px" }}>
                                        <option value="day">Today</option>
                                        <option value="month">Month</option>
                                        <option value="year">Year</option>
                                    </select>
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">INVOICES</th>
                                                <th scope="col">USER</th>
                                                <th scope="col">DATE</th>
                                                <th scope="col">ORDERS</th>
                                                <th scope="col">AMOUNT</th>
                                            </tr>
                                        </thead>


                                        <tbody>
                                            {this.state.table.map(item => (
                                                <tr>
                                                    <th scope="row">{item.id}</th>
                                                    <td>Luthfi Mahar</td>
                                                    <td>{item.date_update.substr(0,10)}</td>
                                                    <td>{item.product}</td>
                                                    <td>{Rupiah.formatCurrency(item.amount)}</td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>


                                </div>

                            </div>


                        </div>

                    </div>
                </div>
            </div>




        )
    }
}

export default Revenue