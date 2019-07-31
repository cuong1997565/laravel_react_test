import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Project</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/list">List User</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/list-post" >List Post</Link>
                    </li>

                </ul>
            </nav>
        );
    }
}
export default Header;
