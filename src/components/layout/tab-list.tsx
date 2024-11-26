import { Table, TableBody, TableCell, TableRow } from "@ui/table";
import { ScrollArea } from "@ui/scroll-area";
import { Switch } from "@ui/switch";
import { Spinner } from "@/components/ui/spinner";
import { handleImageError } from "@/lib/utils";
import { useTabs } from "@/providers/tabs-hook";

export const TabList = () => {
  const tabsContext = useTabs();

  if (!tabsContext) {
    throw new Error("TabsContext must be used within a TabsProvider");
  }

  const { tabs, loader, togglePinStatus } = tabsContext;

  return (
    <div className="flex overflow-hidden grow align-middle justify-center m0 p0 dark:bg-zinc-700">
      {loader ? (
        <Spinner />
      ) : (
        <ScrollArea className="rounded-md border flex overflow-hidden p-3 grow m-3">
          <Table>
            <TableBody>
              {tabs.map((tab, index) => (
                <TableRow key={index} className="flex">
                  <TableCell>
                    <img
                      alt="tabIcon"
                      src={tab.favIconUrl}
                      onError={handleImageError}
                      className="w-[32px] h-[32px]"
                    />
                  </TableCell>
                  <TableCell className="flex-1">{tab.title}</TableCell>
                  <TableCell>
                    <Switch
                      id="{tab.index}"
                      checked={tab.pinned && tab.handled}
                      onClick={() => togglePinStatus(tab.id)}
                    />
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
