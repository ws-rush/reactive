import type { Story } from '@/lib/hacker-news-api'

export interface StoryItemProps {
  story: Story
  index: number
}

export interface AskStoriesProps {
  stories: Story[]
  page: number
}
