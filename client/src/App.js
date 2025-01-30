import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListQuestions from './components/ListQuestions/ListQuestions';

function App() {
 return(
  <>
  <h1>Welcome to Kyra Speaks</h1>
  <ListQuestions />
  </>
 );
}

export default App;
