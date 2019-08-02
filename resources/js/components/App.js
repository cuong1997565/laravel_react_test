import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import ProjectsList from './ProjectsList';
import NewProject from './NewProject';
import SingleProject from './SingleProject';
import ListUser from './User/List';
import CreateUser from './User/Create';
import EditUser from './User/Edit';
import ListPost from './Post/List';
import CreatePost from './Post/Create';
import EditPost from './Post/Edit';
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Switch>
                        <Route exact path="/list" component= { ListUser } />
                        <Route exact path="/create-user" component = { CreateUser } />
                        <Route exact path="/edit-user/:id" component = { EditUser } />
                        <Route exact path="/list-post" component = { ListPost } />
                        <Route exact path="/create-post" component = { CreatePost } />
                        <Route exact={true} path="/edit-post/:id" component = { EditPost } />
                        <Route exact path="/" component={ ProjectsList } />
                        <Route exact path="/create" component= {NewProject} />
                        <Route exact path="/:id" component={ SingleProject } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
