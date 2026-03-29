import { SidebarItemsProps } from "./SidebarItem/SidebarItem.types"
import { Home, Settings } from "lucide-react"

export const sidebarRoutes: SidebarItemsProps[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home size={18} />
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: <Settings size={18} />
    },
]