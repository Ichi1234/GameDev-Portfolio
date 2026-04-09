import { GameChangeLog, ChangeLogInput } from "./change_log"

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

  changelogs: GameChangeLog[]
}

export type GameInput = {
  title?: string
  description?: string
  download_path?: string
  cover_img_path?: string
  type?: string
  start_date?: string | null
  release_date?: string | null
  status?: string
  repository_link?: string

  tags?: string[]
  platforms?: string[]

  photos?: string[]
  videos?: string[]

  changelogs?: ChangeLogInput[]
}