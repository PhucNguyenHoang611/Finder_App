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
