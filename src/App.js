import React, { useEffect, useState } from 'react'


import Quiz from './components/Quiz'

export default function App() {

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

  const sendQuizId = (props) => {
   <Quiz quizId={props.value}></Quiz>
  }


  return (
    <div>
      <h1>Quiz List</h1>
          {
            quizList.map((quiz) =>
              <div value={quiz.quizId}>
              <button onClick={sendQuizId(quiz.quizId)}>{quiz.quizName}</button>
              </div>
            )
          }
    </div>
  )
}

