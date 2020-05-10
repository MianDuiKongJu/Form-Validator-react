import React, { Component } from 'react';
import './Input.css'
import { render } from '@testing-library/react';

const Input = (props) => {

  const{onChange, label = 'Username', type = 'text', id = 'username', placeholder = 'Enter Username', errorMsg = 'Error Message'} = props
  return(
    <div className="form-control">
      <label htmlFor={ id }>{ label}</label>
      <input type={ type } id={ id } placeholder={ placeholder} onChange={(e) => onChange(e.target.value, id)} />
      <small>{ errorMsg }</small>
    </div>
  )
  
}

export default Input;