import type { User } from '@/lib/hacker-news-api'

export interface StoryLinkProps {
  storyId: number
  index: number
}

export interface UserProfileProps {
  user: User
}
