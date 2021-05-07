import React, { useEffect } from 'react';

function RadioKysymys() {
    const [selectedQuiz, setSelectedQuiz] = React.useState([]);
    const [questions, setQuestions] = React.useState([]);
    const [ans, setAns] = React.useState([]);
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

    const sendAnswer = (ans) => {
        fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/useranswers', {
            method: 'POST',
            body: JSON.stringify(ans)
        })
            .catch(err => console.error(err))
    }

    const inputChanged = (e) => {
        setAns({ [e.target.name]: e.target.value });
    }

    return (
        <div>
            <center>
                <h2> {selectedQuiz.quizName} </h2>
                <form onSubmit={sendAnswer(ans)}>
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
                                                        name="userAnswerline"
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
export default RadioKysymys;