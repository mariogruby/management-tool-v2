import { SidebarItemsProps } from "./SidebarItem/SidebarItem.types"
import { Home } from "lucide-react"

export const sidebarRoutes: SidebarItemsProps[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home size={18} />
    },
]