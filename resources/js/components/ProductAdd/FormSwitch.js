import React, { Component } from 'react';
import axios from 'axios';

export default class FormSwitch extends Component {

    constructor() {
        super();
        this.initialState = {
            categories: [],
            attributes: [],
            isHidden: false,
            aName: '',
            aValue: ''
        }

        this.state = this.initialState;

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCbox = this.handleChangeCbox.bind(this);
    }

    componentDidMount() {
        axios.get('/api/attributes').then(response => {
            this.setState({
                categories: response.data.categoryData,
                attributes: response.data.atributeData
            });
        }).catch(errors => {
            console.log(errors);
        })
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({aName:event.target.name, aValue: event.target.value});
        this.props.ApplyCallback(event.target.name, event.target.value, this.state.isHidden);
    }

    handleChangeCbox(event) {
        this.setState({isHidden: event.target.checked});
        this.props.ApplyCallback(this.state.aName, this.state.aValue, event.target.checked);
    }

    render() {
        return (
            <div className="col-md-3 mb-3">
                {this.state.categories.map(category =>
                    category.name == this.props.switcher &&
                        this.state.attributes.map(attribute =>
                            category.id == attribute.category_id &&
                                (
                                    <div>
                                        <label htmlFor={category.name} className="mt-2">{attribute.aName}</label>
                                        {attribute.units != null ? (
                                        <p className="tip">{"Please, enter " + attribute.aName + " in " + attribute.units}</p>
                                        ) : (
                                        <p>{"Please, enter " + attribute.aName}</p>
                                        )}
                                        <input type="text" className="form-control" name={this.state.aName = attribute.aName} value={this.state.aValue} onChange={this.handleChange} required="" />
                                        <label htmlFor="hidden" className="mt-2">Hidden</label>
                                        <input type="checkbox" className="ml-1" name="hidden" onChange={this.handleChangeCbox} required="" />
                                        
                                    </div>
                                )
                        )
                )}
            </div>  
        );
    }

}