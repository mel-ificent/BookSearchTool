import { gql } from '@apollo/client';


export const GET_ME= gql`
  query me($query: query!) {
    user(userId: $userId) {
      _id
      name
    }
  }
`;

