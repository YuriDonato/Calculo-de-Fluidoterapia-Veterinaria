import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { GlobalCss } from './styles'
import Rotas from './routes'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: ''
      }
    })
  }
})

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <GlobalCss />
        <Rotas />
      </BrowserRouter>
    </ChakraProvider>
  )
}

export default App
