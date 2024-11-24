/*global chrome*/
export default class ChromeTools {

    /**
     * Returns an array of open tabs in chrome
     */
    public async getChromeTabs(): Promise<chrome.tabs.Tab[]> {
        if(!chrome.tabs) return [];
        return chrome.tabs.query({});
    }

    /**
     * Creates an chrome tab property
     */
    public async createChromeTab(properties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab> {
        return chrome.tabs.create(properties);
    }

    /**
     * Updates an chrome tab property
     */
    public async updateChromeTab(tabId: number, properties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab> {
        return chrome.tabs.update(tabId, properties);
    }

    /**
     * Returns an storage item from chrome.sync API
     */
    public async getStorageItem<T>(dataItem: string): Promise<T | undefined> {
        if(!chrome.storage) return;
        const storageJson = await chrome.storage.sync.get([ dataItem ]);
        return storageJson[dataItem] ? JSON.parse(storageJson[dataItem]) as T : undefined;
    }

    /**
     * Saves an storage item in chrome.sync API
     */
    public async setStorageItem(dataKey: string, dataItem: unknown): Promise<void> {
        return chrome.storage.sync.set({ [dataKey]: JSON.stringify(dataItem) });
    }

    /**
     * Clears all data on a storage item from chrome.sync API
     */
    public async deleteStorageItem(dataItem: string): Promise<void> {
        return chrome.storage.sync.remove([ dataItem ]);
    }

}
