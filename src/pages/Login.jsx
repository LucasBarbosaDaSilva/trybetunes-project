import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    user: '',
    buttonDisable: true,
  };

  checkButton = (e) => {
    const caracters = 3;
    if (user.length >= caracters) {
      this.setState((buttonDisable = false), (user = e.target.value));
    } else {
      this.setState((buttonDisable = true), (user = e.target.value));
    }
  };

  render() {
    const { user, buttonDisable } = this.state;
    return (
      <div data-testid="page-login">
        <input
          type="search"
          name="search"
          id="search"
          data-testid="login-name-input"
          placeholder="Digite seu nome"
          onChange={ this.checkButton }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          onClick={ () => createUser({ name: user }) }
          disabled={ buttonDisable }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;
