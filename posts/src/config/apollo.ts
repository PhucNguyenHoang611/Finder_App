import { ApolloClient, InMemoryCache } from "@apollo/client";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export const client = new ApolloClient({
  link: createUploadLink({
    uri: import.meta.env.VITE_GRAPHQL_URL,
    headers: {
      "Apollo-Require-Preflight": "true"
    }
  }),
  cache: new InMemoryCache()
});
