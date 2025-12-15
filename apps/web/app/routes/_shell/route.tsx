import { Outlet } from 'react-router'
import { MainHeader } from './components/MainHeader'
import { MobileNav } from './components/MobileNav'
import Page from '../sidebar-floating/route'

export default function ShellLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden pl-65">

      <Page />
    </div>
  )
}
