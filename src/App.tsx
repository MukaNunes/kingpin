import "./App.css";
import { Header } from "./components/layout/header";
import { ThemeProvider } from "./components/theme-provider";
import { TabList } from "./components/layout/tab-list";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <TabList />
    </ThemeProvider>
  );
}

export default App;
