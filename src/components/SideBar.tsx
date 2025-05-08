'use client';

import Link from 'next/link';

const menu = [
  { label: '로또 번호 생성', href: '/lotto/make-lotto' },
  { label: '로또 당첨번호 확인', href: '/lotto/check-lotto' },
  { label: '로또 당첨번호 확인(scroll)', href: '/lotto/scroll-check-lotto' },
];

export function SideBar() {
  return (
    <aside className="fixed top-[74px] left-0 w-64 p-6 border-r bg-gray-50 h-full">
      <h2 className="text-xl font-bold mb-6">📁 메뉴</h2>
      <ul className="space-y-3">
        {menu.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className="block px-4 py-2 rounded hover:bg-gray-200"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
