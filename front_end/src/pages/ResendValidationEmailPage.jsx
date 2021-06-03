import React, { useState } from 'react';
import axios from 'axios';

import { DOMAIN } from '../config';

import '../style/CSS.css';

function ResendValidationEmailPage() {
  const [inputEmail, setInputEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleClick = () => {
    axios.post(
      `http://${DOMAIN}/register/resend_validation_email`,
      {
        email: inputEmail,
      },
    )
      .then(({ data }) => {
        if (data.err) {
          return setMessage(data.err);
        }
        setMessage('Um email foi enviado para você, onde você pode validar sua conta.');
      });
  };

  return (
    <div className="login-register">
      <form>
        <h1>Reenviar email de validação</h1>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={ inputEmail }
            onChange={ ({ target }) => setInputEmail(target.value) }
          />
        </label>
        <span>{ message }</span>
        <button
          id="enter"
          type="button"
          onClick={ handleClick }
        >
          Enviar email
        </button>
      </form>
    </div>
  );
}

export default ResendValidationEmailPage;
