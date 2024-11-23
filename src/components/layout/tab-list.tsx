import logo from "../../../public/images/icon-32.png";
import { useEffect, useState } from "react";
import { TabsController } from "../../lib/tab-controller";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

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
    <div className="flex overflow-hidden grow">
      {loading ? (
        <p>Loading tabs...</p>
      ) : (
        <ScrollArea className="rounded-md border flex overflow-hidden p-3 grow m-3">
          <Table>
            <TableBody>
              {tabs.map((tab, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={tab.favIconUrl || logo} alt="Favicon" />
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
