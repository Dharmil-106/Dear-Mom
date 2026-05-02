import { useState } from 'react';
import babyNames from '../data/babyNames';
import { Heart, X, RotateCcw, Trophy } from 'lucide-react';

const gameTabs = [
  { id: 'names', label: 'Baby Names 👶' },
  { id: 'trivia', label: 'Trivia 🧠' },
  { id: 'couple', label: 'Couple Quiz 💕' },
];

const triviaQuestions = [
  { q: "How many weeks is a full-term pregnancy?", options: ["36","38","40","42"], answer: 2 },
  { q: "Which vitamin is most important in first trimester?", options: ["Vitamin C","Folic Acid","Vitamin D","Iron"], answer: 1 },
  { q: "When can you usually feel baby kicks?", options: ["Week 5","Week 10","Week 16-20","Week 30"], answer: 2 },
  { q: "What is the recommended weight gain for normal pregnancy?", options: ["5-10 kg","11-16 kg","20-25 kg","1-5 kg"], answer: 1 },
  { q: "Which sleeping position is recommended?", options: ["On back","On right side","On left side","Face down"], answer: 2 },
  { q: "How many trimesters are there?", options: ["2","3","4","5"], answer: 1 },
  { q: "What is colostrum?", options: ["A vitamin","First breast milk","A hormone","A test"], answer: 1 },
  { q: "Normal fetal heart rate is?", options: ["60-80","100-120","120-160","180-220"], answer: 2 },
];

const coupleQuestions = [
  "What name style do you prefer?",
  "Nursery theme?",
  "Parenting style?",
  "First trip with baby?",
  "Baby's first hobby?",
];

const coupleOptions = [
  ["Traditional", "Modern", "Unique"],
  ["Nature 🌿", "Stars ⭐", "Animals 🐻", "Minimal"],
  ["Strict", "Balanced", "Free-spirited"],
  ["Mountains", "Beach", "City", "Home"],
  ["Music", "Sports", "Arts", "Reading"],
];

const CoupleGames = () => {
  const [activeTab, setActiveTab] = useState('names');

  return (
    <div className="pb-bottom-nav">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        <div className="animate-fade-in">
          <h1 className="font-display text-2xl font-bold text-gray-800">Couple Games 🎮</h1>
          <p className="text-gray-400 text-sm mt-1">Fun activities for both of you</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 bg-white rounded-xl p-1.5 shadow-sm border border-rose-50 overflow-x-auto">
          {gameTabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap px-2 ${
                activeTab === tab.id ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'names' && <BabyNamePicker />}
        {activeTab === 'trivia' && <TriviaGame />}
        {activeTab === 'couple' && <CoupleQuiz />}
      </div>
    </div>
  );
};

// ─── BABY NAME PICKER ──────────────────────────────────
const BabyNamePicker = () => {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(() => JSON.parse(localStorage.getItem('dearMomLikedNames') || '[]'));
  const [filter, setFilter] = useState('all');
  const [done, setDone] = useState(false);

  const handleLike = () => {
    const name = babyNames[index];
    const updated = [...liked, name];
    setLiked(updated);
    localStorage.setItem('dearMomLikedNames', JSON.stringify(updated));
    advance();
  };

  const handleSkip = () => advance();

  const advance = () => {
    if (index + 1 >= babyNames.length) { setDone(true); } else { setIndex(index + 1); }
  };

  const restart = () => { setIndex(0); setDone(false); };

  const filteredLiked = filter === 'all' ? liked : liked.filter(n => n.gender === filter);
  const current = babyNames[index];

  return (
    <div className="space-y-4 animate-fade-in">
      {!done ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-rose-50 text-center">
          <div className="mb-2 text-xs text-gray-400">{index + 1} of {babyNames.length}</div>
          <span className="text-4xl block mb-3">{current.gender === 'girl' ? '👧' : '👦'}</span>
          <h2 className="font-display text-3xl font-bold text-gray-800 mb-1">{current.name}</h2>
          <p className="text-gray-500 text-sm mb-1">"{current.meaning}"</p>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${current.gender === 'girl' ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
            {current.gender === 'girl' ? 'Girl' : 'Boy'}
          </span>

          <div className="flex justify-center gap-6 mt-8">
            <button onClick={handleSkip} className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition text-gray-400 hover:text-gray-600">
              <X size={28} />
            </button>
            <button onClick={handleLike} className="w-14 h-14 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg shadow-rose-200 transition text-white">
              <Heart size={28} />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 rounded-2xl p-6 border border-green-100 text-center">
          <span className="text-3xl block mb-2">🎉</span>
          <p className="font-semibold text-green-700 mb-2">All names reviewed!</p>
          <button onClick={restart} className="flex items-center gap-2 mx-auto text-sm text-green-600 hover:text-green-700">
            <RotateCcw size={14} /> Start over
          </button>
        </div>
      )}

      {liked.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-rose-50">
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Liked Names ({liked.length})</h3>
          <div className="flex gap-2 mb-3">
            {['all', 'boy', 'girl'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${filter === f ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-500'}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {filteredLiked.map((n, i) => (
              <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium ${n.gender === 'girl' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                {n.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── TRIVIA GAME ───────────────────────────────────────
const TriviaGame = () => {
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === triviaQuestions[qi].answer) setScore(score + 1);
    setTimeout(() => {
      if (qi + 1 >= triviaQuestions.length) { setFinished(true); }
      else { setQi(qi + 1); setSelected(null); }
    }, 1200);
  };

  const restart = () => { setQi(0); setScore(0); setSelected(null); setFinished(false); };
  const q = triviaQuestions[qi];

  return (
    <div className="animate-fade-in">
      {!finished ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-gray-400">Question {qi + 1}/{triviaQuestions.length}</span>
            <span className="text-xs font-medium text-rose-500">Score: {score}</span>
          </div>
          <h3 className="font-display text-lg font-semibold text-gray-800 mb-5">{q.q}</h3>
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let cls = 'bg-rose-50/50 border-rose-100 text-gray-700 hover:bg-rose-100';
              if (selected !== null) {
                if (i === q.answer) cls = 'bg-green-100 border-green-300 text-green-700';
                else if (i === selected) cls = 'bg-red-100 border-red-300 text-red-700';
                else cls = 'bg-gray-50 border-gray-100 text-gray-400';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition ${cls}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-rose-50 text-center">
          <Trophy size={48} className="text-amber-500 mx-auto mb-3" />
          <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">
            {score >= 6 ? 'Amazing! 🎉' : score >= 4 ? 'Great job! 👏' : 'Good try! 💪'}
          </h3>
          <p className="text-gray-500 mb-4">You got {score} out of {triviaQuestions.length}!</p>
          <button onClick={restart} className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition">
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// ─── COUPLE QUIZ ───────────────────────────────────────
const CoupleQuiz = () => {
  const role = localStorage.getItem('dearMomRole') || 'mom';
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const storageKey = role === 'mom' ? 'momQuizAnswers' : 'partnerQuizAnswers';
  const otherKey = role === 'mom' ? 'partnerQuizAnswers' : 'momQuizAnswers';
  const otherAnswers = JSON.parse(localStorage.getItem(otherKey) || '[]');
  const bothDone = finished && otherAnswers.length === coupleQuestions.length;

  const handleAnswer = (ans) => {
    const updated = [...answers, ans];
    setAnswers(updated);
    if (qi + 1 >= coupleQuestions.length) {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      setFinished(true);
    } else {
      setQi(qi + 1);
    }
  };

  const restart = () => {
    setQi(0); setAnswers([]); setFinished(false);
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="animate-fade-in">
      {!finished ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50">
          <div className="text-xs text-gray-400 mb-4">
            {role === 'mom' ? "Mom's turn 🤰" : "Partner's turn 💑"} — Q{qi + 1}/{coupleQuestions.length}
          </div>
          <h3 className="font-display text-lg font-semibold text-gray-800 mb-5">{coupleQuestions[qi]}</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {coupleOptions[qi].map((opt) => (
              <button key={opt} onClick={() => handleAnswer(opt)}
                className="px-4 py-3 bg-rose-50 border border-rose-100 rounded-xl text-sm font-medium text-gray-700 hover:bg-rose-100 transition">
                {opt}
              </button>
            ))}
          </div>
        </div>
      ) : bothDone ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-rose-50 space-y-3">
          <h3 className="font-display text-xl font-bold text-gray-800 text-center mb-4">Results! 🎉</h3>
          {coupleQuestions.map((q, i) => {
            const match = answers[i] === otherAnswers[i];
            return (
              <div key={i} className={`p-3 rounded-xl border ${match ? 'bg-green-50 border-green-200' : 'bg-rose-50 border-rose-100'}`}>
                <p className="text-xs text-gray-500 mb-1">{q}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">🤰 {answers[i]}</span>
                  <span className="text-sm">💑 {otherAnswers[i]}</span>
                </div>
                {match && <p className="text-xs text-green-600 font-medium mt-1">You both agree! 🎉</p>}
              </div>
            );
          })}
          <button onClick={restart} className="w-full py-2.5 bg-rose-50 text-rose-500 rounded-xl text-sm font-medium hover:bg-rose-100 transition mt-2">
            Play Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-rose-50 text-center">
          <span className="text-4xl block mb-3">✅</span>
          <h3 className="font-display text-xl font-bold text-gray-800 mb-2">Your answers are saved!</h3>
          <p className="text-gray-400 text-sm mb-4">
            {otherAnswers.length === 0
              ? `Now ask your ${role === 'mom' ? 'partner' : 'partner'} to take the quiz!`
              : 'Both answers are in — view results!'}
          </p>
          <button onClick={restart} className="px-6 py-2.5 bg-rose-50 text-rose-500 rounded-xl text-sm font-medium hover:bg-rose-100 transition">
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default CoupleGames;
