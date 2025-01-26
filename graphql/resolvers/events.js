const Event = require("../../models/event");
const User = require("../../models/user");

const { transformEvent } = require("./merge");

module.exports = {
  // rootValue: {
  events: async () => {
    // error fetching from graphiql
    try {
      const events = await Event.find(); //   .populate("creator")
      return events.map((event) => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      // mongoose will automatically convert string to object id
      creator: "5c0fbd06c816781c518e4f3e",
    });
    console.log(event);
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(event);
      const creator = await User.findById("5c0fbd06c816781c518e4f3e");

      if (!creator) {
        throw new Error("User not found.");
      }
      creator.createdEvents.push(event);
      await creator.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};

/** 

{
    "errors": [
      {
        "message": "Cannot read properties of null (reading '_doc')",
        "locations": [
          {
            "line": 6,
            "column": 5
          }
        ],
        "path": [
          "events",
          0,
          "creator"
        ]
      }
    ],
    "data": null
  }
    */
