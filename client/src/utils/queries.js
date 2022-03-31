import { gql } from '@apollo/client';

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const QUERY_GOOGLE_BOOKS= gql`
  query searchGoogleBooks($query: query!) {
    https://www.googleapis.com/books/v1/volumes?q=$query
  }
`;

