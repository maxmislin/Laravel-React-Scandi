import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class ProductList extends Component {

    constructor() {
        super();
        this.state = {
            products:[],
            atributes:[]
        }
        
    }

    componentWillMount() {
        axios.get('/api/product').then(response => {
            this.setState({
                products: response.data.productData,
                atributes: response.data.atributeData
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
                        <div className="card-body">
                            <div align="right" className="checkbox-inline custom-checkbox">
                                <input type="checkbox" name="id[]" value={product.id}></input>
							</div>
                            <ul className="list-unstyled mt-3 mb-4">
                                <li>{product.sku}</li>
                                <li>{product.name}</li>
                                <li>{product.price} $</li>
                                {this.state.atributes.map(atribute =>(
                                    atribute.product_id == product.id &&
                                    <li>{atribute.aName}: {atribute.atribute} {atribute.units}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    )
                )}
	        </div>
        );
    }

}

/*if (document.getElementById('product')) {
    ReactDOM.render(<ProductList />, document.getElementById('product'));
}*/