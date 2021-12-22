import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { history } from '../_helpers/history';
import {Role} from '../_helpers/role';
import { authenticationService } from '../_services/authentication.service';
import { PrivateRoute } from '../_components/PrivateRoute';
import HomePage from '../HomePage/HomePage';
import AdminPage  from '../AdminPage/AdminPage';
import  LoginPage  from '../LoginPage/LoginPage';
import  PublicEventsList  from '../PublicEventsList/PublicEventsList';
import  ContactUsPage  from '../ContactUsPage/ContactUsPage';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({
            currentUser: x,
            isAdmin: x && x.role === Role.Admin
        }));
    }

    logout() {
        authenticationService.logout();
        history.push('/public');
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router>
                <div>
                    {currentUser &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                <Routes>
                                    <PrivateRoute exact path="/" element={HomePage} />
                                    <PrivateRoute path="/admin" roles={[Role.Admin]} element={AdminPage} />
                                    <Route path="/public" element={PublicEventsList} />
                                    <Route path="/login" element={LoginPage} />
                                    <Route path="/contact" element={ContactUsPage} />
                                    </Routes>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}