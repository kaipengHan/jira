import React, { ReactNode } from "react";
import AuthProvider from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>;
    </QueryClientProvider>
  );
};

export default AppProviders;
