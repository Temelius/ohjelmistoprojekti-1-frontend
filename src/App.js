import React, { useEffect } from 'react';

function QuizList() {
  const [selectedQuiz, setSelectedQuiz] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [ans, setAns] = React.useState("");
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
  }


  const sendAnswer = () => {
    fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/useranswers', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userAnswerLine: ans,
        
      })
    
    })

    alert('Valitsin vastauksen ' + ans + '. Vastaus tallennettu!')
  }

  const inputChanged = (event) => {
    setAns(event.target.value);
  }


  return (
    <div>
      <center>
        <h2> {selectedQuiz.quizName} </h2>
        <hr />
        <form onSubmit={sendAnswer}>
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

                    <td>{quiz.answers.map((answer) =>

                      <tr key={answer.answerid}>

                        <td>

                          <input type="radio" 
                          value={answer.answerline} 
                          name="useranswerline"
                          onChange={inputChanged}
                          />
                          {answer.answerline}
                        </td>


                      </tr>

                    )}
                      <button type="submit">Vastaa</button>

                    </td>

                  </tr>

                )

              }

            </tbody>
          </table>
        </form>
      </center>
    </div>
  )

}

export default QuizList;