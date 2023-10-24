const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const app = express()

const PORT = 3000;
app.use(cors(),express.json())

app.use(express.urlencoded({extended:true}))

require('./models/associations')

app.use('/api',userRouter)

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})