import { gql } from "@apollo/client";

// Notification
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

// Chat
export const GET_USER_CONVERSATIONS = gql`
  query GetUserConversations($FilterConditions: FilterConversations) {
    getUserConversations(FilterConditions: $FilterConditions) {
      status
      statusCode
      data {
        listData {
          conversationId
          userId
          avatar
          userName
        }
        totalCount
      }
      message
    }
  }
`;

export const GET_DETAIL_CONVERSATION = gql`
  query GetDetailConversation(
    $conversationId: Int!
    $filters: FilterSectionInput
  ) {
    getDetailConversation(conversationId: $conversationId, filters: $filters) {
      status
      statusCode
      data {
        listData {
          id
          clusMessages {
            id
            senderId
            messages {
              id
              isRead
              isEdited
              message
              createdDate
              updatedDate
            }
            createdDate
            updatedDate
          }
          createdDate
          updatedDate
        }
        totalCount
      }
      message
    }
  }
`;
