import React from 'react';

const Input = ({ type, name, label, value, error, onChange, ...rest }) => {
  return (
    <div className='form-group'>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        {...rest}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        id={name}
        className="form-control"
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;