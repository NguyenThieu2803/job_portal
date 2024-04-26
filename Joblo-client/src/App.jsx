
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Banner from './Components/Banner'

function App() {
  return (
    <>
     <Navbar/>
     <Outlet/>
    </>
  )
}

export default App
