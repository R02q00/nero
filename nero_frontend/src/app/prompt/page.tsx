'use client'
import Home from '@/components/home'
import { useState } from 'react';

export default function PromptPage() {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState("");

    const sendPrompt = async () => {
        const response = await fetch("/api/chat/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        })
        const data = await response.json();

        setReply(data.reply || "Erreur")
    }
    return (
        <div className=''>
            <h1 className='text-center font-bold'>Type anything and send!</h1>
            <div className='px-4'>
                <p>
                    {reply}
                </p>
            </div>
            <div className='flex flex-col rounded-lg p-4 border'>
                <textarea
                    name="prompt"
                    id="prompt"
                    className='rounded-lg'
                    placeholder='Ask anything'
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                ></textarea>
                <div className='flex justify-end mt-4'>
                    <button onClick={sendPrompt} className='border px-4 rounded-lg text-cyan-500'>
                        Send
                    </button>
                </div>

            </div>

        </div>
    );
}