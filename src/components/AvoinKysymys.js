import React, { useEffect } from 'react';

function AvoinKysymys() {
    const [selectedQuiz, setSelectedQuiz] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [userAnswer, setUserAnswer] = React.useState([]);

    useEffect(() => {
        getQuizzes();
    }, []);

    const getQuizzes = () => {
        fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/1')
            .then(response => response.json())
            .then(data => {
                setSelectedQuiz(data);
                setQuestions(data.question);
            })
            .catch(err => console.error(err))
    }

    const inputChanged = (e) => {
        setUserAnswer(e.target.value);
    }

    const sendAnswer = () => {
        fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/useranswers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userAnswerLine: userAnswer,
            })
        })
        alert('Valitsin vastauksen ' + userAnswer + '. Vastaus tallennettu!')
    }

    return (
        <div>
            <center>
                <h2> {selectedQuiz.quizName} </h2>

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
                                        <td><input type="text" name="userAnswer" onChange={inputChanged} />
                                        </td>
                                    </tr>
                                )
                            }
                            <button type="submit">Vastaa</button>

                        </tbody>
                    </table>
                    <br />
{/*                     {userAnswer}
 */}                </form>
            </center>
        </div>
    )
}
export default AvoinKysymys;