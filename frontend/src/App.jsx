import { useState } from 'react'
import Home from "./pages/Home"
import Login from './pages/Login'
import EditJob from "./pages/EditJob"
import ApplyJob from './pages/ApplyJob'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Postjob from './pages/Postjob';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthProvider> 
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/postjob" element={<Postjob />} />
            <Route path="/edit/:id" element={<EditJob />} />
            <Route path="/apply/:id" element={<ApplyJob />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>

    </>
  )
}

export default App
