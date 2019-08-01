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
                12345678
            </div>
        );
    }
}
export default Edit;
