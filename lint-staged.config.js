export default {
  '*.{js,jsx,ts,tsx}': [
    'pnpm format:check',
    'pnpm lint',
    () => 'tsc --noEmit', // notice the empty function parameters and not passing the file list to the command
  ],
}
