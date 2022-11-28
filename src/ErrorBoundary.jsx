import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    error: null,
  };

  static getDerivedStateFromError(error) {
    return {
      error,
    };
  }

  componentDidCatch(error, info) {
    console.log(info.componentStack);
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <h1>{error.message}</h1>;
    }
    const { children } = this.props;
    return children;
  }
}
