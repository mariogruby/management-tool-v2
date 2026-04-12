import { SidebarItemsProps } from "./SidebarItem/SidebarItem.types"
import { CalendarDays, Home } from "lucide-react"

export const sidebarRoutes: SidebarItemsProps[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home size={18} />
    },
    {
        label: "Calendario",
        href: "/dashboard/calendar",
        icon: <CalendarDays size={18} />
    },
]