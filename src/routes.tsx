import { Route, Routes } from 'react-router-dom'
import Main from './pages/Main'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Main />}></Route>
  </Routes>
)

export default Rotas
