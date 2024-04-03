export const typeDefs = `
  type Author {
    id: ID!
    name: String!
    books: [Book!]!
    role: String!
  }

  type Book {
    id: ID!
    title: String!
    authorId: ID!
    createdDate: String!
    bookPages: Int!
  }

  type Query {
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
  }

  type Mutation {
    createBook(title: String!, authorId: ID!, createdDate: String!, bookPages: Int!): Book
    updateBook(id: ID!, title: String!, createdDate: String!, bookPages: Int!): Book
    deleteBook(id: ID!): Book
  }
`;
