import React, { Component } from 'react';


export default class Errors extends Component{
    render() {
        const allErrors = [];

        for (var error in this.props.errors){
            allErrors.push(`${this.props.errors[error]}`)
        }     
            
        return (
            <div className="alert alert-danger mt-2">
                <ul>{allErrors.map(error => 
                            (
                            <li>{ error }</li>
                            )
                        )
                    }
                </ul>
            </div>
        );
    }

}
