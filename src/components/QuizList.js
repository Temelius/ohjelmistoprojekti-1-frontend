import React, { useEffect, useState } from 'react'


import Quiz from './components/Quiz'

export default function App() {

  const [quizList, setQuizList] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState("")

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

  const sendQuizId = () => {
   <Quiz selectedQuiz = {selectedQuiz}/>
  }

  const inputChanged = (e) => {
    setSelectedQuiz(e.target.value);
}


  return (
    <div>
      <h1>Quiz List</h1>
          {
            quizList.map((quiz) =>
            <div key={quiz.quizId}>
              <input type="radio" name="quizId" value={quiz.quizId} onChange={inputChanged}></input>
              <text> {quiz.quizName}</text>
          </div>
            )
            
          }
          <br/>
          <button onClick={sendQuizId}>Vastaa kyselyyn</button>
          <br/>
          <br/>
          <br/>
          <text>{selectedQuiz}</text>
    </div>
  )
}

