import type { Comment, Story } from '@/lib/hacker-news-api'

export interface CommentItemProps {
  comment: Comment
  depth: number
}

export interface CommentTreeProps {
  commentId: number
  depth: number
}

export interface StoryDetailProps {
  story: Story
  comments: Comment[]
}
