import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdClose } from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import { MdOutlineArrowForwardIos } from "react-icons/md";

function AiPopUp({ onClose, article }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);
    
    
    const sendMessage = async (question = input) => {
        if (!question.trim()) return;

        const userMessage = { role: 'user', text: question };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            body: JSON.stringify({ message: question, article }),
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
        <div className="fixed bottom-20 right-4 w-[460px] bg-white shadow-2xl rounded-2xl border border-gray-200 flex flex-col max-h-[600px] text-base font-medium overflow-hidden">
            {/* Header */}
            <div className="bg-[#C8281D] text-white px-5 py-4 flex justify-between items-center">
                <div>
                    <p className="font-semibold text-lg">Arya</p>
                    <p className="text-xs opacity-90">Hi! I’m Arya, AktuBrand AI expert</p>
                </div>
                <IoMdClose className="cursor-pointer text-xl hover:text-gray-200 transition" onClick={onClose} />
            </div>

            {/* Message Area */}
            <div className="flex-1 bg-red-50 overflow-y-auto px-4 py-3 space-y-3 text-sm scroll-smooth">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[85%] rounded-lg px-4 py-2 text-xl whitespace-pre-wrap leading-relaxed ${msg.role === 'user'
                                ? 'bg-red-100 text-right ml-auto'
                                : 'bg-gray-100 text-left mr-auto'
                            }`}
                    >
                        <ReactMarkdown
                            components={{
                                a: ({ href, children }) => (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline hover:text-blue-800 transition"
                                    >
                                        {children}
                                    </a>
                                ),
                            }}
                        >
                            {msg.text}
                        </ReactMarkdown>

                    </div>
                ))}
                {loading && (
                    <p className="text-gray-500 text-xs animate-pulse">Thinking...</p>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Recommended Questions */}
            {messages.length === 0 && !loading && (
                <div className="bg-red-50 px-4 py-3 space-y-2  ">
                    <p className="text-xl text-gray-500">Try asking one of these:</p>
                    {[
                        "Summarise this article in simple words",
                        "Tell me in points",
                    ].map((question, i) => (
                        <div
                            key={i}
                            onClick={() => sendMessage(question)}
                            className="cursor-pointer flex items-center justify-between bg-white hover:bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-700 transition"
                        >
                            {question}
                            <MdOutlineArrowForwardIos className="text-xs text-gray-500" />
                        </div>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="border-t border-[#C8281D] bg-white px-4 py-3 flex items-center gap-3">
                <input
                    disabled={loading}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 text-sm border border-[#C8281D] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C8281D]/50"
                    placeholder="Tell us how we can help..."
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                />
                <button
                    onClick={sendMessage}
                    disabled={loading}
                    className="text-[#C8281D] font-bold text-xl disabled:opacity-40"
                >
                    {loading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                        "➤"
                    )}
                </button>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] bg-white text-center text-gray-400 pb-2 px-4">
                AI may produce inaccurate information
            </p>
        </div>

    );
}

export default AiPopUp;
