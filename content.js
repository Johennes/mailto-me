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
        return { text: window.location.href, html: `<a href="${window.location.href}">${window.location.href}</a>` }
    }

    function getArticle(settings) {
        if (!settings.includeArticle) {
            return null
        }
        let article = new Readability(document.cloneNode(true)).parse()
        let content = `<h1>${article.title}</h1>${article.content}`
        let turndownService = new TurndownService()
        return { text: turndownService.turndown(content), html: content }
    }

    function getBody(settings, link, article) {
        let body = { text: "", html: "" }
        if (link !== null) {
            body.text += link.text
            body.html += link.html
        }
        if (article !== null) {
            if (body.text.length > 0 && settings.format === "plain-text") {
                body.text += "\n\n"
            }
            body.text += article.text
            body.html += article.html
        }
        return body
    }

    function getMailtoHref(settings, body) {
        let href = `mailto:${encodeURIComponent(settings.recipient)}?subject=${encodeURIComponent(document.title)}`
        if (settings.format === "plain-text") {
            href += `&body=${encodeURIComponent(body.text)}`
        } else if (settings.format === "html" && settings.htmlVariant === "body") {
            href += `&html-body=${encodeURIComponent(body.html)}`
        }
        return href
    }

    function copyHtmlToClipboardIfNeeded(settings, body) {
        if (settings.format !== "html" || settings.htmlVariant !== "copy") {
            return
        }
        const data = [new ClipboardItem({
            "text/html": new Blob([body.html], { type: "text/html" }),
            "text/plain": new Blob([body.text], { type: "text/plain" }),
        })]
        navigator.clipboard.write(data)
    }
})()