import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Errors from './Errors';
import { withTranslation } from 'react-i18next';

class Attribute extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories:[],
            categoryName: '', 
            name: '',
            units: '',
            required: false,
            numeric: false,
            unique: false,
            min: null,
            max: null,
            validationErrorMessage: [],
            errors:[]
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    componentDidMount() {
        axios.get('/api/categories').then(response => {
            this.setState({
                categories: response.data,
                categoryName: response.data[0].name
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeCheckbox(event) {
        this.setState({[event.target.name]: event.target.checked});
    }
    
    renderRedirect() {
        this.props.history.push('/')
    }

    handleSubmit(event) {
        axios({
            method: 'post',
            url: '/api/addAttributes/submit',
            data: {
                categoryName: this.state.categoryName, 
                name: this.state.name,
                units: this.state.units,
                required: this.state.required,
                numeric: this.state.numeric,
                unique: this.state.unique,
                min: this.state.min,
                max: this.state.max
            }
        })
        .then(response => {
            if(response.statusText == "OK")
            {
                this.renderRedirect();

                ReactDOM.render(
                    (    
                        <div className="alert alert-success">
                            Attribute added
                        </div>
                    ),
                document.getElementById("indexMsg"));
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
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-4 mb-3">
                    <h1 className="h2">{t('Attribute.title')}</h1>
                </div>


                
                <form onSubmit={this.handleSubmit} id="addForm">

                    <div className="col-md-2 mb-3">
                        <label>{t('Attribute.category-switcher')}</label>
                        <select className="browser-default custom-select" id="switcher" name="categoryName" value={this.state.categoryName} onChange={this.handleChange}>
                            {this.state.categories.map(category => 
                                <option value={category.name}>{category.name}</option>
                            )}
                        </select>
                    </div>

                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center p-3">
                        <h3 className="h3">{t('Attribute.attribute-form')}</h3>
                    </div>

                    <div className="col-md-3 mb-3">  
                        <label htmlFor="name">{t('Attribute.label-for-name')}</label>
                        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required="" />
                    </div>
                    
                    <div className="col-md-3 mb-3">  
                        <label htmlFor="units">{t('Attribute.label-for-units')}</label>
                        <input type="text" className="form-control" name="units" value={this.state.units} onChange={this.handleChange} />
                    </div>
                        
                    <div className="col-md-3 mb-3">
                        <label htmlFor="CheckBoxReq">{t('Attribute.label-for-required')}</label>
                        <input type="checkbox" name="required" ref="required" value={this.state.required} onChange={this.handleChangeCheckbox} className="ml-1" id="req" />
                    </div>
                        
                    <div className="col-md-3 mb-3">
                        <label htmlFor="CheckBoxNum">{t('Attribute.label-for-numeric')}</label>
                        <input type="checkbox" name="numeric" value={this.state.numeric}  onChange={this.handleChangeCheckbox} className="ml-1" id="num" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="CheckBoxUni">{t('Attribute.label-for-unique')}</label>
                        <input type="checkbox" name="unique" value={this.state.unique} onChange={this.handleChangeCheckbox} className="ml-1" id="uniq" />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="min">{t('Attribute.label-for-min')}</label>
                        <input type="text" className="form-control" name="min" value={this.state.min} onChange={this.handleChange} />
                    </div>

                    <div className="col-md-3 mb-3">
                        <label htmlFor="max">{t('Attribute.label-for-max')}</label>
                        <input type="text" className="form-control" name="max" value={this.state.max} onChange={this.handleChange} />
                    </div>

                    <div className="col-md-3 mb-3">
                        <button type="submit" className="btn btn-sm btn-outline-secondary pl-5 pr-5 pt-2">
                            <h6>{t('Attribute.save-btn')}</h6>
                        </button>
                    </div>
                </form>
            </div>
        );
    }

}


const AttributeComponent = withTranslation()(Attribute);

export default AttributeComponent;
