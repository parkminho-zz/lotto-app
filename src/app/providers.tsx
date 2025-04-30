'use client';

import { SessionCheck } from '@/components/SessionCheck';
import { SessionProvider, } from 'next-auth/react';
import { ReactNode,  } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SessionCheck>{children}</SessionCheck>
    </SessionProvider>
  );
}
