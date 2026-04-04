import { useState } from "react";

type Props = {
    setScreen: (screen: string) => void;
};

export default function GameAddForm({ setScreen }: Props) {
    const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
    const [tagDropdownData] = useState(
        [
            "Test 1",
            "Test 2",
            "Test 3"
        ]
    );

    // Change Log Const
    const [changelogLst, setChangelogLst] = useState([
        {
            "version": "1.0.0",
            "date": "JAN 26, 2026",
            "description": "All the main feature is finished, Published the demo."
        },

        {
            "version": "1.0.1",
            "date": "JAN 26, 2026",
            "description": "All EEEEEE."
        }
    ])

    const [version, setVersion] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");

    const addChangelog = () => {
        if (!version || !date || !description) return;

        const newLog = {
            version,
            date,
            description
        };

        setChangelogLst([...changelogLst, newLog]);

        setVersion("");
        setDate("");
        setDescription("");
    };

     const removeLog = (indexToRemove : number) => {
        setChangelogLst(
            changelogLst.filter((_, index) => index !== indexToRemove)
        );
    };

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
                <div className="dropdown-input flex items-center" onClick={() => setTagDropdownOpen(!tagDropdownOpen)}>
                    <div id="tag-container">
                        <div className="flex items-center gap-1 px-2 py-1 text-sm rounded-xl bg-admintitle text-white">
                            <span>Test</span>

                            {/* X mark */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="cursor-pointer hover:opacity-80 " 
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                    </div>
                    
                    {/* Dropdown Arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`ml-auto transition ${tagDropdownOpen ? "rotate-180" : ""}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>

                
                </div>

                {tagDropdownOpen && (
                    <div className="bg-white rounded-xl shadow-lg mt-2 p-3 flex flex-col gap-2">
                        {tagDropdownData.map((data) => {
                            return <p key={data} className="hover:bg-gray-100 p-1 cursor-pointer">{data}</p>
                        })}
                    
                    </div>
                )}
            </div>

            <div>
                <label className="text-admintitle">Game Platforms</label>
                <input
                    placeholder="Enter game type..."
                    className="input-style"
                />
            </div>

            <div className="flex justify-between">
                <div className="w-[48%]">
                    <label className="text-admintitle">Start Date</label>
                    <input
                        className="input-style"
                        type="date"
                    />
                </div>

                <div className="w-[48%]">
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

                <div className="flex gap-4 w-full">
                    <input
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="Version"
                    className="input-style"
                    />

                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        placeholder="Date"
                        className="input-style"
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="input-style"
                    />
                </div>

                {/* + button */}
                <button
                    type="button"
                    onClick={addChangelog}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-admintitle text-white hover:opacity-80 transition"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>

        <div id="changelog-container" className="flex flex-col overflow-hidden rounded-lg">

                {changelogLst.map((log, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div
                            key={index}
                            className={`text-white p-2 grid grid-cols-[80px_160px_1fr_40px] items-center ${
                                isEven ? "bg-admintitle" : "bg-admintitle/40"
                            }`}
                        >
                            <span>{log.version}</span>
                            <span>{log.date}</span>
                            <span className="text-sm">{log.description}</span>

                            <svg
                                onClick={() => removeLog(index)}
                                xmlns="http://www.w3.org/2000/svg"
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="cursor-pointer hover:opacity-80"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                    );
                })}

            </div>

            <button className="btn-primary">
                ADD
            </button>

        </form>
    )
}