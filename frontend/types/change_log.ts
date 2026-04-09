export type ChangeLogInput = {
    version: string;
    date: string;
    description: string;
}

export type GameChangeLog = {
    id : number,
    game_id : number,
    version: string,
    date : string,
    description : string
}
