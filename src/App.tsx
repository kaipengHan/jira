import React from "react";
import "./App.css";
import { useAuth } from "./context/auth-context";
import AuthenticatedApp from "./authenticatedApp";
import UnauthenticatedApp from "./unauthenticated-app";
import ErrorBoundary from "./components/error-boundary";
import { FullPageErrorFallback } from "./components/Lib";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fullbackRender={FullPageErrorFallback}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
