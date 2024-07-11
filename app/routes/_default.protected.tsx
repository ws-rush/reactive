export const clientLoader = authGuard('admin')

export default function Component() {
  return <h1>For admins only</h1>
}
