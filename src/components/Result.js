import React, { useState, useEffect } from 'react'
import {
    Link
} from "react-router-dom"

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
        if (question.questionType === "radio") {
            return (
                <div>
                    <h4>{question.questionline}</h4>
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
                <div>
                    <h4>{question.questionline}</h4>
                    <div>
                        {
                            question.answers.map((answer) =>
                                <div key={answer.answerid}>
                                    <p>{answer.answerline}</p>
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
            <h1>{quiz.quizName} results</h1>
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