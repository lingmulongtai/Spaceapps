"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import ExplorerDevTools from "@/components/devtools/ExplorerDevTools";

type Props = {
  children: ReactNode;
};

export default function ExplorerQueryProvider({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" ? <ExplorerDevTools /> : null}
    </QueryClientProvider>
  );
}

