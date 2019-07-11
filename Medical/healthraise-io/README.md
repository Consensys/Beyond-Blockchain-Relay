# Healthraise.io

## 1 | Description

![Alt text](./documentation/health.gif)

Ethereum Health Platform project installation instructions.

- See [Whitepaper](./whitepaper.md) for a detailed explanation of the project.
- See [Submission Readme](./submission.md) for Consensys hackathon submission information.
- See [Product Design Documentation](./project-document.md) for design process and development roadmap.

## 2 |  Getting Started

### 2.1 Install

* Requires Node.js: [Visit Node.js website for installation](https://nodejs.org/en/)
* Requires Mongodb installation: [See Mongodb documentation for instructions](https://docs.mongodb.com/manual/installation/)
* Requires Metamask: [Visit Metamask.io for installation instructions](https://metamask.io/)

Install the client:

```
cd client
npm install || yarn
```

Install server dependencies:

```
cd server
npm install || yarn
```

### 2.2 Run

Start mongodb instance:

```
mongod
```

Start server instance:

```
cd server
npm run start || yarn start
```

Start client instance:

```
cd client
npm run start || yarn start
```

The client should open in a new tab on your default browser.

*Note: Metamask is required for some functionality.*
