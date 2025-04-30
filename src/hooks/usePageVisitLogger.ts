"use client";

import { useEffect } from "react";
import useSWRMutation from "swr/mutation";

const logVisit = async (url: string, { arg }: { arg: string }) => {
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ page: arg }),
  });
};

export function usePageVisitLogger(pageName: string) {
  const { trigger } = useSWRMutation("/api/admin/logs/page-visit", logVisit);

  useEffect(() => {
    trigger(pageName);
  }, [pageName, trigger]);
}
