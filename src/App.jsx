import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';
import auth from './services/authService';
import Movies from './components/movies';
import NavBar from './components/navbar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <main className='container'>
        <ToastContainer />
        <NavBar user={user} />
        <div className="content">
          <Switch>
            <Route path='/register' component={RegisterForm} />
            <Route path='/login' component={LoginForm} />
            <Route path='/logout' component={Logout} />
            <ProtectedRoute
              path='/movies/:id'
              component={MovieForm}
            />
            {/* render={props => <Movies {...props} user={user}/> */}
            <Route path='/movies' component={Movies}  />
            <Route path='/customers' component={Customers} />
            <Route path='/rentals' component={Rentals} />
            <Route path='/not-found' component={NotFound} />
            <Redirect from='/' exact to='/movies' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
      </main>
    );
  }

}

export default App;
