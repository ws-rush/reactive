export const loader = authGuard('admin')

export function Component() {
  return <h1>For admins only</h1>
}
