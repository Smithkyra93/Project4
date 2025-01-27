import express from 'express'
import db from '../dbconnection.js'

const Router = express.Router()

Router.get ("/", (req, res)=> {
    console.log ("server")
    db.query ("SELECT * FROM questions",  (err,result)=> {
      if (err) {
        console.log ("Error in fetching questions", err)
        res.status(500).send("error in the Query")
      }   
      else
      console.log (result)
        res.send (result)
    })
  })

export default Router;