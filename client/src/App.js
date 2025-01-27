import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: '', body: '' });


  const fetchQuestion = async () => {
      const response = await axios.get('http://localhost:3002/questions')
      console.log (response)
      console.log (response.data)
      setQuestions(response.data);
  }

  useEffect(() => {
    fetchQuestion();
  }, []);


  const handleQuestionSubmit = () => {
    // axios.post('http://localhost:3000/api/questions', newQuestion, {
    //   headers: { Authorization: `Bearer ${token}` }
    // }).then(response => {
    //   setQuestions([...questions, response.data]);
    //   setNewQuestion({ title: '', body: '' });
    // });
  };

  return (
    <div>
      <h1>Kyra Speaks</h1>

      {/* {token ? ( */}
        <>
          <div>
            <input 
              type="text" 
              value={newQuestion.title} 
              onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})} 
              placeholder="Question Title" 
            />
            <textarea 
              value={newQuestion.body} 
              onChange={(e) => setNewQuestion({...newQuestion, body: e.target.value})} 
              placeholder="Ask your question..." 
            />
            <button onClick={handleQuestionSubmit}>Post Question</button>
          </div>
          <ul>
            {questions.map(question => (
              <li key={question.id}>
                <h2>{question.title}</h2>
                <p>{question.body}</p>
              </li>
            ))}
          </ul>
        </>
      {/* ) : (
        <p>Log in and find the answers to your questions</p>
      )} */}
    </div>
  );
}

export default App;
