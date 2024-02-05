import { NotFound, Repository, User } from './types'

const baseUrl = 'https://api.github.com'

export async function getUserByUsername(
  username: string,
): Promise<User | NotFound> {
  const response = await fetch(`${baseUrl}/users/${username}`)
  const json = await response.json()
  return json
}

export async function getUserRepositoriesByUsername(
  username: string,
): Promise<Repository[]> {
  const response = await fetch(`${baseUrl}/users/${username}/repos`)
  const json = await response.json()
  return json
}
