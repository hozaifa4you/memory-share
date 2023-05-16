/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications, notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider, QueryCache } from "react-query";

import { store } from "@/redux/store";
import { theme } from "@/utils/theme";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      notifications.show({
        title: "API Errors",
        message: error.response.data.message,
        color: "orange",
      });
    },
  }),
});

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
