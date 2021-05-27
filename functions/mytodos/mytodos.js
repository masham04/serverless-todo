const { ApolloServer, gql } = require('apollo-server-lambda')
var faunadb = require('faunadb');
q = faunadb.query

const typeDefs = gql`
  type Query {
    Todos: [Todo]!
  }
  type Mutation {
    addTodo(title: String): Todo
    deleteTodo(id: ID!): Todo
  }
  type Todo {
    id: ID!
    title: String!
  }
  
`

var adminClient = new faunadb.Client({ secret: 'fnAEKMzdaNACDajWP0oQiUXyxEQK8F_oJoaOz443' })

const resolvers = {
  Query: {
    Todos: async () => {
      try {

        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index('title'))),
            q.Lambda(x => q.Get(x))
          )

        )
        return result.data.map((el) => {
          return {
            id: el.ref.id,
            title: el.data.title,
          }
        })

      } catch (error) {
        console.log(error)
      }
    }
  },

  Mutation: {
    addTodo: async (_, { title }) => {
      try {

        const result = await adminClient.query(
          q.Create(
            q.Collection('todos'),
            {
              data: {
                title
              }
            },
          )
        )
        return result.data.ts
      } catch (error) {
        console.log(error)
      }
    },
    deleteTodo: async (_, { id }) => {

      try {

        const result = await adminClient.query(
          q.Delete(q.Ref(q.Collection('todos'), id))
        );
        return result.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const handler = server.createHandler()

module.exports = { handler }
