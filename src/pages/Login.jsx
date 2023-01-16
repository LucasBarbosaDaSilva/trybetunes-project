import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
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
      <div data-testid="page-login">
        { loading && <Loading /> }
        <input
          type="search"
          name="search"
          id="search"
          data-testid="login-name-input"
          placeholder="Digite seu nome"
          onChange={ this.saveName }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ this.buttonClick }
          disabled={ name.length < lengthButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  push: PropTypes.string,
}.isRequired;

export default Login;
