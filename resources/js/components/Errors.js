import React, { Component } from 'react';


export default class Errors extends Component{
    render() {
        return (
            <div className="alert alert-danger">
                <ul>
                    {this.props.errors.map(error =>
                        (
                        <li>{ error }</li>
                        )
                    )}
                </ul>
            </div>
        );
    }

}
