/* eslint-disable canonical/sort-keys */

import { defineStore } from 'tawr-state'

export const userStore = defineStore({
  state() {
    return {
      previousNames: new Set<string>(),
      savedName: '',
    }
  },
  getters: {
    otherNames: (state) =>
      Array.from(state.previousNames).filter(
        (name) => name !== state.savedName
      ),
    usedNames: (state) => Array.from(state.previousNames),
  },
  actions: {
    setNewName(name: string) {
      if (userStore.savedName) {
        userStore.previousNames.add(userStore.savedName)
      }

      userStore.savedName = name
    },
  },
})

export const { setNewName } = userStore.actions
