const express = require ('express');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
const { urlencoded } = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.get('/df/server', (req, res)=> {
    res.send("Hi, from server")
})

require('./routes/df-routes')(app)

app.listen(port, ()=> {
    console.log("server is running")
})