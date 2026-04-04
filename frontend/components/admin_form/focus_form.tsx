import { MockOwnerProfile } from "@/mock/owner_profile";
import { useState } from "react";
import ListItem from "../ListItem";

export default function FocusForm() {
    
    const [focusData, setFocusData] = useState(MockOwnerProfile.current_focus);
    const [name, setName] = useState("");
    
    
    const addFocus = () => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const nextId = focusData && focusData.length > 0 ? focusData[focusData.length - 1].id + 1 : 1;

        const newFocus = {
            id: nextId,
            name: trimmed,
        };

        setFocusData([...focusData, newFocus]);
        setName("");
    }

    const handleRemove = (tagID : number) => {
        setFocusData(prev =>
            prev.filter(tag => tag.id !== tagID)
        );
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