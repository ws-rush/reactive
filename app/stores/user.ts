import { create } from 'zustand'

export type UserStore = {
  actions: {
    setNewName: (name: string) => void
  }
  filters: {
    otherNames: () => string[]
    usedNames: () => string[]
  }
  previousNames: Set<string>
  savedName: string
}

export const useUserStore = create<UserStore>((set, get) => ({
  actions: {
    setNewName(name) {
      if (get().savedName) {
        set((state) => ({
          previousNames: new Set([...state.previousNames, name]),
        }))
      }

      set({ savedName: name })
    },
  },
  filters: {
    otherNames: () =>
      Array.from(get().previousNames).filter(
        (name) => name !== get().savedName
      ),
    usedNames: () => Array.from(get().previousNames),
  },
  previousNames: new Set(),
  savedName: '',
}))

export const { setNewName } = useUserStore.getState().actions
