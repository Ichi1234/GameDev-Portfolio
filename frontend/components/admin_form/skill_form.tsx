import { useState, useEffect } from "react";
import ListItem from "../ListItem";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SkillForm() {
    const [skillData, setSkillData] = useState<{ id: number; name: string; description?: string }[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${API_BASE}/skill/`)
            .then((res) => res.json())
            .then((data) => {
                if (!data || data.error) return;
                setSkillData(data);
            })
            .catch(() => {
            });
    }, []);


    const addSkill = () => {
        setLoading(true);
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers: Record<string,string> = { "Content-Type": "application/json" };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        fetch(`${API_BASE}/skill/`, {
            method: "POST",
            headers,
            body: JSON.stringify({ name, description }),
        })
            .then((res) => res.json())
            .then((data) => {
                setSkillData((prev) => [...prev, { id: data.id, name: data.name, description: data.description }]);
                setName("");
                setDescription("");
            })
            .catch(() => {
                const newSkill = {
                    id: skillData.length > 0 ? skillData[skillData.length - 1].id + 1 : 1,
                    name: name,
                    description: description,
                };

                setSkillData([...skillData, newSkill]);
                setName("");
                setDescription("");
            })
            .finally(() => setLoading(false));

    }

    const handleRemove = (skillID : number) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        const headers: Record<string,string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        fetch(`${API_BASE}/skill/${skillID}`, { method: "DELETE", headers })
            .then((res) => res.json())
            .then(() => {
                setSkillData((prev) => prev.filter((skill) => skill.id !== skillID));
            })
            .catch(() => {
                setSkillData((prev) => prev.filter((skill) => skill.id !== skillID));
            });
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

            <div>
                <label className="text-admintitle">Description</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter skill description..."
                    className="input-style"
                />                
            </div>

            <button type="button" onClick={addSkill} className="btn-primary" disabled={loading}>
                {loading ? "Adding..." : "ADD"}
            </button>

            <h2 className="font-title font-bold text-admintitle text-xl">Skill List</h2>

            <div>
                {skillData.map((skill) => {
                    return (
                        <ListItem
                            key={skill.id}
                            title={skill.name}
                            onRemove={() => handleRemove(skill.id)}
                        />
                    );
                })}
            </div>
        </form>


    );
}