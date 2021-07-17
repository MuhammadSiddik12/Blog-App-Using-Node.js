const express = require('express')
const db = require('./dbConnect/db')
const app = express()

app.use(express.json())
app.use('/',require('./router/route'))


app.listen(8800, () => console.log('server is running'))
