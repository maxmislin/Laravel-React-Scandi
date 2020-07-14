import React, { Component } from 'react';
import ProductList from './Products/ProductList';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Errors from './Errors';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            key: null
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

                ReactDOM.render(
                    (    
                        <div className="alert alert-success">
                            Products deleted
                        </div>
                    ),
                document.getElementById("indexMsg"));
            }
        })
        .catch(error => {
            if (error.response.status == 422){
                var errors = error.response.data.errors;
                ReactDOM.render(<Errors errors={errors} />,document.getElementById("indexMsg"))
            }
            else
                console.log(error);
        });
        
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div id="indexMsg"></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h2 className="h2">Product List</h2>
                    <div className="btn-toolbar mb-2 mb-md-0">
                        <div className="btn-group mr-2">
                            <button form="DeleteForm" type="submit" className="btn btn-sm btn-outline-secondary py-2 px-2">Mass Delete Action</button>
                        </div>
                    </div>
                </div>

                <form id="DeleteForm" onSubmit={this.handleSubmit}>
                <ProductList key={this.state.key} applyCallback = {this.callbackFunction} />
                </form>
            </div>
        );
    }

}
