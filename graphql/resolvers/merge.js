const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

/**
- the _doc property represents the raw data object of a Mongoose document that comes directly from the MongoDB query results.
_doc property holds only the plain JavaScript object that represents the document itself
 */
// manual population
const events = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return transformEvent(event);
      // ...event._doc, // Spreading only the raw data fields from the event document
      // _id: event.id, // Adding a computed ID field (Mongoose provides a getter for `id`)
      // date: new Date(event._doc.date).toISOString(),
      // creator: user.bind(this, event.creator),
    });
    // return events;
  } catch (err) {
    throw err;
  }
};

const singleEvent = async (eventId) => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
    //   ...event._doc,
    //   _id: event.id,
    //   creator: user.bind(this, event.creator),
  } catch (err) {
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      //   password: null,
      createdEvents: events.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = (event) => {
  return {
    ...event._doc, // Spreading only the raw data fields from the event document
    _id: event.id, // Adding a computed ID field (Mongoose provides a getter for `id`)
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;

// exports.user = user;
// // exports.events = events;
// exports.singleEvent = singleEvent;
