import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import {Home, Login, ProductDetail, Purchases} from './pages'
import { LoadingScreen, NavBar } from "./components"
import { useSelector } from 'react-redux'
function App() {
  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/shop/:id" element={<ProductDetail />}/>
        <Route path="/purchases" element={<Purchases />}/>

      </Routes>
    </HashRouter>
  )
}

export default App
