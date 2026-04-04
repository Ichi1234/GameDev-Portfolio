import { useState } from "react";
import ListItem from "../ListItem";

export default function TagPlatForm() {
    type Item = { id: number; name: string };

    const [tagData, setTagData] = useState<Item[]>([]);
    const [platformData, setPlatformData] = useState<Item[]>([]);

    const [name, setName] = useState("");


    const addTag = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const nextId = tagData.length > 0 ? tagData[tagData.length - 1].id + 1 : 1;
        const newTag: Item = { id: nextId, name: trimmed };

        setTagData((prev) => [...prev, newTag]);
        setName("");
    }

    const addPlatform = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const nextId = platformData.length > 0 ? platformData[platformData.length - 1].id + 1 : 1;
        const newPlat: Item = { id: nextId, name: trimmed };

        setPlatformData((prev) => [...prev, newPlat]);
        setName("");
    }

    const handleRemove = (componentType : string, componentID : number) => {
        if (componentType === "tag") {
            setTagData((prev) => prev.filter((t) => t.id !== componentID));
            return;
        }

        if (componentType === "platform") {
            setPlatformData((prev) => prev.filter((p) => p.id !== componentID));
            return;
        }
    }

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
            

            <h2 className="font-title font-bold text-admintitle text-xl mt-4">Skill List</h2>

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