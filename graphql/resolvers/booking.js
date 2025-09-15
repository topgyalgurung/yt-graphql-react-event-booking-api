const Event = require("../../models/event");
const Booking = require("../../models/booking");
const { transformBooking, transformEvent } = require("./merge");

// resolver is just a function
module.exports = {
  bookings: async () => {
    // 10. adding authentication 
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      // get bookings from database
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return transformBooking(booking);
      });
      // override id with booking.id
    } catch (err) {
      throw err;
      // could do more for error, but keeping simple now
    }
  },
  // to see anything in booking: bookEvent resolver
  // args will have eventId
  bookEvent: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    // get single event id
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      // need eventid and userid(hardcode for now)
      user: "5c0fbd06c816781c518e4f3e",
      event: fetchedEvent,
      // timestamp will be addded automatically by mongoose
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const booking = Booking.findById(args.bookingId).populate("event");
      const event = transformBooking(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
    } catch (err) {
      throw err;
    }
  },
};
