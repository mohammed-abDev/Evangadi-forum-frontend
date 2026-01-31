import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../Pages/Questions/Home'
import Register from '../Pages/Auth/Register'
import Login from '../Pages/Auth/Login'
import AskQuestion from '../Pages/Questions/AskQuestion'
import QuestionDetail from '../Pages/Questions/QuestionDetail'
import NotFound from '../Pages/NotFound/NotFound'
import Chatbot from '../Components/Chatbot/Chatbot'
import LandingHome from '../Pages/LandingHome/LandingHome'
import Howitwork from '../Pages/HowItWork/Howitwork'
import PrivateRoute from './PrivateRoute'

function Routing() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingHome />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/how-it-work" element={<Howitwork />} />


      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/question/:question_id" element={<QuestionDetail />} />
        <Route path="/bot" element={<Chatbot />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Routing
