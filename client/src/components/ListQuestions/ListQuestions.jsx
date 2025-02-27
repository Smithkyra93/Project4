import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ListQuestions({user}) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [answer_body, setAnswer_body] = useState ("")

  const handleSubmit = async (event, question_id) => {

    event.preventDefault();
    console.log (question_id, user.user_id, answer_body)
    const response = await axios.post ("http://localhost:3002/questions/", {question_id, user_id:user.user_id, answer_body})
    console.log ("response: ", response)
  }

  const handleAnswerChange = (event) => {
    setAnswer_body (event.target.value)
  }

  const fetchQuestion = async () => {
    try {
      const response = await axios.get ("http://localhost:3002/questions/")
      setQuestions (response.data)
    }
    catch (error) {
      console.log (error)
    }
  }

  const fetchAnswers = async (question_id) => {
    try {
      const response = await axios.get (`http://localhost:3002/answers?${question_id}`)
      setAnswers ((prevAnswer)=>({...prevAnswer, [question_id]: response.data}))
      console.log (answers)
    }
    catch (error) {
      console.log (error)
    }
}

  useEffect (()=>{
    fetchQuestion()
  },[])


  return (
    <>
      { questions.map ((question, index)=> {
        return (
          <div key={index}>
            <div style={{"backgroundColor": "#d8d6d6", "padding": "20px"}} >
              <label htmlFor=""><strong>Question: </strong>{question.title}</label>
            </div>
            <div>
              <h2>Previous Answers</h2>
              { answers.map ((answer,index) => {
                return (
                  <>
                    {answers.map ((answer,index) => {
                      <div>{answer.answer_body}</div>
                    })}
                  </>
                )
              })}
              
              
            </div>

            <div style={{"backgroundColor": "#ffffff", "padding": "20px"}}>
              <h4>Leave a reply</h4>
              <Form.Control type="text" placeholder="Question Answer" onChange={handleAnswerChange} />
              <Button variant="warning" onClick={(event)=>handleSubmit(event, question.question_id)}>Submit</Button>
            </div>
          </div>                   
        )
      })}
    </>
  )
}