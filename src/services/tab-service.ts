import ChromeService from "@/services/chrome-service";
import lodash from "lodash";

export type ChromeTab = {
    handled: boolean
} & chrome.tabs.Tab

/**
 * Interface for TabItem
 */
interface TabItem {
    url: string;
    pinned: boolean;
    favIconUrl: string;
    handled: boolean;
}

/**
 * Enumerates the possible storage items keys
*/
enum StorageItems {
    KINGPIN_TABS = "kingPinTabs",
}

export class TabService {
    /**
     * Loads the list of open tabs
     */
    static async getTabs(): Promise<ChromeTab[]> {
        const currentTabs = await ChromeService.getChromeTabs();
        const savedTabs = (await this.getStoredTabs()).map(tab => tab.url);

        return currentTabs
            .filter(tab => tab.title && tab.id && tab.url)
            .map(tab => {
                const handled = tab.url ? savedTabs.includes(tab.url) : false
                return { ...tab, handled: handled } as ChromeTab
            });
    }

    /**
     * Set the pin status and update the tabs on the storage
     */
    static async setChromePinStatus(tabId: number | undefined, pinStatus: boolean): Promise<void> {
        if (!tabId) return;
        await ChromeService.updateChromeTab(tabId, { pinned: pinStatus });
    }

    /**
     * Create a chrome tab
     */
    static async createChromeTab(properties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab> {
        return ChromeService.createChromeTab(properties);
    }


    /**
     * Saves the set of tabs in kingPinTabs chrome storage
     */
    static async saveTabs(tabs: ChromeTab[]): Promise<void> {
        const tabData = tabs
            .filter(tab => tab.pinned && tab.handled)
            .map(tab => lodash.pick(tab, ["url", "pinned", "favIconUrl", "handled"]) as TabItem);

        return ChromeService.setStorageItem(StorageItems.KINGPIN_TABS, tabData);
    }


    /**
     * Set the pin status and update the tabs on the storage
     */
    static async setPinStatus(tabId: number, pinStatus: boolean): Promise<void> {
        await ChromeService.updateChromeTab(tabId, { pinned: pinStatus });
    }

    /**
     * Returns tabs saved in storage
     */
    static async getStoredTabs(): Promise<TabItem[]> {
        const storedTabs = await ChromeService.getStorageItem<TabItem[]>(StorageItems.KINGPIN_TABS);
        return storedTabs ?? [];
    }

    /**
     * Deletes all tabs in storage
     */
    static async deleteTabs(): Promise<void> {
        await ChromeService.deleteStorageItem(StorageItems.KINGPIN_TABS);
    }

}
