import React from "react";
import Issues from "../components/Issues";
import { RouteComponentProps } from "react-router";
import AppLayout from "../layouts/AppLayout";

type Props = RouteComponentProps<{}>;

const IssuesPage: React.FC<Props> = () => {
  return (
    <AppLayout>
      <Issues />
    </AppLayout>
  );
};

export default IssuesPage;
