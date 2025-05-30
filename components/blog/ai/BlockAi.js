'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function BlockAi({ article }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input, article }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let aiText = '';
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      aiText += chunk;
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'ai', text: aiText };
        return updated;
      });
    }

    setLoading(false);
  };

  return (
    <div className="w-full max-h-[85vh]  flex flex-col     ">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-md whitespace-pre-wrap ${
              msg.role === 'user'
                ? 'bg-gray-800 text-white'
                : 'bg-white text-black'
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <p className="text-gray-400 animate-pulse">Typing...</p>}
      </div>

      <div className="flex gap-1 mt-4">
        <input
          type="text"
          className="flex-1   py-2 rounded bg-gray-900 text-white border border-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI something..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default BlockAi;
