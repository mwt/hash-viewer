# Hash Viewer

You can use this to store entire documents in URLs. It is hash compatible with [Hashify](https://hashify.me) but has a simpler presentation and supports LaTeX math input via [MathJaX](https://www.mathjax.org/). It is hosted on [GitHub Pages](https://pages.github.com/) and has uses [marked](https://marked.js.org/) for markdown processing.

This service is especially useful for sharing text content with simple formatting and math. It can also be useful for storing human readable information on NFC tags. The information opens in a browser, yet will be entirely contained on the tag.

This project is fully client side, so no data is stored on the server. While I cannot read anything written or viewed using this site, the full hashes may be contained in HTTP requests sent to jsdelivr and polyfill.io. Because these hashes technically contain the full content of the page, this isn't a secure system for sensitive data.

The main page where hashes are decoded is `404.html`. This exploits the fact that all unknown urls on GitHub Pages are directed to the 404 page. By using 404, we ensure that every hash url is sent to this page.

The code is very short and simple. Decoding of hashes is handled by [404.js](/assets/js/404.js) and encoding is handled by [index.js](/assets/js/index.js).