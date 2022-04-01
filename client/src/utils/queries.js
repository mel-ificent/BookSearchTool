import { gql } from '@apollo/client';

export const GET_ME = gql`
  # create a GraphQL query to be executed by Apollo Client
  query Me {
    me {
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;