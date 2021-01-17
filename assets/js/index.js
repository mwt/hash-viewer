function clearText() {
    document.getElementById('markdown').value = "# Title";
}

function submitText() {
    /* get the value in the textarea */
    var myText = document.getElementById('markdown').value;
    /* convert the value to a base64 hash */
    var myHash = btoa(unescape(encodeURIComponent(myText)));
    /* redirect to hash page */
    window.location.href = `/${myHash}`;
}