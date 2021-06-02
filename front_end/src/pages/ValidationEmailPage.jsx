import React, { useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

import { DOMAIN } from '../config';
import FriendAppContext from '../context/FriendAppContext';

function ValidationEmailPage() {
  const { token } = useParams();
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

  return (
    <div>
      <p>Validando email...</p>
    </div>
  );
}

export default ValidationEmailPage;
