// src/app/admin/logs/layout.tsx
import { ReactNode } from "react";
import { SideBar } from "@/components/SideBar";
import Footer from "@/components/Footer";

export default function LogsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-9/10">
          <SideBar/>
          {/* <div className="pt-16 pl-60 mb-35"> */}
            <main className="flex-1 pl-60">
              {children}
            </main>
          {/* </div>  */}
          <Footer/>
      </div>
      );
}
