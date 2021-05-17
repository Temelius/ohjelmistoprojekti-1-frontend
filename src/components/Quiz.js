import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import LoadingSpinner from './LoadingSpinner'

import '../App.css';

export default function Quiz(props) {

    // quizId from props
    const quizId = props.match.params.id;

    // List of questions
    const [questionList, setQuestionList] = useState([])

    // Answer states
    const [ans, setAns] = React.useState(
        { userAnswerLine: '', answer: { answerid: null } }
    );
    const [textAns, setTextAns] = React.useState(
        { answerline: '', question: { questionid: null } }
    );

    const [isLoading, setLoading] = useState(true)

    const { addToast } = useToasts()

    // Radio group index
    let qIndex = 0;
    
    useEffect(() => {
        getQuizQuestions()
    }, [])

    
    const getQuizQuestions = () => {
        const API_URL = `https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/${quizId}`
        fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            //console.log(data)
            setQuestionList(data.question)
            setLoading(false)
        })
        .catch(err => console.error(err))
    }
    
    // If page is still loading, show user a Loading indicator
    if (isLoading) {
        return (
            <LoadingSpinner />
        )
    }

    const inputChanged = (e) => {
        // Get custom attribute->console.log(e.target.getAttribute('data-key'))
        setAns({ userAnswerLine: e.target.value, answer: { answerid: e.target.getAttribute('data-key') } });
    }

    async function sendRadioAnswer() {
        // Send radio answer to server
        //console.log("Ans:" + JSON.stringify(ans))
        const response = await fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/useranswers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ans)
        }).catch(err => console.error(err))

        if (response.status === 200) {
            addToast(`Vastaus "${ans.userAnswerLine}" tallennettu`, {
                appearance: 'success',
            })
        } else {
            addToast('Virhe vastauksen tallennuksessa', {
                appearance: 'error'
            })
        }
    }

    async function sendTextAnswer () {
        // Send text answer to server
        //console.log("Ans:" + JSON.stringify(ans))
        const response = await fetch('https://ohjelmistoprojekti-1-backend.herokuapp.com/api/answers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(textAns)
        }).catch(err => console.error(err))

        if (response.status === 200) {
            addToast(`Vastaus "${textAns.answerline}" tallennettu`, {
                appearance: 'success',
            })
        } else {
            addToast('Virhe vastauksen tallennuksessa', {
                appearance: 'error'
            })
        }
    }

    const textInputChanged = (e) => {
        // Get custom attribute->console.log(e.target.getAttribute('data-key'))
        setTextAns({ answerline: e.target.value, question: { questionid: e.target.getAttribute('data-key') } });
    }


    const radioOrText = (q) => {
        // Render different things if questionType 
        //  is radio or text type
        if (q.questionType === "radio") {
            qIndex = qIndex + 1
            return (
                <div>
                    <h4 className="header">{q.questionline}</h4>
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

                    <button className="btn btn-outline-primary" onClick={sendRadioAnswer}>Vastaa</button>
                    <br />
                    <br />
                </div>)
        }
        else if (q.questionType === "text") {
            qIndex = qIndex + 1
            return (
                <div>
                    <h4 className="header">{q.questionline}</h4>
                    <input
                        data-key={q.questionid}
                        type="text"
                        name={qIndex}
                        onChange={textInputChanged}
                    />
                    <br />
                    <br />

                    <button className="btn btn-outline-primary" onClick={sendTextAnswer}>Vastaa</button>
                    <br />
                    <br />
                </div>)
        }
    }

    return (
        <div>
            <h1 className="header">Kysymykset</h1>

            {
                questionList.map((q) =>
                    <div key={q.questionid}>
                        {radioOrText(q)}
                        
                    </div>
                )
            }

            <br />
            <Link to={`/results/${quizId}`}>
                <button className="btn btn-outline-primary">
                    Tarkastele tuloksia
                </button>
            </Link>
        </div>
    )
}

