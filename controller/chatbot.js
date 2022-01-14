import dialogflow from "dialogflow";
import config from "../configs/keys.js";
// import structjson from "../configs/structjson.js";
import { struct } from "pb-util/build/index.js";
const projecID = config.googleProjecID;
const credentials = {
  client_email: config.client_email,
  private_key: config.private_key,
};
const sessionClient = new dialogflow.SessionsClient({ projecID, credentials });
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
        parameters: struct.encode(req.body.parameters),
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
