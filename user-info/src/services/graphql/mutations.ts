import { gql } from "@apollo/client";

export const UPDATE_MY_ACCOUNT = gql`
  mutation UpdateMyAccount($bodyReq: UpdateMyAccountInput!) {
    updateMyAccount(bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: Int!, $bodyReq: UpdatePostInput!) {
    updatePost(id: $id, bodyReq: $bodyReq) {
      status
      statusCode
      message
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id) {
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
