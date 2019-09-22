(() => {
    browser.pageAction.onClicked.addListener(handlePageAction)

    async function handlePageAction() {
        let settings = await loadSettings()
        console.log(settings)
    
        if (settings.includeArticle) {
            await loadDependencyIfNeeded("Readability.js", "Readability")
        }
    
        if (settings.format == "plain-text") {
            await loadDependencyIfNeeded("turndown.js", "TurndownService")
        }
    
        postOnceIfRequested(settings)
        browser.tabs.executeScript({file: "content.js"});
    }
    
    async function loadSettings() {
        let result = await browser.storage.sync.get(["recipient", "format", "htmlVariant", "includeLink", "includeArticle"])
        return {
            recipient: result.hasOwnProperty("recipient") ? result.recipient : "",
            format: result.hasOwnProperty("format") ? result.format : "plain-text",
            htmlVariant: result.hasOwnProperty("htmlVariant") ? result.htmlVariant : "body",
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
