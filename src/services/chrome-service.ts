/*global chrome*/
export default class ChromeService {

    /**
     * Returns an array of open tabs in chrome
     */
    static async getChromeTabs(): Promise<chrome.tabs.Tab[]> {
        if (!chrome.tabs) return [];
        return chrome.tabs.query({});
    }

    /**
     * Returns a single tab from opened tabs in chrome
     */
    static async getChromeTabById(tabId: number): Promise<chrome.tabs.Tab> {
        return chrome.tabs.get(tabId);
    }

    /**
     * Update the pin status for a tab
     */
    static async updateChromePinStatus(tabId: number, status: boolean): Promise<void> {
        ChromeService.updateChromeTab(tabId, { pinned: status });
    }

    /**
     * Creates an chrome tab property
     */
    static async createChromeTab(properties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab> {
        return chrome.tabs.create(properties);
    }

    /**
     * Updates an chrome tab property
     */
    static async updateChromeTab(tabId: number, properties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab> {
        return chrome.tabs.update(tabId, properties);
    }

    /**
     * Returns an storage item from chrome.sync API
     */
    static async getStorageItem<T>(dataItem: string): Promise<T | undefined> {
        if (!chrome.storage) return;
        const storageJson = await chrome.storage.sync.get([dataItem]);
        return storageJson[dataItem] ? JSON.parse(storageJson[dataItem]) as T : undefined;
    }

    /**
     * Saves an storage item in chrome.sync API
     */
    static async setStorageItem(dataKey: string, dataItem: unknown): Promise<void> {
        return chrome.storage.sync.set({ [dataKey]: JSON.stringify(dataItem) });
    }

    /**
     * Clears all data on a storage item from chrome.sync API
     */
    static async deleteStorageItem(dataItem: string): Promise<void> {
        return chrome.storage.sync.remove([dataItem]);
    }

}
