import { CardTitle, CardDescription } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Skeleton } from './ui/skeleton'

type UserProfileProps = {
  name: string
  avatarUrl: string
  bio?: string
  loading?: boolean
}

export function UserProfile({
  name,
  avatarUrl,
  bio,
  loading,
}: UserProfileProps) {
  if (loading) {
    return (
      <div className="flex">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="ml-2 flex flex-col justify-center">
          <Skeleton className="h-4 w-32 rounded-sm mb-1" />
          <Skeleton className="h-4 w-28 rounded-sm" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex">
      <Avatar>
        <AvatarImage src={avatarUrl} alt="Avatar" />
      </Avatar>
      <div className="ml-2 flex flex-col justify-center">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{bio}</CardDescription>
      </div>
    </div>
  )
}
