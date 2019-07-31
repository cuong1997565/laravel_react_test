import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../../sass/style.scss';
import axios from 'axios';
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            errors: []
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        axios.get(`/api/users/${userId}`)
            .then((response) => {
                this.setState({
                    name : response.data.user.name,
                    email : response.data.user.email
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var { history } = this.props;
        var userId = this.props.match.params.id;
        var data = {
            name : this.state.name,
            email : this.state.email
        };
        axios.put(`/api/users/${userId}`, data)
        .then((response) => {
             history.push('/list');
        })
        .catch((error) => {
            this.setState({
                errors : error.response.data.error
            })
        })
    }

    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong> {this.state.errors[field][0]} </strong>
                </span>
            )
        }
    }

    render() {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new user</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleSubmit}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>User name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            name='name'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''} `}
                                            onChange={this.onChange}
                                            value={this.state.name}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label>User email</label>
                                        <input
                                            id='email'
                                            type='email'
                                            name='email'
                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''} `}
                                            onChange={this.onChange}
                                            value={this.state.email}
                                        />
                                        {this.renderErrorFor('email')}
                                    </div>

                                    <button className='btn btn-primary'>Edit </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Edit;
