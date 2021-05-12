import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom"

import '../App.css';

export default function App() {

  const [quizList, setQuizList] = useState([])

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

  return (
    <div>
      <h1 className="header">Kyselyt</h1>
      {
        quizList.map((quiz) =>
          <div key={quiz.quizId}>
            <Link to={`/quiz/${quiz.quizId}`}>
              <button value={quiz.quizId} className="btn btn-outline-primary">
                {quiz.quizName}
              </button>
            </Link>
            <br />
            <br />
          </div>
        )
      }
    </div>
  )
}

