import type { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { Web3ReactProvider } from "@web3-react/core"
import Web3 from "web3"
import { GlobalStyle } from "../global-styles"
import { theme } from "../theme"
import { provider } from "web3-core"

function MyApp({ Component, pageProps }: AppProps) {
  const getLibrary = (provider: provider) => {
    return new Web3(provider)
  }
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
