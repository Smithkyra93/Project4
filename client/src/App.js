import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListQuestions from './components/ListQuestions/ListQuestions';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';


function App() {
  const [user, setUser] = useState ({
    user_id: 1,
    user_name:"farnaz"
  })

 return(
  <>
  <h1>Welcome to Kyra Speaks</h1>
  <Login user={user} setUser={setUser}  />
  <Signup />
  <ListQuestions user={user} />

  </>
 );
}

export default App;
