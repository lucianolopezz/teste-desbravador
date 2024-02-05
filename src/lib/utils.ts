import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatValueWithMagnitudeSuffix(value: number): string {
  const suffixes: string[] = ['', 'k', 'mi', 'bi']

  let magnitude = 0

  while (value >= 1000 && magnitude < suffixes.length - 1) {
    value /= 1000
    magnitude++
  }

  const formattedValue: string = value.toFixed(1).replace(/\.0$/, '')

  const suffix: string = suffixes[magnitude]

  return `${formattedValue}${suffix}`
}
