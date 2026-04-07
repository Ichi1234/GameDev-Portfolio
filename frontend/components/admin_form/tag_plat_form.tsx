import { useState, useEffect } from "react";
import ListItem from "../ListItem";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function TagPlatForm() {
    type Item = { id: number; name: string };


    const [tagData, setTagData] = useState<Item[]>([]);
    const [platformData, setPlatformData] = useState<Item[]>([]);

    const [name, setName] = useState("");


    const addTag = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        fetch(`${API_BASE}/tag/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmed }),
        })
            .then((res) => res.json())
            .then((data) => {
                const id = data.id ?? (tagData.length > 0 ? tagData[tagData.length - 1].id + 1 : 1);
                const text = data.name ?? trimmed;
                setTagData((prev) => [...prev, { id, name: text }]);
                setName("");
            })
            .catch(() => {
                const nextId = tagData.length > 0 ? tagData[tagData.length - 1].id + 1 : 1;
                const newTag: Item = { id: nextId, name: trimmed };
                setTagData((prev) => [...prev, newTag]);
                setName("");
            });
    }

    const addPlatform = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        fetch(`${API_BASE}/platform/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmed }),
        })
            .then((res) => res.json())
            .then((data) => {
                const id = data.id ?? (platformData.length > 0 ? platformData[platformData.length - 1].id + 1 : 1);
                const text = data.name ?? trimmed;
                setPlatformData((prev) => [...prev, { id, name: text }]);
                setName("");
            })
            .catch(() => {
                const nextId = platformData.length > 0 ? platformData[platformData.length - 1].id + 1 : 1;
                const newPlat: Item = { id: nextId, name: trimmed };
                setPlatformData((prev) => [...prev, newPlat]);
                setName("");
            });
    }

    const handleRemove = (componentType : string, componentID : number) => {
        if (componentType === "tag") {
            fetch(`${API_BASE}/tag/${componentID}`, { method: "DELETE" })
                .then((res) => res.json())
                .then(() => setTagData((prev) => prev.filter((t) => t.id !== componentID)))
                .catch(() => setTagData((prev) => prev.filter((t) => t.id !== componentID)));

            return;
        }

        if (componentType === "platform") {
            fetch(`${API_BASE}/platform/${componentID}`, { method: "DELETE" })
                .then((res) => res.json())
                .then(() => setPlatformData((prev) => prev.filter((p) => p.id !== componentID)))
                .catch(() => setPlatformData((prev) => prev.filter((p) => p.id !== componentID)));

            return;
        }
    }

    useEffect(() => {
        fetch(`${API_BASE}/tag/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) return;
                setTagData(data);
            })
            .catch(() => {});

        fetch(`${API_BASE}/platform/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) return;
                setPlatformData(data);
            })
            .catch(() => {});
    }, []);

    return (
        <form className="flex flex-col gap-6 font-title">
                <div>
                    <label className="text-admintitle">Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter skill name..."
                        className="input-style"
                    />
                </div>

            <div className="flex gap-x-4">
                <button type="button" onClick={addTag} className="btn-primary">
                    ADD TAG
                </button>

                <button type="button" onClick={addPlatform} className="btn-primary">
                    ADD PLATFORM
                </button>
            </div>
            

            <h2 className="font-title font-bold text-admintitle text-xl mt-4">Tag List</h2>

            <div>
                {tagData.map((tag) => (
                    <ListItem
                        key={tag.id}
                        title={tag.name}
                        onRemove={() => handleRemove("tag", tag.id)}
                    />
                ))}
            </div>

            <h2 className="font-title font-bold text-admintitle text-xl mt-6">Platform List</h2>
            <div>
                {platformData.map((plat) => (
                    <ListItem
                        key={plat.id}
                        title={plat.name}
                        onRemove={() => handleRemove("platform", plat.id)}
                    />
                ))}
            </div>
        </form>


    );
}