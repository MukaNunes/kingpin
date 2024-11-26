import { useContext } from "react";
import { TabsContext } from "./tabs-context";

export const useTabs = () => useContext(TabsContext);
