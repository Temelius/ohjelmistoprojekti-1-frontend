import React, { useEffect, useState } from 'react'
import {
    Link
  } from "react-router-dom"


export default function App() {

  const [quizList, setQuizList] = useState([])
  const [selectedQuiz, setSelectedQuiz] = useState("")

  useEffect(() => {
      getQuizList()
  }, [])

  // Get a list of all quizzes
  const API_URL = 'http://localhost:8080/api/quiz/list'

  const getQuizList = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setQuizList(data)
      })
      .catch(err => console.error(err))
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
              <p> {quiz.quizName}</p>
          </div>
            )
            
          }
          <br/>
          <Link to={`/Quiz/${selectedQuiz}`}>Select Quiz</Link>
          <br/>
          <br/>
          <br/>
          
    </div>
  )
}

