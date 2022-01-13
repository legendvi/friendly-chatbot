import dialogflow from "dialogflow";
import config from "../configs/keys.js";
import structjson from "../configs/structjson.js";
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(
  config.googleProjecID,
  config.dialogFlowSessionID
);

export const textQuery = async (req, res, next) => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.text,
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
    queryParams: {
      payload: {
        data: req.body.parameters,
      },
    },
  };

  const response = await sessionClient.detectIntent(request);
  const responses = handleAction(response);
  res.status(200).json(responses[0].queryResult);
};
export const eventQuery = async (req, res, next) => {
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        name: req.body.event,
        parameters: structjson.jsonToStructProto(req.body.parameters),
        languageCode: config.dialogFlowSessionLanguageCode,
      },
    },
  };

  const response = await sessionClient.detectIntent(request);
  const responses = handleAction(response);
  res.status(200).json(responses[0].queryResult);
};

//helper function
const handleAction = (responses) => responses;
