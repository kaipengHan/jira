import React, { Component } from "react";

type FullbackRender = (props: { error: Error | null }) => React.ReactElement;

class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fullbackRender: FullbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  static getDerivedStateFromError(error: Error | null) {
    return { error };
  }
  render() {
    const { error } = this.state;
    const { fullbackRender, children } = this.props;
    if (error) {
      return fullbackRender({ error });
    }
    return children;
  }
}

export default ErrorBoundary;
