import React, { useEffect } from 'react';

function QuizList() {
  const [quizzes, setQuizzes] = React.useState([]);

  useEffect(() => {
    getQuizzes();
  }, []);

  const getQuizzes = () => {
    fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/list')
      .then(response => response.json())
      .then(responseData => 
          setQuizzes(responseData)
          )
      .catch(err => console.error(err))

      console.log(quizzes);
  }

  return (
    <div>
      <h2> Quizzes </h2>
      <table>
        <tbody>
          <tr>
            <th>Quiz </th>
            <th>Question </th>
            <th>Answer </th>
          </tr>
          {
            quizzes.map((quiz) =>
              <tr key={quiz.quizId}>
                <td>{quiz.quizName}</td>
                
                <td>{quiz.question.questionline}</td>
                <td>{quiz.question.answers}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )

}

export default QuizList;