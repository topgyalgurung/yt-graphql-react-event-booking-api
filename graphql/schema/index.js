const { buildSchema } = require("graphql");

// graphql types: int, float, string, bloolean, ID
module.exports = buildSchema(`#graphql
    #define the types 
    type Booking{
        _id: ID!
        user:User!
        event:Event!
        createdAt: String!
        updatedAt: String!
    }
    type Event{
        _id: ID! # ! = required or not null
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User!
    }

    type User{
        _id: ID!
        email: String!
        password: String # not null since we dont want password back
        createdEvents:[Event!]
    }

    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!  # for hours 1,2,..

    }

    # type Query{
    #     users: [User]
    #     events:[Event]
    # }

    input EventInput{
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput{
        email: String!
        password: String!
    }
        #name can be anything
        #define real endpoints we support for incoming queries  
        #no null 
    type RootQuery{ 
        events:[Event!]! 
        bookings: [Booking!]!
        login(email: String!, password: String!): AuthData! # :expected responses
    }

    type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        bookEvent(eventId: ID!):Booking!
        cancelBooking(bookingId:ID!): Event!
    }

    # root schema node 
    schema{
        query: RootQuery  #fetch data
        mutation: RootMutation  #change data 
    }
`);
