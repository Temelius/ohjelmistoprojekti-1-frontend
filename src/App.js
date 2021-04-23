import React, { useEffect, useState } from 'react'

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
      <table>
        <tbody>
        <tr>
          <th>Quiz Name</th>
        </tr>
          {
            quizList.map((quiz) =>
              <tr key={quiz.quizId}>
                <td>{quiz.quizName}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;
