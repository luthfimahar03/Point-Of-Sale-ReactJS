import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import Axios from "axios"


class Chart extends Component {
  constructor() {
    super()
    this.state = {
      orderBy: [],
      chart: [],
      labels: []
    }
  }



  handleRevenue = async (event) => {
    let orderBy = event.target.value
    // console.log(orderBy)
    // let labels = []
    // if (orderBy == "day") {
    //   labels = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    // } else if (orderBy == "month") {
    //   labels = ["June", "July", "August", "September", "October", "November"]
    // } else if (orderBy == "year") {
    //   labels = ['2018', '2019']
    // }

    await Axios.get("http://localhost:5000/order/revenue?orderBy=" + orderBy)
      .then(result => {
        // console.log(result)
        this.setState({
          chart: result.data.data,
          orderBy: orderBy
        })
      })
    // console.log(this.state.labels)
    // console.log(this.state.chart)

  }

  render() {
    let incomes = []
    this.state.chart.forEach(item => {
      incomes.push(item.income)
    })

    // get day
    let day = []
    console.log(day)
    this.state.chart.forEach(days => {
      day.push(days.dayname)
    })
    
    // get month
    let month = []
    this.state.chart.forEach(months => {
      month.push(months.monthname)
      // console.log(day)
    })

    // get year
    let year = []
    // console.log(day)
    this.state.chart.forEach(years => {
      year.push(years.year)
      // console.log(day)
    })

    
    if (this.state.orderBy === 'week') {
      // console.log(day)
      this.state.labels = day
    } else if (this.state.orderBy === 'month') {
      this.state.labels = month
      // console.log(month)
    } else {
      this.state.labels = year
      // console.log(year)
    }

    const data = {

      labels: this.state.labels,
      datasets: [
        {
          label: 'Revenue',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: incomes
        }
      ]
    };
    return (
      <div >
        <div style={{ marginTop: "30px" }}>
          <h2 style={{ marginBottom: "-35px" }}>Revenue</h2>
          <select class="form-control" id="exampleFormControlSelect1" onChange={this.handleRevenue} style={{ float: "right", width: "100px", height: "40px", marginRight: "13px" }}>
          <option value="">Select</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>

          <Line data={data} />
        </div>
      </div>
    );
  }
};

export default Chart