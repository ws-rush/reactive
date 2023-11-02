export type Mode = 'system' | 'light' | 'dark'

export const mode = {
    darkMedia:  window.matchMedia('(prefers-color-scheme: dark)'),
    get value() {
        return (localStorage.getItem('mode') || 'system') as Mode
    },
    set(mode: Mode) {
        if (mode === 'system') {
            localStorage.removeItem('mode')
            this.toggleDark({ matches: this.darkMedia.matches })
            this.darkMedia.addEventListener('change', this.toggleDark)
        } else {
            localStorage.mode = mode
            this.toggleDark({ matches: mode === 'dark' })
            this.darkMedia.removeEventListener('change', this.toggleDark)
        }
    },
    toggleDark({ matches }: { matches: boolean }) {
        document.documentElement.classList.toggle('dark', matches)
    }
}

// initial mode load
mode.set(mode.value)