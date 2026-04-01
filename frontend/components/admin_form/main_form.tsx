export default function MainForm() {
    return (
        <form className="flex flex-col gap-6 font-title">

            <div>
                <label className="text-admintitle">Portfolio Title</label>
                <input
                    placeholder="Enter portfolio title..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Main Quote</label>
                <input
                    placeholder="Enter main quote..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Sub Quote</label>
                <input
                    placeholder="Enter sub quote..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Introduction</label>
                <input
                    placeholder="Enter introduction..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">GitHub Link</label>
                <input
                    placeholder="Enter your GitHub link..."
                    className="input-style"
                />
            </div>
            
            <button className="btn-primary">
                SAVE
            </button>
        </form>
    );
}