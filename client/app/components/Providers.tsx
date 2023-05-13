"use client";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { Notifications } from "@mantine/notifications";

import { store } from "@/redux/store";
import { theme } from "@/utils/theme";

interface PropTypes {
  children: ReactNode;
}

const Providers = ({ children }: PropTypes) => {
  return (
    <Provider store={store}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications />
        {children}
      </MantineProvider>
    </Provider>
  );
};

export default Providers;
