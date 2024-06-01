import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation CreatePost($bodyReq: CreatePostInput!) {
    createPost(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const INCREASE_POST_VIEWS = gql`
  mutation IncreasePostViews($postId: Int!) {
    increasePostViews(postId: $postId) {
      status
      statusCode
      message
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($bodyReq: AddCommentInput!) {
    addComment(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const REPLY_COMMENT = gql`
  mutation ReplyComment($bodyReq: ReplyCommentInput!) {
    replyComment(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;
