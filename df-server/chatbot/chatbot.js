const dialogflow = require('dialogflow');
const config = require ('../config/devkey');

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionID;

const credentials = {
    client_email: config.googleClientEmail,
    privateKey: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({projectId, credentials});


const textQuery = async(userText)=>{
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
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