import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/template/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { headers } from "next/headers";
import { Flame, Upload } from "lucide-react";

export const metadata: Metadata = {
  title: "ZBTMS",
  description: "Zyrex BurnIn Test Management System by @fjrrhn",
};

const items = [
  {
    title: "In Burn Test",
    url: "/",
    icon: <Flame />,
  },
  {
    title: "Completed Burn Test",
    url: "/reported",
    icon: <Upload />,
  },
];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-white`}>
        <SidebarProvider>
          <AppSidebar itemsLink={items} />
          <main className="w-full mx-auto min-h-screen">
            <SidebarTrigger />
            <section className="w-11/12 mx-auto">{children}</section>
          </main>
        </SidebarProvider>
        <Toaster position="top-center" expand={true} richColors />
      </body>
    </html>
  );
}
