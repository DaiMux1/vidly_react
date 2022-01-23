import React, { Component } from 'react';
import Joi from 'joi-browser';
import Form from './common/form';

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
    password: Joi.string().required().label('Password')
  }

  doSubmit() {
    // Call API 
    console.log('Submitted');
  }

  render() {
    return (
      <div>
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