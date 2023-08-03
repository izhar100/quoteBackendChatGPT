const express=require("express")
const cors=require("cors")
const { quoteRouter } = require("./routes/quote.router")
const app=express()
app.use(cors())
app.use(express.json())
app.use("/quote",quoteRouter)
require("dotenv").config()
const port=process.env.port||8080
app.listen(port,()=>{
  console.log(`Server is running at port ${port}`)
})

