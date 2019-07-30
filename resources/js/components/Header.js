import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Header extends Component {
    render() {
        return (
            <div className='navbar navbar-expand-md navbar-light navbar-laravel'>
                <div className='container'>
                   <Link className='navbar-brand' to='/'>Tasksman</Link>
                </div>
            </div>
        );
    }
}
export default Header;
