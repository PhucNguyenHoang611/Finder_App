import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      status
      statusCode
      data {
        email
        phone
        displayName
        address
        gender
        activate
        avatar
        createdDate
        updatedDate
      }
      message
    }
  }
`;

export const GET_POST_WITH_FILTER = gql`
  query GetPostWithFilter($filters: FilterPostInput) {
    getPostWithFilter(filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          title
          postType
          location
          locationDetail
          description
          approved
          viewCount
          totalComments
          fileName
          filePath
          createdDate
          updatedDate
        }
        totalCount
      }
      message
    }
  }
`;
