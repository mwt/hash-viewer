(function() {
    /* get the base64 hash from the url */
    var hash = window.location.pathname.substring(1);
    /* decode the hash into text */
    var content = decodeURIComponent(escape(LZString.decompressFromBase64(hash)));
    /* split into math and markdown segments */
    var contents = content.split('$$');
    if (contents.length === 1) {
        /* if there is no math, process it with marked and replace text in content div */
        document.getElementById('content').innerHTML = marked(content);
    } else {
        /* load MathJaX only when needed */
        const jaxTag = document.createElement('script');
        jaxTag.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
        jaxTag.async = true;
        document.body.appendChild(jaxTag);
        /* process only even indices with marked so that math is untouched */
        for (let index = 0; index < contents.length; index++) {
            if (index % 2 === 0) {
                contents[index] = marked(contents[index]);
            };
        };
        /* join again and replace text in content div */
        document.getElementById('content').innerHTML = contents.join('$$');
    };
}());
