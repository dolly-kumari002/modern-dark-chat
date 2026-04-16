import { useContext, useState, useEffect, useRef } from 'react';
import { SocketContext } from '../context/SocketContext';
import { AuthContext } from '../context/AuthContext';
import MessageBubble from './MessageBubble';
import { Send, Image as ImageIcon, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWindow = ({ activeChat }) => {
  const socket = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [typingUsers, setTypingUsers] = useState(new Set());
  
  const bottomRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  useEffect(() => {
    if (!socket || !activeChat) return;

    socket.emit('join_room', activeChat.id);
    setMessages([]); // Reset on room change

    const handleReceiveMsg = (data) => {
      if (data.room === activeChat.id) {
        setMessages((prev) => [...prev, data.message]);
      }
    };

    const handleTyping = (data) => {
      if (data.room === activeChat.id && data.username !== user.username) {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.add(data.username);
          return newSet;
        });
      }
    };

    const handleStopTyping = (data) => {
      if (data.room === activeChat.id) {
        setTypingUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(data.username);
          return newSet;
        });
      }
    };

    socket.on('receive_message', handleReceiveMsg);
    socket.on('typing', handleTyping);
    socket.on('stop_typing', handleStopTyping);

    return () => {
      socket.off('receive_message', handleReceiveMsg);
      socket.off('typing', handleTyping);
      socket.off('stop_typing', handleStopTyping);
    };
  }, [socket, activeChat, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typingUsers]);

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    if (socket) {
      socket.emit('typing', { room: activeChat.id, username: user.username });
      
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('stop_typing', { room: activeChat.id, username: user.username });
      }, 1500);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;
    
    socket.emit('stop_typing', { room: activeChat.id, username: user.username });

    const msgObj = {
      _id: Date.now().toString(),
      text: newMessage,
      senderId: user._id,
      senderName: user.username,
      createdAt: new Date().toISOString()
    };

    socket.emit('send_message', {
      room: activeChat.id,
      message: msgObj
    });

    setMessages((prev) => [...prev, msgObj]);
    setNewMessage('');
  };

  const typingArray = Array.from(typingUsers);

  return (
    <div className="flex flex-col h-full bg-dark-900 w-full relative pattern-dots overflow-hidden">
      {/* Header */}
      <div className="h-16 border-b border-dark-700 bg-dark-800/80 backdrop-blur-md flex items-center px-6 absolute top-0 w-full z-10 shadow-sm">
        <h2 className="font-semibold text-lg text-gray-100">{activeChat.name}</h2>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 pt-24 pb-4">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg._id} 
            message={msg} 
            isOwnMessage={msg.senderId === user._id} 
          />
        ))}
        {/* Typing indicator */}
        <AnimatePresence>
          {typingArray.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-xs text-gray-500 italic mb-4 ml-2"
            >
              {typingArray.join(', ')} {typingArray.length > 1 ? 'are' : 'is'} typing...
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="px-6 pb-6 pt-2">
        <form 
          onSubmit={handleSend}
          className="bg-dark-800 border border-dark-700 rounded-2xl p-2 flex items-end gap-2 shadow-xl focus-within:border-brand-500 focus-within:ring-1 focus-within:ring-brand-500 transition-all"
        >
          <button type="button" className="p-2 text-gray-400 hover:text-brand-400 transition-colors rounded-xl">
            <ImageIcon size={20} />
          </button>
          <textarea
            value={newMessage}
            onChange={handleInputChange}
            placeholder="Message..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none resize-none py-2 max-h-32 text-sm mt-1"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button type="button" className="p-2 text-gray-400 hover:text-brand-400 transition-colors rounded-xl">
            <Smile size={20} />
          </button>
          <button 
            type="submit" 
            disabled={!newMessage.trim()}
            className="p-2 bg-brand-500 hover:bg-brand-400 disabled:bg-dark-700 disabled:text-gray-500 text-white rounded-xl transition-colors shadow-md"
          >
            <Send size={18} className={newMessage.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
