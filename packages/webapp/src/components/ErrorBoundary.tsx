import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

interface State {
  hasError: boolean;
}

interface Props {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card>
          <CardContent>
            <Typography color="secondary">Something went wrong.</Typography>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
