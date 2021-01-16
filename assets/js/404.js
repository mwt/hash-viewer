function replaceText() {
    var hash = window.location.pathname.substring(1);
    var content = decodeURIComponent(escape(atob(hash)));
    document.getElementById('content').innerHTML = marked(content);
}

replaceText();


