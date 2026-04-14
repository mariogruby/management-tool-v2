import { currentUser } from "@clerk/nextjs/server";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SidebarRoutes } from "../SidebarRoutes/SidebarRoutes";
import { SidebarUserFooter } from "../SidebarUserFooter/SidebarUserFooter";

export async function AppSidebar() {
  const user = await currentUser();

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarRoutes />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="p-2 border-t">
        {user && (
          <SidebarUserFooter
            name={user.fullName}
            email={user.emailAddresses[0]?.emailAddress ?? ""}
            imageUrl={user.imageUrl ?? null}
          />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
