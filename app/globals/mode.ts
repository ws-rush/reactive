export type Mode = 'system' | 'light' | 'dark'

export const mode = {
  // used for mode event listners
  darkListner({ matches }: { matches: boolean }) {
    document.documentElement.classList.toggle('dark', matches)
  },

  darkMedia: window.matchMedia('(prefers-color-scheme: dark)'),

  get isDark() {
    return this.value === 'system'
      ? this.darkMedia.matches
      : this.value === 'dark'
  },

  get isPreferdDark() {
    return this.darkMedia.matches
  },

  modes: ['system', 'light', 'dark'] as Mode[],

  set(_mode: Mode) {
    if (_mode === 'system') {
      localStorage.removeItem('mode')
      this.darkListner({ matches: this.darkMedia.matches })
      this.darkMedia.addEventListener('change', this.darkListner)
    } else {
      localStorage.mode = _mode
      this.darkListner({ matches: _mode === 'dark' })
      this.darkMedia.removeEventListener('change', this.darkListner)
    }
  },

  toggleColorMode() {
    const currentMode = mode.value
    if (currentMode === 'system' || currentMode === 'dark') mode.set('light')
    else mode.set('dark')
  },
  toggleSystemMode() {
    const modes = mode.modes
    const newMode = modes[(modes.indexOf(mode.value) + 1) % modes.length]
    mode.set(newMode)
  },
  get value() {
    return (localStorage.getItem('mode') || 'system') as Mode
  },
}
