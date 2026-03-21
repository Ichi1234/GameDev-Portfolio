"use client";

export default function JobContact() {
    
    return (
        <main className="container max-w-4xl mx-auto mt-40 px-8">
            <form className="flex flex-col gap-3">
                <label htmlFor="topic" className="font-title text-2xl text-white">Topic</label>
                <input name="topic" placeholder="Collaboration Opportunity on Exciting Game Project" className="focus:outline-none focus:ring-0 p-2 border-b border-primary/40 focus:border-primary" />
                <label htmlFor="message" className="mt-6 font-title text-2xl text-white">Message</label>
                <textarea
                name="message"
                placeholder="Write your messages here..."
                className="focus:outline-none focus:ring-0 px-5 py-6 bg-cardbackground border border-[#2b2826] rounded min-h-60"
                />
                <button type="submit" className="text-sm self-start mt-4 px-6 py-2 bg-primary font-semibold text-black rounded-lg">SEND MESSAGE</button>
            </form>

        </main>
    );
}