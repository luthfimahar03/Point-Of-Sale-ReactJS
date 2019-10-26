import React, { Component } from 'react';
import jquery from 'jquery'
import {connect} from "react-redux"
import {addProduct} from "../publics/actions/products"


class AddProducts extends Component {


    handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        fetch(`http://localhost:5000/products`,
            {
                method: "POST",
                body: data
            })
    }

    render() {

        const { categories } = this.props;
        return (

            <div class="modal fade" id="addData" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Data</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method="POST" onSubmit={this.handleSubmit}>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Name</label>
                                    <input type="text" name="name" class="form-control" id="formGroupExampleInput" />
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Price</label>
                                    <input type="text" name="price" class="form-control" id="formGroupExampleInput2" />
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Description</label>
                                    <input type="text" name="description" class="form-control" id="formGroupExampleInput" />
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1">Image</label>
                                    <input type="file" name="image" class="form-control-file" id="exampleFormControlFile1" />
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput">Category</label>
                                    <select class="form-control" name="category">
                                        {this.props.categories.map((item, index) => {
                                            return (<option value={item.id}>{item.category}</option>)
                                        })}

                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="formGroupExampleInput2">Quantity</label>
                                    <input type="text" name="quantity" class="form-control" id="formGroupExampleInput2" />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button class="btn btn-primary" onClick={() => jquery("#addData").modal("hide")}>Save changes</button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
      products: state.products
    }
  }

export default connect(mapStateToProps)(AddProducts) 