import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home  from './pages/Home';
import { Notes } from './pages/Notes';
import NotFound from './pages/NotFound';
import { Login } from './components/Login';
import { Register } from './components/Register';
import ProtectedRoute from './ProtectedRoute';
import Navbar from './components/Navbar';
import { Profile } from './pages/Profile';

function App() {

  return (
    <>
      <Router>
    <Navbar/>

        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route element={<ProtectedRoute/>}>
          <Route path='/notes' element={<Notes/>} />
          <Route path='/profile' element={ <Profile/> }/>

          </Route>

          <Route path='*' element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App