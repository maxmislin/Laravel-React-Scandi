import React, { Component } from 'react';
import axios from 'axios';

export default class FormSwitch extends Component {

    constructor() {
        super();
        this.initialState = {
            categories: [],
            attributes: [],
            productAttributes:{}
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
        const isHiddenValue = this.state.productAttributes[event.target.name] ? this.state.productAttributes[event.target.name].isHidden : false;
        const newAttr = {...this.state.productAttributes, [event.target.name]:{value:event.target.value, isHidden: isHiddenValue}}
        this.setState({productAttributes: newAttr});
        this.props.ApplyCallback(event.target.name, event.target.value, isHiddenValue);
    }

    handleChangeCbox(event) {
        const attrValue = this.state.productAttributes[event.target.name] ? this.state.productAttributes[event.target.name].value : "";
        const newAttr = {...this.state.productAttributes, [event.target.name]:{value:attrValue, isHidden: event.target.checked}}
        this.setState({productAttributes: newAttr});
        this.props.ApplyCallback(event.target.name, attrValue, event.target.checked);
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
                                        <input type="text" className="form-control" name={attribute.aName} onChange={this.handleChange} required="" />
                                        <label htmlFor="hidden" className="mt-2">Hidden</label>
                                        <input type="checkbox" className="ml-1" name={attribute.aName} onChange={this.handleChangeCbox} required="" />
                                        
                                    </div>
                                )
                        )
                )}
            </div>  
        );
    }

}