import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <div data-testid="page-profile">
        <Header />
        { loading ? <Loading />
          : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ name } />
              Nome:
              <p>{ name }</p>
              Email:
              <p>{ email }</p>
              Description:
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
