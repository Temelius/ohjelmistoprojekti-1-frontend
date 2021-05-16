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
        const piirakkaData = [['AnswerLine', 'AnswerCount']]
        if (question.questionType === "radio") {
            question.answers.forEach(answer => {
                piirakkaData.push(
                    [answer.answerline, answer.userAnswers.length]
                    )
                console.log(piirakkaData)
            });
            return (
                <div>
                    <h4 className="header">{question.questionline}</h4>
                    <div>
                        {
                            /*question.answers.map((answer) =>
                                <div key={answer.answerid}>
                                    <p>{answer.answerline} - {answer.userAnswers.length}</p>

                                </div>
                            )*/
                        }
                        <div className="chart">

                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={piirakkaData}
                            options={{
                                backgroundColor: '#DADED4',
                                colors:[
                                    '#E27D60',
                                    '#95CBCB',
                                    '#E8A87C',
                                    '#C38D9E',
                                    '#41B3A3',
                                    '#90cbf9',
                                    '#869edc',
                                    '#dfa9d6',
                                    '#f7c6d2',
                                    '#fddccb',
                                    '#90C978',
                                    '#BFE3DA',
                                    '#C0DDBE',
                                    '#FEFFF7',
                                    '#FFBA67'
                                ]
                            }}
                            rootProps={{ 'data-testid': '1' }}
                            />
                        </div>
                    </div>
                </div>
            )

        } else if (question.questionType === "text") {
            return (
                <div className="container">
                    <h4 className="header">{question.questionline}</h4>
                    <div className="row">
                        {
                            question.answers.map((answer) =>
                                <div className="col-sm" key={answer.answerid}>
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