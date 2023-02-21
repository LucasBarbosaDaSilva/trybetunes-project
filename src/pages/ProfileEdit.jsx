import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';
import './ProfileEdit.css';

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
      <div data-testid="page-profile-edit" className="page-profile-edit">
        <Header />
        { loading ? <Loading /> : (
          <form>
            <div className="image-section-edit">
              <img src="https://cdn-icons-png.flaticon.com/512/1544/1544829.png" alt="logo" className="logo-search" />
              <img src={ image } alt={ name } className="image-edit-profile" />
              <label htmlFor="input-image" className="label-image">
                Image:

                <input
                  id="input-image"
                  type="text"
                  name="image"
                  placeholder="Insira o link da imagem"
                  className="input-image"
                  data-testid="edit-input-image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
            <div className="edit-profile-info">
              <label htmlFor="input-name" className="label-geral">
                Nome:
                <input
                  type="text"
                  name="name"
                  placeholder="Fique à vontade para usar seu nome social"
                  className="name-email-input"
                  data-testid="edit-input-name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-email" className="label-geral">
                Email:
                <input
                  type="text"
                  name="email"
                  placeholder="Escolha um email que use diariamente"
                  className="name-email-input"
                  data-testid="edit-input-email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="input-description" className="label-geral">
                Descrição:
                <input
                  type="text"
                  placeholder="Sobre mim"
                  name="description"
                  className="input-description"
                  data-testid="edit-input-description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>

              <button
                type="submit"
                className="button-edit-profile-page"
                data-testid="edit-button-save"
                disabled={ buttonDisable }
                onClick={ this.buttonSubmit }
              >
                Editar Perfil
              </button>
            </div>
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
