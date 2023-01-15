import React, { Component } from 'react';
import { string, func } from 'prop-types';

class Login extends Component {
  render() {
    const { fetchApiCreateUser, value } = this.props;
    return (
      <div data-testid="page-login">
        <input
          type="search"
          name="search"
          id="search"
          data-testid="login-name-input"
          placeholder="Digite seu nome"
        />
        {value.length > 2 && (
          <button
            type="button"
            data-testid="login-submit-button"
            onClick={ fetchApiCreateUser }
          >
            Entrar
          </button>
        )}
      </div>
    );
  }
}

Login.propTypes = {
  fetchApiCreateUser: func.isRequired,
  value: string.isRequired,
};

export default Login;
