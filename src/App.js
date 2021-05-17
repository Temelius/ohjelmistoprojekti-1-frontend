
import React from 'react';

import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Result from './components/Result'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

// Styles
import './App.css';
import Logo from './logo.svg';
import { ToastProvider } from 'react-toast-notifications';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <div className="container-fluid no-gutters">
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-brand mx-auto" href="/">
            <img src={Logo} alt="" width="60" height="60" className="d-inline-block align-text-top"/>
              KyselyÄppi
          </a>
        </div>
      </nav>
      <div className="App">
      {/* provider for toast notifications */}
      <ToastProvider autoDismiss={true}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={QuizList} />
              <Route path="/quiz/:id" component={Quiz} />
              <Route path="/results/:id" component={Result} />
              <Route render={() => <h1>Sivua ei löytynyt</h1>} />
            </Switch>
          </div>
        </Router>
      </ToastProvider>
      </div>

      <div className="footer">
          <h1>KyselyÄppi - 2021</h1>
          <a href="https://github.com/Temelius/ohjelmistoprojekti-1-frontend"
              className="footer-link">
            GitHub
          </a>
      </div>
    </div>
  );
}

export default App;