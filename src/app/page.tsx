'use client'

import { useState } from 'react'

import { useGetUserByUsername } from '@/services'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatValueWithMagnitudeSuffix } from '@/lib/utils'
import Link from 'next/link'
import { UserProfile } from '@/components/UserProfile'

const schema = z.object({
  username: z.string().min(1, { message: 'Username é obrigatório' }),
})

export default function Home() {
  const [username, setUsername] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
    },
  })

  const { data, isLoading } = useGetUserByUsername(username)

  const handleSearchUser = handleSubmit((data) => {
    setUsername(data.username)
  })

  return (
    <main className="flex min-h-screen flex-col items-center lg:p-24 p-4">
      <div className="lg:w-1/3 w-full">
        <div className="flex">
          <div className="w-full">
            <Input placeholder="Buscar usuário..." {...register('username')} />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1 pl-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <Button
            loading={isLoading}
            className="ml-2"
            onClick={handleSearchUser}
          >
            Buscar
          </Button>
        </div>

        <div className="mt-6">
          {data && 'message' in data && data.message && (
            <p className="text-red-500 text-xs mt-1 pl-1">
              usuário não encontrado :(
            </p>
          )}

          {data && 'name' in data && (
            <Link href={`/repos/${username}`}>
              <Card className="w- mt-6">
                <CardHeader>
                  <UserProfile
                    name={data.name}
                    avatarUrl={data.avatar_url}
                    bio={data.bio}
                  />
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-2">
                    <CardDescription>
                      Seguidores{' '}
                      <b>
                        {formatValueWithMagnitudeSuffix(data?.followers || 0)}
                      </b>
                    </CardDescription>
                    <CardDescription>
                      Seguindo <b>{data?.following}</b>
                    </CardDescription>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
