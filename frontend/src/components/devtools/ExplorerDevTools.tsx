"use client";

import { useEffect, useState } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ExplorerDevTools() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}


