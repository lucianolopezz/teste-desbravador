export type NotFound = {
  message: string
}

export type User = {
  name: string
  avatar_url: string
  followers: number
  following: number
  bio: string
  email?: string
}

export type Repository = {
  name: string
  description: string
  stargazers_count: number
  language: string
  html_url: string
}
