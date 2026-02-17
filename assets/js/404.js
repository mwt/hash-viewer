(function () {
    /* set up marked with KaTeX extension */
    marked.use(markedKatex({ throwOnError: false }));

    /* get the base64 hash from the url */
    var hash = window.location.pathname.substring(1);

    viewContent(hash);
}());