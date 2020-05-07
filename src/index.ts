import { ApolloServer, gql } from 'apollo-server'
import { prisma } from '../prisma/generated/prisma-client'

const typeDefs = gql`
  type Query {
    students: [Student!]
  }

  type Student {
    id: ID!
    photo: ImageFile
  }
  type ImageFile {
    id: ID!
    url: String
  }
`

const resolvers = {
  Query: {
    students: () => prisma.students()
  },
  Student: {
    photo: (parent: any) => prisma.student({ id: parent.id }).photo()
  }
}

new ApolloServer({ typeDefs, resolvers })
  .listen(4000)
  .then(({ url }) => console.log(url))