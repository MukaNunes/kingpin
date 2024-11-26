import { ListRestart, Trash2, Moon, Sun, Undo2 } from "lucide-react";
import logo from "@images/icon-32.png";
import { Button } from "@ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { useTheme } from "@providers/theme-provider";
import { useTabs } from "@/providers/tabs-hook";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

export const Header = () => {
  const { setTheme } = useTheme();
  const tabsContext = useTabs();

  const handleConfirm = async () => {
    await tabsContext?.deleteTabs();
    self.close();
  };

  if (!tabsContext) {
    throw new Error("TabsContext must be used within a TabsProvider");
  }

  async function reloadTabs() {
    await tabsContext?.reloadTabs();
    self.close();
  }

  return (
    <header className="flex items-center overflow-hidden p-3 bg-secondary light:shadow-[#b6b6b6] shadow shadow-b-2 z-50 ">
      <h1 className="flex items-center w-full text-2xl font-bold">
        <img src={logo} alt="Logo" className="mr-2" /> KingPin
      </h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="w-20 mr-2">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="mr-2">
            <Trash2 />
            Clear
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Stored Data Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete all saved tabs?
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              <Undo2 />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={
                "bg-destructive hover:bg-destructive text-destructive-foreground"
              }
            >
              <Trash2 />
              Delete all saved data
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Button className="dark:text-white" onClick={reloadTabs}>
        <ListRestart />
        Restore
      </Button>
    </header>
  );
};
