export type Mode = 'system' | 'light' | 'dark';

export const mode = {
  darkMedia: window.matchMedia('(prefers-color-scheme: dark)'),
  set(_mode: Mode) {
    if (_mode === 'system') {
      localStorage.removeItem('mode');
      this.toggleDark({ matches: this.darkMedia.matches });
      this.darkMedia.addEventListener('change', this.toggleDark);
    } else {
      localStorage.mode = _mode;
      this.toggleDark({ matches: _mode === 'dark' });
      this.darkMedia.removeEventListener('change', this.toggleDark);
    }
  },
  toggleDark({ matches }: { matches: boolean }) {
    document.documentElement.classList.toggle('dark', matches);
  },
  get value() {
    return (localStorage.getItem('mode') || 'system') as Mode;
  },
};

// initial mode load
mode.set(mode.value);
