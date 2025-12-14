import type { Story } from '@/lib/hacker-news-api'

export interface ShellLayoutProps {
  children: React.ReactNode
}

export interface StorySidebarProps {
  stories: Story[]
  isLoading?: boolean
}
