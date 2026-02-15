(function () {
    /* retrieve the last content from local storage and insert it into the textarea */
    const lastContent = localStorage.getItem("lastContent");
    if (lastContent) {
        document.getElementById('markdown').value = lastContent;
    };

    /* Create preview box if a media query says the screen width is >= 1200px */
    if (window.matchMedia("screen and (min-width: 1200px)").matches) {
        /* Insert preview box to the right of the #content element */
        const previewElement = document.createElement('div');
        previewElement.id = 'preview';
        previewElement.className = 'wrapper';
        document.getElementById('content').insertAdjacentElement('afterend', previewElement);
        updateById('preview', document.getElementById('markdown').value);
        /* Run preview when the textarea content changes */
        document.getElementById('markdown').addEventListener('input', function () {
            updateById('preview', this.value);
        });
    }
}());
