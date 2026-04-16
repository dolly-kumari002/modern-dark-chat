import { motion } from 'framer-motion';

const MessageBubble = ({ message, isOwnMessage }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 w-full`}
    >
      <div 
        className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
          isOwnMessage 
            ? 'bg-brand-500 text-white rounded-tr-sm shadow-brand-500/20' 
            : 'bg-dark-700 text-gray-100 rounded-tl-sm shadow-black/20'
        } shadow-lg`}
      >
        {!isOwnMessage && message.senderName && (
          <div className="text-xs text-brand-400 font-medium mb-1">
            {message.senderName}
          </div>
        )}
        <p className="text-sm break-words whitespace-pre-wrap leading-relaxed">{message.text}</p>
        <div className={`text-[10px] mt-1 text-right ${isOwnMessage ? 'text-brand-200' : 'text-gray-400'}`}>
          {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;
