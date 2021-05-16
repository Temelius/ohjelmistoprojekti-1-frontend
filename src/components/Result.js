import React, { useState, useEffect } from 'react'
import Chart from "react-google-charts";
import '../App.css';

const Results = (props) => {

    const quizId = props.match.params.id
    const [questionList, setQuestionList] = useState([])
    const [quiz, setQuiz] = useState([])


    useEffect(() => {
        getQuizQuestions()
    }, [])

    const getQuizQuestions = () => {
        const URL = `http://localhost:8080/api/quiz/${quizId}`
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                console.log(data.question)
                setQuestionList(data.question)
                setQuiz(data)
            })
            .catch(err => console.error(err))
    }

    const radioOrText = (question) => {
        const piirakkaData = []
        if (question.questionType === "radio") {
            question.answers.forEach(answer => {
                piirakkaData.push({
                    answerline: answer.answerline, 
                    answercount: answer.userAnswers.length
                })
                console.log(piirakkaData)
            });
            return (
                <div>
                    <h4 className="header">{question.questionline}</h4>
                    <div>
                        {
                            question.answers.map((answer) =>
                                <div key={answer.answerid}>
                                    <p>{answer.answerline} - {answer.userAnswers.length}</p>

                                </div>
                            )
                        }
                        
                    </div>
                </div>
            )
            
        } else if (question.questionType === "text") {
            return (
                <div class="container">
                    <h4 className="header">{question.questionline}</h4>
                    <div class="row">
                        {
                            question.answers.map((answer) =>
                                <div class="col-sm" key={answer.answerid}>
                                    <p className="textResultsItem">{answer.answerline}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
        
    
    }

    return (
        <div>
            <h1 className="header">{quiz.quizName}</h1>
            {
                questionList.map((question) =>
                    <div key={question.questionid}>
                        {radioOrText(question)}
                    </div>
                )
            }

        </div>
    )
}

export default Results