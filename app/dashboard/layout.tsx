import { AppSidebar } from "@/components/template/app-sidebar";
import { Monitor, Search } from "lucide-react";

const items = [
  {
    title: "List Units",
    url: "/dashboard",
    icon: <Monitor />,
  },
  {
    title: "Seacrh Unit",
    url: "/dashboard/search",
    icon: <Search />,
  },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSidebar itemsLink={items} />
      <main className="w-full mx-auto min-h-screen">{children}</main>
    </>
  );
}
