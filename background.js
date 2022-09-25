(() => {
    browser.browserAction.onClicked.addListener(handleBrowserAction)
    
    toggleContextMenu()
    browser.storage.sync.onChanged.addListener(async () => {
        await toggleContextMenu()
    })
    
    async function handleBrowserAction() {
        let settings = await loadSettings()
    
        await loadDependencyIfNeeded("browser-polyfill.js", "browser")

        if (settings.includeArticle) {
            await loadDependencyIfNeeded("Readability.js", "Readability")
            await loadDependencyIfNeeded("turndown.js", "TurndownService")
        }
    
        postOnceIfRequested(settings)
        browser.tabs.executeScript({file: "content.js"});
    }
    
    async function toggleContextMenu() {
        let settings = await loadSettings()
    
        if (settings.contextMenu) {
            browser.contextMenus.create({
                id: "main",
                command: "_execute_browser_action",
                title: "mailto:me"
            })
        } else {
            await browser.contextMenus.removeAll()
        }
    }
    
    async function loadSettings() {
        let result = await browser.storage.sync.get(["recipient", "contextMenu", "format", "htmlVariant", "includeLink", "includeArticle"])
        return {
            recipient: result.hasOwnProperty("recipient") ? result.recipient : "",
            contextMenu: result.hasOwnProperty("contextMenu") ? result.contextMenu : true,
            format: result.hasOwnProperty("format") ? result.format : "plain-text",
            htmlVariant: result.hasOwnProperty("htmlVariant") ? result.htmlVariant : "copy",
            includeLink: result.hasOwnProperty("includeLink") ? result.includeLink : true,
            includeArticle: result.hasOwnProperty("includeArticle") ? result.includeArticle : true
        }
    }
    
    async function loadDependencyIfNeeded(file, identifier) {
        if (await identifierExists(identifier)) {
            console.log(`Not loading ${file} because ${identifier} already exists`)
            return false
        }
        await browser.tabs.executeScript({file: file})
        if (await identifierExists(identifier)) {
            console.log(`Loaded ${file}`)
            return true
        }
        throw `Failed to load ${file}`
    }
    
    async function identifierExists(identifier) {
        let results = await browser.tabs.executeScript({
            code: `typeof ${identifier} !== "undefined" && ${identifier} !== null`
        })
        return results[0]
    }
    
    function postOnceIfRequested(object) {
        function onConnect(port) {
            browser.runtime.onConnect.removeListener(onConnect)
            function onMessage(message) {
                port.onMessage.removeListener(onMessage)
                port.postMessage(object)
            }
            port.onMessage.addListener(onMessage)
        }
        browser.runtime.onConnect.addListener(onConnect)
    }    
})()
