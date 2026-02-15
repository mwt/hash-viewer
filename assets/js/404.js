(function () {
    /* get the base64 hash from the url */
    var hash = window.location.pathname.substring(1);
    /* decode the hash into text */
    var content = decodeURIComponent(LZString.decompressFromBase64(hash));

    /* if the content is not empty, update the content div */
    if (content) {
        updateById('content', content);
    }
}());