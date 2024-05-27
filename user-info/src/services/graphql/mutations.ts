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
