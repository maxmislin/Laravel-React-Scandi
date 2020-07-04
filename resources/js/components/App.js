import React, { Component } from 'react';
import ProductList from './Products/ProductList';

export default class App extends Component {

    render() {
        return (
            <div className="container">
                <div id="indexMsg"></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h1 className="h2">Product List</h1>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button form="cBox" type="submit" className="btn btn-sm btn-outline-secondary py-2 px-2">Mass Delete Action</button>
                        </div>
                    </div>
                </div>

                <form id="cBox" action="{{ route('delete-form') }}" method="post">
                <ProductList />
                </form>
            </div>
        );
    }

}
