require('dotenv').config()
const express = require('express');
const rp = require('request-promise');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/auth/reddit',(req,res)=>{
    const authUrl = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=RANDOM&redirect_uri=${process.env.REDIRECT_URI}&duration=permanent&scope=read submit`;
    res.redirect(authUrl);
})

app.get('/reddit/callback',async(req,res)=>{
    const {code} = req.query;

    const options = {
        method: 'POST',
        uri: 'https://www.reddit.com/api/v1/access_token',
        auth: {
          user: process.env.CLIENT_ID,
          pass: process.env.CLIENT_SECRET,
        },
        formData: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: process.env.REDIRECT_URI,
        },
        headers: {
          'User-Agent': process.env.USER_AGENT,
        },
        json: true,
      };
    
    try{
        const response = await rp(options);
        console.log(response);
        fs.writeFile('reddit_token.txt',response.access_token,(err)=>{
            if(err){
                console.error('Couldn\'t save token')
            }else{
                console.log('token saved');
            }
        });
        res.send('Logged in!');
    }catch(error){
        console.error('Error',error);
    }

});

app.get('/list',async(req,res)=>{
    const token = fs.readFileSync('reddit_token.txt','utf8');
    const options = {
        method:'GET',
        uri:'https://oauth.reddit.com/hot',
        headers:{
            'Authorization':`Bearer ${token}`,
            'User-Agent':process.env.USER_AGENT
        },
        json:true
    };
    try{
        const response = await rp(options);
        res.json(response);
    }catch(error){
        console.error('Error',error)
    }
})

app.get('/create-post',async(req,res)=>{
    const token = fs.readFileSync('reddit_token.txt','utf8');
    const options = {
        method: 'POST',
        uri: 'https://oauth.reddit.com/api/submit',
        headers:{
            'Authorization': `Bearer ${token}`,
            'User-Agent': process.env.USER_AGENT
        },
        form:{
            api_type:'json',
            kind:'self',
            sr:'developer',
            title:'CodingWithAdo is the best youtube channel',
            text:'You should go and check: https://www.youtube.com/@codingwithado'
        },
        json: true
    };
    try{
        const response = await rp(options);
        res.json(response);
    }catch(error){
        console.error('Error',error);
    }
})
app.listen(port,()=>{
    console.log('App is running');
})