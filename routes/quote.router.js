const { default: axios } = require("axios")
const express = require("express")
const quoteRouter = express.Router()
require("dotenv").config()
const apiKey = process.env.chatGPTkey

quoteRouter.post("/", async (req, res) => {
    try {
        const keyword = req.body.keyword
        const quoteType=req.body.quoteType
        if (!keyword) {
            return res.status(400).json({ error: 'Keyword parameter is required.' })
        }
        //using chatgpt to generate quote
        const quote = await generateQuote(keyword,quoteType)
        res.status(200).json({quote})

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})
async function generateQuote(keyword,quoteType) {
    let prompt = `Write a quote on "${keyword}"`;
    if(quoteType){
        prompt= `Write a quote on "${keyword}" of "${quoteType}" category`
    }
    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';
    const response=await axios.post(apiUrl, {
        prompt,
        max_tokens: 50,
        temperature: 0.7,
        n: 1, // Number of responses to return
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
    console.log("response:",response)
    return response.data.choices[0].text.trim();
}

module.exports = {
    quoteRouter
}