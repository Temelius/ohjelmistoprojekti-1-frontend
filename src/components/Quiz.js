import React, { useEffect, useState } from 'react'

export default function Quiz(props) {


    const [questionList, setQuestionList] = useState([])
    const [quizz, setQuizz] = useState([])
    const [ans, setAns] = React.useState({ userAnswerLine: '', answer: {answerid:null}});
    let qIndex = 0;

    useEffect(() => {
        getQuizQuestions()
        console.log(URL)
    }, [])

    const getQuizQuestions = () => {
        const URL = 'https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/' + props.match.params.id
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
        setAns({ userAnswerLine: e.target.value, answer: {answerid:e.target.key }});
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

    const radioOrText = (q) => {
        if (q.questionType === "radio" ){
            return(
            <div>
                        <p>{q.questionline}</p>
                        {qIndex = qIndex + 1}
                        <div>{q.answers.map((answer) =>
                            <div key={answer.answerid}>
                                <p>
                                
                                    <input type="radio"
                                        onChange={inputChanged}
                                        value={answer.answerline}
                                        name={qIndex}
                                    />
                                    {answer.answerline}
                                </p>
                            </div>
                        )}
                        
                        </div>
                    
                        <button onClick={sendRadioAnswer}>Lähetä vastaus</button>
                    </div>)
        } 
        else if (q.questionType === "text"){
            return(
            <div>
                        <p>{q.questionline}</p>
                        <input type="text" name={qIndex} onChange={inputChanged} />
                        <button onClick={sendRadioAnswer}>Lähetä vastaus</button>
                    </div>)
        }
    }

    return (
        <div>
            <h1>Questions</h1>
            
            {
                questionList.map((q) =>
                <div key={q.questionid}>
                {radioOrText(q)}
                </div>
                )
            }
        </div>
    )
}

