const { WebhookClient } = require("discord.js")
const functions = require("firebase-functions")

exports.apply = functions.https.onRequest(async (request, response) => {
  const message = Object.entries(request.body).map(([e, v]) => `${e}: ${v}`).join('\n')
  if(functions.config().runtime.env !== "production") {
    response.status(200).send(message)
  } else {
    try {
      await new WebhookClient(functions.config().discord.webhook.id, functions.config().discord.webhook.token).send(message)
      response.sendStatus(200)
    } catch (err) {
      functions.logger.error(err)
      response.status(err.code).send(err.response.body)
    }
  }
});
