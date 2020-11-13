# mailto:me

mailto:me is a browser extension for [Firefox] and [Chrome] to email websites to
yourself. If you want, it's a poor man's read-later system that relies on nothing
more than your email inbox.

![mailto:me logo](/icons/icon-128.png "mailto:me")

mailto:me generates `mailto://` hyperlinks and lets the browser open them in your
email client of choice. Note that in order for the extension to work correctly it
is essential that you have configured your web or local mail client as standard
application for `mailto://` links in the _browser_ settings.

## Features

- Configurable and persistent recipient address
- Mail subject extracted from page title / content
- Mail body supports:
  - Plain page link
  - Reader-view-like page content in markdown format
  - Reader-view-like page content in HTML format

## Running (from Code)

For development and testing you can run the extension from code without installing
using the `web-ext` script.

To run the extension:

```
./web-ext run
```

To package the extension:

```
./web-ext build
```

## Credits

Article extraction and formatting is powered by [Readability] and [Turndown].

The extension's icons are derived from the [Mail free icon] made by [Iconnice] from
[www.flaticon.com], licensed under [CC BY 3.0]. Changes made to the original include
addition of background color and text.

[Firefox]: https://addons.mozilla.org/en-US/firefox/addon/mailto-me/
[Chrome]: https://chrome.google.com/webstore/detail/mailtome/bcomoaoagbblmlcakoadkmnndpooiefe
[Readability]: https://github.com/mozilla/readability
[Turndown]: https://github.com/domchristie/turndown
[Mail free icon]: https://www.flaticon.com/free-icon/mail_131155
[Iconnice]: https://www.flaticon.com/authors/iconnice
[www.flaticon.com]: https://www.flaticon.com
[CC BY 3.0]: https://creativecommons.org/licenses/by/3.0/legalcode
