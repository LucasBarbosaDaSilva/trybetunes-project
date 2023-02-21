import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Profile.css';

class Profile extends Component {
  state = {
    name: undefined,
    email: undefined,
    description: undefined,
    image: undefined,
    loading: false,
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    }, async () => {
      const result = await getUser();
      this.setState({
        ...result,
        loading: false,
      });
    });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile" className="page-profile">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="logo-search" />
              <img
                data-testid="profile-image"
                className="profile-image"
                src={ image }
                alt={ name }
              />
              <div className="info-profile">
                <div className="info">
                  Nome:

                  <p className="paragrafo">
                    {' '}
                    { name }
                  </p>
                  Email:

                  <p className="paragrafo">
                    {' '}
                    { email }
                  </p>
                  Description:

                  <p className="paragrafo">
                    {' '}
                    { description }
                  </p>
                  <Link
                    to="/profile/edit"
                    className="link-edit-profile"
                  >
                    Editar perfil
                  </Link>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
