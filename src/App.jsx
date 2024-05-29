import {Outlet} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './components/styles/App.sass'


function App() {

  return (
    <div className="App">
        <Navbar /> 
        <Outlet />
        <Footer />
    </div>
  )
}

export default App
