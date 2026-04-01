export default function GameForm() {
    return (
        <form className="flex flex-col gap-6 font-title">
            <div>
                <label className="text-admintitle">Title</label>
                <input
                    placeholder="Enter game title..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Description</label>
                <input
                    placeholder="Enter game description..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Repository (Optional)</label>
                <input
                    placeholder="Enter game repository..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Status</label>
                <input
                    placeholder="Enter the game status..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Type (Optional)</label>
                <input
                    placeholder="Enter game type..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Tags</label>
                <div className="dropdown-input flex">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>

                    <div className="hidden">

                    </div>
                </div>
            </div>

            <div>
                <label className="text-admintitle">Game Platforms</label>
                <input
                    placeholder="Enter game type..."
                    className="input-style"
                />
            </div>

            <div className="flex justify-between">
                <div>
                    <label className="text-admintitle">Start Date</label>
                    <input
                        className="input-style"
                        type="date"
                    />
                </div>

                <div>
                    <label className="text-admintitle">Release Date  (Optional)</label>
                    <input
                        className="input-style"
                        type="date"
                    />
                </div>
            </div>
            

            <div>
                <label className="text-admintitle">Game File (Optional)</label>
                <input
                    placeholder="Upload your game..."
                    className="file-input"
                    type="file"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Cover Image</label>
                <input
                    placeholder="Upload your game cover image..."
                    className="file-input"
                    type="file"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Photos</label>
                <input
                    placeholder="Upload your game photo..."
                    className="file-input"
                    type="file"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Videos</label>
                <input
                    placeholder="Upload your game video..."
                    className="file-input"
                    type="file"
                />
            </div>

            <p className="text-admintitle font-bold mt-6">Change Logs</p>
            <div className="flex gap-x-2 text-sm! ">
                <div>
                    <label className="text-admintitle font-normal!">Version</label>
                    <input
                        placeholder="Enter update version..."
                        className="input-style"
                    />
                </div>

                <div>
                    <label className="text-admintitle font-normal!">Date</label>
                    <input
                        placeholder="Enter update date..."
                        className="input-style"
                    />
                </div>

                <div>
                    <label className="text-admintitle font-normal!">Description</label>
                    <input
                        placeholder="Enter update descriptionD..."
                        className="input-style"
                    />
                </div>
            </div>

            <button className="btn-primary">
                SAVE
            </button>
        
        </form>
    );
}
