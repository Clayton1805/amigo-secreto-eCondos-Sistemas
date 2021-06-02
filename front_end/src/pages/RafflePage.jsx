import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';

import { DOMAIN } from '../config';
import FriendAppContext from '../context/FriendAppContext';

function ValidationEmailPage() {
  const history = useHistory();
  const {
    user,
  } = useContext(FriendAppContext);

  if (!user.token) history.push('/login');

  const [message, setMessage] = useState('');

  const raffleSecretFriend = () => {
    axios.get(
      `http://${DOMAIN}/raffle`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token,
        }
      }
    ).then(({ data }) => {
      if (data.err) return setMessage(data.err);

      setMessage(
        'Enviamos um e-mail para você, dizendo quem é seu amigo secreto. ' +
        '(clique novamente no botão se quiser enviar o email novamente)'
      );
    })
  };

  return (
    <div>
      <p>{ `Bem vindo ${user.name}!` }</p>
      <button
        type="button"
        onClick={ raffleSecretFriend }
      >
        Sortear amigo secreto
      </button>
      <br/>
      <p>{ message }</p>
      <br/>
    </div>
  );
}

export default ValidationEmailPage;
