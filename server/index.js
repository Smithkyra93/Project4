
import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import cors from 'cors'
import userRouts from './router/user.js'
import questionsRouts from './router/questions.js'

const app = express();
app.use(express.json()); 

app.use(cors({ origin: "http://localhost:3000" }));


// Set the router endpoint
 app.use ('/users', userRouts)
app.use ('/questions', questionsRouts)
// app.use ('/answers', answersRouts)

app.get ('/', (req,res)=> {
  res.send ("The main server Running")
})

//console.log(listEndpoints(app)); 

const port = process.env.PORT || 3002;

app.listen (port, ()=>{
  console.log ("Server runnnig on port", port)
})