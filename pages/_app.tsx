
import GlobalStyle from "../styles/GlobalStyle";
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <GlobalStyle />
        <Component {...pageProps} />
        <div id="root-modal" />
      </QueryClientProvider>
    </RecoilRoot> 
  </>)
}
