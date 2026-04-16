import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

const ChatLayout = () => {
  const [activeChat, setActiveChat] = useState({ id: 'global', name: 'Global Chat' });

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
      <div className="flex-1 flex flex-col h-full bg-dark-900 relative">
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
};

export default ChatLayout;
