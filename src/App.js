import React, { useEffect, useState } from 'react'


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
        
          {
            quizList.map((quiz) =>
              <ul key={quiz.quizId}>
              <li>{quiz.quizName}</li>
              <li><button onClick={Quiz(quiz.quizId)}/></li>
              </ul>
            )
          }
    </div>
  )
}

export default App;
