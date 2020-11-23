const pipefyToken = process.env.PIPEFY_TOKEN // your pipefy auth token
const cardId = 1234567 // id of the card

const express = require("express")
const bodyParser = require("body-parser")
const fetch = require("node-fetch")

// Initializing the app
const app = express()
const PORT = 3001

app.use(bodyParser.json())

function pipefyPost(res, message, cardId) {
    return fetch("https://app.pipefy.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pipefyToken
      },
      body: JSON.stringify({
        query: `mutation {
          createComment(
            input: {
              card_id: ${cardId}
              text: "${message}"
            }
          ) {
            comment {
              id
              text
            }
          }
        }`
      })
    })
    .then(result => {
      return result.json();
    })
    .then(data => {
      console.log("data returned:\n", data);
      res.send(data);
    });
}

app.post("/hook", (req, res) => {
  const payload = req.body
  var commit = payload.commits[0].id
  var title = payload.commits[0].title
  var url = payload.commits[0].url
  var message = `Commit: ${commit}\nMessage: ${title}\nUrl: ${url}`
  console.log(message)
  pipefyPost(res, message, cardId).then(result => {
    res.status(200).end()
  })
})

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
