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
    /* when api is contacted, we want the link inserted into small-link */
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            const alias = JSON.parse(xhr.responseText)['alias'];
            const smallLink = document.getElementById("small-link");
            smallLink.innerHTML = `https://chl.li/${alias}`;
            smallLink.parentElement.classList.remove("hidden");
        };
    };
    /* the URL of the API */
    const fetchURL = "https://chl.li/api/v1/shorten";
    /* the URL we want to shorten */
    const myURL = `${window.location.href}${getHash()}`;
    xhr.open("POST", fetchURL, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "url": myURL,
        "expires": "30"
    }));
};