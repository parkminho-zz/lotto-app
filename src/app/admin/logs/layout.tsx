// src/app/admin/logs/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";

export default function LogsLayout({ children }: { children: ReactNode }) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";

  const menu = [
    { label: "대쉬보드", href: "/admin/logs/summary" },
    { label: "로그인 이력", href: "/admin/logs/login-history" },
    { label: "로또 클릭 이력", href: "/admin/logs/lotto-click" },
    { label: "페이지 방문 이력", href: "/admin/logs/page-visit" },
  ];

  return (
    <div className="flex">
      <aside className="pt-25 w-64 border-r p-6 bg-gray-50 min-h-screen">
        <h2 className="text-xl font-bold mb-6">📁 로그 관리</h2>
        <ul className="space-y-3">
          {menu.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`block px-4 py-2 rounded hover:bg-gray-200 ${
                  pathname === href ? "bg-gray-200 font-semibold" : ""
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 pt-20 min-h-screen">{children}</div>
    </div>
  );
}
