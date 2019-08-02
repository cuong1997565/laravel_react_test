import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Paginate from 'react-js-pagination';
import '../../../sass/style.scss';
import axios from 'axios';
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1,
            pageRangeDisplayed: 5
        }
        this.handlePageChange = this.handlePageChange.bind(this);
        this.onDeletePost = this.onDeletePost.bind(this);
    }
    handlePageChange(pageNumber) {
        axios.get('/api/posts?page='+pageNumber).then((response) => {
            this.setState({
                posts: response.data.post.data,
                itemsCountPerPage: response.data.post.per_page,
                totalItemsCount: response.data.post.total,
                activePage: response.data.post.current_page
            })

        }).catch((error) => {
            console.log(error);
        })
    }
    componentDidMount() {
        axios.get('/api/posts').then((response) => {
            this.setState({
                posts: response.data.post.data,
                itemsCountPerPage: response.data.post.per_page,
                totalItemsCount: response.data.post.total,
                activePage: response.data.post.current_page
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    onDeletePost(id) {
        if(window.confirm("Ban co chac xoa khong ??")){
            axios.delete(`/api/posts/${id}`).then((response) => {
                this.setState(data =>({
                    posts : data.posts.filter(post => {
                        return post.id != id
                    })
                }))
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    render() {
        const { posts } = this.state;
        var elmPost = posts.map((post, index) => {
            return (
                <tr key={post.id}>
                    <th scope="row"> { index +1 } </th>
                    <td> { post.name } </td>
                    <td> <img src={'/storage/images/'+ post.images} className="image-reposite" /> </td>
                    <td> { post.category.name } </td>
                    <td> { post.user.name } </td>
                    <td>
                        <Link className="btn btn-primary" to={`/edit-post/${post.id}`}  style={{ marginRight: 10 }}> Edit </Link>
                        <button className="btn btn-danger" onClick={ () => { this.onDeletePost(post.id)} }> Delete  </button>

                    </td>
                </tr>
            );
        })
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">All Post</div>
                            <div className="card-body">
                                <Link className='btn btn-primary btn-sm mb-3' to='/create-post'>
                                    Create new posts
                                </Link>
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Category Name</th>
                                            <th scope="col">User Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { elmPost }
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
