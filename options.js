(() => {
    document.addEventListener("DOMContentLoaded", () => {
        restoreRecipientOption()
        restoreContextMenuOption()
        restoreFormatOption()
        restoreHtmlVariantOption()
        restoreIncludeLinkOption()
        restoreIncludeArticleOption()
    })

    document.querySelector("input[name=recipient]").addEventListener("change", storeRecipientOption)

    document.querySelector("input[name=context-menu]").addEventListener("change", storeContextMenuOption)

    document.querySelectorAll("input[name=format]").forEach((radiobutton) => {
        radiobutton.addEventListener("change", storeFormatOption)
    })

    document.querySelectorAll("input[name=html-variant]").forEach((radiobutton) => {
        radiobutton.addEventListener("change", storeHtmlVariantOption)
    })

    document.querySelector("input[name=include-link]").addEventListener("change", storeIncludeLinkOption)
    document.querySelector("input[name=include-article]").addEventListener("change", storeIncludeArticleOption)

    function storeRecipientOption() {
        browser.storage.sync.set({
            recipient: document.querySelector(`input[name=recipient]`).value
        })
    }

    function restoreRecipientOption() {
        browser.storage.sync.get("recipient").then((result) => {
            let recipient = result.hasOwnProperty("recipient") ? result.recipient : ""
            document.querySelector(`input[name=recipient]`).value = recipient
        })
    }

    function storeContextMenuOption() {
        browser.storage.sync.set({
            contextMenu: document.querySelector(`input[name=context-menu]`).checked
        })
    }

    function restoreContextMenuOption() {
        browser.storage.sync.get("contextMenu").then((result) => {
            let contextMenu = result.hasOwnProperty("contextMenu") ? result.contextMenu : true
            document.querySelector(`input[name=context-menu]`).checked = contextMenu
        })
    }

    function storeFormatOption() {
        browser.storage.sync.set({
            format: document.querySelector(`input[name=format]:checked`).getAttribute("value")
        }).then(() => {
            enOrDisableHtmlVariantOption()
        })
    }

    function restoreFormatOption() {
        browser.storage.sync.get("format").then((result) => {
            let format = result.hasOwnProperty("format") ? result.format : "plain-text"
            document.querySelector(`input[name=format][value=${format}]`).checked = true
            enOrDisableHtmlVariantOption()
        })
    }

    function enOrDisableHtmlVariantOption() {
        let disabled = document.querySelector(`input[name=format]:checked`).getAttribute("value") == "plain-text"
        document.querySelectorAll(`input[name=html-variant]`).forEach((radiobutton) => {
            radiobutton.disabled = disabled
        })
        if (disabled) {
            document.querySelector("#html-disclaimer").classList.add("disabled")
        } else {
            document.querySelector("#html-disclaimer").classList.remove("disabled")
        }
    }

    function storeHtmlVariantOption() {
        browser.storage.sync.set({
            htmlVariant: document.querySelector(`input[name=html-variant]:checked`).getAttribute("value")
        })
    }

    function restoreHtmlVariantOption() {
        browser.storage.sync.get("htmlVariant").then((result) => {
            let htmlVariant = result.hasOwnProperty("htmlVariant") ? result.htmlVariant : "copy"
            document.querySelector(`input[name=html-variant][value=${htmlVariant}]`).checked = true
        })
    }

    function storeIncludeLinkOption() {
        browser.storage.sync.set({
            includeLink: document.querySelector(`input[name=include-link]`).checked
        })
    }

    function restoreIncludeLinkOption() {
        browser.storage.sync.get("includeLink").then((result) => {
            let includeLink = result.hasOwnProperty("includeLink") ? result.includeLink : true
            document.querySelector(`input[name=include-link]`).checked = includeLink
        })
    }

    function storeIncludeArticleOption() {
        browser.storage.sync.set({
            includeArticle: document.querySelector(`input[name=include-article]`).checked
        })
    }

    function restoreIncludeArticleOption() {
        browser.storage.sync.get("includeArticle").then((result) => {
            let includeArticle = result.hasOwnProperty("includeArticle") ? result.includeArticle : true
            document.querySelector(`input[name=include-article]`).checked = includeArticle
        })
    }
})()