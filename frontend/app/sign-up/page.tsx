"use client";

export default function SignUp() {
    
    return (
        <main className="h-[70vh] flex justify-center items-center px-4">
            <form className="w-full max-w-md flex flex-col items-center gap-y-6 mt-auto px-8 py-10 rounded-2xl bg-cardbackground border border-[#272321]">
                <div className="flex justify-evenly w-full">
                    <button className="w-full text-xl font-title text-white px-6 py-2 border-b-2 border-primary/40">Visitor</button>
                    <button className="w-full text-xl font-title text-textsubcolor px-6 py-2 border-b-2 border-[#272321]">HR</button>

                </div>

                <h2 className="font-title font-bold text-2xl mt-2 text-white">Register</h2>

                <div className="self-start w-full">
                    <label className="block text-textsubcolor mb-1" htmlFor="name">Username</label>
                    <input name="name" placeholder="Type your username here..." className="w-full pb-2 focus:outline-none focus:ring-0 border-b border-primary/40 focus:border-primary" />    
                </div>
                
                <button type="submit" className="w-full text-sm mt-4 px-6 py-3 bg-primary font-semibold text-black rounded-lg">Register with Google OAuth</button>
                
                <span className="text-sm text-textsubcolor">Already have an account? <a href="https://youtu.be/CZKex48fp5Q?si=ZTpqDECTkV-td2sZ" className="text-primary">Sign in with Google</a></span>
            </form>

        </main>
    );
}