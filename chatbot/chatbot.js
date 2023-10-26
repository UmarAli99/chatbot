'use-strict'
const dialogflow = require('dialogflow');
const config = require ('../df-server/config/keys');
const structjson = require('./structjson');

const privateKey = config.googlePrivateKey;
const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


const textQuery = async(userText, parameters)=>{
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                parameters: structjson.jsonToStructProto(parameters),
                text:userText,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        }
    }

    try {
        const response = await sessionClient.detectIntent(request)
        return response[0].queryResult
    } catch(err){
        console.log(err)
        return err
    }
}

module.exports = {
    textQuery
}