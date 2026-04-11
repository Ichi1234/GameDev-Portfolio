import { CoreSkills } from "./core_skill"
import { Focuses } from "./focus"

export type OwnerProfile = {
    name: string,
    main_quote: string,
    sub_quote: string,
    introduction: string,
    github_link: string,
    current_focus: Focuses[],
    core_skills: CoreSkills[]
}
