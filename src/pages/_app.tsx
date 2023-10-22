// optional page, can used as layout or for protect

export default function Component() {
  const [mode] = useMode()

  console.log(mode)
  return (
    <div className="">
      <Outlet />
    </div>
  )
}