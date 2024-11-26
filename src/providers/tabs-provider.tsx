import { useEffect, useState } from "react";
import { ChromeTab, TabService } from "@services/tab-service";
import { TabsContext } from "@providers/tabs-context";

export const TabsProvider = (props: React.PropsWithChildren) => {
  const [tabs, setTabs] = useState<ChromeTab[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  function findTabById(tabId?: number): ChromeTab | undefined {
    if (!tabId) return;
    return tabs.find((tab) => tab.id === tabId);
  }

  async function togglePinStatus(tabId: number | undefined) {
    const currentTab = findTabById(tabId);
    if (!tabId || !currentTab) return;

    const pinStatus =
      !currentTab.handled && currentTab.pinned ? true : !currentTab.pinned;

    await TabService.setPinStatus(tabId, pinStatus);

    setTabs((prevTabs) => {
      const updatedTabs = prevTabs.map((tab) =>
        tab.id === tabId ? { ...tab, pinned: pinStatus, handled: true } : tab
      );

      TabService.saveTabs(updatedTabs);
      return updatedTabs;
    });
  }

  async function reloadTabs() {
    const savedTabs = await TabService.getStoredTabs();
    const openedTabs = await TabService.getTabs();

    for (const savedTab of savedTabs) {
      const currentOpenedTab = openedTabs.find(
        (openedTab) => openedTab.url === savedTab.url
      );
      const currentId = currentOpenedTab?.id;

      if (currentOpenedTab && currentId) {
        await TabService.setChromePinStatus(currentId, true);
        continue;
      }

      await TabService.createChromeTab({
        active: false,
        pinned: true,
        url: savedTab.url,
      });
    }

    self.close();
  }

  async function deleteTabs() {
    tabs
      .filter((tab) => tab.id && tab.handled)
      .forEach((tab) => TabService.setChromePinStatus(tab.id, false));
    return TabService.deleteTabs();
  }

  useEffect(() => {
    async function loadData() {
      setLoader(true);
      setTabs(await TabService.getTabs());
      setLoader(false);
    }

    loadData();
  }, []);

  return (
    <TabsContext.Provider
      value={{ tabs, loader, togglePinStatus, reloadTabs, deleteTabs }}
    >
      {props.children}
    </TabsContext.Provider>
  );
};
