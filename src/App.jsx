import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './component/signup'
import Login from './component/login'
import CreateTask from './component/createTask'
import Tasks from './component/tasks'
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route exact path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/createTask' element={<CreateTask />} />
    
        <Route path="/tasks" element={<Tasks/>} />
    
        <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
