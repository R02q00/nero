'use client'
import { useState } from "react";

export default function PromptPage() {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userMessage = { role: 'user', content: prompt };
        const newMessages = [...messages, userMessage];

        setMessages(newMessages);
        setPrompt('');

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: newMessages }),
            });

            if (!response.ok) {
                const errText = await response.text();
                console.error("Server error:", errText);
                return;
            }

            const data = await response.json();
            setMessages([...newMessages, { role: 'assistant', content: data.response }]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="dark:bg-gray-900">
            <div className="mx-5 md:mx-20">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`p-2 my-2 rounded-lg ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="">
                <form onSubmit={handleSubmit} className="absolute bottom-4 md:translate-x-1/6 w-full md:w-[75%] flex flex-col gap-2 border rounded-md p-4">
                    <textarea
                        value={prompt}
                        placeholder="Ask anything"
                        onChange={(e) => setPrompt(e.target.value)}
                        className="outline-none"
                        disabled={isLoading}
                        required
                    />
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-1 text-cyan-500 border border-cyan-500 rounded-md"
                        >
                            {isLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>

                </form>
            </div>

        </div>
    );
}