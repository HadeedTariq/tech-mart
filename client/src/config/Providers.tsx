type Props = {
  children: React.ReactNode;
};
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ChakraProvider>{children}</ChakraProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
