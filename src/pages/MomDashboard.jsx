import { useNavigate } from 'react-router-dom';
import { getDueDateInfo, getBabySize, getGreeting, getTodayKey } from '../utils/pregnancyUtils';
import tips from '../data/tips';
import { Lightbulb, Heart, CheckCircle2, Wind, MapPin, MessageCircle, Gamepad2, BookHeart } from 'lucide-react';

const MomDashboard = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('dearMomName') || 'Mom';
  const { currentWeek, weeksLeft, trimester } = getDueDateInfo();
  const babySize = getBabySize(currentWeek);

  // Today's tip
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todayTip = tips[dayOfYear % tips.length];

  // Task progress
  const todayKey = getTodayKey();
  const todayTasks = JSON.parse(localStorage.getItem(`dearMomTasks_${todayKey}`) || '{}');
  const totalTasks = 7;
  const completedTasks = Object.values(todayTasks).filter(Boolean).length;
  const taskPercent = Math.round((completedTasks / totalTasks) * 100);

  // Latest mood
  const moods = JSON.parse(localStorage.getItem('dearMomMoods') || '[]');
  const latestMood = moods.length > 0 ? moods[moods.length - 1] : null;
  const todayMood = latestMood && latestMood.date === todayKey ? latestMood : null;

  const quickLinks = [
    { icon: Wind, label: 'Relax', path: '/mom/relax', color: 'text-purple-500', bg: 'bg-purple-50', emoji: '🧘' },
    { icon: MapPin, label: 'Doctor', path: '/mom/doctor', color: 'text-green-500', bg: 'bg-green-50', emoji: '🏥' },
    { icon: MessageCircle, label: 'Ask Me', path: '/mom/askme', color: 'text-blue-500', bg: 'bg-blue-50', emoji: '🤖' },
    { icon: Gamepad2, label: 'Games', path: '/mom/games', color: 'text-orange-500', bg: 'bg-orange-50', emoji: '🎮' },
    { icon: BookHeart, label: 'Memory', path: '/mom/memory', color: 'text-pink-500', bg: 'bg-pink-50', emoji: '📖' },
  ];

  return (
    <div className="pb-bottom-nav">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        
        {/* Welcome Card */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-3xl p-6 text-white shadow-lg shadow-rose-200 animate-fade-in">
          <p className="text-rose-100 text-sm font-medium">{getGreeting()}</p>
          <h1 className="font-display text-2xl font-bold mt-1">{name} 🌸</h1>
          <div className="mt-3 flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
              <span className="text-sm font-medium">Week {currentWeek}</span>
            </div>
            <div className="text-rose-100 text-sm">
              Trimester {trimester} • {weeksLeft} weeks to go
            </div>
          </div>
        </div>

        {/* Today's Tip */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-100 card-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 p-2.5 rounded-xl flex-shrink-0">
              <Lightbulb size={20} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 text-sm mb-1">Today's Tip</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{todayTip}</p>
            </div>
          </div>
        </div>

        {/* Task Progress + Today's Mood row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Task Progress */}
          <div
            className="bg-white rounded-2xl p-5 shadow-sm border border-rose-50 card-hover cursor-pointer animate-fade-in"
            style={{ animationDelay: '0.2s' }}
            onClick={() => navigate('/mom/tasks')}
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 size={18} className="text-rose-500" />
              <h3 className="font-semibold text-gray-800 text-sm">Tasks</h3>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-1">
              {completedTasks}<span className="text-gray-300 text-lg">/{totalTasks}</span>
            </p>
            <div className="w-full h-2 bg-rose-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full animate-progress"
                style={{ width: `${taskPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">View Tasks →</p>
          </div>

          {/* Today's Mood */}
          <div
            className="bg-white rounded-2xl p-5 shadow-sm border border-rose-50 card-hover cursor-pointer animate-fade-in"
            style={{ animationDelay: '0.3s' }}
            onClick={() => navigate('/mom/mood')}
          >
            <div className="flex items-center gap-2 mb-3">
              <Heart size={18} className="text-rose-500" />
              <h3 className="font-semibold text-gray-800 text-sm">Mood</h3>
            </div>
            {todayMood ? (
              <>
                <p className="text-3xl mb-1">{todayMood.emoji}</p>
                <p className="text-sm text-gray-600">{todayMood.label}</p>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-400 leading-relaxed">How are you feeling today?</p>
                <p className="text-xs text-rose-400 mt-2 font-medium">Log Mood →</p>
              </>
            )}
          </div>
        </div>

        {/* Baby Size Card */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100 card-hover animate-fade-in text-center" style={{ animationDelay: '0.4s' }}>
          <span className="text-5xl block mb-2">{babySize.emoji}</span>
          <h3 className="font-display text-lg font-semibold text-gray-800">
            Your baby is the size of a {babySize.name}!
          </h3>
          <p className="text-gray-500 text-sm mt-1">Week {currentWeek} of 40</p>
        </div>

        {/* Quick Links */}
        <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-semibold text-gray-700 text-sm mb-3 px-1">Quick Access</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 ${link.bg} rounded-2xl px-5 py-4 hover:scale-105 transition-transform`}
              >
                <span className="text-xl">{link.emoji}</span>
                <span className="text-xs font-medium text-gray-600">{link.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MomDashboard;
