import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation CreateBook(
    $title: String!
    $authorId: ID!
    $createdDate: String!
    $bookPages: Int!
  ) {
    createBook(
      title: $title
      authorId: $authorId
      createdDate: $createdDate
      bookPages: $bookPages
    ) {
      id
      title
      authorId
      createdDate
      bookPages
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $title: String!
    $createdDate: String!
    $bookPages: Int!
  ) {
    updateBook(
      id: $id
      title: $title
      createdDate: $createdDate
      bookPages: $bookPages
    ) {
      id
      title
      authorId
      createdDate
      bookPages
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
      title
      authorId
      createdDate
      bookPages
    }
  }
`;
