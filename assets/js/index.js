(function () {
    /* set up marked with KaTeX extension */
    marked.use(markedKatex({ throwOnError: false }));

    /* if the URL has no hash, do index things */
    if (!window.location.hash) {
        /* add home class to body for styling */
        document.body.classList.add('home');

        /* unhide the page content */
        document.querySelector('main.page-content').classList.remove('hidden');

        /* retrieve the last content from local storage and insert it into the textarea */
        const lastContent = localStorage.getItem("lastContent");
        if (lastContent) {
            document.getElementById('markdown').value = lastContent;
        };

        /* create preview box if a media query says the screen width is >= 1200px */
        if (window.matchMedia("screen and (min-width: 1200px)").matches) {
            /* insert preview box to the right of the #content element */
            const previewElement = document.createElement('div');
            previewElement.id = 'preview';
            previewElement.className = 'wrapper';
            document.getElementById('content').insertAdjacentElement('afterend', previewElement);
            updateById('preview', document.getElementById('markdown').value);
            /* run preview when the textarea content changes */
            document.getElementById('markdown').addEventListener('input', function () {
                updateById('preview', this.value);
            });
        }
    } else {
        /* if the URL has a hash, do 404 things */
        var hash = window.location.hash.substring(1);
        
        viewContent(hash);
    }
}());
