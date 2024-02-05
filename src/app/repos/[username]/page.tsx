'use client'

import { useState } from 'react'

import {
  StarFilledIcon,
  CodeIcon,
  ChevronLeftIcon,
  GitHubLogoIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@radix-ui/react-icons'
import {
  useGetUserByUsername,
  useGetUserRepositoriesByUsername,
} from '@/services'

import { useParams } from 'next/navigation'
import Link from 'next/link'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'
import { UserProfile } from '@/components/UserProfile'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

type Order = 'asc' | 'desc'

export default function Repos() {
  const { username } = useParams<{ username: string }>()
  const [order, setOrder] = useState<Order>('desc')

  const { data: repoList, isLoading: isLoadingRepo } =
    useGetUserRepositoriesByUsername(username, order)
  const { data: user, isLoading: isLoadingUser } =
    useGetUserByUsername(username)

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-4">
      <div className="lg:w-1/2 w-full">
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <div className="flex items-center">
              <ChevronLeftIcon className="w-8 h-8" />
              <p>Voltar</p>
            </div>
          </Link>
          {user && 'name' in user && (
            <UserProfile
              name={user.name}
              avatarUrl={user.avatar_url}
              loading={isLoadingUser}
            />
          )}
        </div>

        {isLoadingRepo &&
          Array(10)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="mb-4">
                <CardHeader>
                  <Skeleton className="h-4 w-[40%] rounded-sm" />
                  <Skeleton className="h-4 w-[30%] rounded-sm mt-1" />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="h-4 w-[20%] rounded-sm" />
                    <Skeleton className="h-4 w-[10%] rounded-sm" />
                  </div>
                </CardContent>
              </Card>
            ))}

        <div className="flex items-center justify-end mb-2">
          <Button
            className={`mr-1 ${order === 'desc' ? 'bg-muted' : ''}`}
            type="button"
            variant="ghost"
            onClick={() => setOrder('desc')}
          >
            <ArrowUpIcon className="w-4 h-4" />
          </Button>
          <Button
            className={order === 'asc' ? 'bg-muted' : ''}
            type="button"
            variant="ghost"
            onClick={() => setOrder('asc')}
          >
            <ArrowDownIcon className="w-4 h-4" />
          </Button>
        </div>

        {repoList?.map((repo) => (
          <Card key={repo.name} className="w- mb-4">
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <CardDescription className="whitespace-normal overflow-hidden">
                {repo.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mt-2">
                <CardDescription className="flex items-center">
                  <CodeIcon className="text-blue-500 mr-1" />
                  {repo.language}
                </CardDescription>
                <div className="flex items-center">
                  <CardDescription>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={repo.html_url} target="_blank">
                          <GitHubLogoIcon className="text-black mr-2" />
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Ir para o repositório</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardDescription>
                  <CardDescription className="flex items-center">
                    <StarFilledIcon className="text-yellow-500 mr-1" />{' '}
                    {repo.stargazers_count}
                  </CardDescription>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
