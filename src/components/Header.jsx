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
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="image-svg" viewBox="0 0 16 16">
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.3971.398h-.001c.
                  03.04.062.078.098.115l3.853.85a1 1 0 0 0 1.415-1.4
                  14l-3.85-3.85a1.0071.007 0 0 0-.115-.1zM12 6.5a5.5 
                  5.50 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
                {' '}

              </svg>
              Pesquisa
            </Link>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
              className="link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="image-svg"
                viewBox="0 0 16 16"
              >

                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256
                4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73
                3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513
                0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523
                 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565
               0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847
                  3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694
                  3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
                {' '}

              </svg>
              Favoritas
            </Link>
            <Link
              data-testid="link-to-profile"
              to="/profile"
              className="link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="image-svg" viewBox="0 0 16 16">
                {' '}
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                {' '}
              </svg>
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
