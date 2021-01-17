function replaceText() {
    /* get the base64 hash from the url */
    var hash = window.location.pathname.substring(1);
    /* decode the hash into text */
    var content = decodeURIComponent(escape(atob(hash)));
    /* split into math and markdown segments */
    var contents = content.split('$$');
    if (contents.length === 1) {
        /* if there is no math, process it with marked and replace text in content div */
        document.getElementById('content').innerHTML = marked(content);
    } else {
        /* else, process only even indices with marked so that math is untouched */
        for (let index = 0; index < contents.length; index++) {
            if (index % 2 === 0) {
                contents[index] = marked(contents[index]);
            };
        };
        /* join again and replace text in content div */
        document.getElementById('content').innerHTML = contents.join('$$');
    };

};

replaceText();
