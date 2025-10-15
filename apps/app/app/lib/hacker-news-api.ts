const HACKER_NEWS_API_BASE = 'https://hacker-news.firebaseio.com/v0'

export interface Story {
  id: number
  title: string
  url?: string
  score: number
  by: string
  time: number
  descendants?: number
  text?: string
  type: 'story' | 'job' | 'ask' | 'show'
  kids?: number[]
}

export interface Comment {
  id: number
  by?: string
  text?: string
  time: number
  kids?: number[]
  deleted?: boolean
  dead?: boolean
}

export interface User {
  id: string
  created: number
  karma: number
  about?: string
  submitted?: number[]
}

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${HACKER_NEWS_API_BASE}${endpoint}`)
  if (!response.ok) {
    throw new Error(
      `Failed to fetch from Hacker News API: ${response.statusText}`
    )
  }
  return response.json()
}

export async function getStoryIds(
  type: 'top' | 'new' | 'best' | 'ask' | 'show' | 'job' = 'top'
): Promise<number[]> {
  const endpoint = type === 'job' ? '/jobstories.json' : `/${type}stories.json`
  return fetchFromAPI<number[]>(endpoint)
}

export async function getStory(id: number): Promise<Story> {
  return fetchFromAPI<Story>(`/item/${id}.json`)
}

export async function getStories(
  type: 'top' | 'new' | 'best' | 'ask' | 'show' | 'job' = 'top',
  limit: number = 30,
  offset: number = 0
): Promise<Story[]> {
  const storyIds = await getStoryIds(type)
  const limitedIds = storyIds.slice(offset, offset + limit)

  const stories = await Promise.all(limitedIds.map((id) => getStory(id)))

  return stories.filter(Boolean)
}

export function searchStories(stories: Story[], query: string): Story[] {
  if (!query.trim()) return stories

  const searchTerms = query
    .toLowerCase()
    .split(' ')
    .filter((term) => term.length > 0)

  return stories.filter((story) => {
    const searchText =
      `${story.title} ${story.text || ''} ${story.by}`.toLowerCase()
    return searchTerms.every((term) => searchText.includes(term))
  })
}

export async function getComment(id: number): Promise<Comment> {
  return fetchFromAPI<Comment>(`/item/${id}.json`)
}

export async function getComments(commentIds: number[]): Promise<Comment[]> {
  const comments = await Promise.all(commentIds.map((id) => getComment(id)))

  return comments.filter(
    (comment) => comment && !comment.deleted && !comment.dead
  )
}

export async function getUser(id: string): Promise<User> {
  return fetchFromAPI<User>(`/user/${id}.json`)
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp * 1000
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  return 'just now'
}

export function getDomain(url?: string): string {
  if (!url) return ''
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return ''
  }
}
