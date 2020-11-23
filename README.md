# gitlab-pfy
Post gitlab events to a pipefy card

## How to configure

1. Export the PIPEFY_TOKEN env var.

```
export PIPEFY_TOKEN = "Bearer abc1234...."
```

1. Configure a gitlab webhook pointing the url to the `/hook` endpoint

2. Set the id of the card in the `cardId` variable

## How to use

You just need to send an event to the gitlab, after that, the app will post a comment in your card with some details of your commit.
