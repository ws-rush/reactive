export default {
  '*.{js,jsx,ts,tsx}': [
    (files) => {
      const filesString = files.map((file) => `'${file}'`).join(' ')
      return `prettier ${filesString} --check`
    },
    (files) => {
      const filesString = files.map((file) => `'${file}'`).join(' ')
      return `eslint ${filesString}`
    },
    () => 'tsc --noEmit',
  ],
}
