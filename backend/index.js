// require('dotenv').config()         
import 'dotenv/config';              //importing 'dotenv'

// const express = require('express');       //common JS
import express from 'express';          //Module JS

import axios from 'axios';
import bodyParser from 'body-parser';
// import cors from 'cors';
import qs from 'qs';


const app = express()
const port = process.env.PORT || 3000;        // Using env variable

// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend's origin
//     methods: 'POST', // Allow only POST requests from the frontend
//   }));

app.use(bodyParser.json());

  
// Define a route to handle the POST request from your React frontend
  app.post('/api/compile',(req, res) => {
    const { code , language, input } = req.body;
  
    var data = qs.stringify({
      'code': code,
      'language': language,
      'input': input
    })
    var config = {
        method: 'post',
        url: 'https://api.codex.jaagrav.in',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
  
    axios(config)
    .then((response)=>{
      res.send(response.data);
    })
    .catch((err)=>{
      res.status(500).json({ error : err.message });
    });
  });
  
  
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})