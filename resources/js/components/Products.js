import React, { Component } from 'react';
import ProductListComponent from './Products/ProductList';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Errors from './Errors';
import { withTranslation } from 'react-i18next';

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            key: null,
            errors: [],
            success: false
        }

        this.callbackFunction = this.callbackFunction.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    callbackFunction(id, checked) {
        if (checked == true)
            this.setState({ id: [...this.state.id, id] })
        else{
            var filteredArray = this.state.id.filter(function(e) { return e !== id });
            this.setState({id: filteredArray});
        }
    }

    reload() {
        this.setState({ key: Math.random() });
    }

    handleSubmit(event) {
        axios({
            method: 'post',
            url: '/api/delete',
            data: this.state
        })
        .then(response => {
            if(response.statusText == "OK")
            {
                this.reload();
                this.setState({id: []});
                this.setState({success:true});
            }
        })
        .catch(error => {
            if (error.response.status == 422){
                var errors = error.response.data.errors;
                this.setState({errors:errors})
            }
            else
                console.log(error);
        });
        
        event.preventDefault();
    }

    render() {
      const { t } = this.props;

        return (
            <div className="container">
                {Object.keys(this.state.errors).length != 0 &&
                    <Errors errors={this.state.errors} />
                }
                {this.state.success &&
                  <div className="alert alert-success mt-2">
                    {t('ProductList.delete-success')}
                  </div>
                }
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h2 className="h2">{t('ProductList.title')}</h2>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button form="DeleteForm" type="submit" className="btn btn-sm btn-outline-secondary py-2 px-2">{t('ProductList.mass-delete')}</button>
                        </div>
                    </div>
                </div>

                <form id="DeleteForm" onSubmit={this.handleSubmit}>
                <ProductListComponent key={this.state.key} applyCallback = {this.callbackFunction} />
                </form>
            </div>
        );
    }

}

const ProductsComponent = withTranslation()(Products);

export default ProductsComponent;