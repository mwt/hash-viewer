/* retrieve the last content from local storage and insert it into the textarea */
(function () {
    const lastContent = localStorage.getItem("lastContent");
    if (lastContent) {
        document.getElementById('markdown').value = lastContent;
    };
}());

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
    fd.set("shorten", getHash());
    /* when api is contacted, we want the link inserted into small-link */
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const smallLink = document.getElementById("small-link");
            smallLink.innerHTML = xhr.responseText;
            smallLink.parentElement.classList.remove("hidden");
        };
    };
    /* the URL of the API */
    const fetchURL = "https://mwt.ttm.sh/min.php";
    /* the URL we want to shorten */
    xhr.open("POST", fetchURL, true);
    xhr.send(fd);
};
