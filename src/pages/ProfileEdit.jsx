import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  state = {
    name: undefined,
    email: undefined,
    description: undefined,
    image: undefined,
    loading: false,
    buttonDisable: true,
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

  buttonEnable = () => {
    const { name, email, description, image } = this.state;
    const entries = [name, email, description, image];
    const result = entries.every((e) => e.length > 0);
    this.setState({
      buttonDisable: !result,
    });
  };

  handleChange = async ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => this.buttonEnable());
  };

  buttonSubmit = async (e) => {
    e.preventDefault();
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    // this.setState({
    //   loading: true,
    // }, async () => {
    await updateUser({ name, email, description, image });
    this.setState({ loading: false });
    history.push('/profile');
    // });
  };

  render() {
    const { name, email, description, image, loading, buttonDisable } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <label htmlFor="input-name">
              Nome:
              <input
                type="text"
                name="name"
                data-testid="edit-input-name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-email">
              Email:
              <input
                type="text"
                name="email"
                data-testid="edit-input-email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="input-description">
              Descrição:
              <input
                type="text"
                name="description"
                data-testid="edit-input-description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <img src={ image } alt={ name } />
            <label htmlFor="input-image">
              Image:
              <input
                id="input-image"
                type="text"
                name="image"
                data-testid="edit-input-image"
                value={ image }
                onChange={ this.handleChange }
              />
            </label>

            <button
              type="submit"
              data-testid="edit-button-save"
              disabled={ buttonDisable }
              onClick={ this.buttonSubmit }
            >
              Editar perfil
            </button>

          </form>
        )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
