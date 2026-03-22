import { CoreSkills } from "./core_skill"

export type OwnerProfile = {
    id: number,
    portfolio_title: string,
    main_quote: React.ReactNode,
    sub_quote: React.ReactNode,
    introduction: React.ReactNode,
    github_link: string,
    current_focus: string[],
    core_skills: CoreSkills[]
}
