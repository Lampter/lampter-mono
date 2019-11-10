import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import Loading from "./Loading";
import { ApolloClient } from "apollo-boost";
import theme from "../helpers/theme";
import AppRouter from "../routers/AppRouter";

const useStyles = makeStyles(() => ({
  "@global": {
    html: {
      height: "100%",
      overflow: "hidden"
    },
    body: {
      height: "100%",
      lineHeight: 1.2
    },
    "#root": {
      height: "100%",
      display: "grid",
      gridTemplateRows: "auto 1fr"
    }
  }
}));

type Props = {
  client: ApolloClient<unknown>;
};

const App: React.FC<Props> = props => {
  const { client } = props;

  useStyles();

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<Loading />}>
          <AppRouter />
        </React.Suspense>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
