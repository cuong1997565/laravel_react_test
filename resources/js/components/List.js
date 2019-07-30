import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        axios.get('/api/users').then((response) => {
            this.setState({
                users: response.data.data
            });
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        var { users } = this.state;
        console.log(users);
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className='card-header'>All Users</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create New User
                                </Link>
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
                                        {users.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td> {user.name} </td>
                                                <td> {user.email} </td>
                                                <td>
                                                    <Link
                                                        className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                                        to={`/${user.id}`}
                                                    >
                                                    edit
                                                    </Link>
                                                </td>
                                            </tr>
                                                ))}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                    );
                }
            }
            export default List;
