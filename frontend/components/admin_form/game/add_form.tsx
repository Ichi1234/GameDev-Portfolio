import { useState, useEffect } from "react";
import Image from "next/image";
import ListItem from "../../ListItem";
import { TagAndPlatform } from "@/types/tag_platform";
import { ChangeLogInput } from "@/types/change_log";

type Props = {
    setScreen: (screen: string) => void;
};

export default function GameAddForm({ setScreen }: Props) {
    const [coverImg, setCoverImg] = useState<File | null>(null);
    const [gamePhoto, setGamePhoto] = useState<File[] | null>(null);
    const [gameVideo, setGameVideo] = useState<File[] | null>(null);

    const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
    const [photoPreviewUrls, setPhotoPreviewUrls] = useState<string[]>([]);
    const [videoPreviewUrls, setVideoPreviewUrls] = useState<string[]>([]);
    

    const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
    const [tagDropdownData, setTagDropdownData] = useState<string[]>([]);
    const [platformDropdownOpen, setPlatformDropdownOpen] = useState(false);
    const [platformDropdownData, setPlatformDropdownData] = useState<string[]>([]);
    const [platformSearch, setPlatformSearch] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [repository, setRepository] = useState("");
    const [status, setStatus] = useState("");
    const [typeVal, setTypeVal] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [platforms, setPlatforms] = useState<string[]>([]);

    // Change Log (start empty for new game)
    const [changelogLst, setChangelogLst] = useState<ChangeLogInput[]>([]);

    const [version, setVersion] = useState("");
    const [date, setDate] = useState("");
    const [clDescription, setClDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
            photoPreviewUrls.forEach((u) => URL.revokeObjectURL(u));
            videoPreviewUrls.forEach((u) => URL.revokeObjectURL(u));
        };
    }, [coverPreviewUrl, photoPreviewUrls, videoPreviewUrls]);

    // fetch tags and platforms for dropdowns
    useEffect(() => {
        const fetchLists = async () => {
            try {
                const t = await fetch(`${API_BASE}/tag/`);
                if (t.ok) {
                    const tags = await t.json();
                    setTagDropdownData(Array.isArray(tags) ? tags.map((x: TagAndPlatform) => x.name) : []);
                }

                const p = await fetch(`${API_BASE}/platform/`);
                if (p.ok) {
                    const plats = await p.json();
                    setPlatformDropdownData(Array.isArray(plats) ? plats.map((x: TagAndPlatform) => x.name) : []);
                }
            } catch (err) {

            }
        };

        fetchLists();
    }, []);

    const addPlatform = (val?: string) => {
        const v = (val ?? platformSearch ?? "").trim();
        if (!v) return;
        if (!platforms.includes(v)) setPlatforms((p) => [...p, v]);
        setPlatformSearch("");
        setPlatformDropdownOpen(false);
    };

    const removeTag = (tag: string) => {
        setSelectedTags((prev) => prev.filter((t) => t !== tag));
    };

    const removePlatform = (plat: string) => {
        setPlatforms((prev) => prev.filter((p) => p !== plat));
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (coverPreviewUrl) URL.revokeObjectURL(coverPreviewUrl);
        setCoverImg(f);
        setCoverPreviewUrl(f ? URL.createObjectURL(f) : null);
    };

    const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;
        const urls = files.map((f) => URL.createObjectURL(f));
        setGamePhoto((prev) => (prev ? [...prev, ...files] : files));
        setPhotoPreviewUrls((prev) => [...prev, ...urls]);
    };

    const removePhotoAt = (index: number) => {
        if (!gamePhoto) return;
        const newFiles = [...gamePhoto];
        newFiles.splice(index, 1);
        const newUrls = [...photoPreviewUrls];
        const removed = newUrls.splice(index, 1);
        removed.forEach((u) => URL.revokeObjectURL(u));
        setGamePhoto(newFiles.length ? newFiles : null);
        setPhotoPreviewUrls(newUrls);
    };

    const handleVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;
        const urls = files.map((f) => URL.createObjectURL(f));
        setGameVideo((prev) => (prev ? [...prev, ...files] : files));
        setVideoPreviewUrls((prev) => [...prev, ...urls]);
    };

    const removeVideoAt = (index: number) => {
        if (!gameVideo) return;
        const newFiles = [...gameVideo];
        newFiles.splice(index, 1);
        const newUrls = [...videoPreviewUrls];
        const removed = newUrls.splice(index, 1);
        removed.forEach((u) => URL.revokeObjectURL(u));
        setGameVideo(newFiles.length ? newFiles : null);
        setVideoPreviewUrls(newUrls);
    };

    const addChangelog = () => {
        if (!version || !date || !clDescription) return;
        const newLog = { version, date, description: clDescription };
        setChangelogLst((prev) => [...prev, newLog]);
        setVersion("");
        setDate("");
        setClDescription("");
    };

    const removeLog = (indexToRemove: number) => {
        setChangelogLst((prev) => prev.filter((_, i) => i !== indexToRemove));
    };

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        const bodyObj = {
            title: title,
            description: description,
            type: typeVal,
            start_date: null,
            release_date: null,
            repository_link: repository,
            status: status,
            tags: selectedTags,
            platforms: platforms,
            changelogs: changelogLst,
        };

        const form = new FormData();
        form.append("body", JSON.stringify(bodyObj));
        if (coverImg) form.append("cover_img", coverImg);
        if (gamePhoto) gamePhoto.forEach((f) => form.append("photos", f));
        if (gameVideo) gameVideo.forEach((f) => form.append("videos", f));

        try {
            const res = await fetch(`${API_BASE}/games/`, {
                method: "POST",
                body: form,
            });

            if (res.ok) {
                setScreen("home");
                return;
            } else {
                const text = await res.text();
                alert("Failed to add game: " + text);
            }
        } catch (err) {
            alert("Network error: " + String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="flex flex-col gap-6 font-title" onSubmit={handleSubmit}>
            <span onClick={() => setScreen("home")} className="mb-4 flex items-center gap-1 text-sm text-admintitle font-body font-semibold cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>

                Back to the Game List
            </span>

            <div>
                <label className="text-admintitle">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter game title..." className="input-style" />
            </div>

            <div>
                <label className="text-admintitle">Description</label>
                <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter game description..." className="input-style" />
            </div>

            <div>
                <label className="text-admintitle">Game Repository (Optional)</label>
                <input value={repository} onChange={(e) => setRepository(e.target.value)} placeholder="Enter game repository..." className="input-style" />
            </div>

            <div>
                <label className="text-admintitle">Game Status</label>
                <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Enter the game status..." className="input-style" />
            </div>

            <div>
                <label className="text-admintitle">Game Type (Optional)</label>
                <input value={typeVal} onChange={(e) => setTypeVal(e.target.value)} placeholder="Enter game type..." className="input-style" />
            </div>

            <div>
                <label className="text-admintitle">Game Tags</label>
                <div className="dropdown-input flex items-center" onClick={() => setTagDropdownOpen(!tagDropdownOpen)}>
                    <div id="tag-container">
                        <div className="flex items-center gap-2">
                            {selectedTags.length ? (
                                selectedTags.map((t) => (
                                    <div key={t} className="flex items-center gap-1 px-2 py-1 text-sm rounded-xl bg-admintitle text-white">
                                        <span>{t}</span>
                                        <svg
                                            onClick={(e) => { e.stopPropagation(); removeTag(t); }}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="cursor-pointer hover:opacity-80 ml-1"
                                        >
                                            <line x1="18" y1="6" x2="6" y2="18" />
                                            <line x1="6" y1="6" x2="18" y2="18" />
                                        </svg>
                                    </div>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500">No tags</div>
                            )}
                        </div>
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition ${tagDropdownOpen ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                {tagDropdownOpen && (
                    <div className="bg-white rounded-xl shadow-lg mt-2 p-3 flex flex-col gap-2">
                        {tagDropdownData.length ? (
                            tagDropdownData.map((data) => (
                                <p key={data} onClick={() => { if (!selectedTags.includes(data)) setSelectedTags((p) => [...p, data]); setTagDropdownOpen(false); }} className="hover:bg-gray-100 p-1 cursor-pointer">{data}</p>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500">No tags available</div>
                        )}
                    </div>
                )}
            </div>

            <div>
                <label className="text-admintitle">Game Platforms</label>

                <div className="dropdown-input flex items-center" onClick={() => setPlatformDropdownOpen(!platformDropdownOpen)}>
                    <div id="platform-container" className="flex gap-2">
                        {platforms.length ? (
                            platforms.map((p) => (
                                <div key={p} className="flex items-center gap-1 px-2 py-1 text-sm rounded-xl bg-admintitle text-white">
                                    <span>{p}</span>
                                    <svg
                                        onClick={(e) => { e.stopPropagation(); removePlatform(p); }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className="cursor-pointer hover:opacity-80 ml-1"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500">No platforms</div>
                        )}
                    </div>

                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition ${platformDropdownOpen ? "rotate-180" : ""}`}>
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                {platformDropdownOpen && (
                    <div className="bg-white rounded-xl shadow-lg mt-2 p-3 flex flex-col gap-2">
                        <div className="flex flex-col max-h-40 overflow-auto">
                            {platformDropdownData.length ? (
                                platformDropdownData.map((data) => (
                                    <p key={data} onClick={() => addPlatform(data)} className="hover:bg-gray-100 p-1 cursor-pointer">{data}</p>
                                ))
                            ) : (
                                <div className="text-sm text-gray-500">No platforms available</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex justify-between">
                <div className="w-[48%]">
                    <label className="text-admintitle">Start Date</label>
                    <input className="input-style" type="date" />
                </div>

                <div className="w-[48%]">
                    <label className="text-admintitle">Release Date  (Optional)</label>
                    <input className="input-style" type="date" />
                </div>
            </div>

            <div>
                <label className="text-admintitle">Game File (Optional)</label>
                <input placeholder="Upload your game..." className="file-input" type="file" />
            </div>

            <div>
                <label className="text-admintitle">Game Cover Image</label>
                <input placeholder="Upload your game cover image..." className="file-input" type="file" accept="image/*" onChange={handleCoverChange} />

                {coverPreviewUrl && (
                    <div className="mt-4 flex flex-col gap-2">
                        <Image src={coverPreviewUrl} alt="preview" width={160} height={160} className="object-cover rounded" />
                    </div>
                )}
            </div>

            <div>
                <label className="text-admintitle">Game Photos</label>
                <input placeholder="Upload your game photo..." className="file-input" type="file" multiple accept="image/*" onChange={handlePhotosChange} />

                {photoPreviewUrls.length > 0 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {photoPreviewUrls.map((src, i) => (
                            <div key={src} className="relative">
                                <Image src={src} width={112} height={112} alt={`photo-${i}`} className="object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => removePhotoAt(i)}
                                    className="absolute -top-2 -right-2 w-6 h-6 text-lg rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
                                    aria-label="Remove photo"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <label className="text-admintitle">Game Videos</label>
                <input placeholder="Upload your game video..." className="file-input" type="file" multiple accept="video/*" onChange={handleVideosChange} />

                {gameVideo && gameVideo.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                        {gameVideo.map((f, i) => (
                            <ListItem key={`${f.name}-${i}`} title={f.name} onRemove={() => removeVideoAt(i)} />
                        ))}
                    </div>
                )}
            </div>

            <p className="text-admintitle font-bold mt-6">Change Logs</p>
            <div className="flex gap-x-2 text-sm! ">
                <div className="flex gap-4 w-full">
                    <input value={version} onChange={(e) => setVersion(e.target.value)} placeholder="Version" className="input-style" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" className="input-style" />
                    <input value={clDescription} onChange={(e) => setClDescription(e.target.value)} placeholder="Description" className="input-style" />
                </div>

                <button type="button" onClick={addChangelog} className="flex items-center justify-center w-10 h-10 rounded-lg bg-admintitle text-white hover:opacity-80 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </button>
            </div>

            <div id="changelog-container" className="flex flex-col overflow-hidden rounded-lg">
                {changelogLst.map((log, index) => {
                    const isEven = index % 2 === 0;
                    return (
                        <div key={index} className={`text-white p-2 grid grid-cols-[80px_160px_1fr_40px] items-center ${isEven ? "bg-admintitle" : "bg-admintitle/40"}`}>
                            <span>{log.version}</span>
                            <span>{log.date}</span>
                            <span className="text-sm">{log.description}</span>

                            <svg onClick={() => removeLog(index)} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cursor-pointer hover:opacity-80">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                    );
                })}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Adding..." : "ADD"}</button>
        </form>
    );
}
