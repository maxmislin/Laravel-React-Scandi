import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Errors from './Errors';
import axios from 'axios';


export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            validationErrorMessage: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }
    
    renderRedirect() {
        this.props.history.push('/')
    }

    handleSubmit(event) {
        axios({
            method: 'post',
            url: '/api/addCategories/submit',
            data: {
              name: this.state.name
            }
        })
        .then(response => {
            if(response.statusText == "OK")
            {
                this.renderRedirect();

                ReactDOM.render(
                    (    
                        <div className="alert alert-success">
                            Category added
                        </div>
                    ),
                document.getElementById("indexMsg"));
            }
        })
        .catch(error => {
            if (error.response.status == 422){
                var errors = error.response.data.errors;
                ReactDOM.render(<Errors errors={errors} />,document.getElementById("categoryMsg"))
            }
            else
                console.log(error);
                
        });
        
        event.preventDefault();
    }


    render() {
        return (
            <div className="container">
                <div id="categoryMsg"></div>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h1 className="h2">Add Category</h1>
                </div>
                    
                <form onSubmit={this.handleSubmit} id="addForm">

                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
                    <h3 className="h3">Category</h3>
                    </div>

                    <div className="col-md-3 mb-3">  
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} required="" />
                    <div className="invalid-feedback">
                        Please enter Name.
                    </div>
                    </div>

                    <div className="col-md-3 mb-3">
                    <button form="addForm" type="submit" className="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
                        <h6>Save</h6>
                    </button>
                    </div>
                </form>
            </div>
        );
    }

}
