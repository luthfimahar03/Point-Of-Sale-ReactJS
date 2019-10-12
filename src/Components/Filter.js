import React, { Component } from 'react';


class Filter extends Component {

    render() {
        return (
            <div>
                <di class="col-md-6 -5">
                    <label><b>Order By</b>
                        <select className="form-control" value={this.props.sort} onChange={this.props.handleSortChange}>
                            <option value="">Select</option>
                            <option value="lowestprice">Lowest to highest</option>
                            <option value="highestprice">Highest to lowest</option>
                        </select>
                    </label>
                </di>
            </div>
        )
    }
}


export default Filter