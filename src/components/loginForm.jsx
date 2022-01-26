import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import auth from '../services/authService';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

class LoginForm extends Form {
  // username = React.createRef();

  // componentDidMount() {
  //   this.username.current.focus();
  // }

  state = {
    data: { username: '', password: '' },
    errors: {}
  }

  schema = {
    username: Joi.string().required().error(errors => {
      errors[0].message = 'username phai co';
      return errors;
    }),
    password: Joi.string().min(5).required().label('Password')
  }

  async doSubmit() {
    // Call API 
    try {
      await auth.login(this.state.data);
      toast("Login thành công");
      // this.props.history.push('/');
      console.log(this.props);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/'
      // window.location = '/';
      // alert("thành cônng");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  }

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />
    return (
      <div>
        <ToastContainer />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;