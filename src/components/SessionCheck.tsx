import { signOut, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

export function SessionCheck({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === 'authenticated') {
        const isSessionActive = sessionStorage.getItem('sessionActive');
        if (!isSessionActive) {
          signOut({ callbackUrl: '/' });
        }
      }
    }, [status]);

    return <>{children}</>;
  }