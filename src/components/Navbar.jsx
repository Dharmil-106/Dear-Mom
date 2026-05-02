import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem('dearMomName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('dearMomRole');
    localStorage.removeItem('dearMomName');
    localStorage.removeItem('dearMomDueDate');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-rose-100 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <button
          onClick={() => {
            const role = localStorage.getItem('dearMomRole');
            navigate(role === 'partner' ? '/partner/dashboard' : '/mom/dashboard');
          }}
          className="font-display text-xl font-bold text-rose-500 hover:text-rose-600 transition-colors"
        >
          DearMom 💕
        </button>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 font-medium hidden sm:block">
            Hi, {name} 👋
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-rose-500 transition-colors bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-full"
            id="logout-button"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
