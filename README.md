# GraphQL + React Event Booking API
This code belongs to a tutorial series: [https://github.com/academind/yt-graphql-react-event-booking-api.git](https://github.com/academind/yt-graphql-react-event-booking-api.git)

Learn how to build a GraphQL API (with Node.js) and a React.js frontend from scratch in this series.

# Usage
Choose the right branch in this repository to get the code for the different parts of the series.

Steps if starting from beginning:
- store mongodb credentials in nodemon.json

- npm init 
- npm install express --save body-parser
- npm install --save-dev nodemon
- add "start": "nodemon app.js" in scripts package.json
- npm install graphql@15.3.0 express-graphql 
  - graphql latest not compatible with express-graphql 
  - express-graphql no longer maintained instead use graphql-http
  - install ruru package which bundles ruru module, add code to serve graphiql ide in server.js and restart server
  - install: bcryptjs 
  - install: jsonwebtoken 

Install all dependencies
```sh
npm install
```

Run the server
```sh
npm start
```

NOTE: 
- #16. CREATE EVENT AFTER SUBMISSION DOES NOT GET UPDATED TO DB
  - GraphQL Response: {errors: Array(1), data: null}
Events.jsx:130 TypeError: Cannot read properties of null (reading 'events')
    at Events.jsx:127:32