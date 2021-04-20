import React, { useState, useEffect, useRef } from 'react';

function QuizList() {
  const [quizzes, setQuizzes] = React.useState([]);

  useEffect(() => {
    getQuizzes();
  }, []);

  const getQuizzes = () => {
    fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/question/4')
      .then(response => response.json())
      .then(responseData => setQuizzes(responseData.data))
      .catch(err => console.error(err))
  }
  return (
    <div>
      <h2> Question </h2>
      <table>
        <tbody>
          <tr>
            <th>Question </th>
          </tr>
          {
            quizzes.map((question) =>
              <tr key={question.questionid}>
                <td>{question.questionline}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )

}

export default QuizList;