import * as React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

const IssuesPage = React.lazy(() =>
  import(/* webpackChunkName: "main-issues" */ "../pages/IssuesPage")
);
const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact
          component={IssuesPage}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
