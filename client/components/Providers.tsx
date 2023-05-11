"use client";
import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";

import { store } from "@/redux/store";

interface PropTypes {
  children: ReactNode;
}

const Providers = ({ children }: PropTypes) => {
  return (
    <Provider store={store}>
      <MantineProvider>{children}</MantineProvider>
    </Provider>
  );
};

export default Providers;
