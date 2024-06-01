import { gql } from "@apollo/client";

// Notification
export const MARK_NOTIFY_AS_READ = gql`
  mutation MarkNotifyAsRead($ids: [Int!]!) {
    markNotifyAsRead(ids: $ids) {
      status
      statusCode
      message
    }
  }
`;

// Chat
export const INIT_CONVERSATION = gql`
  mutation InitConversation($bodyReq: InitConversationInput!) {
    initConversation(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($bodyReq: SendMessageInput!) {
    sendMessage(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;
