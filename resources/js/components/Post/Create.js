import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './../../../sass/style.scss';
import axios from 'axios';
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users : [],
            categorys : [],
            errors:[],
            name: "",
            image: "",
            description: "",
            status : true,
            user_id : "",
            category_id : ""
        }
        this.loadFile = this.loadFile.bind(this);
        this.createImage = this.createImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.getApiUser =  this.getApiUser.bind(this);
        this.getApiCategory = this.getApiCategory.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    loadFile(e) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
            return;
        }
        this.createImage(files[0]);
    }

    createImage(file) {
        var reader = new FileReader();
        reader.onload = (e) =>  {
            var output = document.getElementById('output');
            output.src = reader.result;
            this.setState({
                image: e.target.result
            })
        };
        reader.readAsDataURL(file);
    }
    toggleChange() {
        this.setState({
            status: !this.state.status,
        })
    }

    getApiCategory() {
        axios.get('/api/cagetory/all').then((response) => {
            this.setState({
                categorys : response.data.category
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    getApiUser() {
        axios.get('/api/users/all').then((response) => {
           this.setState({
               users : response.data.user
           })
        }).catch((error) => {
            console.log(error);
        })
    }

   async componentDidMount() {
       await this.getApiUser();
       await this.getApiCategory();
    }

    hasErrorFor (field) {
        return !!this.state.errors[field];
    }

    renderErrorFor (field) {
        if(this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong> { this.state.errors[field][0] } </strong>
                </span>
            )
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        var { history } = this.props;
        const data = {
            name: this.state.name,
            image: this.state.image,
            description: this.state.description,
            status : this.state.status,
            user_id : this.state.user_id,
            category_id : this.state.category_id
        }
        axios.post('/api/posts', data).then((response) =>{
            console.log(response);
            history.push('/list-post');
        }).catch((error) => {
           this.setState({
            errors: error.response.data.error
           })
        })
    }
    render() {
        var { users } = this.state;
        var { categorys } = this.state;
        var users = users.map((user, index) => {
            return (
                <option key={index} value={user.id}>{user.name}</option>
            );
        });
        var categorys = categorys.map((category,index) => {
            return (
                <option key={index} value={category.id}>{category.name}</option>
            );
        });
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-12'>
                        <div className='card'>
                            <div className='card-header'>Create new post</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleSubmit}  encType="multipart/form-data" >
                                    <div className='form-group'>
                                        <label htmlFor='name'>Post name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            name='name'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''} `}
                                            onChange={this.onChange}
                                            value={this.state.name}
                                        />
                                        { this.renderErrorFor('name') }
                                    </div>
                                    <div className='form-group'>
                                        <label>Post description</label>
                                        <textarea
                                            name="description"
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                            rows="3"
                                            onChange={this.onChange}
                                            value={this.state.description}
                                        >
                                        </textarea>
                                        { this.renderErrorFor('description') }

                                    </div>
                                    <div className="form-group">
                                        <label>Post image</label>
                                        <input
                                            id='image'
                                            type='file'
                                            name='avatar'
                                            className={`form-control ${this.hasErrorFor('image') ? 'is-invalid' : ''} `}
                                            onChange={() => { this.loadFile(event) }}
                                        />
                                        <img id="output" src={'/storage/images/2fbe65b6779893fb775072452ee89710.jpg'} width="100px" height="100px" className="image-reposite-add" />
                                        { this.renderErrorFor('image') }
                                    </div>
                                    <div className="form-check">
                                        <label className="switch">
                                            <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="status"
                                            checked={this.state.status}
                                            onChange={this.toggleChange} />
                                            <span className="slider round"></span>
                                        </label>
                                        <label className="form-check-label status-label">Status</label>
                                    </div>
                                    <div className="form-group">
                                        <label>Post User</label>
                                        <select className={`form-control ${this.hasErrorFor('user_id') ? 'is-invalid' : '' }`} onChange={this.onChange} value={this.state.user_id} name="user_id">
                                            {users}
                                        </select>
                                        { this.renderErrorFor('user_id') }
                                    </div>
                                    <div className="form-group">
                                        <label>Post User</label>
                                        <select className={`form-control ${this.hasErrorFor('category_id') ? 'is-invalid' : ''}`} onChange={this.onChange} value={this.state.category_id} name="category_id">
                                            {categorys}
                                        </select>
                                    </div>
                                    { this.hasErrorFor('category_id') }

                                    <button className='btn btn-primary'>Create</button>
                                </form>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                );
            }
        }
        export default Create;
