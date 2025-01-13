const express = require("express");
const bodyParser = require("body-parser");
// const graphqlHttp = require("express-graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const { buildSchema } = require("graphql");
const { ruruHTML } = require("ruru/server");

const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  "/graphql",
  //middleware
  createHandler({
    //   graphqlHttp({
    schema: buildSchema(`
        #define the types 

        type Events{
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        }

        input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
        }
        
        type RootQuery{ 
        #name can be anything
        #define real endpoints we support for incoming queries 
            events:[Events!]! 
            #no  null 
        }

        type RootMutation{
            createEvent(eventInput: EventInput): Events
        }
        # root schema node 
        schema{
            query: RootQuery  #fetch data
            mutation: RootMutation  #change data 
        }
    `),
    rootValue: {
      events: () => {
        // resolver is just a function
        // return ["cooking", "sailing", "coding"];
        return events;
      },
      createEvent: (args) => {
        // const eventName = args.name;
        // return eventName;
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        console.log(args);
        events.push(event);
        return event;
      },
    },
    // this object has all resolver function - need to match our schema end points by name
    // graphiql: true, // use ruru package
  })
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
  //   res.send("hello world");
});

app.listen(3000);
