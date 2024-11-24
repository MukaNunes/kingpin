import ChromeTools from "@services/chrome-tools";

/**
 * Interface for TabItem
 */
interface TabItem {
    url: string;
    pinned: boolean;
    favIconUrl: string;
}

/**
 * Enumerates the possible storage items keys
 */
enum StorageItems {
    TABS = "pinnedTabs",
}

export class TabsController {

    /**
     * ChromeTools instance
     */
    private readonly chromeTools: ChromeTools;

    /**
     * Opened tabs in chrome
     */
    private currentTabs: chrome.tabs.Tab[] = [];

    /**
     * Tabs saved in storage
     */
    public savedTabs: TabItem[] = [];

    public constructor() {
        this.chromeTools = new ChromeTools();
    }

    /**
     * Execute initialization methods
     */
    public async init(): Promise<this> {
        this.currentTabs = await this.chromeTools.getChromeTabs();
        this.savedTabs = await this.getStoredTabs();

        return this;
    }

    /**
     * Loads the list of open tabs
     */
    public getTabList(): chrome.tabs.Tab[] {
        return this.currentTabs
            .filter(tab => tab.title && tab.id);
    }


    /**
     * Returns tabs saved in storage
     */
    private async getStoredTabs(): Promise<TabItem[]> {
        const tabs = await this.chromeTools.getStorageItem<TabItem[]>(StorageItems.TABS);

        return tabs ?? [];
    }
}
