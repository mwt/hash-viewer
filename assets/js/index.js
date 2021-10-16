function clearText() {
    document.getElementById('markdown').value = "# Title";
};

function getHash() {
    /* get the value in the textarea */
    var myText = document.getElementById('markdown').value;
    /* convert the value to a base64 hash */
    return LZString.compressToBase64(unescape(encodeURIComponent(myText)));
};

function submitText() {
    /* redirect to hash page */
    window.location.href = `/${getHash()}`;
};

function shortenURL() {
    /* prepare to contact api */
    var xhr = new XMLHttpRequest();
    var fd  = new FormData();
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