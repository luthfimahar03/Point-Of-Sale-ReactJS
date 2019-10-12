import React, { Component } from 'react'
import '../Assets/css/Products.css'
import Rupiah from './Rupiah'
import '../Assets/fontawesome/css/fontawesome.min.css'
import jquery from 'jquery'
import axios from 'axios'


export default class Products extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
            id: "",
            name: "",
            price: "",
            description: "",
            image: "",
            category: "",
            quantity: "",
            categories: [],

        }

        this.changeHandle = this.changeHandle.bind(this)
    }

    async componentDidMount() {
        await this.getUpdate()
        this.getCategories()
        // console.log(this.state.username)
        // console.log('ComponentDidMount', this.state.data)
      }

    handleDelete = async (product) => {
        fetch("http://localhost:5000/products/" + product,
            {
                method: "DELETE",
            })
    }


    getUpdate = async (data) => {
        await axios.get('http://localhost:5000/products/' + data)
          .then(result => {
            // console.log(result.data.data[0].quantity)
            this.setState({
                id: result.data.data[0].id,
                name: result.data.data[0].name,
                price: result.data.data[0].price,
                description: result.data.data[0].description,
                image: result.data.data[0].image,
                category: result.data.data[0].category,
                quantity: result.data.data[0].quantity
             })
          
          })
          .catch(err => {
            console.log(err)
          })
      }
    
    
      
    handleUpdate = (event, id) => {
        event.preventDefault()
        const data = new FormData(event.target)
        fetch('http://localhost:5000/products/'+ id, {
            method: "PATCH",
            body: data
        })
         
        // // // const payload = new FormData()

        // // // payload.set('name', this.state.name)
        // // // payload.set('id', this.state.id)
        // // // payload.set('price', this.state.price)
        // // // payload.set('description', this.state.description)
        // // // payload.append('image', this.state.image)
        // // // payload.set('category', this.state.category)
        // // // payload.set('quantity', this.state.quantity)
          
    }
    
    changeHandle = (event) => {
        this.setState({[event.target.name]: event.target.value})
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

    render() {

        const update = (
                <div class="modal fade" id="updateData" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Update Data</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form method="PATCH" onSubmit = {(event) => this.handleUpdate(event, this.state.id)}>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Name</label>
                                        <input type="text" name="name" value={this.state.name} onChange={this.changeHandle} class="form-control" id="formGroupExampleInput" />
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput2">Price</label>
                                        <input type="text" name="price" value={this.state.price} onChange={this.changeHandle} class="form-control" id="formGroupExampleInput2" />
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Description</label>
                                        <input type="text" name="description" value={this.state.description} onChange={this.changeHandle} class="form-control" id="formGroupExampleInput" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1">Image</label>
                                        <input type="file" name="image"  onChange={this.changeHandle} class="form-control-file" id="exampleFormControlFile1" />
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput">Category</label>
                                        <select class="form-control" name="category" value={this.state.category} onChange={this.changeHandle}>
                                        {this.state.categories.map((item, index) => {
                                            return (<option value={item.id}>{item.category}</option>)
                                        })}
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="formGroupExampleInput2">Quantity</label>
                                        <input type="text" name="quantity" value={this.state.quantity} onChange={this.changeHandle} class="form-control" id="formGroupExampleInput2" />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button class="btn btn-primary" onClick={() => jquery("#updateData").modal("hide")}>Save changes</button>
                                    </div>
                                </form>

                            </div>

                        </div>
                    </div>
                </div>

        )

        const productItems = this.props.products.map(product => (
            <div className="col-md-4 mt-2 mb-2" key={product.id}>
                <div class="card">
                    <a href={`#${product.id}`} onClick={(event) => this.props.handleAddToCart(event, product)}>
                        <img src={"http://localhost:5000/" + product.image} class="card-img-top" alt={product.title} />
                    </a>
                    <div class="card-body bg-white text-center">
                        <h5 class="card-title">{product.name}</h5>
                        <h6 class="card-text">{Rupiah.formatCurrency(product.price)}</h6>
                        <button type="submit" className="btn btn-primary" style={{ marginRight: "10px" }} onClick={(e) => this.props.handleAddToCart(e, product)}>Add cart</button>
                        <button data-toggle="modal" className="btn btn-danger" style={{ margin: "10px", fontSize: "17px" }} onClick={() => this.handleDelete(product.id)} ><span className="fa fa-trash-o"></span></button>
                        <button className="btn btn-danger" style={{ fontSize: "17px" }} data-toggle="modal" data-target="#updateData"  onClick={() => this.getUpdate(product.id)}><span className="fa fa-pencil-square-o"></span></button>
                    </div>
                </div>
            </div>


        ));

        return (
            <div className="row">
                {productItems}
                {update}
                
            </div>
        )
    }
}

