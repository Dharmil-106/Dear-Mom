import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import ProtectedRoute from './components/ProtectedRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MomDashboard from './pages/MomDashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import MoodTracker from './pages/MoodTracker';
import DailyTasks from './pages/DailyTasks';
import RelaxPage from './pages/RelaxPage';
import ReportPage from './pages/ReportPage';
import DoctorLocator from './pages/DoctorLocator';
import AskMe from './pages/AskMe';
import CoupleGames from './pages/CoupleGames';
import MemoryBook from './pages/MemoryBook';

// Seed demo data so charts aren't empty on first load
const seedDemoData = () => {
  if (!localStorage.getItem('demoSeeded')) {
    const moodOptions = [
      { value: 5, label: 'Great', emoji: '😄' },
      { value: 4, label: 'Good', emoji: '🙂' },
      { value: 3, label: 'Okay', emoji: '😐' },
      { value: 4, label: 'Good', emoji: '🙂' },
      { value: 2, label: 'Low', emoji: '😔' },
      { value: 5, label: 'Great', emoji: '😄' },
      { value: 3, label: 'Okay', emoji: '😐' },
    ];
    const moods = [];
    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const mood = moodOptions[i % moodOptions.length];
      moods.push({ date: dateStr, ...mood, mood: mood.value, note: '', timestamp: date.getTime() });
    }
    localStorage.setItem('dearMomMoods', JSON.stringify(moods));
    localStorage.setItem('demoSeeded', 'true');
  }
};

const Layout = ({ children }) => {
  const location = useLocation();
  const publicPaths = ['/', '/login', '/signup'];
  const isPublic = publicPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-rose-50 font-body">
      {!isPublic && <Navbar />}
      <main>{children}</main>
      {!isPublic && <BottomNav />}
    </div>
  );
};

function App() {
  useEffect(() => {
    seedDemoData();
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Mom Routes */}
          <Route path="/mom/dashboard" element={<ProtectedRoute allowedRole="mom"><MomDashboard /></ProtectedRoute>} />
          <Route path="/mom/mood" element={<ProtectedRoute allowedRole="mom"><MoodTracker /></ProtectedRoute>} />
          <Route path="/mom/tasks" element={<ProtectedRoute allowedRole="mom"><DailyTasks /></ProtectedRoute>} />
          <Route path="/mom/relax" element={<ProtectedRoute allowedRole="mom"><RelaxPage /></ProtectedRoute>} />
          <Route path="/mom/report" element={<ProtectedRoute allowedRole="mom"><ReportPage /></ProtectedRoute>} />
          <Route path="/mom/doctor" element={<ProtectedRoute allowedRole="mom"><DoctorLocator /></ProtectedRoute>} />
          <Route path="/mom/askme" element={<ProtectedRoute allowedRole="mom"><AskMe /></ProtectedRoute>} />
          <Route path="/mom/games" element={<ProtectedRoute allowedRole="mom"><CoupleGames /></ProtectedRoute>} />
          <Route path="/mom/memory" element={<ProtectedRoute allowedRole="mom"><MemoryBook /></ProtectedRoute>} />

          {/* Partner Routes */}
          <Route path="/partner/dashboard" element={<ProtectedRoute allowedRole="partner"><PartnerDashboard /></ProtectedRoute>} />
          <Route path="/partner/games" element={<ProtectedRoute allowedRole="partner"><CoupleGames /></ProtectedRoute>} />
          <Route path="/partner/memory" element={<ProtectedRoute allowedRole="partner"><MemoryBook /></ProtectedRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
