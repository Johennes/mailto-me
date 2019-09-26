# mailto:me

A Firefox extension for emailing websites to yourself

mailto:me generates mailto hyperlinks and lets Firefox open them in your email client of choice. In addition to
sharing the plain link, it also supports article extraction in Markdown or HTML format.

Note that in order for the extension to work correctly it is essential that you have configured your web or local
mail client as standard application for `mailto:` links in the Firefox settings.

## Running (from Code)

For development and testing you can run the extension from code without installing using the `web-ext` script.

To run the extension

```
./web-ext run
```

To package the extension

```
./web-ext build
```

## Credits

Article extraction and formatting is powered by [Readability] and [Turndown].

The extension's icons are derived from [Mail free icon] made by [Iconnice] from [www.flaticon.com],
licensed under [CC BY 3.0]. Changes made to the original include addition of background color and text.

[Readability]: https://github.com/mozilla/readability
[Turndown]: https://github.com/domchristie/turndown
[Mail free icon]: https://www.flaticon.com/free-icon/mail_131155
[Iconnice]: https://www.flaticon.com/authors/iconnice
[www.flaticon.com]: https://www.flaticon.com
[CC BY 3.0]: https://creativecommons.org/licenses/by/3.0/legalcode
