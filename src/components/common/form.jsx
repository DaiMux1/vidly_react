import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    const error = {};
    result.error.details.reduce((previousError, currentError) => {
      previousError[currentError.path[0]] = currentError.message;
      return previousError;
    }, error)
    console.log(error);
    return Object.keys(error).length === 0 ? null : error;
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] }
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} })
    if (errors) return;

    // call API
    this.doSubmit();
  }


  handleChange = ({ currentTarget: input }) => {
    console.log(this.validate());
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }

  renderInput(name, label, type = 'text') {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    )
  }

  renderInputSelect(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select 
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        label={label}
        error={errors[name]}
        options={options}
      />
    )
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary">
        {label}
      </button>
    )
  }

}

export default Form;