"use client";

import { useState } from "react";

export default function JobContact() {
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const isReady = topic.trim() !== '' && message.trim() !== '';

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage(null);
        try {
            const payload = { subject: topic, message };
            const token = localStorage.getItem('token');
            const res = await fetch("http://localhost:8000/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
                body: JSON.stringify(payload),
            });
            if (!res.ok) {
                let detail = '';
                try {
                    const data = await res.json();
                    detail = data.detail || data.message || JSON.stringify(data);
                } catch (e) {
                    detail = (await res.text().catch(() => res.statusText)) || 'Unknown server error';
                }
                console.error('Send email failed:', res.status, detail);
                setErrorMessage(`Server error ${res.status}: ${detail}`);
                setStatus('error');
                return;
            }

            setStatus("sent");
            setTopic("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setStatus("error");
        }
    }

    return (
        <main className="container max-w-4xl mx-auto mt-40 px-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <label htmlFor="topic" className="font-title text-2xl text-white">Topic</label>
                <input
                    id="topic"
                    name="topic"
                    autoComplete="off"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Collaboration Opportunity on Exciting Game Project"
                    className="focus:outline-none focus:ring-0 p-2 border-b border-primary/40 focus:border-primary"
                />

                <label htmlFor="message" className="mt-6 font-title text-2xl text-white">Message</label>
                <textarea
                    id="message"
                    name="message"
                    autoComplete="off"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your messages here..."
                    className="focus:outline-none focus:ring-0 px-5 py-6 bg-cardbackground border border-[#2b2826] rounded min-h-60"
                />

                <button
                    type="submit"
                    disabled={status === "sending" || !isReady}
                    className={`text-sm self-start mt-4 px-6 py-2 bg-primary font-semibold text-black rounded-lg disabled:opacity-50 ${!isReady ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/60 cursor-pointer'}`}
                >
                    {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
                </button>

                {status === "sent" && <p className="text-green-400 mt-2">Message sent successfully.</p>}
                {status === "error" && (
                    <p className="text-red-400 mt-2">{errorMessage ?? 'Failed to send message. Try again later.'}</p>
                )}
            </form>
        </main>
    );
}