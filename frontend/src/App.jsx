import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Register1 from './components/Register1';
import Login from './components/Login';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register1/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
