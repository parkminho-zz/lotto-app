// src/app/admin/logs/layout.tsx
import { ReactNode } from "react";
import { SideBar } from "@/components/SideBar";

export default function LogsLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex min-h-screen">
          <SideBar />
          <div className="flex-1 p-6">
            {children}
          </div>
        </div>
      );
}
