import {SessionsClient} from "@google-cloud/dialogflow-cx"

export const client = new SessionsClient({
  credentials: {
    client_email: process.env.CLIENT_EMAIL_CX,
    private_key: process.env.PRIVATE_KEY_CX.split(String.raw`\n`).join('\n'),
  },
  apiEndpoint: "europe-west2-dialogflow.googleapis.com"
});