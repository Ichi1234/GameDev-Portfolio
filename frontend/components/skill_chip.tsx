import { CoreSkills } from "@/types/core_skill";

type Props = {
  core_skill : CoreSkills
};

export default function SkillChip(skill : Props) {
    return (
        <div className="bg-[#272321] inline border-2 transition border-[#2b2826] hover:border-primary/40 p-4 rounded-xl">
            <h3 className="text-white font-title text-xs sm:text-base">{skill.core_skill.name}</h3>
            <p className="text-textsubcolor text-[0.60rem] sm:text-xs">{skill.core_skill.description}</p>
        </div>
    );
}