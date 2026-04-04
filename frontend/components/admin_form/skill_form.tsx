import { MockOwnerProfile } from "@/mock/owner_profile";
import { useState } from "react";
import ListItem from "../ListItem";

export default function SkillForm() {
    const [skillData, setSkillData] = useState(MockOwnerProfile.core_skills);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    const addSkill = () => {
        const newSkill = {
            id: skillData.length > 0 ? skillData[skillData.length - 1].id + 1 : 1,
            name: name,
            description: description
        }

        setSkillData([...skillData, newSkill]);
        setName("");
        setDescription("");

    }

    const handleRemove = (skillID : number) => {
        setSkillData(prev =>
            prev.filter(skill => skill.id !== skillID)
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