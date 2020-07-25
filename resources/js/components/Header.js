import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Header extends Component {

    render() {
        return (
            <div>
                <div className="site-header d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom shadow-sm">
                    <h5 className="header-title my-0 mr-md-auto font-weight-normal">Scandiweb</h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <Link className="p-2 header-navigation " to="/">
                            Product List
                        </Link>
                        <Link className="p-2 header-navigation " to="/apply">
                            Product Add
                        </Link>
                    </nav>
                </div>
            </div>
        );
    }

}