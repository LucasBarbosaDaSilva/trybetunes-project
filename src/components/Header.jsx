import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends Component {
  state = {
    loading: false,
    saveName: '',
  };

  componentDidMount() {
    this.showName();
  }

  showName = async () => {
    this.setState({ loading: true });
    const savedName = await getUser();
    this.setState({
      loading: false,
      saveName: savedName.name,
    });
  };

  render() {
    const { loading, saveName } = this.state;
    return (
      <header data-testid="header-component" className="header">
        <div className="header-logo-title">
          <h2 className="header-title">TrybeTunes</h2>
          <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="header-logo" />

        </div>
        <div className="header-page">
          <nav className="header-link">
            <Link
              data-testid="link-to-search"
              to="/search"
              className="link"
            >
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link"
            >
              Favoritas
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link"
            >
              Perfil
            </Link>
          </nav>
          { loading && <Loading /> }
          <p data-testid="header-user-name" className="login-name">
            { saveName }
          </p>
        </div>
      </header>
    );
  }
}

export default Header;
