import React, { Component } from 'react';
import Paginate from 'react-js-pagination';
import { Link } from 'react-router-dom';
import './../../../sass/style.scss';
import axios from 'axios';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sreach_name: "",
            sreach_email: "",
            users: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 5
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickEmail = this.handleClickEmail.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
    }
    componentDidMount() {
        axios.get('/api/users').then((response) => {
            this.setState({
                users: response.data.data,
                itemsCountPerPage: response.data.per_page,
                totalItemsCount: response.data.total,
                activePage: response.data.current_page
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    handlePageChange(pageNumber) {
        axios.get('/api/users?sreach_name=' + this.state.sreach_name + "&sreach_email=" + this.state.sreach_email + "&page=" + pageNumber)
            .then(response => {
                this.setState({
                    users: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
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

    handleClick(event) {
        event.preventDefault();
        axios.get('/api/users?sreach_name=' + this.state.sreach_name)
            .then((response) => {
                this.setState({
                    users: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
            })
    }

    handleClickEmail(event) {
        event.preventDefault();
        axios.get('/api/users?sreach_email=' + this.state.sreach_email)
            .then((response) => {
                this.setState({
                    users: response.data.data,
                    itemsCountPerPage: response.data.per_page,
                    totalItemsCount: response.data.total,
                    activePage: response.data.current_page
                })
            })
    }

    onDeleteUser(id) {
        if (window.confirm("Ban co chac xoa khong")) {
            axios.delete(`/api/users/${id}`)
                .then((response) => {
                    this.setState(data => (
                        {
                            users: data.users.filter(user => {
                                return user.id !== id
                            })
                        }
                    ))
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    render() {
        var { users } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header'>All Users</div>
                            <div className='card-body'>
                                <div className="row">
                                    <div className="col-md-2">
                                        <Link className='btn btn-primary btn-sm mb-3' to='/create-user'>
                                            Create New User
                                        </Link>
                                    </div>
                                    <div className="col-md-5">
                                        <form>
                                            <div className="form-group">
                                                <label> Filter Name </label>
                                                <input
                                                    className="form-control input"
                                                    name="sreach_name"
                                                    placeholder="filter and name"
                                                    onChange={this.onChange} />
                                            </div>
                                            <button type="button" onClick={this.handleClick} className="btn btn-primary send" >Send</button>
                                        </form>
                                    </div>
                                    <div className="col-md-5">
                                        <form>
                                            <div className="form-group">
                                                <label> Filter Email </label>
                                                <input
                                                    className="form-control input"
                                                    name="sreach_email"
                                                    placeholder="filter and email"
                                                    onChange={this.onChange} />
                                            </div>
                                            <button type="button" onClick={this.handleClickEmail} className="btn btn-primary send" >Send</button>
                                        </form>
                                    </div>
                                </div>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td> {user.name} </td>
                                                <td> {user.email} </td>
                                                <td>
                                                    <Link
                                                        className='btn btn-primary'
                                                        to={`/edit-user/${user.id}`}
                                                        style={{ marginRight: 10 }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={() => { this.onDeleteUser(user.id) }}>
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="d-flex justify-content-center">
                                    <Paginate
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={this.state.itemsCountPerPage}
                                        totalItemsCount={this.state.totalItemsCount}
                                        pageRangeDisplayed={this.state.pageRangeDisplayed}
                                        onChange={this.handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"></Paginate>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default List;
