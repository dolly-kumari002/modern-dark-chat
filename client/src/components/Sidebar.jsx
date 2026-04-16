import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { LogOut, Hash, User as UserIcon } from 'lucide-react';

const mockChats = [
  { id: 'global', name: 'Global Chat', type: 'group' },
  { id: '2', name: 'Alice Smith', type: 'user' },
  { id: '3', name: 'Bob Jones', type: 'user' },
];

const Sidebar = ({ activeChat, setActiveChat }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="w-80 h-full bg-dark-800 border-r border-dark-700 flex flex-col pt-5">
      <div className="px-5 pb-5 border-b border-dark-700 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-500">
          Messages
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
        {mockChats.map((chat) => (
          <motion.div
            key={chat.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveChat(chat)}
            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${
              activeChat.id === chat.id ? 'bg-brand-500/10 border border-brand-500/20' : 'hover:bg-dark-700 border border-transparent'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-gray-400 shrink-0">
              {chat.type === 'group' ? <Hash size={20} /> : <UserIcon size={20} />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate text-gray-200">{chat.name}</h3>
              <p className="text-xs text-gray-500 truncate">Tap to chat...</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 border-t border-dark-700 bg-dark-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center font-bold text-white uppercase shrink-0">
          {user?.username?.[0] || 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-200 truncate">{user?.username}</h4>
          <span className="text-xs text-green-500 font-medium">Online</span>
        </div>
        <button 
          onClick={logout}
          className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
