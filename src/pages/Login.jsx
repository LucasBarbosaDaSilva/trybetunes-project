import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';
import './Login.css';

export default class Login extends Component {
  state = {
    name: '',
    loading: false,
  };

  saveName = ({ target: { value } }) => {
    this.setState({ name: value });
  };

  buttonClick = async () => {
    const { history } = this.props;
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    return history.push('/search');
  };

  render() {
    const { name, loading } = this.state;
    const lengthButton = 3;
    return (
      <div data-testid="page-login" className="login-page">
        <div className="login-logo">
          <h2 className="login-title">TrybeTunes</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="logo" />

        </div>
        <input
          type="search"
          name="search"
          className="search-login"
          id="search"
          data-testid="login-name-input"
          placeholder="Digite seu nome"
          onChange={ this.saveName }
        />
        <button
          type="button"
          className="button-login"
          data-testid="login-submit-button"
          onClick={ this.buttonClick }
          disabled={ name.length < lengthButton }
        >
          Entrar
        </button>
        { loading && <Loading /> }
      </div>
    );
  }
}

Login.propTypes = {
  push: PropTypes.string,
}.isRequired;
