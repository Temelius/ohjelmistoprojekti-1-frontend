import React from 'react';

import QuizList from './components/QuizList';
import Quiz from './components/Quiz';
import Result from './components/Result'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

// Styles
import './App.css';
import Logo from './logo.svg';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle'

function App() {
  return (
    <div className="container-fluid no-gutters">
      <nav class="navbar">
        <div class="container-fluid">
          <a class="navbar-brand mx-auto" href="/">
            <img src={Logo} alt="" width="60" height="60" class="d-inline-block align-text-top"/>
              KyselyÄppi
          </a>
        </div>
      </nav>
      <div className="App">

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
      </div>
    </div>
  );
}

export default App;