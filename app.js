const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const isAuth = require("./middleware/is-auth");

const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  createHandler({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    // graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.mnews.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    console.log("database connect success");
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
  //   res.send("hello world");
});
