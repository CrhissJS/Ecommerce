import './App.css'
import {HashRouter, Routes, Route} from 'react-router-dom'
import {Home, Login, ProductDetail, Purchases} from './pages'
import { LoadingScreen, NavBar, ProtectedRoutes } from "./components"
import { useSelector } from 'react-redux'
import 'bootswatch/dist/journal/bootstrap.min.css';

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

        <Route element={<ProtectedRoutes />}>
          <Route path="/purchases" element={<Purchases />}/>
        </Route>

      </Routes>
    </HashRouter>
  )
}

export default App
