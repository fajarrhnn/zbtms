import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import React, { JSX } from "react";

interface SidebarItem {
  title: string;
  url: string;
  icon: React.ReactNode;
}

export function AppSidebar({ itemsLink }: { itemsLink: SidebarItem[] }) {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroupLabel>
          Zyrex BurnIn Test Management System
        </SidebarGroupLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemsLink.map(({ title, url, icon }: SidebarItem) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link href={url}>
                      {icon}
                      <span>{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroupLabel>
          &copy; 2025 by
          <Link
            href={"https://github.com/fajarrhnn"}
            target="blank"
            className="text-blue-500 pl-1"
          >
            @fjrrhn
          </Link>
        </SidebarGroupLabel>
      </SidebarFooter>
    </Sidebar>
  );
}
