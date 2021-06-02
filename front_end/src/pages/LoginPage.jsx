import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import FriendAppContext from '../context/FriendAppContext';
// import fetchApiJsonBody from '../service/fetchApi';
import funcValidations from '../util/funcValidations';
import { loadStorage } from '../util/localStorage';

import '../style/LoginRegister.css';
import { DOMAIN } from '../config';

function LoginPage() {
  const history = useHistory();
  const {
    setUser,
  } = useContext(FriendAppContext);

  // if (loadStorage('user', {}).token) history.push('/products');

  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const [errMessage, setErrMessage] = useState('');

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    console.log('inputValues', inputValues)
    const { data } = await axios.post(
      `http://${DOMAIN}/login`,
      inputValues,
    );
    if (data.err) {
      return setErrMessage(data.err);      
    }

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
          // disabled={ valid }
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
