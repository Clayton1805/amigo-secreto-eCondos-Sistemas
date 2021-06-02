import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import FriendAppContext from '../context/FriendAppContext';
import { DOMAIN } from '../config';

import '../style/CSS.css';

function LoginPage() {
  const history = useHistory();

  const {
    setUser,
  } = useContext(FriendAppContext);

  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState('');

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    const { data } = await axios.post(
      `http://${DOMAIN}/login`,
      inputValues,
    );
    if (data.err) {
      return setErrMessage(data.err);      
    }
    setUser(data)
    history.push('/sorteio');
  };

  const redirectCadastro = () => history.push('/cadastro');

  return (
    <div className="login-register">
      <form>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="pass">
          Senha
          <br />
          <input
            type="password"
            id="pass"
            name="password"
            value={ inputValues.password }
            onChange={ handleChange }
          />
        </label>
        <span>{ errMessage }</span>
        <button
          id="enter"
          type="button"
          onClick={ handleClick }
        >
          Entrar
        </button>
        <button
          id="sign-up"
          type="button"
          onClick={ redirectCadastro }
          className="bttn-text"
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
