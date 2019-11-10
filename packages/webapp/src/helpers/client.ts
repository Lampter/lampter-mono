import ApolloClient, { InMemoryCache } from "apollo-boost";
import getConfig from "./config";

declare global {
  interface Window {
    env: { [key: string]: string };
  }
}

export function initClient() {
  const cache = new InMemoryCache({});

  return new ApolloClient({
    uri: getConfig("REACT_APP_API_URL"),
    cache,
  });
}
