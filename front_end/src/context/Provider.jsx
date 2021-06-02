import React, { useState, useEffect } from 'react';

import { saveStorage, loadStorage } from '../util/localStorage';
import FriendAppContext from './FriendAppContext';

function Provider({ children }) {
  const [user, setUser] = useState(loadStorage('user', {}));

  useEffect(() => {
    saveStorage('user', user);
  }, [user]);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <FriendAppContext.Provider value={ contextValue }>
      {children}
    </FriendAppContext.Provider>
  );
}

export default Provider;
