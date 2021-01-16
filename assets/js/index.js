function clearText() {
    document.getElementById('markdown').value = "# Title";
}

function submitText() {
    var myText = document.getElementById('markdown').value;
    var myHash = btoa(unescape(encodeURIComponent(myText)));
    window.location.href = `/${myHash}`;
}