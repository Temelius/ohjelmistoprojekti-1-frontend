import React, { useEffect, useState } from 'react'

export default function Quiz(props){


    const [questionList, setQuestionList] = useState([])
    

    

    useEffect(() => {
        getQuizQuestions()
        console.log(URL)
    }, [])

    const getQuizQuestions = () => {
        const URL = 'https://ohjelmistoprojekti-1-backend.herokuapp.com/api/quiz/' + props.selectedQuiz
        fetch(URL)
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

