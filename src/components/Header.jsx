import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

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
      <header data-testid="header-component">
        { loading && <Loading /> }
        <p data-testid="header-user-name">
          { saveName }
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

export default Header;
