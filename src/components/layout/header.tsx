import { ListRestart, Trash2, Moon, Sun } from "lucide-react";
import logo from "@images/icon-32.png";
import { Button } from "@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../theme-provider";

export const Header = () => {
  const { setTheme } = useTheme();

  return (
    <header className="flex items-center overflow-hidden p-3 bg-secondary light:shadow-[#b6b6b6] shadow shadow-b-2 z-50 ">
      <h1 className="flex items-center w-full text-2xl font-bold">
        <img src={logo} alt="Logo" className="mr-2" /> KingPin
      </h1>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="w-20 mr-2">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
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
          </TooltipTrigger>
          <TooltipContent>
            <p>Change between light and dark mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" className="mr-2">
              <Trash2 />
              Clear
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear all pinned tabs</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button>
              <ListRestart />
              Restore
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restore all pinned tabs</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </header>
  );
};
