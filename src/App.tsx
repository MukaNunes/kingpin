import "./App.css";
import { Header } from "@layout/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { TabList } from "@layout/tab-list";
import { TabsProvider } from "@providers/tabs-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TabsProvider>
        <Header />
        <TabList />
      </TabsProvider>
    </ThemeProvider>
  );
}

export default App;
