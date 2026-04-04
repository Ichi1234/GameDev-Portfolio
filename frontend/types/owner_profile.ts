import { CoreSkills } from "./core_skill"

export type OwnerProfile = {
    id: number,
    portfolio_title: string,
    main_quote: string,
    sub_quote: string,
    introduction: string,
    github_link: string,
    current_focus: string[],
    core_skills: CoreSkills[]
}
