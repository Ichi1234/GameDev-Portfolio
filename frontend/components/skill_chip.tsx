import { CoreSkills } from "@/types/core_skill";

type Props = {
  core_skill : CoreSkills
};

export default function SkillChip(skill : Props) {
    return (
        <div className="bg-[#272321] inline border-2 border-[#2b2826] p-4 rounded-xl">
            <h3 className="text-white font-title">{skill.core_skill.text}</h3>
            <p className="text-textsubcolor">{skill.core_skill.description}</p>
        </div>
    );
}