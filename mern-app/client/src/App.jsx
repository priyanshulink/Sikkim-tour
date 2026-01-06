import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Monasteries from './pages/Monasteries';
import VirtualTours from './pages/VirtualTours';
import Itinerary from './pages/Itinerary';
import Events from './pages/Events';
import Chatbot from './pages/Chatbot';
import Login from './pages/Login';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MonkDashboard from './pages/MonkDashboard';
import Preservation from './pages/Preservation';
import Navigation from './pages/Navigation';
import MonksList from './pages/MonksList';
import MonkProfile from './pages/MonkProfile';
import EducationHome from './pages/EducationHome';
import SpinWheel from './pages/SpinWheel';
import FlashCards from './pages/FlashCards';
import Quiz from './pages/Quiz';
import CategoryContent from './pages/CategoryContent';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/monasteries" element={<Monasteries />} />
      <Route path="/navigation" element={<Navigation />} />
      <Route path="/virtual-tours" element={<VirtualTours />} />
      <Route path="/events" element={<Events />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/login" element={<Login />} />
      <Route path="/monks" element={<MonksList />} />
      <Route path="/monks/:id" element={<MonkProfile />} />
      
      {/* Learn Sikkim Routes */}
      <Route path="/learn" element={<EducationHome />} />
      <Route path="/learn/category/:categoryId" element={<CategoryContent />} />
      <Route path="/learn/spin" element={<SpinWheel />} />
      <Route path="/learn/flashcards" element={<FlashCards />} />
      <Route path="/learn/quiz" element={<Quiz />} />
      
      {/* Protected User Routes */}
      <Route path="/itinerary" element={<Itinerary />} />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Protected Monk Routes */}
      <Route
        path="/monk"
        element={
          <ProtectedRoute>
            <MonkDashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preservation"
        element={
          <ProtectedRoute adminOnly={true}>
            <Preservation />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
