import React, { useEffect, useState } from 'react'
import '../App.css';

export default function Quiz(props) {


    const [questionList, setQuestionList] = useState([])
    const [quizz, setQuizz] = useState([])
    const [ans, setAns] = React.useState({ userAnswerLine: '', answer: { answerid: null } });
    const [textAns, setTextAns] = React.useState({ answerline: '', question: { questionid: null } });
    let qIndex = 0;
    
    useEffect(() => {
        getQuizQuestions()
        console.log(URL)
    }, [])

    const getQuizQuestions = () => {
        const URL = 'http://localhost:8080/api/quiz/' + props.match.params.id
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setQuestionList(data.question)
                setQuizz(data)
            })
            .catch(err => console.error(err))
    }

    const inputChanged = (e) => {
        // Get custom attribute->console.log(e.target.getAttribute('data-key'))
        setAns({ userAnswerLine: e.target.value, answer: { answerid: e.target.getAttribute('data-key') } });
    }

    const sendRadioAnswer = () => {
        console.log("Ans:" + JSON.stringify(ans))
        fetch('http://localhost:8080/api/useranswers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ans)
        })
            .catch(err => console.error(err))
    }

    const textInputChanged = (e) => {
        // Get custom attribute->console.log(e.target.getAttribute('data-key'))
        setTextAns({ answerline: e.target.value, question: { questionid: e.target.getAttribute('data-key') } });
    }

    const sendTextAnswer = () => {
        console.log("Ans:" + JSON.stringify(ans))
        fetch('http://localhost:8080/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(textAns)
        })
            .catch(err => console.error(err))
    }

    const showAnswers = (q) => {

    }

    const radioOrText = (q) => {
        if (q.questionType === "radio") {
            qIndex = qIndex + 1
            return (
                <div>
                    <p>{q.questionline}</p>
                    <div>{q.answers.map((answer) =>
                        <div key={answer.answerid}>
                            <p>

                                <input type="radio"
                                    data-key={answer.answerid}
                                    onChange={inputChanged}
                                    value={answer.answerline}
                                    name={qIndex}
                                />
                                {answer.answerline}
                            </p>
                        </div>
                    )}

                    </div>

                    <button class="Button-style" onClick={sendRadioAnswer}>Vastaa</button>
                </div>)
        }
        else if (q.questionType === "text") {
            qIndex = qIndex + 1
            return (
                <div>
                    <p>{q.questionline}</p>
                    <input
                        data-key={q.questionid}
                        type="text"
                        name={qIndex}
                        onChange={textInputChanged}
                    />
                    <br />

                    <button class="Button-style" onClick={sendTextAnswer}>Vastaa</button>
                </div>)
        }
    }

    return (
        <div>
            <h1 class="header">Kysymykset</h1>

            {
                questionList.map((q) =>
                    <div key={q.questionid}>
                        {radioOrText(q)}
                        
                    </div>
                )
            }

            <br />
        </div>
    )
}

