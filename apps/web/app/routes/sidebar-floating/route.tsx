import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
    SidebarFooter,
} from '@/components/ui/sidebar'
import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    Bell,
    Check,
    Globe,
    Keyboard,
    Link,
    Lock,
    Menu,
    MessageCircle,
    MoreHorizontal,
    Plus,
    Sparkles,
    Users,
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

// Menu items
const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
]

export default function FloatingSidebarPage() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-gray-100 dark:bg-neutral-900">
                <Sidebar variant="floating" className="border-r-0">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton
                                            size="lg"
                                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                        >
                                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black">
                                                <Sparkles className="size-4" />
                                            </div>
                                            <div className="flex flex-col gap-0.5 leading-none">
                                                <span className="font-semibold">Acme Corp</span>
                                                <span className="">v1.0.0</span>
                                            </div>
                                            <MoreHorizontal className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-[--radix-dropdown-menu-trigger-width]"
                                        align="start"
                                    >
                                        <DropdownMenuItem>
                                            <span>Account</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Billing</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <span>Sign out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>

                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className="text-gray-500">Application</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild>
                                                <a href={item.url}>
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.title}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>

                        <SidebarGroup className="mt-auto">
                            <SidebarGroupLabel className="text-gray-500">Help</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <LifeBuoyIcon />
                                            <span>Support</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <SendIcon />
                                            <span>Feedback</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <div className="p-1">
                            <div className="flex items-center gap-2 rounded-md bg-sidebar-accent p-2 text-sm text-sidebar-accent-foreground">
                                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-black shadow-sm">
                                    <Users className="h-4 w-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Pro Team</span>
                                    <span className="truncate text-xs">Used by 12 members</span>
                                </div>
                            </div>
                        </div>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-6">
                        <SidebarTrigger className="" />
                        <Separator orientation="vertical" className="h-4" />
                        <h1 className="text-xl font-bold">Floating Sidebar Example</h1>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* Content Placeholders */}
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="aspect-video rounded-xl bg-white p-6 shadow-sm dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700 flex items-center justify-center text-gray-400">
                                Content Block {i}
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}

function LifeBuoyIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4", props.className)}
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.93 4.93 4.24 4.24" />
            <path d="m14.83 14.83 4.24 4.24" />
            <path d="m14.83 9.17 4.24-4.24" />
            <path d="m14.83 9.17-3.53-3.53" />
            <path d="m4.93 19.07 4.24-4.24" />
            <circle cx="12" cy="12" r="4" />
        </svg>
    )
}

function SendIcon(props: React.ComponentProps<'svg'>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("h-4 w-4", props.className)}
        >
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
        </svg>
    )
}

import { cn } from '@/lib/utils'
