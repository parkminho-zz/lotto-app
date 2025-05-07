// src/app/admin/logs/layout.tsx
import { ReactNode } from "react";
import { SideBar } from "@/components/SideBar";

export default function LogsLayout({ children }: { children: ReactNode }) {

    return (
        <div className="flex min-h-screen">
          <SideBar/>
          <div className="flex-1 pt-16 pl-60">
            {children}
          </div>
        </div>
      );
}
