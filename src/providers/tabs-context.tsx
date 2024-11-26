import { ChromeTab } from "@/services/tab-service";
import { createContext } from "react";

interface TabsContextType {
  tabs: ChromeTab[];
  loader: boolean;
  togglePinStatus: (tabId: number | undefined) => Promise<void>;
  reloadTabs: () => Promise<void>;
  deleteTabs: () => Promise<void>;
}

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);
