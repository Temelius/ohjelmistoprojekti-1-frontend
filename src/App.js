import React, { useEffect, useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

import Quiz from './components/Quiz'

const App = () => {

  const [quizList, setQuizList] = useState([])

  useEffect(() => {
      getQuizList()
  }, [])

  // Get a list of all quizzes
  const API_URL = 'https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/list'

  const getQuizList = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuizList(data)
      })
      .catch(err => console.error(err))
  }

  return (
    <div>
      <h1>Quiz List</h1>
      <Router>
        <div>
          {
            quizList.map((quiz) =>
              <Link to="/quiz">{quiz.quizName}</Link>
            )
          }
          <Switch>
            <Route path="/quiz" component={Quiz} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App;
