import { useState, useEffect } from "react";
import ListItem from "../ListItem";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function FocusForm() {

    const [focusData, setFocusData] = useState<{ id: number; name: string }[]>([]);
    const [name, setName] = useState("");
    
    
    const addFocus = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        fetch(`${API_BASE}/focus/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: trimmed }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFocusData((prev) => [...prev, { id: data.id, name: data.name }]);
                setName("");
            })
            .catch(() => {
                const nextId = focusData && focusData.length > 0 ? focusData[focusData.length - 1].id + 1 : 1;
                const newFocus = { id: nextId, name: trimmed };
                setFocusData([...focusData, newFocus]);
                setName("");
            });
    }

    const handleRemove = (tagID : number) => {
        fetch(`${API_BASE}/focus/${tagID}`, { method: "DELETE" })
            .then((res) => res.json())
            .then(() => {
                setFocusData((prev) => prev.filter((tag) => tag.id !== tagID));
            })
            .catch(() => {
                setFocusData((prev) => prev.filter((tag) => tag.id !== tagID));
            });
    }

    useEffect(() => {
        fetch(`${API_BASE}/focus/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) return;
                setFocusData(data);
            })
            .catch(() => {
                // keep empty
            });
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

            <button type="button" onClick={addFocus} className="btn-primary">
                ADD
            </button>

            <h2 className="font-title font-bold text-admintitle text-xl">Focus List</h2>
            
            <div>
                {focusData.map((focus) => {
                    return (
                        <ListItem
                            key={focus.id}
                            title={focus.name}
                            onRemove={() => handleRemove(focus.id)}
                        />
                    );
                })}
            </div>
        </form>
    );
}