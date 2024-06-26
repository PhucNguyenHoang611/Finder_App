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

// Chat
export const GET_USER_CONVERSATIONS = gql`
  query GetUserConversations($filters: FilterConversationInput) {
    getUserConversations(filters: $filters) {
      status
      statusCode
      data {
        listData {
          conversationId
          userId
          avatar
          userName
          lastMessage
          lastTime
          unreadCount
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

export const GET_DETAIL_CONVERSATION_WITH_ADMIN = gql`
  query GetDetailConversationWithAdmin($filters: FilterSectionInput) {
    getDetailConversationWithAdmin(filters: $filters) {
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

export const COUNT_UNREAD_MESSAGE_WITH_ADMIN = gql`
  query CountUnreadMessageWithAdmin {
    countUnreadMessageWithAdmin {
      status
      statusCode
      data {
        unreadCount
      }
      message
    }
  }
`;
