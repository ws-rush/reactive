import type { Story } from '@/lib/hacker-news-api'

export interface StoryItemProps {
  story: Story
  index: number
}

export interface NewStoriesProps {
  stories: Story[]
  page: number
}
