import { gql } from "@apollo/client";

export const GET_POST_WITH_FILTER = gql`
  query GetPostWithFilter($bodyReq: FilterPostInput!) {
    getPostWithFilter(bodyReq: $bodyReq) {
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
