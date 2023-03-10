import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../trivia.png';
import fetchToken from '../services/fetchToken';
import fetchImage from '../services/fetchImage';
import { getToken, getNameAndEmail, getImage } from '../redux/actions';
import { savePlayer } from '../services/saveToLocal';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.infoCheck = this.infoCheck.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  async onClick() {
    const { tokenData, history, addNameAndEmail, addImage } = this.props;
    const { name, email } = this.state;

    const response = await fetchToken();
    tokenData(response);

    const responseImage = await fetchImage(email);
    addImage(responseImage);

    addNameAndEmail(name, email);
    savePlayer(name, email);
    history.push('/game');
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), this.infoCheck);
  }

  infoCheck() {
    const { name, email } = this.state;
    const isDisable = !(name.length > 0 && email.length > 0);
    this.setState({ isDisable });
  }

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div className="App">
        <header className="App-header teste">
          <img src={ logo } className="App-logo" alt="logo" />
          <p className="login">LOGIN</p>
          <form>
            <label htmlFor="name" className="login-form">
              Nome:
              <input
                data-testid="input-player-name"
                type="text"
                className="name"
                name="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email" className="login-form">
              Email:
              <input
                data-testid="input-gravatar-email"
                type="text"
                className="email"
                name="email"
                value={ email }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="btn-play"
              type="button"
              onClick={ this.onClick }
              disabled={ isDisable }
              className="buttons"
            >
              Jogar
            </button>
            <Link to="/settings">
              <button type="button" data-testid="btn-settings" className="buttons">
                Configura????es
              </button>
            </Link>
          </form>
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  tokenData: PropTypes.func.isRequired,
  addNameAndEmail: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  tokenData: (token) => dispatch(getToken(token)),
  addNameAndEmail: (name, email) => dispatch(getNameAndEmail(name, email)),
  addImage: (image) => dispatch(getImage(image)),
});

export default connect(null, mapDispatchToProps)(Login);
