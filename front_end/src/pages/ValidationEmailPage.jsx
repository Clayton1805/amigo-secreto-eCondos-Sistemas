import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { DOMAIN } from '../config';
import FriendAppContext from '../context/FriendAppContext';

function ValidationEmailPage() {
  const { token } = useParams();
  console.log('token', token)
  const history = useHistory();
  const {
    setUser,
  } = useContext(FriendAppContext);
  useEffect(() => {
    axios.get(
      `http://${DOMAIN}/register/validation_email`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        }
      }
    ).then(({ data }) => {
      setUser(data);
      history.push('/sorteio')
    })
  }, []);

  // const redirect = () => history.push('/cadastro');

  return (
    <div>
      <p>validar_email</p>
    </div>
  );
}

export default ValidationEmailPage;
