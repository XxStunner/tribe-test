## Case Tribe

Build a web-based real-time virtual space for people to interact with each other. Use React, TypeScript, and NodeJS.

Requirements:
- When a user opens the web app, they should enter their name and then join.
- When a user joins, they are going to be visible to other users.
- When a user is close enough to other users, they can write messages that will be visible to them based on their distance, so the closer, the more relevant the messages will be.

## Tech:

- Node.JS
- React
- TypeScript
- Socket.IO
- Express

## Steps to run

In order to run the application it's needed to install the typescript globally, so execute this command:

```bash
npm install -g typescript
```

Also run on chat-server and chat-client folders:

```bash
npm install
```

To run the development server, go to chat-server and execute:

```bash
npm run dev
```

And to run the client, go to chat-client and execute:

```bash
npm start
```

## Observations:

- Because of the deadline I wans't able to make some tests for the back-end and front-end.
- I classfied the users by 4 ranges of distance, in order to make the idea functional in short time.
