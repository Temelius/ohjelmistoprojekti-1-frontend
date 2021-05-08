import React, { useEffect, useState } from 'react'

export default function Quiz(props){
    const [quizId, setQuizId] = React.useState(props.quizId)
    const [questionList, setQuestionList] = React.useState(props.quizId)
    const API_URL = 'https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/' + quizId


    useEffect(() => {
        getQuizQuestions()
    }, [])

    const getQuizQuestions = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setQuestionList(data.question)
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <h1>Questions</h1>
            {
                questionList.map((question) =>
                    <div key={question.questionid}>
                        <text>{question.questionLine}</text>
                    </div>
                )
            }
        </div>
    )
}

