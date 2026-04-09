import { useState, useEffect } from "react";
import Image from "next/image";
import ListItem from "../../ListItem";
import { Game, GameInput } from "@/types/game";
import { TagAndPlatform } from "@/types/tag_platform";

type Props = {
    setScreen: (screen: string) => void;
    gameData: Game;
};

export default function GameEditForm({ setScreen, gameData }: Props) {
    const [tagDropdownOpen, setTagDropdownOpen] = useState(false);

    const [title, setTitle] = useState<string>(gameData.title || "");
    const [description, setDescription] = useState<string>(
        typeof gameData.description === "string" ? gameData.description : String(gameData.description || "")
    );
    const [repository, setRepository] = useState<string>(gameData.repository_link || "");
    const [status, setStatus] = useState<string>(gameData.status || "");
    const [typeVal, setTypeVal] = useState<string>(gameData.type || "");

    const [selectedTags, setSelectedTags] = useState<string[]>(gameData.tags || []);
    const [tagDropdownData, setTagDropdownData] = useState<string[]>([...(gameData.tags || [])]);

    const [platforms, setPlatforms] = useState<string[]>(gameData.platforms || []);
    const [platformDropdownOpen, setPlatformDropdownOpen] = useState<boolean>(false);
    const [platformDropdownData, setPlatformDropdownData] = useState<string[]>([...(gameData.platforms || [])]);
    const [platformSearch, setPlatformSearch] = useState<string>("");

    

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const t = await fetch(`${API_BASE}/tag/`);
                if (t.ok) {
                    const tags = await t.json();
                    const names = Array.isArray(tags) ? tags.map((x: TagAndPlatform) => x.name) : [];
                    setTagDropdownData(Array.from(new Set([...(gameData.tags || []), ...names])));
                }

                const p = await fetch(`${API_BASE}/platform/`);
                if (p.ok) {
                    const plats = await p.json();
                    const names = Array.isArray(plats) ? plats.map((x: TagAndPlatform) => x.name) : [];
                    setPlatformDropdownData(Array.from(new Set([...(gameData.platforms || []), ...names])));
                }
            } catch (err) {

            }
        };

        fetchLists();
    }, [gameData.tags, gameData.platforms]);

    const [startDate, setStartDate] = useState<string>(gameData.start_date || "");
    const [releaseDate, setReleaseDate] = useState<string>(gameData.release_date || "");

    // Changelogs
    const initialChangelogs = (gameData.changelogs || []).map((c) => ({
        version: c.version,
        date: c.date,
        description: c.description,
    }));
    const [changelogLst, setChangelogLst] = useState(initialChangelogs);
    const initialChangelogsRef = { current: initialChangelogs } as { current: typeof initialChangelogs };

    const [version, setVersion] = useState("");
    const [clDate, setClDate] = useState("");
    const [ clDescription, setClDescription] = useState("");

    const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
    const [newCoverPreview, setNewCoverPreview] = useState<string | null>(null);

    const [newPhotos, setNewPhotos] = useState<File[] | null>(null);
    const [newPhotoPreviews, setNewPhotoPreviews] = useState<string[]>([]);

    const [newVideos, setNewVideos] = useState<File[] | null>(null);
    const [newVideoPreviews, setNewVideoPreviews] = useState<string[]>([]);

    const [photosToDelete, setPhotosToDelete] = useState<string[]>([]);
    const [videosToDelete, setVideosToDelete] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const addChangelog = () => {
        if (!version || !clDate || !clDescription) return;

        const newLog = { version, date: clDate, description: clDescription };
        setChangelogLst([...changelogLst, newLog]);

        setVersion("");
        setClDate("");
        setClDescription("");
    };

    const removeLog = (indexToRemove: number) => {
        setChangelogLst(changelogLst.filter((_, index) => index !== indexToRemove));
    };

    const addTag = (tag: string) => {
        if (!selectedTags.includes(tag)) setSelectedTags([...selectedTags, tag]);
        setTagDropdownOpen(false);
    };

    const removeTag = (tag: string) => {
        setSelectedTags(selectedTags.filter((t) => t !== tag));
    };

    const addPlatform = (val?: string) => {
        const v = (val ?? platformSearch ?? "").trim();
        if (!v) return;
        if (!platforms.includes(v)) setPlatforms([...platforms, v]);
        setPlatformSearch("");
        setPlatformDropdownOpen(false);
    };

    const removePlatform = (plat: string) => {
        setPlatforms((prev) => prev.filter((p) => p !== plat));
    };

    useEffect(() => {
        return () => {
            if (newCoverPreview) URL.revokeObjectURL(newCoverPreview);
            newPhotoPreviews.forEach((u) => URL.revokeObjectURL(u));
            newVideoPreviews.forEach((u) => URL.revokeObjectURL(u));
        };
    }, [newCoverPreview, newPhotoPreviews, newVideoPreviews]);


    const handleNewCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        if (newCoverPreview) URL.revokeObjectURL(newCoverPreview);
        setNewCoverFile(f);
        setNewCoverPreview(f ? URL.createObjectURL(f) : null);
    };

    const handleNewPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;
        const urls = files.map((f) => URL.createObjectURL(f));
        setNewPhotos((prev) => (prev ? [...prev, ...files] : files));
        setNewPhotoPreviews((prev) => [...prev, ...urls]);
    };

    const handleNewVideosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length === 0) return;
        const urls = files.map((f) => URL.createObjectURL(f));
        setNewVideos((prev) => (prev ? [...prev, ...files] : files));
        setNewVideoPreviews((prev) => [...prev, ...urls]);
    };

    const removeNewPhotoAt = (index: number) => {
        if (!newPhotos) return;
        const newFiles = [...newPhotos];
        newFiles.splice(index, 1);
        const newUrls = [...newPhotoPreviews];
        const removed = newUrls.splice(index, 1);
        removed.forEach((u) => URL.revokeObjectURL(u));
        setNewPhotos(newFiles.length ? newFiles : null);
        setNewPhotoPreviews(newUrls);
    };

    const removeNewVideoAt = (index: number) => {
        if (!newVideos) return;
        const newFiles = [...newVideos];
        newFiles.splice(index, 1);
        const newUrls = [...newVideoPreviews];
        const removed = newUrls.splice(index, 1);
        removed.forEach((u) => URL.revokeObjectURL(u));
        setNewVideos(newFiles.length ? newFiles : null);
        setNewVideoPreviews(newUrls);
        setNewVideoPreviews(newUrls);
    };

    const togglePhotoDelete = (path: string) => {
        setPhotosToDelete((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]));
    };

    const toggleVideoDelete = (path: string) => {
        setVideosToDelete((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]));
    };

    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:8000";

    const toAbsolute = (src?: string | null) => {
        if (!src) return "";
        if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("//")) return src;
        return `${API_BASE}${src.startsWith("/") ? "" : "/"}${src}`;
    };

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true);

        const changedChangelogs = (() => {
            const a = initialChangelogsRef.current;
            const b = changelogLst;
            if (a.length !== b.length) return b;
            for (let i = 0; i < a.length; i++) {
                if (a[i].version !== b[i].version || a[i].date !== b[i].date || a[i].description !== b[i].description) return b;
            }
            return undefined;
        })();

        const bodyObj: Partial<GameInput> = {
            title,
            description,
            type: typeVal,
            start_date: startDate && startDate.length ? startDate : null,
            release_date: releaseDate && releaseDate.length ? releaseDate : null,
            repository_link: repository,
            status,
            tags: selectedTags,
            platforms: platforms,
        };

        if (changedChangelogs !== undefined) bodyObj.changelogs = changedChangelogs;

        const form = new FormData();
        form.append("body", JSON.stringify(bodyObj));

        if (newCoverFile) form.append("cover_img", newCoverFile);
        if (newPhotos) newPhotos.forEach((f) => form.append("photos", f));
        if (newVideos) newVideos.forEach((f) => form.append("videos", f));

        if (photosToDelete.length) form.append("photos_to_delete", photosToDelete.join(","));
        if (videosToDelete.length) form.append("videos_to_delete", videosToDelete.join(","));

        try {
            const res = await fetch(`${API_BASE}/games/${gameData.id}`, {
                method: "PUT",
                body: form,
            });

            if (res.ok) {
                setScreen("home");
                return;
            } else {
                const text = await res.text();
                alert("Failed to update game: " + text);
            }
        } catch (err) {
            alert("Network error: " + String(err));
        } finally {
            setLoading(false);
        }
    };


    return (
        <form className="flex flex-col gap-6 font-title" onSubmit={handleUpdate}>
            <span onClick={() => setScreen("home")} className="mb-4 flex items-center gap-1 text-sm text-admintitle font-body font-semibold cursor-pointer">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-left"
                >
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>

                Back to the Game List
            </span>

            <div>
                <label className="text-admintitle">Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter game title..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter game description..."
                    className="input-style h-24"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Repository (Optional)</label>
                <input
                    value={repository}
                    onChange={(e) => setRepository(e.target.value)}
                    placeholder="Enter game repository..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Status</label>
                <input
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter the game status..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Type (Optional)</label>
                <input
                    value={typeVal}
                    onChange={(e) => setTypeVal(e.target.value)}
                    placeholder="Enter game type..."
                    className="input-style"
                />
            </div>

            <div>
                <label className="text-admintitle">Game Tags</label>
                <div className="dropdown-input flex items-center" onClick={() => setTagDropdownOpen(!tagDropdownOpen)}>
                    <div id="tag-container" className="flex gap-2">
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
                                        className="cursor-pointer hover:opacity-80 "
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
                            return (
                                <p key={data} onClick={() => addTag(data)} className="hover:bg-gray-100 p-1 cursor-pointer">
                                    {data}
                                </p>
                            );
                        })}
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

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`ml-auto transition ${platformDropdownOpen ? "rotate-180" : ""}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>

                {platformDropdownOpen && (
                    <div className="bg-white rounded-xl shadow-lg mt-2 p-3 flex flex-col gap-2">
                        <div className="flex flex-col max-h-40 overflow-auto">
                            {platformDropdownData.length ? (
                                platformDropdownData.map((p) => (
                                    <p key={p} onClick={() => addPlatform(p)} className="hover:bg-gray-100 p-1 cursor-pointer">
                                        {p}
                                    </p>
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
                    <input
                        className="input-style"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className="w-[48%]">
                    <label className="text-admintitle">Release Date  (Optional)</label>
                    <input
                        className="input-style"
                        type="date"
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
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
                    accept="image/*"
                    onChange={handleNewCoverChange}
                />

                {/* existing cover from backend */}
                {gameData.cover_img_path && !newCoverPreview && (
                    <div className="mt-2">
                        <Image src={toAbsolute(gameData.cover_img_path)} unoptimized alt="cover" width={160} height={160} className="object-cover rounded" />
                    </div>
                )}

                {/* new cover preview */}
                {newCoverPreview && (
                    <div className="mt-2">
                        <Image src={newCoverPreview} unoptimized alt="new cover" width={160} height={160} className="object-cover rounded" />
                    </div>
                )}
            </div>

            <div>
                <label className="text-admintitle">Game Photos</label>
                <input
                    placeholder="Upload your game photo..." 
                    className="file-input"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleNewPhotosChange}
                />

                {/* existing photos with toggle delete */}
                {gameData.photos && gameData.photos.length > 0 && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                        {gameData.photos.map((p) => (
                            <div key={p} className={`relative ${photosToDelete.includes(p) ? "opacity-50" : ""}`}>
                                <Image src={toAbsolute(p)} unoptimized alt="existing-photo" width={112} height={112} className="object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => togglePhotoDelete(p)}
                                    className="absolute -top-2 -right-2 w-6 h-6 text-lg rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
                                    aria-label="Toggle delete photo"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* new photo previews */}
                {newPhotoPreviews.length > 0 && (
                    <div className="mt-4 flex gap-2 flex-wrap">
                        {newPhotoPreviews.map((src, i) => (
                            <div key={src} className="relative">
                                <Image src={src} unoptimized alt={`new-photo-${i}`} width={112} height={112} className="object-cover rounded" />
                                <button
                                    type="button"
                                    onClick={() => removeNewPhotoAt(i)}
                                    className="absolute -top-2 -right-2 w-6 h-6 text-lg rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg"
                                    aria-label="Remove new photo"
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
                <input
                    placeholder="Upload your game video..."
                    className="file-input"
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleNewVideosChange}
                />

                {/* existing videos with toggle delete */}
                {gameData.videos && gameData.videos.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2">
                        {gameData.videos.map((v) => {
                            const name = v.split("/").pop() || v;
                            return <ListItem key={v} title={name} onRemove={() => toggleVideoDelete(v)} />;
                        })}
                    </div>
                )}

                {/* new video previews */}
                {newVideos && newVideos.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                        {newVideos.map((f, i) => (
                            <ListItem key={`${f.name}-${i}`} title={f.name} onRemove={() => removeNewVideoAt(i)} />
                        ))}
                    </div>
                )}
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
                        type="date"
                        value={clDate}
                        onChange={(e) => setClDate(e.target.value)}
                        placeholder="Date"
                        className="input-style"
                    />

                    <input
                        value={clDescription}
                        onChange={(e) => setClDescription(e.target.value)}
                        placeholder="Description"
                        className="input-style"
                    />
                </div>

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

            <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Saving..." : "UPDATE"}
            </button>

        </form>
    );
}
