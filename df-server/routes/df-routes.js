const chatbot = require('../../chatbot/chatbot')
const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectId, config.dialogFlowSessionID);

module.exports = app => {

    app.post('/api/text_query', async(req, res)=>{
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