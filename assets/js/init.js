/*
 * Set up Marked with KaTeX extension
*/
marked.use(markedKatex({throwOnError: false}));

/*
 * Primary functions
*/

function updateById(id, content) {
    const targetElement = document.getElementById(id);

    /* process content with marked and replace text in content div */
    targetElement.innerHTML = DOMPurify.sanitize(marked.parse(content));

    /* save the content in local storage so that it can be edited later */
    localStorage.setItem("lastContent", content);
}


/* 
 * Button functions
*/

function clearText() {
    /* clear the local storage and refresh the page to clear the textarea and preview */
    localStorage.clear();
    location.reload();
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
