import { useState, useEffect } from "react";
import ListItem from "../ListItem";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function SkillForm() {

    const [skillData, setSkillData] = useState<{ id: number; name: string; description?: string }[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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
        fetch(`${API_BASE}/skill/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
            });

    }

    const handleRemove = (skillID : number) => {
        fetch(`${API_BASE}/skill/${skillID}`, { method: "DELETE" })
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

            <button type="button" onClick={addSkill} className="btn-primary">
                ADD
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