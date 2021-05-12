import React from 'react';
import QuizList from './components/QuizList';
import Quiz from './components/Quiz';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import './App.css';

import Logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div class="App-header">
       <a href="/">
         <img src={Logo}></img>
         </a>
      </div>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={QuizList} />
            <Route path="/Quiz/:id" component={Quiz} />
            <Route render={() => <h1>Sivua ei löytynyt</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;