import React, { useEffect, useState } from 'react'
import {
  Link
} from "react-router-dom"

import LoadingSpinner from './LoadingSpinner'

import '../App.css';

export default function App() {

  const [quizList, setQuizList] = useState([])

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getQuizList()
  }, [])

  // Get a list of all quizzes
  const API_URL = 'https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/list'

  const getQuizList = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        setQuizList(data)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }
  
  // If page is still loading, show user a Loading indicator
  if (isLoading) {
    return (
      <div>
        <h1 className="header">Kyselyt</h1>
        <LoadingSpinner />
      </div>
    )
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

