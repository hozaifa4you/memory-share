"use client";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "react-query";

import { store } from "@/redux/store";
import { theme } from "@/utils/theme";

const queryClient = new QueryClient();

interface PropTypes {
  children: ReactNode;
}

const Providers = ({ children }: PropTypes) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Notifications />
          {children}
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  );
};

export default Providers;
