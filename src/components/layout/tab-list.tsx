import { useEffect, useState } from "react";
import { TabsController } from "@services/tab-controller";
import { Table, TableBody, TableCell, TableRow } from "@ui/table";
import { ScrollArea } from "@ui/scroll-area";
import { Switch } from "@ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { handleImageError } from "@/lib/utils";

export const TabList = () => {
  const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const tabController = new TabsController();
    async function getTabs() {
      setLoading(true);
      await tabController.init();
      setTabs(tabController.getTabList());
      setLoading(false);
    }

    getTabs();
  }, []);

  return (
    <div className="flex overflow-hidden grow align-middle justify-center m0 p0">
      {loading ? (
        <Spinner />
      ) : (
        <ScrollArea className="rounded-md border flex overflow-hidden p-3 grow m-3">
          <Table>
            <TableBody>
              {tabs.map((tab, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      alt="tabIcon"
                      src={tab.favIconUrl}
                      onError={handleImageError}
                      className="w-[32px] h-[32px]"
                    />
                  </TableCell>
                  <TableCell>{tab.title}</TableCell>
                  <TableCell>
                    <Switch id="airplane-mode" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </div>
  );
};
