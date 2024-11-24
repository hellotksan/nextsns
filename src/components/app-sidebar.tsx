"use client";

import { Home, UserRound, Users, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAppSelector } from "@/hooks/useSelector";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Profile",
    url: "#",
    icon: UserRound,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "All-Users",
    url: "#",
    icon: Users,
  },
];

export function AppSidebar() {
  const { user } = useAppSelector((state) => state.auth);

  // 動的にURLを変更
  const dynamicItems = items.map((item) => {
    // ホームページ
    if (item.title === "Home") {
      return { ...item, url: "/home" };
    }
    // プロフィールページ
    else if (item.title === "Profile") {
      return {
        ...item,
        url: user ? `/profile?username=${user.username}` : "/login",
      };
    }
    // 設定ページ
    else if (item.title === "Settings") {
      return {
        ...item,
        url: user ? `/setting` : "/login",
      };
    }
    // 全ユーザページ
    else if (item.title === "All-Users") {
      return { ...item, url: "/all-users" };
    }

    return item;
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sidebar Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dynamicItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
