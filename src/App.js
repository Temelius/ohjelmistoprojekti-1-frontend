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


function App() {
  return (
    <div className="App">
      <h1 class="App-header">KYSELYAPP</h1>
      <Router>
        <div>
          <Link  to="/"><button class="Button-style">Etusivulle</button></Link>{' '}
          <Switch>
            <Route exact path="/" component={QuizList} />
            <Route path="/Quiz/:id" component={Quiz} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;