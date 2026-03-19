"use client";


export default function JobContact() {
    
    return (
        <main className="container max-w-4xl mx-auto mt-40">
            <form className="flex flex-col gap-3">
                <input name="name" placeholder="Collaboration Opportunity on Exciting Game Project" className="p-2 border-b border-primary" />
                <textarea name="message" placeholder="Write your messages here..." className="px-5 py-6 bg-cardbackground border border-[#2b2826] rounded h-32" />
                <button type="submit" className="self-start mt-4 px-6 py-2 bg-primary font-semibold text-black rounded-lg">SEND MESSAGE</button>
            </form>

        </main>
    );
}