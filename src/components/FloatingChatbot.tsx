import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: 'Hi there! I am Shri, Golu\'s AI Assistant. How can I help you today?' }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setInput('');
    await sendMessage(userText);
  };

  const sendMessage = async (userText: string) => {
    const newMessages: Message[] = [...messages, { role: 'user', parts: [{ text: userText }] }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: data.reply }] }]);
    } catch (error) {
      console.error(error);
      const errorMsg = 'Sorry, I am having trouble connecting to the server right now. Please try again later.';
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: errorMsg }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-accent-blue rounded-full flex items-center justify-center text-primary-dark shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-4 right-4 sm:bottom-24 sm:right-6 z-[60] w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[85vh] bg-secondary-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-8 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-primary-dark border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-accent-blue/20 p-2 rounded-full">
              <Bot size={20} className="text-accent-blue" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Shri (AI Assistant)</h3>
              <p className="text-gray-400 text-xs">Replies instantly</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
              <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${msg.role === 'user' ? 'bg-accent-yellow/20 text-accent-yellow' : 'bg-accent-blue/20 text-accent-blue'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? 'bg-accent-yellow/10 text-white rounded-tr-sm border border-accent-yellow/20' 
                  : 'bg-white/5 text-gray-300 rounded-tl-sm border border-white/10'
              }`}>
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[85%]">
              <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 bg-accent-blue/20 text-accent-blue">
                <Bot size={16} />
              </div>
              <div className="p-3 rounded-2xl bg-white/5 text-gray-300 rounded-tl-sm border border-white/10 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-accent-blue" />
                <span className="text-xs text-gray-400">Typing...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 bg-primary-dark border-t border-white/10 flex items-end gap-2">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1 bg-secondary-dark border border-white/10 rounded-xl p-3 text-sm text-white resize-none h-[44px] max-h-[120px] focus:outline-none focus:border-accent-blue/50 custom-scrollbar transition-colors"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-accent-blue hover:bg-accent-blue-hover disabled:bg-gray-700 disabled:text-gray-500 text-primary-dark w-[44px] h-[44px] rounded-xl flex items-center justify-center shrink-0 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
