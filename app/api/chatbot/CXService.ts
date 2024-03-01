import { client } from "./CXClient";

export async function sendMessage(message: string, sessionId: string) {

    // The path to identify the agent that owns the created intent.
    const sessionPath = client.projectLocationAgentSessionPath(
      process.env.GCP_PROJECT_ID,
      'europe-west2',
      'e2d3ea27-3ef1-447b-a5e7-e47460e110a3',
      sessionId
    );
    console.log('sessionPath: ' + sessionPath);


    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: 'en',
        },
        languageCode: 'en'
      },
    };
    console.log('request: ' + request)
  
    const responses = await client.detectIntent(request);
    console.log('responses: ' + responses)
    return responses[0];
  }

// async function executeQueries(projectId, sessionId, queries, languageCode) {
//   // Keeping the context across queries let's us simulate an ongoing conversation with the bot
//   let context;
//   let intentResponse;
//   for (const query of queries) {
//     try {
//       console.log(`Sending Query: ${query}`);
//       intentResponse = await detectIntent(
//         projectId,
//         sessionId,
//         query,
//         context,
//         languageCode
//       );
//       console.log('Detected intent');
//       console.log(
//         `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
//       );
//       // Use the context from this response for next queries
//       context = intentResponse.queryResult.outputContexts;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }
// executeQueries(projectId, sessionId, queries, languageCode);