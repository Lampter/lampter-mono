import * as React from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "./Header";

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

const AppLayout: React.FC<Props> = props => {
  const { children } = props;

  return (
    <React.Fragment>
      <Header />
      <ErrorBoundary>{children}</ErrorBoundary>
    </React.Fragment>
  );
};

export default AppLayout;
