import React, { Component } from 'react';
import axios from 'axios';

export default class ProductList extends Component {

    constructor() {
        super();
        this.state = {
            products:[],
            attributes:[]
        }
        
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    handleChangeCheckbox(event) {
        this.props.applyCallback(event.target.value, event.target.checked);
    }

    componentDidMount() {
        axios.get('/api/product').then(response => {
            this.setState({
                products: response.data.productData,
                attributes: response.data.atributeData
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                {this.state.products.map(product =>
                    (
                    <div className="card mb-4 shadow-sm">
                        <img className="card-img-top" src={require('./phone.jpg')} alt="Card image cap"></img>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li>{product.sku}</li>
                                <li>{product.name}</li>
                                <li>{product.price} $</li>
                                {this.state.attributes.map(attribute =>(
                                    attribute.product_id == product.id && attribute.hidden == 0 &&
                                    <li>{attribute.name}: {attribute.attribute} {attribute.units}</li>
                                ))}
                            </ul>
                        </div>
                        <div align="right" className="checkbox-inline custom-checkbox mr-3">
                                <label htmlFor="delete" className="mr-1">Delete:</label>
                                <input type="checkbox" name="id[]" value={product.id} onChange={this.handleChangeCheckbox}></input>
						</div>
                    </div>
                    )
                )}
	        </div>
        );
    }

}