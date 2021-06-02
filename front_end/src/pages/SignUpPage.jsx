import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import BeersAppContext from '../context/FriendAppContext';
// import fetchApiJsonBody from '../util/fetchApi';
import funcValidations from '../util/funcValidations';
import { loadStorage } from '../util/localStorage';

import axios from 'axios';

import { DOMAIN } from '../config';

import '../style/LoginRegister.css';

function SignUpPage() {
  // if (loadStorage('user', {}).token) history.push('/products');

  // const [valid, setValid] = useState(true);
  const [inputValues, setInputValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [erros, setErros] = useState({
    name: [],
    email: [],
    password: [],
  });
  // const [emailErros, setEmailErros] = useState([]);
  // const [passwordErros, setPasswordErros] = useState([]);


  // const isValid = () => {
  //   const email = funcValidations.validateEmail(inputValues.email);
  //   const password = funcValidations.validatePassword(inputValues.password);
  //   const name = funcValidations.validateName(inputValues.name);
  //   if (email && name && password) {
  //     setValid(false);
  //   } else {
  //     setValid(true);
  //   }
  // };

  // useEffect(() => isValid(),
  //   [inputValues.name, inputValues.password, inputValues.email]);

  const handleChange = ({ target }) => {
    setInputValues({ ...inputValues, [target.name]: target.value });
  };

  const handleClick = async () => {
    // const returnSignup = await fetchApiJsonBody('/register', inputValues);
    // if (returnSignup.err) {
    //   setMessage(returnSignup.err);
    //   return;
    // }
    // setUser(returnSignup);
    // if (returnSignup.role === 'administrator') {
    //   history.push('/admin/orders');
    // } else if (returnSignup.role === 'client') {
    //   history.push('/products');
    // }
    console.log('entrouuu')
    const { data } = await axios.post(
      `http://${DOMAIN}/register`,
      inputValues,
    );
    console.log('data', data)
    console.log('typeof data.err', typeof data.err)
    if (typeof data.err === 'object') {
      const arrayEmailErros = [];
      const arrayPasswordErros = [];
      const arrayNameErros = [];

      data.err.forEach((objErro) => {
        switch (objErro.param) {
          case 'email':
            return arrayEmailErros.push(objErro);            
          case 'password':
            return arrayPasswordErros.push(objErro);   
          case 'name':
            return arrayNameErros.push(objErro);   
          default: return null;
        } 
      });
      setErros({
        name: arrayNameErros,
        email: arrayEmailErros,
        password: arrayPasswordErros,
      })
      return;
    } else if (data.err) {
      return setMessage(data.err);
    }
    setErros({
      name: [],
      email: [],
      password: [],
    })
    setMessage('Um email foi enviado para você onde você pode validar sua conta')
  };

  return (
    <div className="login-register">
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            id="name"
            name="name"
            placeholder="ex: José Rodolfo"
            value={ inputValues.name }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.name.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ex: jose@gmail.com"
            value={ inputValues.email }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.email.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            id="password"
            name="password"
            placeholder="ex: rio%86"
            value={ inputValues.password }
            onChange={ handleChange }
          />
        </label>
        <ul>
          {erros.password.map(({ msg }, index) => <li key={index}>{ msg }</li>)}            
        </ul>
        <p>{message}</p>
        <button
          id="sign-up"
          type="button"
          // disabled={ valid }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default SignUpPage;
