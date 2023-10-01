const chatbot = require('../chatbot/chatbot')
module.exports = app => {

    app.post('/text_query', async(req, res)=>{
        console.log(req)
        const {text} = req.body;
        const resultQuery = await chatbot.textQuery(text)
        console.log(resultQuery)
        const resObj = {
            intentName: resultQuery.intent.displayName,
            userQuery: resultQuery.queryText,
            fulfillmentText: resultQuery.fulfillmentText
        }
        res.send(resObj)
    })

    // app.post('/event_query', (req,res)=>{
    //     console.log(req)
    //     res.send("Event query")
    // })
}