function replaceText() {
    var hash = window.location.pathname.substring(1);
    var content = decodeURIComponent(escape(atob(hash)));
    var contents = content.split('$$');
    if (contents.length === 1) {
        document.getElementById('content').innerHTML = marked(content);
    } else {
        contents[0] = marked(contents[0]);
        for (let index = 2; index < contents.length; index++) {
            if (index % 2 === 0) {
                contents[index] = marked(contents[index]);
            };
        };
        document.getElementById('content').innerHTML = contents.join('$$');
    };
    
};

replaceText();


