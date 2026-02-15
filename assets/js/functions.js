/*
 * Primary functions
*/

function updateById(id, content) {
    const targetElement = document.getElementById(id);

    /* split into math and markdown segments */
    var contents = content.split('$$');
    if (contents.length === 1) {
        /* if there is no math, process it with marked and replace text in content div */
        targetElement.innerHTML = DOMPurify.sanitize(marked.parse(content));
    } else {
        /* process only even indices with marked so that math is untouched */
        for (let index = 0; index < contents.length; index++) {
            if (index % 2 === 0) {
                contents[index] = marked.parse(contents[index]);
            };
        };
        /* join again and replace text in content div */
        if (targetElement) {
            targetElement.innerHTML = DOMPurify.sanitize(contents.join('$$'));
        }

        /* load MathJaX only when needed and not already defined */
        if (typeof MathJax === 'undefined') {
            const jaxTag = document.createElement('script');
            jaxTag.src = "/assets/js/node/mathjax/tex-chtml.js";
            jaxTag.async = true;
            document.body.appendChild(jaxTag);
        } else {
            /* if MathJaX is already defined, we need to re-render the math */
            MathJax.typesetPromise([targetElement]);
        }
    };

    /* save the content in local storage so that it can be edited later */
    localStorage.setItem("lastContent", content);
}


/* 
 * Button functions
*/

function clearText() {
    document.getElementById('markdown').value = "# Title";
};

function getHash() {
    /* get the value in the textarea */
    var myText = document.getElementById('markdown').value;
    return LZString
        /* convert the value to a base64 hash */
        .compressToBase64(encodeURIComponent(myText))
        /* remove padding */
        .replace(/=+$/, '');
};

function submitText() {
    /* redirect to hash page */
    window.location.href = `/${getHash()}`;
};

function shortenURL() {
    /* prepare to contact api */
    var xhr = new XMLHttpRequest();
    var fd = new FormData();
    fd.set("longurl", getHash());
    /* when api is contacted, we want the link inserted into small-link */
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const smallLink = document.getElementById("small-link");
            smallLink.innerHTML = xhr.responseText;
            smallLink.parentElement.classList.remove("hidden");
        };
    };
    /* the URL of the API */
    const fetchURL = "https://h.mwt.me/shorten.php";
    /* the URL we want to shorten */
    xhr.open("POST", fetchURL, true);
    xhr.send(fd);
};
