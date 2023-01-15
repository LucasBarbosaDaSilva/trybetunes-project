import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const { fetchApiGetUser } = this.props;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">
          { fetchApiGetUser }
          Carregando ...
        </p>
        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  fetchApiGetUser: func.isRequired,
};

export default Header;
