import { gql } from "@apollo/client";

export const GET_ALL_MY_POSTS = gql`
  query GetPostOfMe {
    getPostOfMe {
      status
      statusCode
      data {
        id
        title
        postType
        location
        locationDetail
        description
        approved
        fileName
        filePath
        createdDate
        updatedDate
      }
      message
    }
  }
`;
