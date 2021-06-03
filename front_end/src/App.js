import React from 'react';
import {
  Route, Switch, BrowserRouter, Redirect,
} from 'react-router-dom';
import Provider from './context/Provider';
import {
  LoginPage,
  SignUpPage,
  ValidationEmailPage,
  RafflePage,
  ResendValidationEmailPage,
} from './pages';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider>
          <Switch>
            <Route exact path="/login" component={ LoginPage } />
            <Route exact path="/cadastro" component={ SignUpPage } />
            <Route exact path="/validar_email/:token" component={ ValidationEmailPage } />
            <Route exact path="/sorteio" component={ RafflePage } />
            <Route exact path="/reenviar_email" component={ ResendValidationEmailPage } />
            <Route exact path="/" component={ () => <Redirect to="/login" /> } />
          </Switch>
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
