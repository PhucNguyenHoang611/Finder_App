import { gql } from "@apollo/client";

export const GET_MY_PROFILE = gql`
  query GetMyProfile {
    getMyProfile {
      status
      statusCode
      data {
        id
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

// Notification
export const GET_NUMBER_OF_NOTIFY_UNREAD = gql`
  query GetNumberOfNotifyUnread {
    getNumberOfNotifyUnRead {
      status
      statusCode
      data {
        unRead
      }
      message
    }
  }
`;

export const GET_NOTIFY_WITH_FILTER = gql`
  query GetNotifyWithFilter($filters: FilterNotifyInput) {
    getNotifyWithFilter(filters: $filters) {
      status
      statusCode
      data {
        listData
        totalCount
      }
      message
    }
  }
`;
