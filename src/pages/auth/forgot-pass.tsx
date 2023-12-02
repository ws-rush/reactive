import { Trans } from "@lingui/macro";
import { createStore, useStore } from "zustand";
import { extra } from "./computed";

const store = createStore(extra((set) => ({
  count: 0,
  actions: {
    inc() {
      set((state) => ({ count: state.count + 1 }))
    }
  },
  computed: (state) => ({
    get doubled() {
      return state.count * 2
    },
    twice: state.count * 2
  }),
  // TODO: add queries
  // queries: {
  //   users: async () => {
  //     return {
  //       name: 'chris'
  //     }
  //   }
  // }
})
))

const { inc } = store.getState().actions

export default function Component() {
  const double = useStore(store, (state) => state.doubled)
  return <h1><Trans>forgot password, {double}</Trans>
  <button type="button" onClick={inc}>inc</button>
  </h1>
}