
const { GraphQLServer } = require('graphql-yoga');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test5");
//known as schema in graphql
//name is name of argument, String is the data type. String with ! is mandatory

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`;

//destructuring name and => returns response
const resolvers = {
  Query: {
    hello: (_, {
      name
    }) => `Hello ${name || 'World'}`,
  },
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

mongoose.connect.once("open", function(){
  server.start(() => console.log('Server is running on localhost:4000'));
});