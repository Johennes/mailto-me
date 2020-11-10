(async () => {
    let settings = await requestSettings()

    let link = getLink(settings)
    let article = getArticle(settings)
    let body = getBody(settings, link, article)

    let mailto = getMailtoHref(settings, body)

    copyHtmlToClipboardIfNeeded(settings, body)

    window.location.href = mailto

    function requestSettings() {
        return new Promise((resolve, reject) => {
            let port = browser.runtime.connect()
            port.onMessage.addListener(function(message) {
                resolve(message)
                port.disconnect()
            })
            port.postMessage({})
        })
    }

    function getLink(settings) {
        if (!settings.includeLink) {
            return null
        }
        if (settings.format === "plain-text") {
            return window.location.href
        } else if (settings.format === "html") {
            return `<a href="${window.location.href}">${window.location.href}</a>`
        } else {
            return null
        }
    }

    function getArticle(settings) {
        if (!settings.includeArticle) {
            return null
        }
        let article = new Readability(document.cloneNode(true)).parse()
        let content = `<h1>${article.title}</h1>${article.content}`
        if (settings.format === "plain-text") {
            let turndownService = new TurndownService()
            return turndownService.turndown(content)
        } else if (settings.format === "html") {
            return content
        } else {
            return null
        }
    }

    function getBody(settings, link, article) {
        let body = ""
        if (link !== null) {
            body += link
        }
        if (article !== null) {
            if (body.length > 0 && settings.format === "plain-text") {
                body += "\n\n"
            }
            body += article
        }
        return body
    }

    function getMailtoHref(settings, body) {
        let href = `mailto:${encodeURIComponent(settings.recipient)}?subject=${encodeURIComponent(document.title)}`
        if (settings.format === "plain-text") {
            href += `&body=${encodeURIComponent(body)}`
        } else if (settings.format === "html" && settings.htmlVariant === "body") {
            href += `&html-body=${encodeURIComponent(body)}`
        }
        return href
    }

    function copyHtmlToClipboardIfNeeded(settings, html) {
        if (settings.format !== "html" || settings.htmlVariant !== "copy") {
            return
        }
        function onCopy(event) {
            event.preventDefault()
            event.clipboardData.setData("text/html", html)
            document.removeEventListener("copy", onCopy)
        };
        document.addEventListener("copy", onCopy)
        document.execCommand("copy")
    }
})()