type GameChangelog = {
    id: number,
    game_id: number,
    version: string,
    description: string,
    date: string
}

export type Game = {
  id: number
  title: string
  description: string
  download_path: string
  cover_img_path: string
  type: string
  start_date: string
  release_date: string
  status: string
  repository_link? : string
  
  tags: string[]
  platforms: string[]

  photos: string[]
  videos: string[]

  changelogs: GameChangelog[]
}