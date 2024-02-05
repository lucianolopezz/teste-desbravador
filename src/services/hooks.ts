import { useQuery } from '@tanstack/react-query'
import { getUserByUsername, getUserRepositoriesByUsername } from './queries'

export function useGetUserByUsername(username: string) {
  return useQuery({
    queryKey: ['users', username],
    queryFn: () => getUserByUsername(username),
    enabled: username.length > 0,
  })
}

export function useGetUserRepositoriesByUsername(
  username: string,
  order?: 'asc' | 'desc',
) {
  return useQuery({
    queryKey: ['user-repos', username, order],
    queryFn: () => getUserRepositoriesByUsername(username),
    enabled: username.length > 0,
    select: (repositories) => {
      if (order === 'asc') {
        return repositories.sort(
          (a, b) => a.stargazers_count - b.stargazers_count,
        )
      } else {
        return repositories.sort(
          (a, b) => b.stargazers_count - a.stargazers_count,
        )
      }
    },
  })
}
