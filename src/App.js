import React, { useEffect } from 'react';

function QuizList() {
  const [selectedQuiz, setSelectedQuiz] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  
  useEffect(() => {
    getselectedQuiz();
  }, []);

  const getselectedQuiz = () => {
    fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/2')
      .then(response => response.json())
      .then(responseData => {
          setSelectedQuiz(responseData);
          setQuestions(responseData.question);
      })
      .catch(err => console.error(err))

      console.log(selectedQuiz);
  }

  return (
    <div>
      <h2> {selectedQuiz.quizName} </h2>
      <table>
        <tbody>
          <tr>
            <th>Question </th>
            <th>Answer </th>
          </tr>
          {
            questions.map((quiz) =>
              <tr key={quiz.questionid}>
                <td>{quiz.questionline}</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )

}

export default QuizList;